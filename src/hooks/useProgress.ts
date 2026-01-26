import { useCallback, useMemo } from 'react';
import { useLocalStorage } from './useLocalStorage';
import {
  UserProgress,
  UserAchievements,
  QuestionAttempt,
  GMATSection,
  QuestionType,
  LEVEL_THRESHOLDS,
  ACHIEVEMENTS,
  AchievementId,
  SectionStats,
  TypeStats,
} from '@/types/gmat';

const DEFAULT_SECTION_STATS: SectionStats = {
  questionsAnswered: 0,
  correct: 0,
  totalTime: 0,
  averageTime: 0,
};

const DEFAULT_TYPE_STATS: TypeStats = {
  questionsAnswered: 0,
  correct: 0,
  totalTime: 0,
  averageTime: 0,
};

const DEFAULT_PROGRESS: UserProgress = {
  totalXP: 0,
  level: 1,
  currentStreak: 0,
  longestStreak: 0,
  lastPracticeDate: null,
  totalQuestionsAnswered: 0,
  totalCorrect: 0,
  totalTimeSpent: 0,
  sectionStats: {
    'quantitative': { ...DEFAULT_SECTION_STATS },
    'verbal': { ...DEFAULT_SECTION_STATS },
    'integrated-reasoning': { ...DEFAULT_SECTION_STATS },
  },
  typeStats: {} as Record<QuestionType, TypeStats>,
};

const DEFAULT_ACHIEVEMENTS: UserAchievements = {
  unlocked: [],
  progress: {} as Record<AchievementId, number>,
};

