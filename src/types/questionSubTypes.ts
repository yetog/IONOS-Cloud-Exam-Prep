// Sub-type definitions for detailed question categorization
// Each sub-type includes identification cues and solution frameworks

export interface QuestionSubType {
  id: string;
  name: string;
  description: string;
  identificationCues: string[];
  solutionFramework: string[];
  exampleStem?: string;
  timeTarget: number; // seconds
}

// ========== PROBLEM SOLVING SUB-TYPES ==========
export const PS_SUB_TYPES: QuestionSubType[] = [
  {
    id: 'ps-number-properties',
    name: 'Number Properties',
    description: 'Questions about divisibility, primes, factors, remainders, odd/even, positive/negative.',
    identificationCues: [
      'Keywords: "divisible by", "remainder", "integer", "factor", "multiple"',
      'Asks about properties (odd, even, positive, negative, prime)',
      'Often includes constraints like "n is a positive integer"',
    ],
    solutionFramework: [
      'Test small values that fit the constraints',
      'Use divisibility rules (e.g., divisible by 6 = divisible by 2 AND 3)',
      'Remember: 0 is even, 1 is not prime, negative numbers exist',
      'For remainders, use the formula: Dividend = Quotient × Divisor + Remainder',
    ],
    exampleStem: 'If n is a positive integer and n² is divisible by 72, what is the smallest possible value of n?',
    timeTarget: 120,
  },
  {
    id: 'ps-rate-work',
    name: 'Rate & Work Problems',
    description: 'Questions involving speed, time, distance, or work rate (tasks completed per time unit).',
    identificationCues: [
      'Keywords: "rate", "speed", "per hour", "working together", "how long"',
      'Involves travel, machines, or people completing tasks',
      'Often asks about combined rates or meeting times',
    ],
    solutionFramework: [
      'Use core formula: Work = Rate × Time (or Distance = Speed × Time)',
      'For combined work: Add rates, not times (1/A + 1/B = 1/Total)',
      'For round trips: Use harmonic mean = 2ab/(a+b)',
      'Set up a table: Entity | Rate | Time | Work/Distance',
    ],
    exampleStem: 'Machine A can complete a job in 6 hours. Machine B can complete the same job in 4 hours. How long will it take both machines working together?',
    timeTarget: 120,
  },
  {
    id: 'ps-percentage-ratio',
    name: 'Percentages & Ratios',
    description: 'Questions about percent change, ratios, proportions, and mixture problems.',
    identificationCues: [
      'Keywords: "percent", "ratio", "proportion", "increase by", "decrease by"',
      'Comparing quantities or finding percent change',
      'Mixture problems with different concentrations',
    ],
    solutionFramework: [
      'Percent change: New = Original × (1 + change) or (1 - change)',
      'Successive changes: Multiply multipliers (never add percentages)',
      'Ratios: Set up as fractions, cross-multiply to solve',
      'Mixtures: Track each component separately',
    ],
    exampleStem: 'A price is increased by 20%, then decreased by 20%. What is the net percent change?',
    timeTarget: 90,
  },
  {
    id: 'ps-algebra',
    name: 'Algebraic Equations',
    description: 'Solving equations, systems, quadratics, and problems with variables in answer choices.',
    identificationCues: [
      'Variables in the question AND answer choices',
      'Keywords: "solve for", "find the value of", "in terms of"',
      'System of equations (two or more equations)',
    ],
    solutionFramework: [
      'If variables in answers: Pick smart numbers (2, 3, 5, 10)',
      'For systems: Substitution or elimination',
      'Quadratics: Factor or use quadratic formula',
      'Check answer by plugging back into original',
    ],
    exampleStem: 'If 2x + 3y = 12 and x - y = 1, what is the value of x?',
    timeTarget: 90,
  },
  {
    id: 'ps-geometry',
    name: 'Geometry',
    description: 'Problems involving shapes, angles, areas, volumes, and coordinate geometry.',
    identificationCues: [
      'Keywords: "area", "perimeter", "angle", "triangle", "circle", "coordinate"',
      'Diagram provided or described',
      'Asks about lengths, areas, or relationships between figures',
    ],
    solutionFramework: [
      'Draw or annotate the diagram',
      'List all formulas that might apply',
      'Look for special triangles (30-60-90, 45-45-90, 3-4-5)',
      'For coordinate geometry: Use distance, midpoint, slope formulas',
    ],
    exampleStem: 'A circle with center O has radius 5. If chord AB has length 8, what is the distance from O to AB?',
    timeTarget: 120,
  },
  {
    id: 'ps-probability-counting',
    name: 'Probability & Counting',
    description: 'Problems involving probability calculations, permutations, and combinations.',
    identificationCues: [
      'Keywords: "probability", "how many ways", "arrangements", "combinations"',
      'Asks about likelihood or counting possibilities',
      'Involves selection or ordering',
    ],
    solutionFramework: [
      'Probability = Favorable outcomes / Total outcomes',
      'Use P(A and B) = P(A) × P(B) for independent events',
      'Permutations (order matters): n!/(n-r)!',
      'Combinations (order doesn\'t matter): n!/[r!(n-r)!]',
    ],
    exampleStem: 'A bag contains 4 red and 6 blue marbles. If 2 marbles are drawn at random, what is the probability both are red?',
    timeTarget: 120,
  },
  {
    id: 'ps-word-problems',
    name: 'Word Problems (Translation)',
    description: 'Story-based problems requiring translation from English to mathematical equations.',
    identificationCues: [
      'Long problem stem with a real-world scenario',
      'Requires setting up equations from the description',
      'May involve age, money, or other practical contexts',
    ],
    solutionFramework: [
      'Define variables clearly (let x = ...)',
      'Translate key phrases: "is" = "=", "of" = "×", "more than" = "+"',
      'Set up equation(s) from the relationships described',
      'Check if your answer makes sense in context',
    ],
    exampleStem: 'John is 3 years older than twice Mary\'s age. If the sum of their ages is 24, how old is Mary?',
    timeTarget: 120,
  },
];

