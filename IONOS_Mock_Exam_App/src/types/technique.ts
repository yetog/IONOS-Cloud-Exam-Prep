import { IONOSSection, QuestionType } from './gmat';

// Technique/Strategy content for the Learn section
export interface Technique {
  id: string;
  section: IONOSSection;
  questionType: QuestionType;
  title: string;
  description: string;
  keyStrategies: Strategy[];
  commonTraps: TrapInfo[];
  timeManagement: string;
  exampleApproach: string;
}

export interface Strategy {
  title: string;
  description: string;
  steps?: string[];
}

export interface TrapInfo {
  name: string;
  description: string;
  howToAvoid: string;
}

// Technique data organized by question type
export const TECHNIQUES: Record<QuestionType, Technique> = {
  // Unit 1: Cloud Basics
  'problem-solving': {
    id: 'ps',
    section: 'unit1',
    questionType: 'problem-solving',
    title: 'Problem Solving',
    description: 'Standard multiple-choice math questions testing arithmetic, algebra, geometry, and word problems.',
    keyStrategies: [
      {
        title: 'Backsolving',
        description: 'Start with answer choice C and work backwards. If C is too large, try a smaller answer.',
        steps: [
          'Read the question and understand what you\'re solving for',
          'Start with answer choice C (middle value)',
          'Plug it into the problem',
          'If too high, try smaller; if too low, try larger'
        ]
      },
      {
        title: 'Picking Numbers',
        description: 'Substitute easy numbers for variables to test which answer works.',
        steps: [
          'Choose simple numbers (2, 3, 5, 10) for variables',
          'Calculate the result with your numbers',
          'Test each answer choice with the same numbers',
          'Only one answer should match'
        ]
      },
      {
        title: 'Estimation',
        description: 'Eliminate obviously wrong answers by approximating values.',
        steps: [
          'Round numbers to make calculations easier',
          'Get a ballpark answer',
          'Eliminate answers that are way off',
          'Calculate precisely only if needed'
        ]
      }
    ],
    commonTraps: [
      {
        name: 'Partial Answer',
        description: 'The answer to a sub-step of the problem, not the final answer',
        howToAvoid: 'Re-read what the question is asking before selecting'
      },
      {
        name: 'Sign Errors',
        description: 'Mixing up positive and negative numbers',
        howToAvoid: 'Write out all steps and double-check signs'
      },
      {
        name: 'Unit Confusion',
        description: 'Mixing up units (minutes vs hours, cents vs dollars)',
        howToAvoid: 'Convert all values to the same unit before calculating'
      }
    ],
    timeManagement: 'Target 2 minutes per question. If stuck after 2 minutes, make an educated guess and move on.',
    exampleApproach: 'Read the question twice, identify what type of math is needed, choose the most efficient strategy (calculate directly, backsolve, or pick numbers), and verify your answer makes sense.'
  },
  'data-sufficiency': {
    id: 'ds',
    section: 'unit1',
    questionType: 'data-sufficiency',
    title: 'Data Sufficiency',
    description: 'Determine whether given statements provide enough information to answer a question - unique to the GMAT.',
    keyStrategies: [
      {
        title: 'The AD/BCE Split',
        description: 'First evaluate Statement 1 alone, then branch based on sufficiency.',
        steps: [
          'Evaluate Statement 1 alone',
          'If sufficient → Answer is A or D (cross out B, C, E)',
          'If insufficient → Answer is B, C, or E (cross out A, D)',
          'Then evaluate Statement 2'
        ]
      },
      {
        title: 'Test Values',
        description: 'Plug in different values to check if you always get the same answer.',
        steps: [
          'Find values that satisfy the given statement(s)',
          'See if you always get YES or always get NO',
          'If you can get both YES and NO, the data is insufficient'
        ]
      },
      {
        title: 'Remember: You Don\'t Need to Solve',
        description: 'You only need to determine IF you COULD solve, not actually solve it.',
        steps: [
          'Count equations vs unknowns',
          'Check if all necessary info is provided',
          'Don\'t waste time calculating the actual answer'
        ]
      }
    ],
    commonTraps: [
      {
        name: 'Overthinking Sufficiency',
        description: 'Actually solving when you only need to determine if you could solve',
        howToAvoid: 'Stop once you know you have enough info'
      },
      {
        name: 'Forgetting Hidden Info',
        description: 'Missing implicit constraints (like positive integers, or geometric rules)',
        howToAvoid: 'Note all constraints from the question stem'
      },
      {
        name: 'Statement Contamination',
        description: 'Using info from Statement 1 when evaluating Statement 2 alone',
        howToAvoid: 'Cover one statement while evaluating the other'
      }
    ],
    timeManagement: 'Target 2 minutes. The AD/BCE split saves time by eliminating answer choices systematically.',
    exampleApproach: 'Read the question stem and understand exactly what\'s being asked. Use the AD/BCE elimination. Test values when unsure. Remember you\'re testing sufficiency, not solving.'
  },
  // Unit 2: Core Services
  'reading-comprehension': {
    id: 'rc',
    section: 'unit2',
    questionType: 'reading-comprehension',
    title: 'Reading Comprehension',
    description: 'Analyze passages and answer questions about main idea, details, inferences, and author\'s purpose.',
    keyStrategies: [
      {
        title: 'Active Reading',
        description: 'Read for structure and main ideas, not details.',
        steps: [
          'Read the first paragraph carefully for main idea',
          'Note the purpose of each paragraph (1-2 words)',
          'Identify the author\'s tone and opinion',
          'Spend 3-4 minutes on initial reading'
        ]
      },
      {
        title: 'Passage Mapping',
        description: 'Create a mental map of where information is located.',
        steps: [
          'Note what each paragraph discusses',
          'Mark key transitions and contrasts',
          'Identify examples and evidence locations',
          'Return to passage to verify answers'
        ]
      },
      {
        title: 'Answer the Question Asked',
        description: 'Match the question type to your reading strategy.',
        steps: [
          'Main idea → Use overall understanding',
          'Detail → Return to specific paragraph',
          'Inference → Find evidence then extend slightly',
          'Author\'s tone → Consider word choices'
        ]
      }
    ],
    commonTraps: [
      {
        name: 'Too Extreme',
        description: 'Answers using words like "always," "never," "all," "none"',
        howToAvoid: 'GMAT RC answers are usually moderate and qualified'
      },
      {
        name: 'True but Not Relevant',
        description: 'Statement is true but doesn\'t answer the question',
        howToAvoid: 'Match the answer specifically to what\'s asked'
      },
      {
        name: 'Outside Knowledge',
        description: 'Using information not in the passage',
        howToAvoid: 'All answers must be supported by passage text'
      }
    ],
    timeManagement: '3-4 minutes reading, 1-1.5 minutes per question. Total 6-8 minutes per passage set.',
    exampleApproach: 'Read actively for structure. Identify the main argument. Note paragraph purposes. Answer questions by returning to relevant sections and verifying with text.'
  },
  'critical-reasoning': {
    id: 'cr',
    section: 'unit2',
    questionType: 'critical-reasoning',
    title: 'Critical Reasoning',
    description: 'Analyze arguments by identifying conclusions, premises, assumptions, and logical relationships.',
    keyStrategies: [
      {
        title: 'Identify the Conclusion',
        description: 'Always find the main point the argument is trying to make.',
        steps: [
          'Look for conclusion keywords: therefore, thus, so, hence',
          'The conclusion is what the author wants you to believe',
          'Underline or note the conclusion mentally',
          'Everything else is evidence/premise'
        ]
      },
      {
        title: 'Find the Gap',
        description: 'Identify what the argument assumes but doesn\'t state.',
        steps: [
          'What connects the evidence to the conclusion?',
          'What must be true for the conclusion to follow?',
          'This unstated link is the assumption',
          'Strengthen/weaken questions target this gap'
        ]
      },
      {
        title: 'Predict Before Looking',
        description: 'Anticipate the answer before reading choices.',
        steps: [
          'After understanding the argument, predict the answer type',
          'For strengthen: what would make the conclusion more likely?',
          'For weaken: what would make the conclusion less likely?',
          'Match your prediction to the choices'
        ]
      }
    ],
    commonTraps: [
      {
        name: 'Out of Scope',
        description: 'Answer discusses something not related to the argument',
        howToAvoid: 'Connect answer directly to the conclusion'
      },
      {
        name: 'Opposite Effect',
        description: 'Answer strengthens when you need to weaken (or vice versa)',
        howToAvoid: 'Re-read the question to confirm what\'s needed'
      },
      {
        name: 'Irrelevant Comparison',
        description: 'Introduces comparison the argument doesn\'t make',
        howToAvoid: 'Stick to what the argument actually claims'
      }
    ],
    timeManagement: '2 minutes per question. Spend 60-90 seconds understanding, 30-60 seconds on answers.',
    exampleApproach: 'Find the conclusion. Identify premises. Locate the gap/assumption. Predict the answer type. Eliminate wrong answers systematically.'
  },
  'sentence-correction': {
    id: 'sc',
    section: 'unit2',
    questionType: 'sentence-correction',
    title: 'Sentence Correction',
    description: 'Choose the most grammatically correct and clear version of a sentence.',
    keyStrategies: [
      {
        title: 'Identify the Decision Points',
        description: 'Compare answer choices to find what\'s being tested.',
        steps: [
          'Scan all five answers vertically',
          'Note differences between choices',
          'These differences reveal the tested rules',
          'Focus on one decision point at a time'
        ]
      },
      {
        title: 'Start with the Original',
        description: 'Read choice A carefully to spot the potential error.',
        steps: [
          'If A sounds perfect, it might be correct',
          'If something sounds off, identify what rule is violated',
          'Eliminate choices with the same error',
          'Choice A is correct about 20% of the time'
        ]
      },
      {
        title: 'Use Split Elimination',
        description: 'Divide choices by grammatical feature to eliminate efficiently.',
        steps: [
          'Find a decision point (e.g., verb tense)',
          'Eliminate all choices with wrong usage',
          'Move to next decision point',
          'Repeat until one answer remains'
        ]
      }
    ],
    commonTraps: [
      {
        name: 'Sounds Good But Is Wrong',
        description: 'Common usage that violates grammar rules',
        howToAvoid: 'Trust the rules, not your ear'
      },
      {
        name: 'Conciseness Over Clarity',
        description: 'Shortest answer isn\'t always best if meaning changes',
        howToAvoid: 'Prioritize correctness and clarity over brevity'
      },
      {
        name: 'Missing the Modifier',
        description: 'Dangling or misplaced modifiers',
        howToAvoid: 'Check who/what the modifier describes'
      }
    ],
    timeManagement: '1-1.5 minutes per question. These should be among your fastest Unit 2: Core Services questions.',
    exampleApproach: 'Read the original. Identify what\'s being tested by comparing choices. Eliminate based on grammar rules. Verify the remaining answer is clear and logical.'
  },
  // Unit 3: Management
  'multi-source-reasoning': {
    id: 'msr',
    section: 'unit3',
    questionType: 'multi-source-reasoning',
    title: 'Multi-Source Reasoning',
    description: 'Analyze information from multiple tabs (emails, reports, articles) to answer questions.',
    keyStrategies: [
      {
        title: 'Survey All Sources First',
        description: 'Quickly understand what each tab contains before answering.',
        steps: [
          'Click through each tab (30 seconds)',
          'Note what type of info each contains',
          'Look for contradictions or connections',
          'Return to specific tabs as needed'
        ]
      },
      {
        title: 'Match Question to Source',
        description: 'Identify which tab(s) contain relevant information.',
        steps: [
          'Read the question carefully',
          'Determine what type of info you need',
          'Go directly to the relevant tab',
          'Cross-reference if needed'
        ]
      }
    ],
    commonTraps: [
      {
        name: 'Incomplete Analysis',
        description: 'Missing information in one of the tabs',
        howToAvoid: 'Check all potentially relevant sources'
      },
      {
        name: 'Conflicting Info',
        description: 'Sources may intentionally contradict',
        howToAvoid: 'Note which source is more authoritative or recent'
      }
    ],
    timeManagement: '2-3 minutes for the set. Read efficiently; you can always go back.',
    exampleApproach: 'Quick survey of all tabs. Read question. Find relevant source(s). Verify answer is supported by the text.'
  },
  'graphics-interpretation': {
    id: 'gi',
    section: 'unit3',
    questionType: 'graphics-interpretation',
    title: 'Graphics Interpretation',
    description: 'Analyze graphs, charts, and visual data displays to complete statements.',
    keyStrategies: [
      {
        title: 'Read the Graph Components',
        description: 'Understand axes, legends, and units before answering.',
        steps: [
          'Check x-axis and y-axis labels',
          'Note the scale and units',
          'Understand what each element represents',
          'Look for trends and outliers'
        ]
      },
      {
        title: 'Use Dropdowns Strategically',
        description: 'The dropdown options often hint at what to look for.',
        steps: [
          'Read all dropdown options first',
          'Identify what calculation or comparison is needed',
          'Find the relevant data points',
          'Select the matching option'
        ]
      }
    ],
    commonTraps: [
      {
        name: 'Misreading Scale',
        description: 'Not noticing non-zero starting points or log scales',
        howToAvoid: 'Always check the axis labels carefully'
      },
      {
        name: 'Correlation vs Causation',
        description: 'Assuming relationship implies causation',
        howToAvoid: 'Stick to what the data actually shows'
      }
    ],
    timeManagement: '2-2.5 minutes per set. Accuracy matters more than speed on IR.',
    exampleApproach: 'Understand the graph structure. Read dropdown options. Find relevant data. Make calculation if needed. Verify selection.'
  },
  'two-part-analysis': {
    id: 'tpa',
    section: 'unit3',
    questionType: 'two-part-analysis',
    title: 'Two-Part Analysis',
    description: 'Select two answers that together satisfy the requirements of the problem.',
    keyStrategies: [
      {
        title: 'Identify the Relationship',
        description: 'Understand how the two parts relate to each other.',
        steps: [
          'Read what each column represents',
          'Determine if parts are independent or linked',
          'Note any constraints (e.g., sum equals X)',
          'Solve the easier part first'
        ]
      },
      {
        title: 'Test Systematically',
        description: 'Work through possibilities methodically.',
        steps: [
          'Start with constraints or equations',
          'Try different combinations',
          'Check that both conditions are satisfied',
          'Verify the relationship holds'
        ]
      }
    ],
    commonTraps: [
      {
        name: 'Solving Only One Part',
        description: 'Getting one answer right but wrong on the other',
        howToAvoid: 'Always verify both parts work together'
      },
      {
        name: 'Missing the Connection',
        description: 'Treating parts as independent when they\'re linked',
        howToAvoid: 'Re-read to understand the relationship'
      }
    ],
    timeManagement: '2-3 minutes. These can be quant or Unit 2: Core Services in nature.',
    exampleApproach: 'Understand what each column asks. Find the relationship between parts. Solve systematically. Verify both answers work together.'
  },
  'table-analysis': {
    id: 'ta',
    section: 'unit3',
    questionType: 'table-analysis',
    title: 'Table Analysis',
    description: 'Sort and analyze data tables to determine if statements are true or false.',
    keyStrategies: [
      {
        title: 'Use the Sort Function',
        description: 'Sort by relevant columns to answer each question.',
        steps: [
          'Read the statement to determine what to check',
          'Sort by the relevant column',
          'Find the data needed to verify',
          'Make your yes/no determination'
        ]
      },
      {
        title: 'Read Statements Carefully',
        description: 'Pay attention to qualifier words.',
        steps: [
          'Note: all, some, none, at least, at most',
          'Understand exactly what\'s being claimed',
          'Find data to prove or disprove',
          'One counterexample = statement is false'
        ]
      }
    ],
    commonTraps: [
      {
        name: 'Overlooking Edge Cases',
        description: 'Missing the one row that contradicts the statement',
        howToAvoid: 'Sort and scan thoroughly'
      },
      {
        name: 'Confusing Percentages',
        description: 'Mixing up "of" and "more than"',
        howToAvoid: 'Calculate precisely, don\'t estimate'
      }
    ],
    timeManagement: '2-3 minutes per set. Use sorting to find data quickly.',
    exampleApproach: 'Read the statement. Identify what to verify. Sort by relevant column. Find confirming or contradicting data. Answer yes/no.'
  }
};