export function useProgress() {
  const [progress, setProgress] = useLocalStorage<UserProgress>('gmat-progress', DEFAULT_PROGRESS);
  const [achievements, setAchievements] = useLocalStorage<UserAchievements>('gmat-achievements', DEFAULT_ACHIEVEMENTS);
  const [attempts, setAttempts] = useLocalStorage<QuestionAttempt[]>('gmat-attempts', []);

  // Calculate level from XP
  const calculateLevel = useCallback((xp: number): number => {
    for (let i = LEVEL_THRESHOLDS.length - 1; i >= 0; i--) {
      if (xp >= LEVEL_THRESHOLDS[i]) {
        return i + 1;
      }
    }
    return 1;
  }, []);

  // Get XP needed for next level
  const xpForNextLevel = useMemo(() => {
    const nextLevelIndex = progress.level;
    if (nextLevelIndex >= LEVEL_THRESHOLDS.length) {
      return null; // Max level
    }
    return LEVEL_THRESHOLDS[nextLevelIndex];
  }, [progress.level]);

  const xpProgress = useMemo(() => {
    const currentLevelXP = LEVEL_THRESHOLDS[progress.level - 1] || 0;
    const nextLevelXP = xpForNextLevel || progress.totalXP;
    const progressXP = progress.totalXP - currentLevelXP;
    const requiredXP = nextLevelXP - currentLevelXP;
    return {
      current: progressXP,
      required: requiredXP,
      percentage: requiredXP > 0 ? (progressXP / requiredXP) * 100 : 100,
    };
  }, [progress.totalXP, progress.level, xpForNextLevel]);

  // Update streak
  const updateStreak = useCallback(() => {
    const today = new Date().toISOString().split('T')[0];
    const lastDate = progress.lastPracticeDate;

    if (!lastDate) {
      return { currentStreak: 1, longestStreak: 1 };
    }

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split('T')[0];

    if (lastDate === today) {
      // Same day, no change
      return { currentStreak: progress.currentStreak, longestStreak: progress.longestStreak };
    } else if (lastDate === yesterdayStr) {
      // Consecutive day
      const newStreak = progress.currentStreak + 1;
      return { currentStreak: newStreak, longestStreak: Math.max(newStreak, progress.longestStreak) };
    } else {
      // Streak broken
      return { currentStreak: 1, longestStreak: progress.longestStreak };
    }
  }, [progress]);

  // Calculate XP for an attempt
  const calculateXP = useCallback((attempt: Omit<QuestionAttempt, 'xpEarned'>, targetTime: number): number => {
    if (!attempt.isCorrect) return 5; // Consolation XP

    let xp = 20; // Base XP for correct answer

    // Speed bonus
    if (attempt.timeSpent <= targetTime * 0.5) {
      xp += 15; // Super fast
    } else if (attempt.timeSpent <= targetTime * 0.75) {
      xp += 10; // Fast
    } else if (attempt.timeSpent <= targetTime) {
      xp += 5; // On time
    }

    // No hint bonus
    if (!attempt.usedHint) {
      xp += 10;
    }

    return xp;
  }, []);

  // Record an attempt
  const recordAttempt = useCallback((
    attempt: Omit<QuestionAttempt, 'xpEarned'>,
    section: GMATSection,
    type: QuestionType,
    targetTime: number
  ) => {
    const xpEarned = calculateXP(attempt, targetTime);
    const fullAttempt: QuestionAttempt = { ...attempt, xpEarned };

    // Update attempts list
    setAttempts(prev => [...prev, fullAttempt]);

    // Update progress
    setProgress(prev => {
      const streakUpdate = updateStreak();
      const today = new Date().toISOString().split('T')[0];

      // Update section stats
      const sectionStats = { ...prev.sectionStats };
      const currentSectionStats = sectionStats[section] || { ...DEFAULT_SECTION_STATS };
      sectionStats[section] = {
        questionsAnswered: currentSectionStats.questionsAnswered + 1,
        correct: currentSectionStats.correct + (attempt.isCorrect ? 1 : 0),
        totalTime: currentSectionStats.totalTime + attempt.timeSpent,
        averageTime: (currentSectionStats.totalTime + attempt.timeSpent) / (currentSectionStats.questionsAnswered + 1),
      };

      // Update type stats
      const typeStats = { ...prev.typeStats };
      const currentTypeStats = typeStats[type] || { ...DEFAULT_TYPE_STATS };
      typeStats[type] = {
        questionsAnswered: currentTypeStats.questionsAnswered + 1,
        correct: currentTypeStats.correct + (attempt.isCorrect ? 1 : 0),
        totalTime: currentTypeStats.totalTime + attempt.timeSpent,
        averageTime: (currentTypeStats.totalTime + attempt.timeSpent) / (currentTypeStats.questionsAnswered + 1),
      };

      const newTotalXP = prev.totalXP + xpEarned;
      const newLevel = calculateLevel(newTotalXP);

      return {
        ...prev,
        totalXP: newTotalXP,
        level: newLevel,
        currentStreak: streakUpdate.currentStreak,
        longestStreak: streakUpdate.longestStreak,
        lastPracticeDate: today,
        totalQuestionsAnswered: prev.totalQuestionsAnswered + 1,
        totalCorrect: prev.totalCorrect + (attempt.isCorrect ? 1 : 0),
        totalTimeSpent: prev.totalTimeSpent + attempt.timeSpent,
        sectionStats,
        typeStats,
      };
    });

    // Check achievements
    checkAchievements(fullAttempt, section);

    return xpEarned;
  }, [calculateXP, updateStreak, calculateLevel, setAttempts, setProgress]);

  // Check and unlock achievements
  const checkAchievements = useCallback((attempt: QuestionAttempt, section: GMATSection) => {
    setAchievements(prev => {
      const newProgress = { ...prev.progress };
      const newUnlocked = [...prev.unlocked];
      let xpFromAchievements = 0;

      // First Blood
      if (attempt.isCorrect && !prev.unlocked.includes('first-blood')) {
        newProgress['first-blood'] = 1;
        if (newProgress['first-blood'] >= 1) {
          newUnlocked.push('first-blood');
          xpFromAchievements += ACHIEVEMENTS.find(a => a.id === 'first-blood')!.xpReward;
        }
      }

      // Speed Demon - track in progress
      if (attempt.isCorrect && attempt.timeSpent < 90) { // Under 90 seconds
        newProgress['speed-demon'] = (prev.progress['speed-demon'] || 0) + 1;
        if (newProgress['speed-demon'] >= 10 && !prev.unlocked.includes('speed-demon')) {
          newUnlocked.push('speed-demon');
          xpFromAchievements += ACHIEVEMENTS.find(a => a.id === 'speed-demon')!.xpReward;
        }
      }

      // No hints achievements
      if (attempt.isCorrect && !attempt.usedHint) {
        newProgress['no-hints-10'] = (prev.progress['no-hints-10'] || 0) + 1;
        newProgress['no-hints-50'] = (prev.progress['no-hints-50'] || 0) + 1;

        if (newProgress['no-hints-10'] >= 10 && !prev.unlocked.includes('no-hints-10')) {
          newUnlocked.push('no-hints-10');
          xpFromAchievements += ACHIEVEMENTS.find(a => a.id === 'no-hints-10')!.xpReward;
        }
        if (newProgress['no-hints-50'] >= 50 && !prev.unlocked.includes('no-hints-50')) {
          newUnlocked.push('no-hints-50');
          xpFromAchievements += ACHIEVEMENTS.find(a => a.id === 'no-hints-50')!.xpReward;
        }
      }

      // Add XP from achievements
      if (xpFromAchievements > 0) {
        setProgress(p => ({
          ...p,
          totalXP: p.totalXP + xpFromAchievements,
          level: calculateLevel(p.totalXP + xpFromAchievements),
        }));
      }

      return { unlocked: newUnlocked, progress: newProgress };
    });
  }, [setAchievements, setProgress, calculateLevel]);

  // Check streak achievements
  const checkStreakAchievements = useCallback(() => {
    setAchievements(prev => {
      const newUnlocked = [...prev.unlocked];
      let xpFromAchievements = 0;

      if (progress.currentStreak >= 3 && !prev.unlocked.includes('streak-3')) {
        newUnlocked.push('streak-3');
        xpFromAchievements += ACHIEVEMENTS.find(a => a.id === 'streak-3')!.xpReward;
      }
      if (progress.currentStreak >= 7 && !prev.unlocked.includes('streak-7')) {
        newUnlocked.push('streak-7');
        xpFromAchievements += ACHIEVEMENTS.find(a => a.id === 'streak-7')!.xpReward;
      }
      if (progress.currentStreak >= 30 && !prev.unlocked.includes('streak-30')) {
        newUnlocked.push('streak-30');
        xpFromAchievements += ACHIEVEMENTS.find(a => a.id === 'streak-30')!.xpReward;
      }

      if (xpFromAchievements > 0) {
        setProgress(p => ({
          ...p,
          totalXP: p.totalXP + xpFromAchievements,
          level: calculateLevel(p.totalXP + xpFromAchievements),
        }));
      }

      return { ...prev, unlocked: newUnlocked };
    });
  }, [progress.currentStreak, setAchievements, setProgress, calculateLevel]);

  // Get accuracy for a section
  const getSectionAccuracy = useCallback((section: GMATSection): number => {
    const stats = progress.sectionStats[section];
    if (!stats || stats.questionsAnswered === 0) return 0;
    return Math.round((stats.correct / stats.questionsAnswered) * 100);
  }, [progress.sectionStats]);

  // Reset all progress
  const resetProgress = useCallback(() => {
    setProgress(DEFAULT_PROGRESS);
    setAchievements(DEFAULT_ACHIEVEMENTS);
    setAttempts([]);
  }, [setProgress, setAchievements, setAttempts]);

  return {
    progress,
    achievements,
    attempts,
    xpProgress,
    recordAttempt,
    getSectionAccuracy,
    checkStreakAchievements,
    resetProgress,
  };
}
