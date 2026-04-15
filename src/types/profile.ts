import { IONOSSection, QuestionType } from './gmat';

export interface UserGoals {
  targetScore: number | null; // 205-805
  testDate: string | null; // ISO date
  dailyQuestionGoal: number;
  weeklyTimeGoal: number; // minutes
}

export interface UserProfile {
  displayName: string;
  avatarUrl: string | null; // base64 data URL or null
  createdAt: string; // ISO date
  goals: UserGoals;
}

export interface TestInsights {
  strongestSection: { section: string; accuracy: number } | null;
  weakestSection: { section: string; accuracy: number } | null;
  recommendedFocus: string | null;
  averageTimePerQuestion: number;
  accuracyTrend: 'up' | 'down' | 'stable';
}

// Session history for "continue where you left off"
export interface SessionHistory {
  lastSection: IONOSSection | null;
  lastType: QuestionType | null;
  lastPracticeTime: string | null; // ISO date
  questionsInSession: number;
  sessionAccuracy: number;
}

// Equipped focus for active learning goals
export interface EquippedFocus {
  primary: { skillId: string; name: string; progress: number } | null;
  secondary: { skillId: string; name: string; progress: number } | null;
}

export const DEFAULT_PROFILE: UserProfile = {
  displayName: 'IONOS Cloud Student',
  avatarUrl: null,
  createdAt: new Date().toISOString(),
  goals: {
    targetScore: null,
    testDate: null,
    dailyQuestionGoal: 10,
    weeklyTimeGoal: 300, // 5 hours in minutes
  },
};

export const DEFAULT_SESSION_HISTORY: SessionHistory = {
  lastSection: null,
  lastType: null,
  lastPracticeTime: null,
  questionsInSession: 0,
  sessionAccuracy: 0,
};