// ========== DATA SUFFICIENCY SUB-TYPES ==========
export const DS_SUB_TYPES: QuestionSubType[] = [
  {
    id: 'ds-value',
    name: 'Value Questions',
    description: 'Questions asking for a specific numeric value. You need EXACTLY ONE value.',
    identificationCues: [
      'Keywords: "What is the value of...?", "Find x", "How many...?"',
      'Asks for a single number, not a yes/no',
      'Answer must be unique (not a range)',
    ],
    solutionFramework: [
      'You need ONE and ONLY ONE value',
      'Two possible values = insufficient (e.g., x = 3 or x = -3)',
      'Count equations vs unknowns',
      'Don\'t actually solve—just confirm you COULD solve',
    ],
    exampleStem: 'What is the value of x?',
    timeTarget: 120,
  },
  {
    id: 'ds-yes-no',
    name: 'Yes/No Questions',
    description: 'Questions with yes/no answers. Sufficient = ALWAYS yes OR ALWAYS no.',
    identificationCues: [
      'Keywords: "Is...?", "Does...?", "Are...?"',
      'Answer is either "definitely yes" or "definitely no"',
      'Testing a condition or property',
    ],
    solutionFramework: [
      'Find cases that give YES and cases that give NO',
      'If you can get BOTH outcomes → insufficient',
      'If you ALWAYS get the same answer → sufficient',
      'Test edge cases: 0, 1, -1, fractions, large numbers',
    ],
    exampleStem: 'Is x > 0?',
    timeTarget: 120,
  },
  {
    id: 'ds-number-properties',
    name: 'Number Properties DS',
    description: 'DS questions about divisibility, primes, integers, odd/even.',
    identificationCues: [
      'Asks about integer properties',
      'Keywords: "Is n divisible by...?", "Is x an integer?"',
      'Often involves hidden constraints',
    ],
    solutionFramework: [
      'Test edge cases: 0, negative numbers, non-integers, 1',
      'Check if the question stem gives implicit constraints',
      'For divisibility: test numbers that barely satisfy vs don\'t',
      'Remember: properties of integers differ from real numbers',
    ],
    exampleStem: 'Is the integer n divisible by 6?',
    timeTarget: 120,
  },
  {
    id: 'ds-geometry',
    name: 'Geometry DS',
    description: 'DS questions about geometric figures, areas, lengths, angles.',
    identificationCues: [
      'Involves shapes, angles, or coordinate geometry',
      'Asks for area, perimeter, or dimension',
      'May or may not include a figure',
    ],
    solutionFramework: [
      'List what you need to know to answer (all dimensions? all angles?)',
      'Check if statements give redundant vs new information',
      'Remember geometric relationships (e.g., isosceles, parallel lines)',
      'Hidden info: straight angles = 180°, triangle angles sum to 180°',
    ],
    exampleStem: 'What is the area of triangle ABC?',
    timeTarget: 120,
  },
  {
    id: 'ds-algebra',
    name: 'Algebra DS',
    description: 'DS questions involving equations, inequalities, or expressions.',
    identificationCues: [
      'Contains algebraic expressions',
      'Asks about solving or comparing expressions',
      'May involve systems of equations',
    ],
    solutionFramework: [
      'For value questions: count equations vs unknowns',
      'Combine statements algebraically when needed',
      'Watch for hidden equations (e.g., "x is positive" gives x > 0)',
      'Check if statements are the same equation in disguise',
    ],
    exampleStem: 'What is the value of a + b?',
    timeTarget: 120,
  },
];

