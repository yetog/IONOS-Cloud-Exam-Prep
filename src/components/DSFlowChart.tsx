import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, RotateCcw, Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

type Step = 'start' | 's1-sufficient' | 's1-insufficient' | 's2-after-s1' | 's2-only' | 'result';
type Answer = 'A' | 'B' | 'C' | 'D' | 'E';

interface FlowState {
  step: Step;
  s1Sufficient?: boolean;
  s2Sufficient?: boolean;
  answer?: Answer;
}

const answerDescriptions: Record<Answer, string> = {
  A: 'Statement (1) ALONE is sufficient, but statement (2) alone is not sufficient.',
  B: 'Statement (2) ALONE is sufficient, but statement (1) alone is not sufficient.',
  C: 'BOTH statements TOGETHER are sufficient, but NEITHER statement ALONE is sufficient.',
  D: 'EACH statement ALONE is sufficient.',
  E: 'Statements (1) and (2) TOGETHER are NOT sufficient.',
};

export function DSFlowChart() {
  const [state, setState] = useState<FlowState>({ step: 'start' });

  const reset = () => setState({ step: 'start' });

  const handleS1Choice = (sufficient: boolean) => {
    if (sufficient) {
      setState({ step: 's1-sufficient', s1Sufficient: true });
    } else {
      setState({ step: 's1-insufficient', s1Sufficient: false });
    }
  };

  const handleS2AfterS1Sufficient = (sufficient: boolean) => {
    setState({
      step: 'result',
      s1Sufficient: true,
      s2Sufficient: sufficient,
      answer: sufficient ? 'D' : 'A',
    });
  };

  const handleS2AfterS1Insufficient = (sufficient: boolean) => {
    if (sufficient) {
      setState({
        step: 'result',
        s1Sufficient: false,
        s2Sufficient: true,
        answer: 'B',
      });
    } else {
      // Need to check both together
      setState({
        step: 's2-only',
        s1Sufficient: false,
        s2Sufficient: false,
      });
    }
  };

  const handleBothTogether = (sufficient: boolean) => {
    setState({
      step: 'result',
      s1Sufficient: false,
      s2Sufficient: false,
      answer: sufficient ? 'C' : 'E',
    });
  };

  return (
    <Card className="glass overflow-hidden">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center justify-between">
          <span className="text-lg">DS Elimination Flowchart</span>
          <Button variant="ghost" size="sm" onClick={reset} className="text-muted-foreground">
            <RotateCcw className="w-4 h-4 mr-1" />
            Reset
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <AnimatePresence mode="wait">
          {/* Step 1: Evaluate Statement 1 */}
          {state.step === 'start' && (
            <motion.div
              key="start"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-4"
            >
              <div className="p-4 rounded-lg bg-primary/10 border border-primary/30">
                <h3 className="font-semibold text-foreground mb-2">Step 1: Evaluate Statement (1) ALONE</h3>
                <p className="text-sm text-muted-foreground">
                  Ignore statement (2). Can you answer the question using ONLY statement (1)?
                </p>
              </div>
              <div className="flex gap-3">
                <Button
                  onClick={() => handleS1Choice(true)}
                  className="flex-1 bg-primary hover:bg-primary/90"
                >
                  <Check className="w-4 h-4 mr-2" />
                  Sufficient
                </Button>
                <Button
                  onClick={() => handleS1Choice(false)}
                  variant="outline"
                  className="flex-1"
                >
                  <X className="w-4 h-4 mr-2" />
                  Not Sufficient
                </Button>
              </div>
              <div className="text-center text-xs text-muted-foreground">
                If sufficient → Eliminate B, C, E | If not → Eliminate A, D
              </div>
            </motion.div>
          )}

          {/* S1 Sufficient - Check S2 */}
          {state.step === 's1-sufficient' && (
            <motion.div
              key="s1-sufficient"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-4"
            >
              <div className="flex gap-2 text-sm mb-4">
                <span className="px-2 py-1 rounded bg-primary/20 text-primary">S1: ✓ Sufficient</span>
                <span className="text-muted-foreground">→ Answer is A or D</span>
              </div>
              <div className="p-4 rounded-lg bg-primary/10 border border-primary/30">
                <h3 className="font-semibold text-foreground mb-2">Step 2: Evaluate Statement (2) ALONE</h3>
                <p className="text-sm text-muted-foreground">
                  Now forget statement (1). Can you answer the question using ONLY statement (2)?
                </p>
              </div>
              <div className="flex gap-3">
                <Button
                  onClick={() => handleS2AfterS1Sufficient(true)}
                  className="flex-1 bg-primary hover:bg-primary/90"
                >
                  <Check className="w-4 h-4 mr-2" />
                  Sufficient
                </Button>
                <Button
                  onClick={() => handleS2AfterS1Sufficient(false)}
                  variant="outline"
                  className="flex-1"
                >
                  <X className="w-4 h-4 mr-2" />
                  Not Sufficient
                </Button>
              </div>
              <div className="text-center text-xs text-muted-foreground">
                If S2 also sufficient → D | If S2 not sufficient → A
              </div>
            </motion.div>
          )}

          {/* S1 Insufficient - Check S2 */}
          {state.step === 's1-insufficient' && (
            <motion.div
              key="s1-insufficient"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-4"
            >
              <div className="flex gap-2 text-sm mb-4">
                <span className="px-2 py-1 rounded bg-muted text-muted-foreground">S1: ✗ Not Sufficient</span>
                <span className="text-muted-foreground">→ Answer is B, C, or E</span>
              </div>
              <div className="p-4 rounded-lg bg-primary/10 border border-primary/30">
                <h3 className="font-semibold text-foreground mb-2">Step 2: Evaluate Statement (2) ALONE</h3>
                <p className="text-sm text-muted-foreground">
                  Forget statement (1). Can you answer the question using ONLY statement (2)?
                </p>
              </div>
              <div className="flex gap-3">
                <Button
                  onClick={() => handleS2AfterS1Insufficient(true)}
                  className="flex-1 bg-primary hover:bg-primary/90"
                >
                  <Check className="w-4 h-4 mr-2" />
                  Sufficient
                </Button>
                <Button
                  onClick={() => handleS2AfterS1Insufficient(false)}
                  variant="outline"
                  className="flex-1"
                >
                  <X className="w-4 h-4 mr-2" />
                  Not Sufficient
                </Button>
              </div>
              <div className="text-center text-xs text-muted-foreground">
                If S2 sufficient → B | If S2 not sufficient → Check both together
              </div>
            </motion.div>
          )}

          {/* Both statements insufficient alone - Check together */}
          {state.step === 's2-only' && (
            <motion.div
              key="s2-only"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-4"
            >
              <div className="flex gap-2 text-sm mb-4">
                <span className="px-2 py-1 rounded bg-muted text-muted-foreground">S1: ✗</span>
                <span className="px-2 py-1 rounded bg-muted text-muted-foreground">S2: ✗</span>
                <span className="text-muted-foreground">→ Answer is C or E</span>
              </div>
              <div className="p-4 rounded-lg bg-warning/10 border border-warning/30">
                <h3 className="font-semibold text-foreground mb-2">Step 3: Evaluate BOTH Statements TOGETHER</h3>
                <p className="text-sm text-muted-foreground">
                  Now use ALL information from both statements. Can you answer the question?
                </p>
              </div>
              <div className="flex gap-3">
                <Button
                  onClick={() => handleBothTogether(true)}
                  className="flex-1 bg-primary hover:bg-primary/90"
                >
                  <Check className="w-4 h-4 mr-2" />
                  Sufficient Together
                </Button>
                <Button
                  onClick={() => handleBothTogether(false)}
                  variant="outline"
                  className="flex-1"
                >
                  <X className="w-4 h-4 mr-2" />
                  Still Not Sufficient
                </Button>
              </div>
              <div className="text-center text-xs text-muted-foreground">
                If together sufficient → C | If still not sufficient → E
              </div>
            </motion.div>
          )}

          {/* Result */}
          {state.step === 'result' && state.answer && (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-4"
            >
              <div className="flex gap-2 text-sm mb-4">
                <span className={cn(
                  "px-2 py-1 rounded",
                  state.s1Sufficient ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground"
                )}>
                  S1: {state.s1Sufficient ? '✓' : '✗'}
                </span>
                <span className={cn(
                  "px-2 py-1 rounded",
                  state.s2Sufficient ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground"
                )}>
                  S2: {state.s2Sufficient ? '✓' : '✗'}
                </span>
              </div>
              <div className="p-6 rounded-lg bg-primary/10 border border-primary/30 text-center">
                <div className="text-6xl font-bold text-primary mb-4">{state.answer}</div>
                <p className="text-sm text-muted-foreground">{answerDescriptions[state.answer]}</p>
              </div>
              <Button onClick={reset} className="w-full" variant="outline">
                <RotateCcw className="w-4 h-4 mr-2" />
                Try Another Question
              </Button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Quick Reference */}
        <div className="mt-6 pt-4 border-t border-border">
          <h4 className="text-sm font-semibold text-foreground mb-3">Quick Reference</h4>
          <div className="grid grid-cols-5 gap-2 text-xs">
            {(['A', 'B', 'C', 'D', 'E'] as Answer[]).map((letter) => (
              <div
                key={letter}
                className={cn(
                  "p-2 rounded text-center",
                  state.answer === letter ? "bg-primary text-primary-foreground" : "bg-muted/50 text-muted-foreground"
                )}
              >
                <div className="font-bold text-lg">{letter}</div>
                <div className="mt-1">
                  {letter === 'A' && 'S1 only'}
                  {letter === 'B' && 'S2 only'}
                  {letter === 'C' && 'Both'}
                  {letter === 'D' && 'Each'}
                  {letter === 'E' && 'Neither'}
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
