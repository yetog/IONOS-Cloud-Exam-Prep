import { useCallback, useMemo, useEffect } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { useProgress } from './useProgress';
import { UserProfile, UserGoals, TestInsights, DEFAULT_PROFILE } from '@/types/profile';
import { IONOSSection, SECTION_INFO } from '@/types/gmat';
import { useAuth } from '@/contexts/AuthContext';
import { loadUserProfile, saveUserProfile } from '@/services/firestore';

export function useProfile() {
  const { user } = useAuth();
  const uid = user?.uid ?? null;

  const [profile, setProfile] = useLocalStorage<UserProfile>('ionos-profile', DEFAULT_PROFILE);

  // ── Firestore sync ────────────────────────────────────────────────────────

  // Load from Firestore once on sign-in
  useEffect(() => {
    if (!uid) return;
    loadUserProfile(uid).then(p => {
      if (p) setProfile(p as unknown as UserProfile);
    }).catch(() => {});
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uid]);

  // Save profile whenever it changes
  useEffect(() => {
    if (!uid) return;
    saveUserProfile(uid, profile as unknown as Record<string, unknown>).catch(() => {});
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uid, profile]);
  const { progress, attempts, getSectionAccuracy } = useProgress();

  // Update display name
  const updateDisplayName = useCallback((name: string) => {
    setProfile(prev => ({ ...prev, displayName: name }));
  }, [setProfile]);

  // Update avatar
  const updateAvatar = useCallback((avatarUrl: string | null) => {
    setProfile(prev => ({ ...prev, avatarUrl }));
  }, [setProfile]);

  // Update goals
  const updateGoals = useCallback((goals: Partial<UserGoals>) => {
    setProfile(prev => ({
      ...prev,
      goals: { ...prev.goals, ...goals },
    }));
  }, [setProfile]);

  // Calculate days until test
  const daysUntilTest = useMemo(() => {
    if (!profile.goals.testDate) return null;
    const testDate = new Date(profile.goals.testDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    testDate.setHours(0, 0, 0, 0);
    const diff = Math.ceil((testDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return diff > 0 ? diff : 0;
  }, [profile.goals.testDate]);

  // Calculate member since days
  const memberSinceDays = useMemo(() => {
    const created = new Date(profile.createdAt);
    const today = new Date();
    return Math.floor((today.getTime() - created.getTime()) / (1000 * 60 * 60 * 24));
  }, [profile.createdAt]);

  // Calculate today's questions answered
  const todayQuestionsAnswered = useMemo(() => {
    const today = new Date().toISOString().split('T')[0];
    return attempts.filter(a => a.answeredAt.startsWith(today)).length;
  }, [attempts]);

  // Calculate this week's time spent (in minutes)
  const weeklyTimeSpent = useMemo(() => {
    const now = new Date();
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const weekAttempts = attempts.filter(a => new Date(a.answeredAt) >= weekAgo);
    return Math.round(weekAttempts.reduce((sum, a) => sum + a.timeSpent, 0) / 60);
  }, [attempts]);

  // Calculate test insights
  const insights = useMemo((): TestInsights => {
    const sections: IONOSSection[] = ['unit1', 'unit2', 'unit3'];
    
    // Find strongest and weakest sections (minimum 5 questions)
    const sectionData = sections
      .map(section => ({
        section: SECTION_INFO[section].name,
        accuracy: getSectionAccuracy(section),
        count: progress.sectionStats[section]?.questionsAnswered || 0,
      }))
      .filter(s => s.count >= 5);

    const strongest = sectionData.length > 0
      ? sectionData.reduce((a, b) => a.accuracy > b.accuracy ? a : b)
      : null;

    const weakest = sectionData.length > 0
      ? sectionData.reduce((a, b) => a.accuracy < b.accuracy ? a : b)
      : null;

    // Calculate average time per question
    const avgTime = progress.totalQuestionsAnswered > 0
      ? Math.round(progress.totalTimeSpent / progress.totalQuestionsAnswered)
      : 0;

    // Calculate accuracy trend from recent attempts (last 20 vs previous 20)
    let trend: 'up' | 'down' | 'stable' = 'stable';
    if (attempts.length >= 20) {
      const recent = attempts.slice(-20);
      const previous = attempts.slice(-40, -20);
      
      if (previous.length >= 10) {
        const recentAccuracy = recent.filter(a => a.isCorrect).length / recent.length;
        const previousAccuracy = previous.filter(a => a.isCorrect).length / previous.length;
        
        if (recentAccuracy > previousAccuracy + 0.05) trend = 'up';
        else if (recentAccuracy < previousAccuracy - 0.05) trend = 'down';
      }
    }

    // Recommended focus area
    let recommendedFocus: string | null = null;
    if (weakest) {
      recommendedFocus = weakest.section;
    }

    return {
      strongestSection: strongest ? { section: strongest.section, accuracy: strongest.accuracy } : null,
      weakestSection: weakest ? { section: weakest.section, accuracy: weakest.accuracy } : null,
      recommendedFocus,
      averageTimePerQuestion: avgTime,
      accuracyTrend: trend,
    };
  }, [progress, attempts, getSectionAccuracy]);

  // Estimate readiness score (simple algorithm)
  const readinessScore = useMemo(() => {
    if (progress.totalQuestionsAnswered < 10) return 0;
    
    const accuracy = progress.totalCorrect / progress.totalQuestionsAnswered;
    const streakBonus = Math.min(progress.currentStreak * 2, 10);
    const volumeBonus = Math.min(progress.totalQuestionsAnswered / 10, 20);
    
    return Math.min(Math.round(accuracy * 70 + streakBonus + volumeBonus), 100);
  }, [progress]);

  return {
    profile,
    updateDisplayName,
    updateAvatar,
    updateGoals,
    daysUntilTest,
    memberSinceDays,
    todayQuestionsAnswered,
    weeklyTimeSpent,
    insights,
    readinessScore,
  };
}