// ========== CRITICAL REASONING SUB-TYPES ==========
export const CR_SUB_TYPES: QuestionSubType[] = [
  {
    id: 'cr-weaken',
    name: 'Weaken',
    description: 'Find the answer that makes the conclusion LESS likely to be true.',
    identificationCues: [
      'Keywords: "weakens", "undermines", "casts doubt", "calls into question"',
      'Asks what would hurt the argument',
    ],
    solutionFramework: [
      'Identify the conclusion first',
      'Find the gap between evidence and conclusion',
      'Look for: alternative explanations, reversed causation, missing evidence',
      'The answer attacks the ASSUMPTION, not the evidence',
    ],
    exampleStem: 'Which of the following, if true, most seriously weakens the argument?',
    timeTarget: 120,
  },
  {
    id: 'cr-strengthen',
    name: 'Strengthen',
    description: 'Find the answer that makes the conclusion MORE likely to be true.',
    identificationCues: [
      'Keywords: "strengthens", "supports", "justifies"',
      'Asks what would help the argument',
    ],
    solutionFramework: [
      'Identify conclusion and evidence',
      'Find the assumption (the gap)',
      'Look for: confirming evidence, ruling out alternatives, supporting the link',
      'Answer should make the conclusion follow more logically',
    ],
    exampleStem: 'Which of the following, if true, most strongly supports the conclusion?',
    timeTarget: 120,
  },
  {
    id: 'cr-assumption',
    name: 'Assumption',
    description: 'Find what the argument MUST assume (unstated premise required for conclusion).',
    identificationCues: [
      'Keywords: "assumes", "depends on", "presupposes"',
      'Asks what must be true for the argument to work',
    ],
    solutionFramework: [
      'Use the NEGATION TEST: Negate the answer choice',
      'If negating destroys the argument → it\'s a necessary assumption',
      'Assumptions are UNSTATED but REQUIRED',
      'Don\'t confuse with what merely helps the argument',
    ],
    exampleStem: 'The argument above assumes which of the following?',
    timeTarget: 150,
  },
  {
    id: 'cr-inference',
    name: 'Inference / Must Be True',
    description: 'Find what MUST be true based on the passage (not an opinion or leap).',
    identificationCues: [
      'Keywords: "properly inferred", "must be true", "logically follows"',
      'Asks what the passage proves or implies',
    ],
    solutionFramework: [
      'Stay CLOSE to the text—no leaps',
      'The answer must follow directly from given information',
      'Eliminate answers that go beyond the passage',
      'Extreme words ("always", "never") are usually wrong',
    ],
    exampleStem: 'If the statements above are true, which of the following must also be true?',
    timeTarget: 120,
  },
  {
    id: 'cr-evaluate',
    name: 'Evaluate',
    description: 'Find what information would help DETERMINE if the conclusion is valid.',
    identificationCues: [
      'Keywords: "most useful to evaluate", "helps determine"',
      'Asks what additional info would be relevant',
    ],
    solutionFramework: [
      'Good evaluate answer: If YES = strengthens, if NO = weakens (or vice versa)',
      'The answer should resolve uncertainty, not just add information',
      'Think: "Knowing this would change my assessment"',
    ],
    exampleStem: 'Which of the following would be most useful to know in evaluating the argument?',
    timeTarget: 120,
  },
  {
    id: 'cr-flaw',
    name: 'Flaw / Error in Reasoning',
    description: 'Identify the logical error or fallacy in the argument.',
    identificationCues: [
      'Keywords: "flaw", "error in reasoning", "vulnerable to criticism"',
      'Argument contains a clear logical mistake',
    ],
    solutionFramework: [
      'Common flaws: correlation ≠ causation, unrepresentative sample, false dichotomy',
      'Look for: assuming without evidence, circular reasoning, attacking the person',
      'The answer describes WHAT went wrong in the logic',
      'Eliminate answers that describe problems not in this argument',
    ],
    exampleStem: 'The reasoning in the argument is flawed because it...',
    timeTarget: 120,
  },
  {
    id: 'cr-explain',
    name: 'Explain / Paradox',
    description: 'Find what resolves an apparent contradiction or explains a surprising result.',
    identificationCues: [
      'Keywords: "explains", "accounts for", "resolves the paradox"',
      'Passage presents two seemingly contradictory facts',
    ],
    solutionFramework: [
      'Identify both parts of the paradox',
      'Look for an answer that makes BOTH facts possible',
      'Don\'t just strengthen one side—explain how both can coexist',
    ],
    exampleStem: 'Which of the following, if true, most helps explain the discrepancy?',
    timeTarget: 120,
  },
];

