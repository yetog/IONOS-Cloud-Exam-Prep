import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Question } from '@/types/gmat';
import { cn } from '@/lib/utils';
import { Lightbulb, CheckCircle2, XCircle } from 'lucide-react';

interface QuestionCardProps {
  question: Question;
  selectedAnswer: number | null;
  onSelectAnswer?: (index: number) => void;
  showHint?: boolean;
  showResult?: boolean;
}

export function QuestionCard({
  question,
  selectedAnswer,
  onSelectAnswer,
  showHint,
  showResult,
}: QuestionCardProps) {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'text-primary bg-primary/10';
      case 'medium': return 'text-warning bg-warning/10';
      case 'hard': return 'text-destructive bg-destructive/10';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  return (
    <Card className="glass">
      <CardContent className="p-6">
        {/* Question Header */}
        <div className="flex items-center gap-2 mb-4 flex-wrap">
          <span className={cn(
            "text-xs font-medium px-2 py-1 rounded-full capitalize",
            getDifficultyColor(question.difficulty)
          )}>
            {question.difficulty}
          </span>
          <span className="text-xs text-muted-foreground px-2 py-1 rounded-full bg-muted">
            {question.type.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
          </span>
          {question.tags?.map(tag => (
            <span 
              key={tag} 
              className="text-xs text-muted-foreground px-2 py-1 rounded-full bg-muted/50"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Passage (if exists) */}
        {question.passage && (
          <div className="mb-6 p-4 rounded-lg bg-muted/30 border border-border/50">
            <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-wrap">
              {question.passage}
            </p>
          </div>
        )}

        {/* Question Text */}
        <div className="mb-6">
          <p className="text-lg text-foreground leading-relaxed whitespace-pre-wrap">
            {question.question}
          </p>
        </div>

        {/* Hint */}
        {showHint && question.strategy && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mb-6 p-4 rounded-lg bg-warning/10 border border-warning/30"
          >
            <div className="flex items-start gap-2">
              <Lightbulb className="w-5 h-5 text-warning shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-warning mb-1">Strategy Hint</p>
                <p className="text-sm text-muted-foreground">
                  {question.strategy}
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Explanation (shown after answering) */}
        {showResult && question.explanation && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mb-6 p-4 rounded-lg bg-primary/10 border border-primary/30"
          >
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-primary mb-1">Explanation</p>
                <p className="text-sm text-muted-foreground">
                  {question.explanation}
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Answer Options */}
        <div className="space-y-3">
          {question.options.map((option, index) => {
            const isSelected = selectedAnswer === index;
            const isCorrect = index === question.correctAnswer;
            const showCorrect = showResult && isCorrect;
            const showIncorrect = showResult && isSelected && !isCorrect;

            return (
              <motion.button
                key={index}
                whileHover={!showResult ? { scale: 1.01 } : {}}
                whileTap={!showResult ? { scale: 0.99 } : {}}
                onClick={() => onSelectAnswer?.(index)}
                disabled={showResult}
                className={cn(
                  "w-full text-left p-4 rounded-lg border transition-all",
                  "flex items-start gap-3",
                  !showResult && !isSelected && "border-border/50 hover:border-primary/50 hover:bg-primary/5",
                  !showResult && isSelected && "border-primary bg-primary/10",
                  showCorrect && "border-primary bg-primary/10",
                  showIncorrect && "border-destructive bg-destructive/10",
                  showResult && !showCorrect && !showIncorrect && "opacity-50"
                )}
              >
                <span className={cn(
                  "w-7 h-7 rounded-full flex items-center justify-center text-sm font-medium shrink-0",
                  !showResult && !isSelected && "bg-muted text-muted-foreground",
                  !showResult && isSelected && "bg-primary text-primary-foreground",
                  showCorrect && "bg-primary text-primary-foreground",
                  showIncorrect && "bg-destructive text-destructive-foreground",
                  showResult && !showCorrect && !showIncorrect && "bg-muted text-muted-foreground"
                )}>
                  {showCorrect ? (
                    <CheckCircle2 className="w-4 h-4" />
                  ) : showIncorrect ? (
                    <XCircle className="w-4 h-4" />
                  ) : (
                    String.fromCharCode(65 + index)
                  )}
                </span>
                <span className={cn(
                  "flex-1",
                  showCorrect && "text-primary font-medium",
                  showIncorrect && "text-destructive",
                  !showResult && isSelected && "text-foreground",
                  !showResult && !isSelected && "text-muted-foreground"
                )}>
                  {option}
                </span>
              </motion.button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

