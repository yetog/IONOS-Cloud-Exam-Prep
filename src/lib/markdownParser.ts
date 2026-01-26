import { Question, GMATSection, QuestionType } from '@/types/gmat';

interface ParsedQuestion {
  question: Omit<Question, 'id'>;
  errors: string[];
  warnings: string[];
}

interface ParseResult {
  success: boolean;
  questions: ParsedQuestion[];
  globalErrors: string[];
}

const VALID_SECTIONS: GMATSection[] = ['quantitative', 'verbal', 'integrated-reasoning'];
const VALID_TYPES: Record<GMATSection, QuestionType[]> = {
  'quantitative': ['problem-solving', 'data-sufficiency'],
  'verbal': ['reading-comprehension', 'critical-reasoning', 'sentence-correction'],
  'integrated-reasoning': ['multi-source-reasoning', 'graphics-interpretation', 'two-part-analysis', 'table-analysis'],
};

function parseFrontmatter(content: string): { frontmatter: Record<string, string>; body: string } {
  const frontmatterMatch = content.match(/^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/);
  
  if (!frontmatterMatch) {
    return { frontmatter: {}, body: content };
  }

  const frontmatterLines = frontmatterMatch[1].split('\n');
  const frontmatter: Record<string, string> = {};

  for (const line of frontmatterLines) {
    const colonIndex = line.indexOf(':');
    if (colonIndex > 0) {
      const key = line.slice(0, colonIndex).trim();
      const value = line.slice(colonIndex + 1).trim();
      frontmatter[key] = value;
    }
  }

  return { frontmatter, body: frontmatterMatch[2] };
}

function extractSection(body: string, sectionName: string): string | null {
  const regex = new RegExp(`#\\s*${sectionName}\\s*\\n([\\s\\S]*?)(?=\\n#\\s|$)`, 'i');
  const match = body.match(regex);
  return match ? match[1].trim() : null;
}

function parseOptions(optionsText: string): string[] {
  const lines = optionsText.split('\n').filter(line => line.trim());
  const options: string[] = [];

  for (const line of lines) {
    // Match patterns like "- A:", "A.", "A)", "(A)"
    const match = line.match(/^[-*]?\s*(?:\(?([A-E])[.):]?\)?)\s*(.+)$/i);
    if (match) {
      options.push(match[2].trim());
    } else if (line.trim().startsWith('-') || line.trim().startsWith('*')) {
      // Simple bullet point
      options.push(line.replace(/^[-*]\s*/, '').trim());
    }
  }

  return options;
}

function parseAnswer(answerText: string): number {
  const match = answerText.match(/([A-E])/i);
  if (match) {
    return match[1].toUpperCase().charCodeAt(0) - 65; // A=0, B=1, etc.
  }
  return -1;
}

function parseTraps(trapsText: string): string[] {
  const lines = trapsText.split('\n').filter(line => line.trim());
  const traps: string[] = [];

  for (const line of lines) {
    const cleanLine = line.replace(/^[-*]\s*/, '').trim();
    if (cleanLine) {
      traps.push(cleanLine);
    }
  }

  // If no bullet points, try comma-separated
  if (traps.length === 0 && trapsText.includes(',')) {
    return trapsText.split(',').map(t => t.trim()).filter(Boolean);
  }

  return traps;
}

function parseTags(tagsValue: string): string[] {
  return tagsValue.split(',').map(t => t.trim()).filter(Boolean);
}