// ========== SENTENCE CORRECTION SUB-TYPES ==========
export const SC_SUB_TYPES: QuestionSubType[] = [
  {
    id: 'sc-subject-verb',
    name: 'Subject-Verb Agreement',
    description: 'The verb must match the subject in number (singular/plural).',
    identificationCues: [
      'Long phrase between subject and verb',
      'Collective nouns (team, committee, group)',
      'Compound subjects or "either...or" structures',
    ],
    solutionFramework: [
      'Find the TRUE subject (ignore prepositional phrases)',
      'Collective nouns are usually SINGULAR in IONOS Cloud',
      'Neither...nor / Either...or: Verb agrees with CLOSER subject',
      '"Number of" = plural, "A number of" = singular',
    ],
    exampleStem: 'The group of scientists have/has discovered...',
    timeTarget: 75,
  },
  {
    id: 'sc-pronouns',
    name: 'Pronoun Reference & Agreement',
    description: 'Pronouns must clearly refer to a single noun and agree in number.',
    identificationCues: [
      'Pronouns: it, they, their, its, this, which',
      'Unclear what the pronoun refers to',
      'Pronoun doesn\'t match the noun in number',
    ],
    solutionFramework: [
      'Identify what each pronoun refers to',
      'Pronoun must have a clear, unambiguous antecedent',
      '"They" is plural, "it" is singular',
      'Avoid "this" or "which" with unclear reference',
    ],
    exampleStem: 'The company raised its/their prices...',
    timeTarget: 75,
  },
  {
    id: 'sc-modifiers',
    name: 'Modifiers (Misplaced & Dangling)',
    description: 'Modifiers must be placed next to what they modify.',
    identificationCues: [
      'Sentence begins with a descriptive phrase',
      'Introductory phrase with -ing or -ed',
      'Modifier seems to describe the wrong thing',
    ],
    solutionFramework: [
      'Opening modifier → subject must be what\'s modified',
      '"Having done X, [subject] did Y" — subject must have done X',
      'Place modifiers NEXT to what they describe',
      'If the subject doesn\'t logically do the action, it\'s dangling',
    ],
    exampleStem: 'Walking through the park, the birds sang beautifully. (Who\'s walking?)',
    timeTarget: 75,
  },
  {
    id: 'sc-parallelism',
    name: 'Parallelism',
    description: 'Items in a list or comparison must have the same grammatical structure.',
    identificationCues: [
      'Lists of actions or items',
      'Comparisons with "than" or "as"',
      'Keywords: "both...and", "not only...but also", "either...or"',
    ],
    solutionFramework: [
      'All list items same form: noun-noun-noun OR verb-verb-verb',
      'Comparisons: compare like with like (apples to apples)',
      'Match structure after correlative pairs',
    ],
    exampleStem: 'The CEO likes to golf, to swim, and running. (Fix: to run)',
    timeTarget: 75,
  },
  {
    id: 'sc-verb-tense',
    name: 'Verb Tense & Mood',
    description: 'Verbs must use correct and consistent tenses.',
    identificationCues: [
      'Multiple verbs with different tenses',
      'Time markers: "since", "before", "after", "by the time"',
      'Hypothetical statements ("if...would")',
    ],
    solutionFramework: [
      'Keep tenses consistent unless time actually shifts',
      '"Since" requires present perfect or past perfect',
      'Hypothetical: "If + past tense...would + base verb"',
      'Future perfect: "will have" for action before a future time',
    ],
    exampleStem: 'By next year, the project will be completed / will have been completed.',
    timeTarget: 75,
  },
  {
    id: 'sc-idioms',
    name: 'Idioms & Word Choice',
    description: 'Correct usage of prepositional phrases and standard expressions.',
    identificationCues: [
      'Preposition choices: "of", "to", "from", "with"',
      'Common expressions that might be wrong',
      'Wordy or awkward phrasing',
    ],
    solutionFramework: [
      'Know common idioms: "regard as", "consider [no as]", "between X and Y"',
      '"Different from" (not "than"), "Compare to" vs "Compare with"',
      'Choose concise over wordy',
      'Trust that the right answer sounds professional, not conversational',
    ],
    exampleStem: 'The results are different than/from what we expected.',
    timeTarget: 75,
  },
];

