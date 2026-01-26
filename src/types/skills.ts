// Skill Mastery System Types
// Based on Princeton Review GMAT structure

export type SkillLevel = 'novice' | 'apprentice' | 'journeyman' | 'expert' | 'master';

export type SkillCategory = 
  | 'strategic-foundations'
  | 'quantitative-combat'
  | 'verbal-warfare'
  | 'data-integration'
  | 'mental-fortitude';

export interface Skill {
  id: string;
  name: string;
  category: SkillCategory;
  description: string;
  icon: string; // Lucide icon name
  linkedQuestionTypes?: string[]; // From gmat.ts QuestionType
  linkedSubTypes?: string[]; // From questionSubTypes.ts
}

export interface SkillProgress {
  skillId: string;
  xp: number;
  level: SkillLevel;
  questionsAttempted: number;
  correctAnswers: number;
  lastPracticed?: string; // ISO date
}

export interface SkillsState {
  progress: Record<string, SkillProgress>;
}

// XP thresholds for each level
export const SKILL_LEVEL_THRESHOLDS: Record<SkillLevel, number> = {
  novice: 0,
  apprentice: 25,
  journeyman: 75,
  expert: 175,
  master: 350,
};

// Color scheme for skill levels
export const SKILL_LEVEL_COLORS: Record<SkillLevel, { bg: string; text: string; glow: string }> = {
  novice: { bg: 'bg-gray-500/20', text: 'text-gray-400', glow: '' },
  apprentice: { bg: 'bg-emerald-500/20', text: 'text-emerald-400', glow: '' },
  journeyman: { bg: 'bg-blue-500/20', text: 'text-blue-400', glow: '' },
  expert: { bg: 'bg-purple-500/20', text: 'text-purple-400', glow: 'shadow-purple-500/20' },
  master: { bg: 'bg-amber-500/20', text: 'text-amber-400', glow: 'shadow-amber-500/30 shadow-lg' },
};

// Category info for display
export const SKILL_CATEGORIES: Record<SkillCategory, { name: string; icon: string; description: string }> = {
  'strategic-foundations': {
    name: 'Strategic Foundations',
    icon: 'Target',
    description: 'Core test-taking strategies and time management',
  },
  'quantitative-combat': {
    name: 'Quantitative Combat',
    icon: 'Calculator',
    description: 'Mathematical problem-solving and data analysis',
  },
  'verbal-warfare': {
    name: 'Verbal Warfare',
    icon: 'BookOpen',
    description: 'Reading, reasoning, and grammar mastery',
  },
  'data-integration': {
    name: 'Data Integration',
    icon: 'BarChart3',
    description: 'Multi-source reasoning and data interpretation',
  },
  'mental-fortitude': {
    name: 'Mental Fortitude',
    icon: 'Brain',
    description: 'Focus, speed, and pattern recognition',
  },
};

