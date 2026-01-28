import { useCallback, useMemo } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { SessionHistory, DEFAULT_SESSION_HISTORY } from '@/types/profile';
import { GMATSection, QuestionType, SECTION_INFO } from '@/types/gmat';
import { formatDistanceToNow } from 'date-fns';

export function useSessionHistory() {
  const [sessionHistory, setSessionHistory] = useLocalStorage<SessionHistory>(
    'gmat-session-history',
    DEFAULT_SESSION_HISTORY
  );

  // Update session after answering a question
  const recordSessionActivity = useCallback(
    (section: GMATSection, type: QuestionType, isCorrect: boolean) => {
      setSessionHistory(prev => {
        const newQuestionsInSession = prev.questionsInSession + 1;
        const correctInSession = Math.round(prev.sessionAccuracy * prev.questionsInSession / 100) + (isCorrect ? 1 : 0);
        const newAccuracy = Math.round((correctInSession / newQuestionsInSession) * 100);

        return {
          lastSection: section,
          lastType: type,
          lastPracticeTime: new Date().toISOString(),
          questionsInSession: newQuestionsInSession,
          sessionAccuracy: newAccuracy,
        };
      });
    },
    [setSessionHistory]
  );

  // Reset session (start fresh)
  const resetSession = useCallback(() => {
    setSessionHistory(DEFAULT_SESSION_HISTORY);
  }, [setSessionHistory]);

  // Get human-readable time since last practice
  const timeSinceLastPractice = useMemo(() => {
    if (!sessionHistory.lastPracticeTime) return null;
    return formatDistanceToNow(new Date(sessionHistory.lastPracticeTime), { addSuffix: true });
  }, [sessionHistory.lastPracticeTime]);

  // Get display name for last section
  const lastSectionName = useMemo(() => {
    if (!sessionHistory.lastSection) return null;
    return SECTION_INFO[sessionHistory.lastSection].name;
  }, [sessionHistory.lastSection]);

  // Check if user has any session history
  const hasSessionHistory = useMemo(() => {
    return sessionHistory.lastPracticeTime !== null;
  }, [sessionHistory.lastPracticeTime]);

  // Check if session is recent (within 24 hours)
  const isSessionRecent = useMemo(() => {
    if (!sessionHistory.lastPracticeTime) return false;
    const lastTime = new Date(sessionHistory.lastPracticeTime).getTime();
    const dayAgo = Date.now() - 24 * 60 * 60 * 1000;
    return lastTime > dayAgo;
  }, [sessionHistory.lastPracticeTime]);

  return {
    sessionHistory,
    recordSessionActivity,
    resetSession,
    timeSinceLastPractice,
    lastSectionName,
    hasSessionHistory,
    isSessionRecent,
  };
}
