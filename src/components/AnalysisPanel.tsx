import { motion } from 'framer-motion';
import { ArrowLeft, ChevronRight, Clock, Target, AlertTriangle, BookOpen, Plus, StickyNote } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Question } from '@/types/gmat';

interface AnalysisPanelProps {
  question: Question;
  selectedAnswer: number;
  timeSpent: number;
  onBack: () => void;
  onNext: () => void;
  onAddSimilar?: () => void;
  onSaveNote?: () => void;
}

export function AnalysisPanel({
  question,
  selectedAnswer,
  timeSpent,
  onBack,
  onNext,
  onAddSimilar,
  onSaveNote,
}: AnalysisPanelProps) {
  const isCorrect = selectedAnswer === question.correctAnswer;
  const wasUnderTime = timeSpent <= question.targetTime;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div>
          <h2 className="text-xl font-bold text-foreground">Deep Analysis</h2>
          <p className="text-sm text-muted-foreground">
            Understand this question inside and out
          </p>
        </div>
      </div>

      {/* Performance Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Card className="glass">
          <CardContent className="p-6">
            <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
              <Target className="w-5 h-5 text-primary" />
              Your Performance
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-3 rounded-lg bg-muted/30">
                <p className="text-2xl font-bold text-foreground">
                  {isCorrect ? '✓' : '✗'}
                </p>
                <p className="text-xs text-muted-foreground">Result</p>
              </div>
              <div className="text-center p-3 rounded-lg bg-muted/30">
                <p className="text-2xl font-bold text-foreground">
                  {formatTime(timeSpent)}
                </p>
                <p className="text-xs text-muted-foreground">Your Time</p>
              </div>
              <div className="text-center p-3 rounded-lg bg-muted/30">
                <p className="text-2xl font-bold text-foreground">
                  {formatTime(question.targetTime)}
                </p>
                <p className="text-xs text-muted-foreground">Target Time</p>
              </div>
              <div className="text-center p-3 rounded-lg bg-muted/30">
                <p className={`text-2xl font-bold ${wasUnderTime ? 'text-primary' : 'text-warning'}`}>
                  {wasUnderTime ? 'On Time' : 'Over Time'}
                </p>
                <p className="text-xs text-muted-foreground">Timing</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Question Recap */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="glass">
          <CardContent className="p-6">
            <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-primary" />
              Question
            </h3>
            {question.passage && (
              <div className="mb-4 p-4 rounded-lg bg-muted/30 border border-border/50">
                <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-wrap">
                  {question.passage}
                </p>
              </div>
            )}
            <p className="text-foreground whitespace-pre-wrap mb-4">
              {question.question}
            </p>
            <div className="p-3 rounded-lg bg-primary/10 border border-primary/30">
              <p className="text-sm text-muted-foreground mb-1">Correct Answer:</p>
              <p className="text-primary font-medium">
                {String.fromCharCode(65 + question.correctAnswer)}. {question.options[question.correctAnswer]}
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Detailed Explanation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="glass">
          <CardContent className="p-6">
            <h3 className="font-semibold text-foreground mb-4">Detailed Explanation</h3>
            <p className="text-muted-foreground whitespace-pre-wrap leading-relaxed">
              {question.explanation}
            </p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Strategy */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card className="glass border-primary/30">
          <CardContent className="p-6">
            <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
              <Target className="w-5 h-5 text-primary" />
              Strategy for This Question Type
            </h3>
            <p className="text-muted-foreground whitespace-pre-wrap leading-relaxed">
              {question.strategy}
            </p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Common Traps */}
      {question.commonTraps && question.commonTraps.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="glass border-warning/30">
            <CardContent className="p-6">
              <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-warning" />
                Common Traps to Avoid
              </h3>
              <ul className="space-y-2">
                {question.commonTraps.map((trap, index) => (
                  <li key={index} className="flex items-start gap-2 text-muted-foreground">
                    <span className="text-warning mt-1">•</span>
                    <span>{trap}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Time Benchmark */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Card className="glass">
          <CardContent className="p-6">
            <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5 text-primary" />
              Time Benchmark
            </h3>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="p-3 rounded-lg bg-primary/10">
                <p className="text-lg font-bold text-primary">
                  {formatTime(Math.floor(question.targetTime * 0.75))}
                </p>
                <p className="text-xs text-muted-foreground">Fast</p>
              </div>
              <div className="p-3 rounded-lg bg-muted">
                <p className="text-lg font-bold text-foreground">
                  {formatTime(question.targetTime)}
                </p>
                <p className="text-xs text-muted-foreground">Target</p>
              </div>
              <div className="p-3 rounded-lg bg-warning/10">
                <p className="text-lg font-bold text-warning">
                  {formatTime(Math.floor(question.targetTime * 1.25))}
                </p>
                <p className="text-xs text-muted-foreground">Slow</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              For {question.difficulty} difficulty {question.type.split('-').join(' ')} questions, 
              aim to finish within {formatTime(question.targetTime)} to stay on pace for the full exam.
            </p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Quick Actions */}
      {(onAddSimilar || onSaveNote) && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55 }}
          className="flex gap-3"
        >
          {onSaveNote && (
            <Button variant="outline" onClick={onSaveNote} className="flex-1">
              <StickyNote className="w-4 h-4 mr-2" />
              Save Note
            </Button>
          )}
          {onAddSimilar && (
            <Button variant="outline" onClick={onAddSimilar} className="flex-1">
              <Plus className="w-4 h-4 mr-2" />
              Add Similar Question
            </Button>
          )}
        </motion.div>
      )}

      {/* Action Buttons */}
      <div className="flex gap-3 pt-4">
        <Button variant="outline" onClick={onBack} className="flex-1">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Result
        </Button>
        <Button onClick={onNext} className="flex-1 bg-primary hover:bg-primary/90">
          Next Question
          <ChevronRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
}
