import { IONOSSection, QuestionType } from './gmat';

// User notes for the Notes & Insights section
export interface UserNote {
  id: string;
  section?: IONOSSection;
  questionType?: QuestionType;
  questionId?: string;
  title: string;
  content: string;
  tags: string[];
  type: 'insight' | 'mistake' | 'general';
  createdAt: string;
  updatedAt: string;
}

// Filter options for notes
export interface NoteFilters {
  section?: IONOSSection;
  questionType?: QuestionType;
  type?: UserNote['type'];
  searchQuery?: string;
}

