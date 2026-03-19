import { motion } from 'framer-motion';
import { BookOpen, Check, ArrowRight, Target, AlertTriangle, Brain } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { QuestionType } from '@/types/gmat';

interface WorkedExampleProps {
  questionType: QuestionType;
}

// Worked examples for each question type
const WORKED_EXAMPLES: Partial<Record<QuestionType, {
  question: string;
  passage?: string;
  options: string[];
  correctAnswer: number;
  steps: { title: string; content: string }[];
  keyTakeaway: string;
}>> = {
  'problem-solving': {
    question: 'A store offers a 20% discount on all items. During a special sale, an additional 15% is taken off the discounted price. What is the total percent discount from the original price?',
    options: ['32%', '35%', '30%', '28%', '33%'],
    correctAnswer: 0,
    steps: [
      {
        title: 'Step 1: Identify the sub-type',
        content: 'This is a Percentage problem—specifically successive discounts. Keywords: "20% discount", "additional 15%"'
      },
      {
        title: 'Step 2: Choose strategy',
        content: 'For successive percentage changes, multiply the multipliers. Never add percentages directly!'
      },
      {
        title: 'Step 3: Execute',
        content: 'Let original = $100. After 20% off: $100 × 0.80 = $80. After additional 15% off: $80 × 0.85 = $68. Total discount: $100 - $68 = $32, which is 32%.'
      },
      {
        title: 'Step 4: Verify',
        content: 'Common trap: Adding 20% + 15% = 35% (wrong!). The correct answer, 32%, is less than 35% because the second discount applies to the already-reduced price.'
      }
    ],
    keyTakeaway: 'For successive changes, multiply multipliers: 0.80 × 0.85 = 0.68 → 32% off'
  },
  'data-sufficiency': {
    question: 'Is x > 0?\n\n(1) x² > 0\n(2) x³ > 0',
    options: [
      'Statement (1) ALONE is sufficient',
      'Statement (2) ALONE is sufficient',
      'BOTH statements TOGETHER are sufficient',
      'EACH statement ALONE is sufficient',
      'Statements (1) and (2) TOGETHER are NOT sufficient'
    ],
    correctAnswer: 1,
    steps: [
      {
        title: 'Step 1: Understand the question',
        content: 'This is a Yes/No DS question. We need to determine if x is DEFINITELY positive, DEFINITELY not positive, or SOMETIMES both.'
      },
      {
        title: 'Step 2: Evaluate Statement (1) alone',
        content: 'x² > 0 means x ≠ 0 (since 0² = 0). But x could be 2 (positive) or -2 (negative), both give x² = 4 > 0. Sometimes Yes, sometimes No → INSUFFICIENT. Eliminate A and D.'
      },
      {
        title: 'Step 3: Evaluate Statement (2) alone',
        content: 'x³ > 0. Cubing preserves sign: positive cubed = positive, negative cubed = negative. So x³ > 0 means x MUST be positive. Always Yes → SUFFICIENT.'
      },
      {
        title: 'Step 4: Select answer',
        content: 'Statement (2) alone is sufficient. Answer: B'
      }
    ],
    keyTakeaway: 'x² tells you about absolute value only. x³ preserves the sign, so x³ > 0 proves x > 0.'
  },
  'critical-reasoning': {
    question: 'Sales of electric vehicles have increased 50% since the government began offering tax credits. Therefore, the tax credits are responsible for the increase in sales.',
    passage: 'Which of the following, if true, most seriously weakens the argument?',
    options: [
      'Gas prices have doubled during the same period',
      'The tax credits are significant, covering up to 20% of purchase price',
      'Electric vehicle technology has improved significantly',
      'Other countries without tax credits have also seen sales increases',
      'Many buyers were unaware of the tax credits when purchasing'
    ],
    correctAnswer: 3,
    steps: [
      {
        title: 'Step 1: Identify argument structure',
        content: 'Conclusion: Tax credits caused the sales increase. Evidence: Sales increased 50% after credits began. Gap: Maybe something ELSE caused the increase.'
      },
      {
        title: 'Step 2: Predict the answer',
        content: 'A weaken answer will attack the causal link—suggesting an alternative explanation or showing the credits weren\'t necessary.'
      },
      {
        title: 'Step 3: Evaluate choices',
        content: '(A) and (C) provide alternative explanations—but they don\'t prove credits weren\'t the cause. (D) is strongest: if countries WITHOUT credits ALSO saw increases, then credits aren\'t necessary for the effect. This breaks the causal claim.'
      },
      {
        title: 'Step 4: Confirm',
        content: '(D) shows the effect occurs even WITHOUT the proposed cause → strongly weakens the causal claim.'
      }
    ],
    keyTakeaway: 'To weaken causal claims, find: (1) alternative cause, (2) same effect without the cause, or (3) reversed causation.'
  },
  'sentence-correction': {
    question: 'Having finished the report, the deadline was met by the team.',
    options: [
      'Having finished the report, the deadline was met by the team',
      'Having finished the report, the team met the deadline',
      'Finishing the report, the deadline was met by the team',
      'The deadline was met by the team, having finished the report',
      'Having finished the report, meeting the deadline was by the team'
    ],
    correctAnswer: 1,
    steps: [
      {
        title: 'Step 1: Identify the error',
        content: '"Having finished the report" is an opening modifier. It must describe the subject that follows. In the original, "the deadline" follows—but the DEADLINE didn\'t finish the report!'
      },
      {
        title: 'Step 2: Apply the rule',
        content: 'Opening participial phrase → The subject must logically perform that action. "The team" finished the report, so "the team" must be the subject.'
      },
      {
        title: 'Step 3: Find the fix',
        content: '(B) "Having finished the report, the team met the deadline." Now "the team" is the subject—and the team DID finish the report. ✓'
      },
      {
        title: 'Step 4: Verify other choices',
        content: '(C) same dangling modifier problem. (D) puts modifier at end—still illogical. (E) is grammatically awkward. (B) is correct.'
      }
    ],
    keyTakeaway: 'Opening modifier → Check if the subject could logically do that action. If not, it\'s a dangling modifier.'
  },
  'reading-comprehension': {
    passage: 'Recent studies on urban heat islands have revealed that cities can be up to 7°F warmer than surrounding rural areas. This temperature differential, caused primarily by the replacement of vegetation with heat-absorbing materials like asphalt and concrete, has significant public health implications. Researchers have found correlations between elevated urban temperatures and increased rates of heat-related illness, particularly among elderly populations.',
    question: 'The author mentions "heat-absorbing materials" primarily to:',
    options: [
      'Criticize urban development practices',
      'Explain a cause of the temperature differential',
      'Suggest solutions to urban heat problems',
      'Compare urban and rural construction methods',
      'Argue for increased use of vegetation in cities'
    ],
    correctAnswer: 1,
    steps: [
      {
        title: 'Step 1: Identify question type',
        content: 'This is a Structure/Function question—asking WHY the author included a specific detail. Keywords: "primarily to"'
      },
      {
        title: 'Step 2: Locate and analyze',
        content: 'The phrase appears in: "This temperature differential, caused primarily by the replacement of vegetation with heat-absorbing materials..."'
      },
      {
        title: 'Step 3: Determine function',
        content: 'The author is EXPLAINING what causes the heat island effect. Heat-absorbing materials are given as the cause of the temperature differential.'
      },
      {
        title: 'Step 4: Match to answer',
        content: '(B) "Explain a cause of the temperature differential" matches exactly. The author isn\'t criticizing, suggesting solutions, or arguing—just explaining causation.'
      }
    ],
    keyTakeaway: 'For function questions, ask: What role does this detail play in the argument? Is it evidence, explanation, counterpoint, or transition?'
  }
};