// ========== READING COMPREHENSION SUB-TYPES ==========
export const RC_SUB_TYPES: QuestionSubType[] = [
  {
    id: 'rc-main-idea',
    name: 'Main Idea / Primary Purpose',
    description: 'What is the passage mainly about? Why did the author write it?',
    identificationCues: [
      'Keywords: "primarily concerned with", "main idea", "best title", "author\'s purpose"',
      'Asks about the passage as a whole',
    ],
    solutionFramework: [
      'Check first and last paragraphs—the "frame"',
      'Answer should cover WHOLE passage, not just one paragraph',
      'Too narrow = wrong; too broad = wrong',
      'Match the author\'s actual intent',
    ],
    exampleStem: 'The passage is primarily concerned with...',
    timeTarget: 90,
  },
  {
    id: 'rc-detail',
    name: 'Detail / Specific Information',
    description: 'What does the passage specifically state about X?',
    identificationCues: [
      'Keywords: "according to the passage", "the passage states", "mentioned"',
      'Asks about specific facts or claims',
    ],
    solutionFramework: [
      'Return to the relevant paragraph',
      'Correct answer will PARAPHRASE, not copy exactly',
      'Don\'t use outside knowledge—only what\'s in the text',
      'Eliminate answers not supported by specific text',
    ],
    exampleStem: 'According to the passage, which of the following is true about...?',
    timeTarget: 90,
  },
  {
    id: 'rc-inference',
    name: 'Inference',
    description: 'What can be reasonably concluded from the passage?',
    identificationCues: [
      'Keywords: "implies", "suggests", "can be inferred", "most likely"',
      'Asks what follows from the information given',
    ],
    solutionFramework: [
      'Find textual EVIDENCE for the inference',
      'The inference should be a small step, not a leap',
      'Eliminate answers that go too far or aren\'t supported',
      '"Must be true" standard—not just "could be true"',
    ],
    exampleStem: 'It can be inferred from the passage that...',
    timeTarget: 120,
  },
  {
    id: 'rc-structure',
    name: 'Structure / Organization',
    description: 'How is the passage organized? Why is a section included?',
    identificationCues: [
      'Keywords: "organization", "structure", "function", "serves to"',
      'Asks about paragraph purpose or author\'s method',
    ],
    solutionFramework: [
      'Map paragraph purposes: introduce, contrast, support, conclude',
      'Note transitions: "however", "furthermore", "in contrast"',
      'Why did the author include that example or quote?',
    ],
    exampleStem: 'The third paragraph serves primarily to...',
    timeTarget: 90,
  },
  {
    id: 'rc-tone',
    name: 'Author\'s Tone / Attitude',
    description: 'How does the author feel about the subject?',
    identificationCues: [
      'Keywords: "author\'s attitude", "tone", "would most likely agree"',
      'Asks about the author\'s opinion or view',
    ],
    solutionFramework: [
      'Look at word choices throughout—positive, negative, neutral?',
      'Common tones: objective, critical, enthusiastic, skeptical, cautious',
      'Avoid EXTREME answers—exam authors are usually balanced',
      'Note qualifiers: "somewhat", "arguably", "perhaps"',
    ],
    exampleStem: 'The author\'s attitude toward the theory can best be described as...',
    timeTarget: 90,
  },
];