// Complete skill definitions
export const SKILLS: Skill[] = [
  // Strategic Foundations
  {
    id: 'adaptive-strategy',
    name: 'Adaptive Strategy',
    category: 'strategic-foundations',
    description: 'Understanding how the CAT works and optimal pacing',
    icon: 'Compass',
  },
  {
    id: 'poe-mastery',
    name: 'POE Mastery',
    category: 'strategic-foundations',
    description: 'Process of elimination techniques',
    icon: 'XCircle',
  },
  {
    id: 'time-management',
    name: 'Time Management',
    category: 'strategic-foundations',
    description: 'Staying on pace and knowing when to guess',
    icon: 'Timer',
  },

  // Quantitative Combat
  {
    id: 'number-theory',
    name: 'Number Theory',
    category: 'quantitative-combat',
    description: 'Primes, factors, divisibility, remainders',
    icon: 'Hash',
    linkedSubTypes: ['ps-number-properties', 'ds-number-properties'],
  },
  {
    id: 'arithmetic-mastery',
    name: 'Arithmetic Mastery',
    category: 'quantitative-combat',
    description: 'Percentages, ratios, rates, averages',
    icon: 'Percent',
    linkedSubTypes: ['ps-percentage-ratio', 'ps-rate-work'],
  },
  {
    id: 'algebraic-equations',
    name: 'Algebraic Equations',
    category: 'quantitative-combat',
    description: 'Solving equations, systems, quadratics',
    icon: 'Variable',
    linkedSubTypes: ['ps-algebra', 'ds-algebra'],
  },
  {
    id: 'geometric-reasoning',
    name: 'Geometric Reasoning',
    category: 'quantitative-combat',
    description: 'Shapes, angles, coordinate geometry',
    icon: 'Triangle',
    linkedSubTypes: ['ps-geometry', 'ds-geometry'],
  },
  {
    id: 'probability-counting',
    name: 'Probability & Counting',
    category: 'quantitative-combat',
    description: 'Combinations, permutations, probability',
    icon: 'Dice5',
    linkedSubTypes: ['ps-probability-counting'],
  },
  {
    id: 'data-sufficiency-logic',
    name: 'Data Sufficiency Logic',
    category: 'quantitative-combat',
    description: 'The unique GMAT question format',
    icon: 'GitBranch',
    linkedQuestionTypes: ['data-sufficiency'],
    linkedSubTypes: ['ds-value', 'ds-yes-no'],
  },

  // Verbal Warfare
  {
    id: 'sentence-structure',
    name: 'Sentence Structure',
    category: 'verbal-warfare',
    description: 'Grammar rules, SC techniques',
    icon: 'Type',
    linkedQuestionTypes: ['sentence-correction'],
    linkedSubTypes: ['sc-subject-verb', 'sc-pronouns', 'sc-modifiers', 'sc-parallelism', 'sc-verb-tense', 'sc-idioms', 'sc-comparisons'],
  },
  {
    id: 'reading-tactics',
    name: 'Reading Tactics',
    category: 'verbal-warfare',
    description: 'Passage mapping, main idea, inference',
    icon: 'FileText',
    linkedQuestionTypes: ['reading-comprehension'],
    linkedSubTypes: ['rc-main-idea', 'rc-detail', 'rc-inference', 'rc-purpose', 'rc-structure', 'rc-tone'],
  },
  {
    id: 'argument-analysis',
    name: 'Argument Analysis',
    category: 'verbal-warfare',
    description: 'CR premise/conclusion identification',
    icon: 'MessageSquare',
    linkedQuestionTypes: ['critical-reasoning'],
    linkedSubTypes: ['cr-weaken', 'cr-strengthen', 'cr-assumption'],
  },
  {
    id: 'critical-logic',
    name: 'Critical Logic',
    category: 'verbal-warfare',
    description: 'Strengthen, weaken, assumption questions',
    icon: 'Lightbulb',
    linkedQuestionTypes: ['critical-reasoning'],
    linkedSubTypes: ['cr-inference', 'cr-evaluate', 'cr-flaw', 'cr-explain'],
  },

  // Data Integration
  {
    id: 'multi-source-synthesis',
    name: 'Multi-Source Synthesis',
    category: 'data-integration',
    description: 'Combining info from multiple tabs',
    icon: 'Layers',
    linkedQuestionTypes: ['multi-source-reasoning'],
    linkedSubTypes: ['ir-multi-source'],
  },
  {
    id: 'visual-interpretation',
    name: 'Visual Interpretation',
    category: 'data-integration',
    description: 'Charts, graphs, data visualization',
    icon: 'LineChart',
    linkedQuestionTypes: ['graphics-interpretation'],
    linkedSubTypes: ['ir-graphics'],
  },
  {
    id: 'two-part-reasoning',
    name: 'Two-Part Reasoning',
    category: 'data-integration',
    description: 'Solving linked questions',
    icon: 'Puzzle',
    linkedQuestionTypes: ['two-part-analysis'],
    linkedSubTypes: ['ir-two-part'],
  },
  {
    id: 'table-analysis',
    name: 'Table Analysis',
    category: 'data-integration',
    description: 'Sorting and analyzing data tables',
    icon: 'Table',
    linkedQuestionTypes: ['table-analysis'],
    linkedSubTypes: ['ir-table'],
  },

  // Mental Fortitude
  {
    id: 'focus-endurance',
    name: 'Focus Endurance',
    category: 'mental-fortitude',
    description: 'Maintaining concentration over long sessions',
    icon: 'Eye',
  },
  {
    id: 'speed-under-pressure',
    name: 'Speed Under Pressure',
    category: 'mental-fortitude',
    description: 'Performing quickly without sacrificing accuracy',
    icon: 'Zap',
  },
  {
    id: 'pattern-recognition',
    name: 'Pattern Recognition',
    category: 'mental-fortitude',
    description: 'Identifying question types and traps quickly',
    icon: 'Scan',
  },
];

// Helper to calculate level from XP
export function getSkillLevel(xp: number): SkillLevel {
  if (xp >= SKILL_LEVEL_THRESHOLDS.master) return 'master';
  if (xp >= SKILL_LEVEL_THRESHOLDS.expert) return 'expert';
  if (xp >= SKILL_LEVEL_THRESHOLDS.journeyman) return 'journeyman';
  if (xp >= SKILL_LEVEL_THRESHOLDS.apprentice) return 'apprentice';
  return 'novice';
}

// Helper to get XP progress within current level
export function getSkillLevelProgress(xp: number): { current: number; required: number; percentage: number } {
  const level = getSkillLevel(xp);
  const levels: SkillLevel[] = ['novice', 'apprentice', 'journeyman', 'expert', 'master'];
  const currentIndex = levels.indexOf(level);
  
  if (level === 'master') {
    return { current: xp - SKILL_LEVEL_THRESHOLDS.master, required: 100, percentage: 100 };
  }
  
  const nextLevel = levels[currentIndex + 1];
  const currentThreshold = SKILL_LEVEL_THRESHOLDS[level];
  const nextThreshold = SKILL_LEVEL_THRESHOLDS[nextLevel];
  const current = xp - currentThreshold;
  const required = nextThreshold - currentThreshold;
  
  return {
    current,
    required,
    percentage: Math.min(100, (current / required) * 100),
  };
}

// Calculate XP earned for a skill based on question result
export function calculateSkillXP(
  isCorrect: boolean,
  difficulty: 'easy' | 'medium' | 'hard',
  wasUnderTargetTime: boolean,
  usedHint: boolean
): number {
  if (!isCorrect) return 2; // Small consolation XP

  let xp = 0;
  
  // Base XP by difficulty
  switch (difficulty) {
    case 'easy': xp = 5; break;
    case 'medium': xp = 10; break;
    case 'hard': xp = 15; break;
  }
  
  // Speed bonus
  if (wasUnderTargetTime) xp += 5;
  
  // No hint bonus
  if (!usedHint) xp += 5;
  
  return xp;
}
