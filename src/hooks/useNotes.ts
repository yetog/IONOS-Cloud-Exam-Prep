import { useCallback, useMemo } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { UserNote, NoteFilters } from '@/types/notes';
import { IONOSSection, QuestionType } from '@/types/gmat';

const DEFAULT_NOTES: UserNote[] = [];

export function useNotes() {
  const [notes, setNotes] = useLocalStorage<UserNote[]>('gmat-notes', DEFAULT_NOTES);

  const addNote = useCallback((
    note: Omit<UserNote, 'id' | 'createdAt' | 'updatedAt'>
  ) => {
    const now = new Date().toISOString();
    const newNote: UserNote = {
      ...note,
      id: `note-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      createdAt: now,
      updatedAt: now,
    };
    setNotes(prev => [newNote, ...prev]);
    return newNote;
  }, [setNotes]);

  const updateNote = useCallback((
    id: string,
    updates: Partial<Omit<UserNote, 'id' | 'createdAt'>>
  ) => {
    setNotes(prev => prev.map(note => 
      note.id === id 
        ? { ...note, ...updates, updatedAt: new Date().toISOString() }
        : note
    ));
  }, [setNotes]);

  const deleteNote = useCallback((id: string) => {
    setNotes(prev => prev.filter(note => note.id !== id));
  }, [setNotes]);

  const getFilteredNotes = useCallback((filters: NoteFilters) => {
    return notes.filter(note => {
      if (filters.section && note.section !== filters.section) return false;
      if (filters.questionType && note.questionType !== filters.questionType) return false;
      if (filters.type && note.type !== filters.type) return false;
      if (filters.searchQuery) {
        const query = filters.searchQuery.toLowerCase();
        const matchesTitle = note.title.toLowerCase().includes(query);
        const matchesContent = note.content.toLowerCase().includes(query);
        const matchesTags = note.tags.some(tag => tag.toLowerCase().includes(query));
        if (!matchesTitle && !matchesContent && !matchesTags) return false;
      }
      return true;
    });
  }, [notes]);

  const getNotesBySection = useCallback((section: IONOSSection) => {
    return notes.filter(note => note.section === section);
  }, [notes]);

  const getNotesByType = useCallback((type: QuestionType) => {
    return notes.filter(note => note.questionType === type);
  }, [notes]);

  const getNotesByQuestionId = useCallback((questionId: string) => {
    return notes.filter(note => note.questionId === questionId);
  }, [notes]);

  const getInsights = useMemo(() => {
    return notes.filter(note => note.type === 'insight');
  }, [notes]);

  const getMistakes = useMemo(() => {
    return notes.filter(note => note.type === 'mistake');
  }, [notes]);

  const getAllTags = useMemo(() => {
    const tagSet = new Set<string>();
    notes.forEach(note => note.tags.forEach(tag => tagSet.add(tag)));
    return Array.from(tagSet).sort();
  }, [notes]);

  return {
    notes,
    addNote,
    updateNote,
    deleteNote,
    getFilteredNotes,
    getNotesBySection,
    getNotesByType,
    getNotesByQuestionId,
    getInsights,
    getMistakes,
    getAllTags,
  };
}