// Passage Types for Reading Comprehension
export interface PassageType {
  name: string;
  description: string;
  approach: string;
}

export const PASSAGE_TYPES: PassageType[] = [
  {
    name: 'Natural Science',
    description: 'Topics from biology, chemistry, physics, or earth sciences. Usually objective and informative in tone.',
    approach: 'Focus on understanding the main phenomenon or study being described. Note cause-and-effect relationships and experimental results.',
  },
  {
    name: 'Social Science',
    description: 'Topics from psychology, sociology, economics, or history. May include persuasive arguments or multiple viewpoints.',
    approach: 'Identify the author\'s position if present. Note any debates or contrasting theories discussed.',
  },
  {
    name: 'Business',
    description: 'Topics about markets, management, or organizational behavior. Often includes case studies or trends.',
    approach: 'The topic may seem familiar, but DON\'T use outside knowledge. Answer based solely on passage content.',
  },
  {
    name: 'Humanities',
    description: 'Topics from art, literature, philosophy, or cultural criticism. May analyze works or ideas.',
    approach: 'Pay close attention to the author\'s tone and evaluation. Note any shifts in perspective.',
  },
];

// Question Categories for Reading Comprehension
export interface RCQuestionType {
  name: string;
  description: string;
  strategy: string;
}

export const RC_QUESTION_TYPES: RCQuestionType[] = [
  {
    name: 'Main Idea / Primary Purpose',
    description: 'Asks what the passage is mainly about or why the author wrote it.',
    strategy: 'Look at the first and last paragraphs. The answer should cover the whole passage, not just one part.',
  },
  {
    name: 'Detail / Specific Information',
    description: 'Asks about specific facts or claims stated in the passage.',
    strategy: 'Return to the relevant paragraph. The correct answer will paraphrase—not copy—the passage text.',
  },
  {
    name: 'Inference',
    description: 'Asks what can be concluded or inferred from the passage.',
    strategy: 'Find direct textual evidence, then extend it slightly. The inference should be strongly supported, not a leap.',
  },
  {
    name: 'Logic / Structure',
    description: 'Asks about how the passage is organized or why certain information is included.',
    strategy: 'Think about paragraph purposes. Why did the author include that example or transition?',
  },
  {
    name: 'Author\'s Tone / Attitude',
    description: 'Asks how the author feels about the subject.',
    strategy: 'Look at word choices throughout. Is the tone neutral, critical, enthusiastic, skeptical? Avoid extreme answers.',
  },
];

