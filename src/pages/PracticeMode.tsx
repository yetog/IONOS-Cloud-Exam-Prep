import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, Clock, Lightbulb, CheckCircle2, XCircle, 
  ChevronRight, Zap, Trophy, RotateCcw, Home
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useQuestions } from '@/hooks/useQuestions';
import { useProgress } from '@/hooks/useProgress';
import { useNotes } from '@/hooks/useNotes';
import { GMATSection, SECTION_INFO, Question } from '@/types/gmat';
import { QuestionCard } from '@/components/QuestionCard';
import { AnalysisPanel } from '@/components/AnalysisPanel';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

type PracticeState = 'ready' | 'answering' | 'result' | 'analysis';

export default function PracticeMode() {
  const { section } = useParams<{ section?: string }>();
  const navigate = useNavigate();
  
  const currentSection = section as GMATSection | undefined;
  const sectionInfo = currentSection ? SECTION_INFO[currentSection] : null;

  const { getRandomQuestion, getQuestionCount } = useQuestions();
  const { progress, recordAttempt } = useProgress();
  const { addNote } = useNotes();
  const { toast } = useToast();

  const [state, setState] = useState<PracticeState>('ready');
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [usedHint, setUsedHint] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [timeSpent, setTimeSpent] = useState(0);
  const [timerActive, setTimerActive] = useState(false);
  const [lastXPEarned, setLastXPEarned] = useState(0);
  const [answeredIds, setAnsweredIds] = useState<string[]>([]);
  const [sessionStats, setSessionStats] = useState({ correct: 0, total: 0 });

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timerActive) {
      interval = setInterval(() => {
        setTimeSpent(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timerActive]);

  // Load first question when section changes
  useEffect(() => {
    if (currentSection) {
      loadNewQuestion();
    }
  }, [currentSection]);

  const loadNewQuestion = useCallback(() => {
    const question = getRandomQuestion(currentSection, undefined, answeredIds);
    if (question) {
      setCurrentQuestion(question);
      setState('answering');
      setSelectedAnswer(null);
      setUsedHint(false);
      setShowHint(false);
      setTimeSpent(0);
      setTimerActive(true);
    } else {
      // No more questions available
      setState('ready');
    }
  }, [currentSection, answeredIds, getRandomQuestion]);

  const handleAnswerSelect = (index: number) => {
    if (state !== 'answering') return;
    setSelectedAnswer(index);
  };

  const handleSubmit = () => {
    if (selectedAnswer === null || !currentQuestion) return;

    setTimerActive(false);
    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;

    // Record attempt
    const xpEarned = recordAttempt(
      {
        questionId: currentQuestion.id,
        answeredAt: new Date().toISOString(),
        selectedAnswer,
        isCorrect,
        timeSpent,
        usedHint,
      },
      currentQuestion.section,
      currentQuestion.type,
      currentQuestion.targetTime
    );

    setLastXPEarned(xpEarned);
    setAnsweredIds(prev => [...prev, currentQuestion.id]);
    setSessionStats(prev => ({
      correct: prev.correct + (isCorrect ? 1 : 0),
      total: prev.total + 1,
    }));
    setState('result');
  };

  const handleShowHint = () => {
    setUsedHint(true);
    setShowHint(true);
  };

  const handleNextQuestion = () => {
    loadNewQuestion();
  };

  const handleShowAnalysis = () => {
    setState('analysis');
  };

  const handleAddSimilar = () => {
    if (!currentQuestion) return;
    navigate(`/manage/questions?section=${currentQuestion.section}&type=${currentQuestion.type}`);
  };

  const handleSaveNote = () => {
    if (!currentQuestion) return;
    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
    
    addNote({
      title: `${isCorrect ? '✓' : '✗'} ${currentQuestion.type.split('-').join(' ')} - ${currentQuestion.question.slice(0, 50)}...`,
      content: `**Question:** ${currentQuestion.question}\n\n**My answer:** ${selectedAnswer !== null ? String.fromCharCode(65 + selectedAnswer) : 'N/A'}\n**Correct answer:** ${String.fromCharCode(65 + currentQuestion.correctAnswer)}\n\n**Time:** ${formatTime(timeSpent)} / ${formatTime(currentQuestion.targetTime)}\n\n**Key insight:** `,
      section: currentQuestion.section,
      questionType: currentQuestion.type,
      type: isCorrect ? 'insight' : 'mistake',
      tags: currentQuestion.tags || [],
    });
    
    toast({
      title: 'Note Saved',
      description: 'A note for this question has been added to your Notes & Insights.',
    });
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getTimeStatus = () => {
    if (!currentQuestion) return 'normal';
    const ratio = timeSpent / currentQuestion.targetTime;
    if (ratio < 0.75) return 'good';
    if (ratio < 1) return 'warning';
    return 'danger';
  };

  // Section selection view
  if (!currentSection) {
    return (
      <div className="min-h-screen bg-background bg-grid">
        <div className="fixed inset-0 bg-gradient-radial from-primary/5 via-transparent to-transparent pointer-events-none" />
        
        <div className="relative z-10 container mx-auto px-4 py-8 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-4">
              <ArrowLeft className="w-4 h-4" />
              Back to Dashboard
            </Link>
            <h1 className="text-3xl font-bold text-foreground">
              Choose a <span className="text-primary text-glow">Section</span>
            </h1>
            <p className="text-muted-foreground mt-2">
              Select a section to start practicing
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="grid gap-4"
          >
            {(Object.keys(SECTION_INFO) as GMATSection[]).map((sectionKey, index) => {
              const info = SECTION_INFO[sectionKey];
              const count = getQuestionCount(sectionKey);
              
              return (
                <motion.div
                  key={sectionKey}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                >
                  <Link to={`/practice/${sectionKey}`}>
                    <Card className="glass hover-lift cursor-pointer group border-border/50 hover:border-primary/50 transition-all">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <h2 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                              {info.name}
                            </h2>
                            <p className="text-muted-foreground mt-1">
                              {count} questions • {info.types.length} question types
                            </p>
                            <div className="flex flex-wrap gap-2 mt-3">
                              {info.types.map(type => (
                                <span 
                                  key={type.value}
                                  className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground"
                                >
                                  {type.label}
                                </span>
                              ))}
                            </div>
                          </div>
                          <ChevronRight className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors" />
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background bg-grid">
      <div className="fixed inset-0 bg-gradient-radial from-primary/5 via-transparent to-transparent pointer-events-none" />
      
      <div className="relative z-10 container mx-auto px-4 py-6 max-w-4xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-6"
        >
          <div className="flex items-center gap-4">
            <Link to="/practice">
              <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-xl font-bold text-foreground">
                {sectionInfo?.name}
              </h1>
              <p className="text-sm text-muted-foreground">
                Session: {sessionStats.correct}/{sessionStats.total} correct
              </p>
            </div>
          </div>

          {/* Timer */}
          {state === 'answering' && currentQuestion && (
            <div className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-lg",
              getTimeStatus() === 'good' && "bg-primary/10 text-primary",
              getTimeStatus() === 'warning' && "bg-warning/10 text-warning",
              getTimeStatus() === 'danger' && "bg-destructive/10 text-destructive"
            )}>
              <Clock className="w-4 h-4" />
              <span className="font-mono font-bold">{formatTime(timeSpent)}</span>
              <span className="text-xs opacity-70">/ {formatTime(currentQuestion.targetTime)}</span>
            </div>
          )}
        </motion.div>

        {/* Progress bar */}
        {currentQuestion && state !== 'ready' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-6"
          >
            <Progress 
              value={Math.min((timeSpent / (currentQuestion.targetTime || 120)) * 100, 100)} 
              className="h-1"
            />
          </motion.div>
        )}

        {/* Main Content */}
        <AnimatePresence mode="wait">
          {state === 'ready' && !currentQuestion && (
            <motion.div
              key="ready"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="flex flex-col items-center justify-center py-20"
            >
              <Card className="glass p-8 text-center max-w-md">
                <Trophy className="w-16 h-16 text-primary mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-foreground mb-2">
                  All Questions Completed!
                </h2>
                <p className="text-muted-foreground mb-6">
                  You've answered all available questions in this section.
                </p>
                <div className="flex gap-3 justify-center">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setAnsweredIds([]);
                      loadNewQuestion();
                    }}
                  >
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Reset & Retry
                  </Button>
                  <Link to="/">
                    <Button>
                      <Home className="w-4 h-4 mr-2" />
                      Dashboard
                    </Button>
                  </Link>
                </div>
              </Card>
            </motion.div>
          )}

          {state === 'answering' && currentQuestion && (
            <motion.div
              key="answering"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <QuestionCard
                question={currentQuestion}
                selectedAnswer={selectedAnswer}
                onSelectAnswer={handleAnswerSelect}
                showHint={showHint}
              />

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 mt-6">
                {!showHint && (
                  <Button
                    variant="outline"
                    onClick={handleShowHint}
                    className="flex-1 sm:flex-none"
                  >
                    <Lightbulb className="w-4 h-4 mr-2" />
                    Show Hint (-10 XP)
                  </Button>
                )}
                <Button
                  onClick={handleSubmit}
                  disabled={selectedAnswer === null}
                  className="flex-1 bg-primary hover:bg-primary/90"
                >
                  Submit Answer
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </motion.div>
          )}

          {state === 'result' && currentQuestion && (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              {/* Result Banner */}
              <Card className={cn(
                "mb-6 overflow-hidden",
                selectedAnswer === currentQuestion.correctAnswer
                  ? "border-primary/50 bg-primary/5"
                  : "border-destructive/50 bg-destructive/5"
              )}>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    {selectedAnswer === currentQuestion.correctAnswer ? (
                      <>
                        <div className="p-3 rounded-full bg-primary/20">
                          <CheckCircle2 className="w-8 h-8 text-primary" />
                        </div>
                        <div>
                          <h2 className="text-2xl font-bold text-primary">Correct!</h2>
                          <p className="text-muted-foreground">
                            Answered in {formatTime(timeSpent)}
                            {usedHint && ' (with hint)'}
                          </p>
                        </div>
                        <div className="ml-auto text-right">
                          <div className="flex items-center gap-1 text-gold">
                            <Zap className="w-5 h-5" />
                            <span className="text-2xl font-bold">+{lastXPEarned}</span>
                          </div>
                          <p className="text-xs text-muted-foreground">XP earned</p>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="p-3 rounded-full bg-destructive/20">
                          <XCircle className="w-8 h-8 text-destructive" />
                        </div>
                        <div>
                          <h2 className="text-2xl font-bold text-destructive">Incorrect</h2>
                          <p className="text-muted-foreground">
                            The correct answer was: {String.fromCharCode(65 + currentQuestion.correctAnswer)}
                          </p>
                        </div>
                        <div className="ml-auto text-right">
                          <div className="flex items-center gap-1 text-muted-foreground">
                            <Zap className="w-5 h-5" />
                            <span className="text-2xl font-bold">+{lastXPEarned}</span>
                          </div>
                          <p className="text-xs text-muted-foreground">XP earned</p>
                        </div>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Question Review */}
              <QuestionCard
                question={currentQuestion}
                selectedAnswer={selectedAnswer}
                showResult
                showHint
              />

              {/* Explanation */}
              <Card className="glass mt-6">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-foreground mb-2">Explanation</h3>
                  <p className="text-muted-foreground whitespace-pre-wrap">
                    {currentQuestion.explanation}
                  </p>
                </CardContent>
              </Card>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 mt-6">
                <Button
                  variant="outline"
                  onClick={handleShowAnalysis}
                  className="flex-1 sm:flex-none"
                >
                  Deep Analysis
                </Button>
                <Button
                  onClick={handleNextQuestion}
                  className="flex-1 bg-primary hover:bg-primary/90"
                >
                  Next Question
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </motion.div>
          )}

          {state === 'analysis' && currentQuestion && (
            <motion.div
              key="analysis"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <AnalysisPanel
                question={currentQuestion}
                selectedAnswer={selectedAnswer!}
                timeSpent={timeSpent}
                onBack={() => setState('result')}
                onNext={handleNextQuestion}
                onAddSimilar={handleAddSimilar}
                onSaveNote={handleSaveNote}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
