import { useCallback, useMemo } from 'react';
import { useLocalStorage } from './useLocalStorage';
import {
  SKILLS,
  SkillProgress,
  SkillsState,
  SkillCategory,
  getSkillLevel,
  calculateSkillXP,
  SKILL_CATEGORIES,
} from '@/types/skills';

const DEFAULT_SKILLS_STATE: SkillsState = {
  progress: {},
};

export function useSkills() {
  const [skillsState, setSkillsState] = useLocalStorage<SkillsState>(
    'ionos-skills',
    DEFAULT_SKILLS_STATE
  );

  // Get progress for a specific skill
  const getSkillProgress = useCallback(
    (skillId: string): SkillProgress => {
      return (
        skillsState.progress[skillId] || {
          skillId,
          xp: 0,
          level: 'novice',
          questionsAttempted: 0,
          correctAnswers: 0,
        }
      );
    },
    [skillsState.progress]
  );

  // Record XP for a skill
  const recordSkillXP = useCallback(
    (
      skillId: string,
      isCorrect: boolean,
      difficulty: 'easy' | 'medium' | 'hard',
      wasUnderTargetTime: boolean,
      usedHint: boolean
    ): number => {
      const xpEarned = calculateSkillXP(isCorrect, difficulty, wasUnderTargetTime, usedHint);

      setSkillsState((prev) => {
        const currentProgress = prev.progress[skillId] || {
          skillId,
          xp: 0,
          level: 'novice',
          questionsAttempted: 0,
          correctAnswers: 0,
        };

        const newXP = currentProgress.xp + xpEarned;
        const newLevel = getSkillLevel(newXP);

        return {
          ...prev,
          progress: {
            ...prev.progress,
            [skillId]: {
              ...currentProgress,
              xp: newXP,
              level: newLevel,
              questionsAttempted: currentProgress.questionsAttempted + 1,
              correctAnswers: currentProgress.correctAnswers + (isCorrect ? 1 : 0),
              lastPracticed: new Date().toISOString(),
            },
          },
        };
      });

      return xpEarned;
    },
    [setSkillsState]
  );

  // Find skills linked to a question sub-type
  const getSkillsForSubType = useCallback((subTypeId: string): string[] => {
    return SKILLS
      .filter((skill) => skill.linkedSubTypes?.includes(subTypeId))
      .map((skill) => skill.id);
  }, []);

  // Find skills linked to a question type
  const getSkillsForQuestionType = useCallback((questionType: string): string[] => {
    return SKILLS
      .filter((skill) => skill.linkedQuestionTypes?.includes(questionType))
      .map((skill) => skill.id);
  }, []);

  // Get all skills grouped by category
  const skillsByCategory = useMemo(() => {
    const grouped: Record<SkillCategory, typeof SKILLS> = {
      'strategic-foundations': [],
      'Unit 1: Cloud Basics-combat': [],
      'Unit 2: Core Services-warfare': [],
      'data-integration': [],
      'mental-fortitude': [],
    };

    SKILLS.forEach((skill) => {
      grouped[skill.category].push(skill);
    });

    return grouped;
  }, []);

  // Get top skills by XP
  const topSkills = useMemo(() => {
    return SKILLS
      .map((skill) => ({
        skill,
        progress: getSkillProgress(skill.id),
      }))
      .filter((item) => item.progress.xp > 0)
      .sort((a, b) => b.progress.xp - a.progress.xp)
      .slice(0, 5);
  }, [getSkillProgress]);

  // Get total skill XP
  const totalSkillXP = useMemo(() => {
    return Object.values(skillsState.progress).reduce((sum, p) => sum + p.xp, 0);
  }, [skillsState.progress]);

  // Get mastered skill count
  const masteredSkillsCount = useMemo(() => {
    return Object.values(skillsState.progress).filter((p) => p.level === 'master').length;
  }, [skillsState.progress]);

  // Reset all skills
  const resetSkills = useCallback(() => {
    setSkillsState(DEFAULT_SKILLS_STATE);
  }, [setSkillsState]);

  return {
    skillsState,
    getSkillProgress,
    recordSkillXP,
    getSkillsForSubType,
    getSkillsForQuestionType,
    skillsByCategory,
    topSkills,
    totalSkillXP,
    masteredSkillsCount,
    resetSkills,
    allSkills: SKILLS,
    categories: SKILL_CATEGORIES,
  };
}