export function WorkedExample({ questionType }: WorkedExampleProps) {
  const example = WORKED_EXAMPLES[questionType];
  
  if (!example) return null;

  return (
    <Card className="glass border-primary/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-primary" />
          Worked Example
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Step-by-step walkthrough of a typical question
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Question */}
        <div className="p-4 rounded-lg bg-muted/30 border border-border">
          {example.passage && (
            <div className="mb-4">
              <Badge variant="secondary" className="mb-2">Question Stem</Badge>
              <p className="text-sm text-muted-foreground italic">{example.passage}</p>
            </div>
          )}
          <p className="text-foreground font-medium whitespace-pre-line">{example.question}</p>
          <div className="mt-4 space-y-2">
            {example.options.map((option, idx) => (
              <div 
                key={idx} 
                className={`flex items-center gap-2 text-sm p-2 rounded ${
                  idx === example.correctAnswer 
                    ? 'bg-primary/10 text-primary border border-primary/30' 
                    : 'text-muted-foreground'
                }`}
              >
                <span className="font-medium">{String.fromCharCode(65 + idx)}.</span>
                <span>{option}</span>
                {idx === example.correctAnswer && (
                  <Check className="w-4 h-4 ml-auto" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step-by-step solution */}
        <div className="space-y-4">
          {example.steps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="flex gap-4"
            >
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-sm">
                  {idx + 1}
                </div>
                {idx < example.steps.length - 1 && (
                  <div className="w-0.5 h-full bg-primary/20 mt-2" />
                )}
              </div>
              <div className="flex-1 pb-4">
                <h5 className="font-semibold text-foreground flex items-center gap-2">
                  {step.title}
                </h5>
                <p className="text-sm text-muted-foreground mt-1">{step.content}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Key Takeaway */}
        <div className="p-4 rounded-lg bg-primary/10 border border-primary/30">
          <div className="flex items-start gap-3">
            <Brain className="w-5 h-5 text-primary mt-0.5 shrink-0" />
            <div>
              <h5 className="font-semibold text-foreground text-sm mb-1">Key Takeaway</h5>
              <p className="text-sm text-primary">{example.keyTakeaway}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