function parseSingleQuestion(content: string, index: number): ParsedQuestion {
  const errors: string[] = [];
  const warnings: string[] = [];

  const { frontmatter, body } = parseFrontmatter(content);

  // Validate section
  const section = frontmatter.section?.toLowerCase() as GMATSection;
  if (!section) {
    errors.push('Missing required field: section');
  } else if (!VALID_SECTIONS.includes(section)) {
    errors.push(`Invalid section: "${section}". Must be one of: ${VALID_SECTIONS.join(', ')}`);
  }

  // Validate type
  const type = frontmatter.type?.toLowerCase() as QuestionType;
  if (!type) {
    errors.push('Missing required field: type');
  } else if (section && VALID_TYPES[section] && !VALID_TYPES[section].includes(type)) {
    errors.push(`Invalid type "${type}" for section "${section}". Must be one of: ${VALID_TYPES[section].join(', ')}`);
  }

  // Validate difficulty
  const difficulty = frontmatter.difficulty?.toLowerCase() as 'easy' | 'medium' | 'hard';
  if (!difficulty) {
    warnings.push('Missing difficulty, defaulting to "medium"');
  } else if (!['easy', 'medium', 'hard'].includes(difficulty)) {
    errors.push(`Invalid difficulty: "${difficulty}". Must be easy, medium, or hard`);
  }

  // Parse target time
  let targetTime = parseInt(frontmatter.targetTime || frontmatter.targettime || '90', 10);
  if (isNaN(targetTime) || targetTime <= 0) {
    warnings.push('Invalid or missing targetTime, defaulting to 90 seconds');
    targetTime = 90;
  }

  // Parse tags
  const tags = frontmatter.tags ? parseTags(frontmatter.tags) : [];

  // Extract sections from body
  const questionText = extractSection(body, 'Question');
  const passageText = extractSection(body, 'Passage');
  const optionsText = extractSection(body, 'Options');
  const answerText = extractSection(body, 'Answer');
  const explanationText = extractSection(body, 'Explanation');
  const strategyText = extractSection(body, 'Strategy');
  const trapsText = extractSection(body, 'Traps');

  // Validate required sections
  if (!questionText) {
    errors.push('Missing required section: # Question');
  }

  if (!optionsText) {
    errors.push('Missing required section: # Options');
  }

  if (!answerText) {
    errors.push('Missing required section: # Answer');
  }

  // Parse options
  const options = optionsText ? parseOptions(optionsText) : [];
  if (options.length !== 5) {
    errors.push(`Expected 5 options (A-E), found ${options.length}`);
  }

  // Parse answer
  const correctAnswer = answerText ? parseAnswer(answerText) : -1;
  if (correctAnswer < 0 || correctAnswer > 4) {
    errors.push('Answer must be A, B, C, D, or E');
  }

  // Parse traps
  const commonTraps = trapsText ? parseTraps(trapsText) : undefined;

  // Build question object
  const question: Omit<Question, 'id'> = {
    section: section || 'quantitative',
    type: type || 'problem-solving',
    difficulty: difficulty || 'medium',
    question: questionText || '',
    passage: passageText || undefined,
    options: options.length === 5 ? options : ['', '', '', '', ''],
    correctAnswer: correctAnswer >= 0 ? correctAnswer : 0,
    explanation: explanationText || '',
    strategy: strategyText || '',
    commonTraps,
    targetTime,
    tags: tags.length > 0 ? tags : undefined,
  };

  return { question, errors, warnings };
}

export function parseMarkdown(markdown: string): ParseResult {
  const globalErrors: string[] = [];
  const questions: ParsedQuestion[] = [];

  if (!markdown.trim()) {
    return { success: false, questions: [], globalErrors: ['No content provided'] };
  }

  // Split by --- (horizontal rules) to get individual questions
  // But be careful not to split on frontmatter delimiters
  const blocks = markdown.split(/\n---\n(?=\s*---\s*\n)/);
  
  // If that didn't work, try simpler split
  let questionBlocks = blocks;
  if (blocks.length === 1 && !blocks[0].includes('# Question')) {
    globalErrors.push('No valid question blocks found. Make sure each question starts with frontmatter (---) and includes # Question section.');
    return { success: false, questions: [], globalErrors };
  }

  // Handle single question or multiple questions
  if (blocks.length === 1) {
    questionBlocks = [blocks[0]];
  }

  for (let i = 0; i < questionBlocks.length; i++) {
    const block = questionBlocks[i].trim();
    if (!block) continue;

    const parsed = parseSingleQuestion(block, i);
    questions.push(parsed);
  }

  const hasErrors = questions.some(q => q.errors.length > 0) || globalErrors.length > 0;

  return {
    success: !hasErrors,
    questions,
    globalErrors,
  };
}

export function generateMarkdownTemplate(section?: GMATSection, type?: QuestionType): string {
  const sectionValue = section || 'quantitative';
  const typeValue = type || 'problem-solving';
  const difficulty = 'medium';
  const targetTime = sectionValue === 'integrated-reasoning' ? 150 : 90;

  return `---
section: ${sectionValue}
type: ${typeValue}
difficulty: ${difficulty}
targetTime: ${targetTime}
tags: tag1, tag2
---

# Question
Your question text here.

# Passage
(Optional) For reading comprehension or multi-source reasoning questions.

# Options
- A: First option
- B: Second option
- C: Third option
- D: Fourth option
- E: Fifth option

# Answer
A

# Explanation
Detailed explanation of the correct answer and why other options are wrong.

# Strategy
General approach for solving this type of question.

# Traps
- Common mistake 1
- Common mistake 2
`;
}

export function questionToMarkdown(question: Question): string {
  const trapsSection = question.commonTraps?.length
    ? `\n# Traps\n${question.commonTraps.map(t => `- ${t}`).join('\n')}`
    : '';

  const passageSection = question.passage
    ? `\n# Passage\n${question.passage}\n`
    : '';

  return `---
section: ${question.section}
type: ${question.type}
difficulty: ${question.difficulty}
targetTime: ${question.targetTime}
${question.tags?.length ? `tags: ${question.tags.join(', ')}` : ''}
---

# Question
${question.question}
${passageSection}
# Options
${question.options.map((opt, i) => `- ${String.fromCharCode(65 + i)}: ${opt}`).join('\n')}

# Answer
${String.fromCharCode(65 + question.correctAnswer)}

# Explanation
${question.explanation}

# Strategy
${question.strategy}
${trapsSection}
`;
}
