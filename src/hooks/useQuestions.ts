import { useCallback, useEffect, useMemo, useState } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { Question, IONOSSection, QuestionType } from '@/types/gmat';
import { SAMPLE_QUESTIONS } from '@/data/sampleQuestions';

export function useQuestions() {
  const [customQuestions, setCustomQuestions] = useLocalStorage<Question[]>('gmat-custom-questions', []);
  const [bankQuestions, setBankQuestions] = useState<Question[]>([]);

  // Lazy-load the full question bank so it doesn't block the initial render
  useEffect(() => {
    import('@/data/questionBank').then((m) => setBankQuestions(m.QUESTION_BANK));
  }, []);

  // Combine sample, bank, and custom questions
  const allQuestions = useMemo(() => {
    return [...SAMPLE_QUESTIONS, ...bankQuestions, ...customQuestions];
  }, [bankQuestions, customQuestions]);

  // Get questions by section
  const getQuestionsBySection = useCallback((section: IONOSSection): Question[] => {
    return allQuestions.filter(q => q.section === section);
  }, [allQuestions]);

  // Get questions by type
  const getQuestionsByType = useCallback((type: QuestionType): Question[] => {
    return allQuestions.filter(q => q.type === type);
  }, [allQuestions]);

  // Get filtered questions
  const getFilteredQuestions = useCallback((
    section?: IONOSSection,
    types?: QuestionType[],
    difficulty?: 'easy' | 'medium' | 'hard'
  ): Question[] => {
    return allQuestions.filter(q => {
      if (section && q.section !== section) return false;
      if (types && types.length > 0 && !types.includes(q.type)) return false;
      if (difficulty && q.difficulty !== difficulty) return false;
      return true;
    });
  }, [allQuestions]);

  // Get random question
  const getRandomQuestion = useCallback((
    section?: IONOSSection,
    types?: QuestionType[],
    excludeIds?: string[]
  ): Question | null => {
    let filtered = allQuestions;
    
    if (section) {
      filtered = filtered.filter(q => q.section === section);
    }
    if (types && types.length > 0) {
      filtered = filtered.filter(q => types.includes(q.type));
    }
    if (excludeIds && excludeIds.length > 0) {
      filtered = filtered.filter(q => !excludeIds.includes(q.id));
    }

    if (filtered.length === 0) return null;

    const randomIndex = Math.floor(Math.random() * filtered.length);
    return filtered[randomIndex];
  }, [allQuestions]);

  // Add custom question
  const addQuestion = useCallback((question: Omit<Question, 'id'>) => {
    const newQuestion: Question = {
      ...question,
      id: `custom-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    };
    setCustomQuestions(prev => [...prev, newQuestion]);
    return newQuestion;
  }, [setCustomQuestions]);

  // Remove custom question
  const removeQuestion = useCallback((id: string) => {
    setCustomQuestions(prev => prev.filter(q => q.id !== id));
  }, [setCustomQuestions]);

  // Get question by ID
  const getQuestionById = useCallback((id: string): Question | undefined => {
    return allQuestions.find(q => q.id === id);
  }, [allQuestions]);

  // Get question count by section
  const getQuestionCount = useCallback((section?: IONOSSection): number => {
    if (!section) return allQuestions.length;
    return allQuestions.filter(q => q.section === section).length;
  }, [allQuestions]);

  return {
    questions: allQuestions,
    customQuestions,
    getQuestionsBySection,
    getQuestionsByType,
    getFilteredQuestions,
    getRandomQuestion,
    addQuestion,
    removeQuestion,
    getQuestionById,
    getQuestionCount,
  };
}

