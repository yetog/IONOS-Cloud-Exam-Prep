// GMAT Question Types
export type GMATSection = 'quantitative' | 'verbal' | 'integrated-reasoning';

export type QuantitativeType = 'problem-solving' | 'data-sufficiency';
export type VerbalType = 'reading-comprehension' | 'critical-reasoning' | 'sentence-correction';
export type IntegratedReasoningType = 'multi-source-reasoning' | 'graphics-interpretation' | 'two-part-analysis' | 'table-analysis';

export type QuestionType = QuantitativeType | VerbalType | IntegratedReasoningType;

export interface Question {
  id: string;
  section: GMATSection;
  type: QuestionType;
  difficulty: 'easy' | 'medium' | 'hard';
  question: string;
  passage?: string; // For reading comprehension or multi-source
  options: string[];
  correctAnswer: number; // Index of correct option
  explanation: string;
  strategy: string; // Hint/theory for this question type
  commonTraps?: string[];
  targetTime: number; // Seconds to answer
  tags?: string[];
}

export interface QuestionAttempt {
  questionId: string;
  answeredAt: string; // ISO date
  selectedAnswer: number;
  isCorrect: boolean;
  timeSpent: number; // Seconds
  usedHint: boolean;
  xpEarned: number;
}

// User Progress
export interface UserProgress {
  totalXP: number;
  level: number;
  currentStreak: number;
  longestStreak: number;
  lastPracticeDate: string | null; // ISO date
  totalQuestionsAnswered: number;
  totalCorrect: number;
  totalTimeSpent: number; // Seconds
  sectionStats: Record<GMATSection, SectionStats>;
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
  | 'quant-master'
  | 'verbal-master'
  | 'ir-master'
  | 'time-lord';

export interface Achievement {
  id: AchievementId;
  name: string;
  description: string;
  icon: string; // Lucide icon name
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
  section: GMATSection;
  questionTypes?: QuestionType[];
  questionsAttempted: QuestionAttempt[];
  completed: boolean;
}

// Level thresholds
export const LEVEL_THRESHOLDS = [
  0,      // Level 1
  100,    // Level 2
  250,    // Level 3
  500,    // Level 4
  850,    // Level 5
  1300,   // Level 6
  1900,   // Level 7
  2700,   // Level 8
  3800,   // Level 9
  5200,   // Level 10
  7000,   // Level 11
  9500,   // Level 12
  13000,  // Level 13
  18000,  // Level 14
  25000,  // Level 15+
];

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'first-blood',
    name: 'First Blood',
    description: 'Answer your first question correctly',
    icon: 'Zap',
    requirement: 1,
    xpReward: 25,
  },
  {
    id: 'speed-demon',
    name: 'Speed Demon',
    description: 'Answer 10 questions under target time',
    icon: 'Timer',
    requirement: 10,
    xpReward: 100,
  },
  {
    id: 'streak-3',
    name: 'Getting Started',
    description: 'Maintain a 3-day study streak',
    icon: 'Flame',
    requirement: 3,
    xpReward: 50,
  },
  {
    id: 'streak-7',
    name: 'Streak Master',
    description: 'Maintain a 7-day study streak',
    icon: 'Flame',
    requirement: 7,
    xpReward: 150,
  },
  {
    id: 'streak-30',
    name: 'Unstoppable',
    description: 'Maintain a 30-day study streak',
    icon: 'Flame',
    requirement: 30,
    xpReward: 500,
  },
  {
    id: 'no-hints-10',
    name: 'No Training Wheels',
    description: 'Answer 10 questions correctly without hints',
    icon: 'Brain',
    requirement: 10,
    xpReward: 75,
  },
  {
    id: 'no-hints-50',
    name: 'Self Sufficient',
    description: 'Answer 50 questions correctly without hints',
    icon: 'Brain',
    requirement: 50,
    xpReward: 250,
  },
  {
    id: 'perfect-10',
    name: 'Perfect 10',
    description: 'Get 10 questions correct in a row',
    icon: 'Target',
    requirement: 10,
    xpReward: 200,
  },
  {
    id: 'centurion',
    name: 'Centurion',
    description: 'Answer 100 questions total',
    icon: 'Award',
    requirement: 100,
    xpReward: 300,
  },
  {
    id: 'quant-master',
    name: 'Quant Master',
    description: 'Achieve 80% accuracy in Quantitative (min 20 questions)',
    icon: 'Calculator',
    requirement: 80,
    xpReward: 400,
  },
  {
    id: 'verbal-master',
    name: 'Verbal Master',
    description: 'Achieve 80% accuracy in Verbal (min 20 questions)',
    icon: 'BookOpen',
    requirement: 80,
    xpReward: 400,
  },
  {
    id: 'ir-master',
    name: 'IR Master',
    description: 'Achieve 80% accuracy in Integrated Reasoning (min 20 questions)',
    icon: 'BarChart3',
    requirement: 80,
    xpReward: 400,
  },
  {
    id: 'time-lord',
    name: 'Time Lord',
    description: 'Spend 10 hours practicing',
    icon: 'Clock',
    requirement: 36000, // 10 hours in seconds
    xpReward: 500,
  },
];

// Section display info
export const SECTION_INFO: Record<GMATSection, { name: string; icon: string; color: string; types: { value: QuestionType; label: string }[] }> = {
  'quantitative': {
    name: 'Quantitative',
    icon: 'Calculator',
    color: 'primary',
    types: [
      { value: 'problem-solving', label: 'Problem Solving' },
      { value: 'data-sufficiency', label: 'Data Sufficiency' },
    ],
  },
  'verbal': {
    name: 'Verbal',
    icon: 'BookOpen',
    color: 'primary',
    types: [
      { value: 'reading-comprehension', label: 'Reading Comprehension' },
      { value: 'critical-reasoning', label: 'Critical Reasoning' },
      { value: 'sentence-correction', label: 'Sentence Correction' },
    ],
  },
  'integrated-reasoning': {
    name: 'Integrated Reasoning',
    icon: 'BarChart3',
    color: 'primary',
    types: [
      { value: 'multi-source-reasoning', label: 'Multi-Source Reasoning' },
      { value: 'graphics-interpretation', label: 'Graphics Interpretation' },
      { value: 'two-part-analysis', label: 'Two-Part Analysis' },
      { value: 'table-analysis', label: 'Table Analysis' },
    ],
  },
};
