// IONOS Question Types
export type IONOSSection = 'unit1' | 'unit2' | 'unit3';

export type Unit1Type = 'multiple-choice' | 'true-false';
export type Unit2Type = 'multiple-choice' | 'true-false';
export type Unit3Type = 'multiple-choice' | 'true-false' | 'scenario';

export type QuestionType = Unit1Type | Unit2Type | Unit3Type;

export interface Question {
  id: string;
  section: IONOSSection;
  type: QuestionType;
  difficulty: 'easy' | 'medium' | 'hard';
  question: string;
  passage?: string; 
  options: string[];
  correctAnswer: number; 
  explanation: string;
  strategy: string; 
  commonTraps?: string[];
  targetTime: number; 
  tags?: string[];
}

export interface QuestionAttempt {
  questionId: string;
  answeredAt: string; 
  selectedAnswer: number;
  isCorrect: boolean;
  timeSpent: number; 
  usedHint: boolean;
  xpEarned: number;
}

// User Progress
export interface UserProgress {
  totalXP: number;
  level: number;
  currentStreak: number;
  longestStreak: number;
  lastPracticeDate: string | null; 
  totalQuestionsAnswered: number;
  totalCorrect: number;
  totalTimeSpent: number; 
  sectionStats: Record<IONOSSection, SectionStats>;
  typeStats: Record<QuestionType, TypeStats>;
}

export interface SectionStats {
  questionsAnswered: number;
  correct: number;
  totalTime: number;
  averageTime: number;
}

export interface TypeStats {
  questionsAnswered: number;
  correct: number;
  totalTime: number;
  averageTime: number;
}

// Achievements
export type AchievementId = 
  | 'first-blood'
  | 'speed-demon'
  | 'streak-3'
  | 'streak-7'
  | 'streak-30'
  | 'no-hints-10'
  | 'no-hints-50'
  | 'perfect-10'
  | 'centurion'
  | 'unit1-master'
  | 'unit2-master'
  | 'unit3-master'
  | 'time-lord';

export interface Achievement {
  id: AchievementId;
  name: string;
  description: string;
  icon: string; 
  requirement: number;
  xpReward: number;
}

export interface UserAchievements {
  unlocked: AchievementId[];
  progress: Record<AchievementId, number>;
}

// Practice Session
export interface PracticeSession {
  id: string;
  startedAt: string;
  section: IONOSSection;
  questionTypes?: QuestionType[];
  questionsAttempted: QuestionAttempt[];
  completed: boolean;
}

// Level thresholds
export const LEVEL_THRESHOLDS = [
  0, 100, 250, 500, 850, 1300, 1900, 2700, 3800, 5200, 7000, 9500, 13000, 18000, 25000,
];

export const ACHIEVEMENTS: Achievement[] = [
  { id: 'first-blood', name: 'First Blood', description: 'Answer your first question correctly', icon: 'Zap', requirement: 1, xpReward: 25 },
  { id: 'speed-demon', name: 'Speed Demon', description: 'Answer 10 questions under target time', icon: 'Timer', requirement: 10, xpReward: 100 },
  { id: 'streak-3', name: 'Getting Started', description: 'Maintain a 3-day study streak', icon: 'Flame', requirement: 3, xpReward: 50 },
  { id: 'unit1-master', name: 'Cloud Basics Master', description: 'Achieve 80% accuracy in Unit 1', icon: 'Cloud', requirement: 80, xpReward: 400 },
  { id: 'unit2-master', name: 'Core Services Master', description: 'Achieve 80% accuracy in Unit 2', icon: 'Server', requirement: 80, xpReward: 400 },
  { id: 'unit3-master', name: 'Operations Master', description: 'Achieve 80% accuracy in Unit 3', icon: 'ShieldCheck', requirement: 80, xpReward: 400 },
];

export const SECTION_INFO: Record<IONOSSection, { name: string; icon: string; color: string; types: { value: QuestionType; label: string }[] }> = {
  'unit1': {
    name: 'Unit 1: Cloud Basics',
    icon: 'Cloud',
    color: 'primary',
    types: [
      { value: 'multiple-choice', label: 'Multiple Choice' },
      { value: 'true-false', label: 'True / False' },
    ],
  },
  'unit2': {
    name: 'Unit 2: Core Services',
    icon: 'Server',
    color: 'primary',
    types: [
      { value: 'multiple-choice', label: 'Multiple Choice' },
      { value: 'true-false', label: 'True / False' },
      { value: 'scenario', label: 'Architecture Scenario' },
    ],
  },
  'unit3': {
    name: 'Unit 3: Management',
    icon: 'ShieldCheck',
    color: 'primary',
    types: [
      { value: 'multiple-choice', label: 'Multiple Choice' },
      { value: 'true-false', label: 'True / False' },
      { value: 'scenario', label: 'Case Study' },
    ],
  },
};