// ========== Unit 3: Management SUB-TYPES ==========
export const IR_GRAPHICS_SUB_TYPES: QuestionSubType[] = [
  {
    id: 'ir-gi-bar-line',
    name: 'Bar & Line Charts',
    description: 'Interpreting trends and values from bar graphs and line charts.',
    identificationCues: [
      'Visual display with bars or connected points',
      'Shows change over time or comparison across categories',
    ],
    solutionFramework: [
      'Check axis labels and scales first',
      'Note if scale starts at zero (if not, be careful about proportions)',
      'For trends: look at slope direction and steepness',
      'Read dropdown options BEFORE looking for data',
    ],
    timeTarget: 120,
  },
  {
    id: 'ir-gi-scatter',
    name: 'Scatter Plots',
    description: 'Analyzing relationships and correlations between two variables.',
    identificationCues: [
      'Points scattered on a coordinate plane',
      'Looking for patterns, trends, or outliers',
    ],
    solutionFramework: [
      'Identify if there\'s a positive, negative, or no correlation',
      'Look for the general trend line',
      'Note outliers that don\'t fit the pattern',
      'Correlation ≠ causation',
    ],
    timeTarget: 120,
  },
];

export const IR_TABLE_SUB_TYPES: QuestionSubType[] = [
  {
    id: 'ir-ta-yes-no',
    name: 'Yes/No Statements',
    description: 'Evaluating whether statements about the data are true or false.',
    identificationCues: [
      'Statements with Yes/No or True/False options',
      'Requires verifying claims against the data',
    ],
    solutionFramework: [
      'Sort by the relevant column for the statement',
      'Check EVERY qualifying row, not just the first',
      'One counterexample = statement is false',
      'Pay attention to "all", "some", "none", "at least", "at most"',
    ],
    timeTarget: 120,
  },
];

export const IR_TWO_PART_SUB_TYPES: QuestionSubType[] = [
  {
    id: 'ir-tpa-Unit 2: Core Services',
    name: 'Unit 2: Core Services Two-Part',
    description: 'Two-part questions based on reading comprehension or logic.',
    identificationCues: [
      'Two columns asking about different aspects of a passage',
      'May ask for conclusion AND assumption, or cause AND effect',
    ],
    solutionFramework: [
      'Understand the relationship between the two parts',
      'Parts may be independent or dependent',
      'If dependent: solving one constrains the other',
    ],
    timeTarget: 150,
  },
  {
    id: 'ir-tpa-quant',
    name: 'Unit 1: Cloud Basics Two-Part',
    description: 'Two-part questions requiring calculations or constraint satisfaction.',
    identificationCues: [
      'Mathematical constraints or optimization',
      'Two quantities to solve for simultaneously',
    ],
    solutionFramework: [
      'Set up equations from the constraints',
      'Test answer combinations systematically',
      'Both parts must satisfy ALL constraints',
      'Check your final answer in both equations',
    ],
    timeTarget: 180,
  },
];

export const IR_MSR_SUB_TYPES: QuestionSubType[] = [
  {
    id: 'ir-msr-synthesis',
    name: 'Information Synthesis',
    description: 'Combining information from multiple sources to answer.',
    identificationCues: [
      'Multiple tabs with different types of information',
      'Answer requires pulling from 2+ sources',
    ],
    solutionFramework: [
      'Survey ALL tabs first (30 seconds)',
      'Note what type of info each tab contains',
      'Match question needs to specific tabs',
      'Watch for contradictions between sources',
    ],
    timeTarget: 180,
  },
];

