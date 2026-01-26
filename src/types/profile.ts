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

export const DEFAULT_PROFILE: UserProfile = {
  displayName: 'GMAT Student',
  avatarUrl: null,
  createdAt: new Date().toISOString(),
  goals: {
    targetScore: null,
    testDate: null,
    dailyQuestionGoal: 10,
    weeklyTimeGoal: 300, // 5 hours in minutes
  },
};
