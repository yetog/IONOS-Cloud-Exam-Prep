import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  ChevronLeft, 
  ChevronRight, 
  Sparkles, 
  ArrowRight, 
  RotateCcw, 
  Target,
  Shuffle,
  BookOpen,
  User
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useSessionHistory } from '@/hooks/useSessionHistory';
import { useProgress } from '@/hooks/useProgress';
import { useSkills } from '@/hooks/useSkills';
import { SECTION_INFO, GMATSection } from '@/types/gmat';
import { cn } from '@/lib/utils';

type CardState = 'onboarding' | 'continue' | 'recommend';

export function HeroNavCard() {
  const { 
    sessionHistory, 
    hasSessionHistory, 
    isSessionRecent, 
    timeSinceLastPractice,
    lastSectionName,
    resetSession 
  } = useSessionHistory();
  const { progress, getSectionAccuracy } = useProgress();
  const { topSkills } = useSkills();

  // Determine available states
  const availableStates = useMemo(() => {
    const states: CardState[] = [];
    
    // Always show onboarding for new users (< 5 questions)
    if (progress.totalQuestionsAnswered < 5) {
      states.push('onboarding');
    }
    
    // Show continue if session is recent
    if (hasSessionHistory && isSessionRecent) {
      states.push('continue');
    }
    
    // Show recommendations for users with some history
    if (progress.totalQuestionsAnswered >= 5) {
      states.push('recommend');
    }
    
    // Fallback to onboarding if no states
    if (states.length === 0) {
      states.push('onboarding');
    }
    
    return states;
  }, [progress.totalQuestionsAnswered, hasSessionHistory, isSessionRecent]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const currentState = availableStates[currentIndex % availableStates.length];

  const goNext = () => setCurrentIndex(prev => (prev + 1) % availableStates.length);
  const goPrev = () => setCurrentIndex(prev => (prev - 1 + availableStates.length) % availableStates.length);

  // Find recommended section (lowest accuracy with min 3 questions, or least practiced)
  const recommendedSection = useMemo(() => {
    const sections: GMATSection[] = ['quantitative', 'verbal', 'integrated-reasoning'];
    
    // Find weakest section
    let weakest: { section: GMATSection; accuracy: number; count: number } | null = null;
    
    for (const section of sections) {
      const stats = progress.sectionStats[section];
      if (stats && stats.questionsAnswered >= 3) {
        const accuracy = getSectionAccuracy(section);
        if (!weakest || accuracy < weakest.accuracy) {
          weakest = { section, accuracy, count: stats.questionsAnswered };
        }
      }
    }
    
    // If no section has enough data, recommend least practiced
    if (!weakest) {
      let leastPracticed: GMATSection = 'quantitative';
      let minCount = Infinity;
      for (const section of sections) {
        const count = progress.sectionStats[section]?.questionsAnswered || 0;
        if (count < minCount) {
          minCount = count;
          leastPracticed = section;
        }
      }
      return {
        section: leastPracticed,
        name: SECTION_INFO[leastPracticed].name,
        reason: 'least practiced',
        accuracy: null,
      };
    }
    
    return {
      section: weakest.section,
      name: SECTION_INFO[weakest.section].name,
      reason: 'needs improvement',
      accuracy: weakest.accuracy,
    };
  }, [progress.sectionStats, getSectionAccuracy]);

  return (
    <div className="relative">
      {/* Pagination Dots */}
      {availableStates.length > 1 && (
        <div className="flex justify-center gap-2 mb-3">
          {availableStates.map((state, i) => (
            <button
              key={state}
              onClick={() => setCurrentIndex(i)}
              className={cn(
                'w-2 h-2 rounded-full transition-all',
                i === currentIndex % availableStates.length
                  ? 'bg-primary w-4'
                  : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
              )}
            />
          ))}
        </div>
      )}

      {/* Card Container */}
      <div className="relative overflow-hidden rounded-xl border-2 border-primary/40 bg-card/90 backdrop-blur-sm">
        {/* Corner Accents */}
        <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-primary" />
        <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-primary" />
        <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-primary" />
        <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-primary" />

        <AnimatePresence mode="wait">
          <motion.div
            key={currentState}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
            className="p-5"
          >
            {currentState === 'onboarding' && (
              <OnboardingContent />
            )}
            {currentState === 'continue' && (
              <ContinueContent
                lastSectionName={lastSectionName}
                timeSinceLastPractice={timeSinceLastPractice}
                questionsInSession={sessionHistory.questionsInSession}
                sessionAccuracy={sessionHistory.sessionAccuracy}
                lastSection={sessionHistory.lastSection}
                onReset={resetSession}
              />
            )}
            {currentState === 'recommend' && (
              <RecommendContent
                sectionName={recommendedSection.name}
                section={recommendedSection.section}
                reason={recommendedSection.reason}
                accuracy={recommendedSection.accuracy}
              />
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation Arrows */}
        {availableStates.length > 1 && (
          <>
            <button
              onClick={goPrev}
              className="absolute left-2 top-1/2 -translate-y-1/2 p-1 text-muted-foreground hover:text-primary transition-colors"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={goNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-muted-foreground hover:text-primary transition-colors"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </>
        )}
      </div>
    </div>
  );
}

// Onboarding Card Content
function OnboardingContent() {
  return (
    <div className="text-center sm:text-left">
      <div className="flex items-center gap-2 mb-3">
        <Sparkles className="h-5 w-5 text-primary" />
        <h3 className="font-bold text-lg uppercase tracking-wide text-primary">
          Welcome to GMAT Mastery
        </h3>
      </div>
      <p className="text-muted-foreground text-sm mb-4">
        New here? Start with the basics to build your foundation.
      </p>
      <ol className="text-sm text-foreground/80 space-y-1.5 mb-5 list-inside">
        <li className="flex items-center gap-2">
          <span className="text-primary font-mono">1.</span>
          <span>Set your goals in <Link to="/profile" className="text-primary hover:underline">Profile</Link></span>
        </li>
        <li className="flex items-center gap-2">
          <span className="text-primary font-mono">2.</span>
          <span>Learn a technique in <Link to="/learn" className="text-primary hover:underline">Learn</Link></span>
        </li>
        <li className="flex items-center gap-2">
          <span className="text-primary font-mono">3.</span>
          <span>Practice questions to earn XP</span>
        </li>
      </ol>
      <div className="flex flex-wrap gap-3">
        <Link to="/learn">
          <Button className="gap-2">
            <BookOpen className="h-4 w-4" />
            Start Learning
          </Button>
        </Link>
        <Link to="/profile">
          <Button variant="outline" className="gap-2">
            <User className="h-4 w-4" />
            Set Goals
          </Button>
        </Link>
      </div>
    </div>
  );
}

// Continue Session Card Content
function ContinueContent({
  lastSectionName,
  timeSinceLastPractice,
  questionsInSession,
  sessionAccuracy,
  lastSection,
  onReset,
}: {
  lastSectionName: string | null;
  timeSinceLastPractice: string | null;
  questionsInSession: number;
  sessionAccuracy: number;
  lastSection: GMATSection | null;
  onReset: () => void;
}) {
  return (
    <div className="text-center sm:text-left">
      <div className="flex items-center gap-2 mb-3">
        <RotateCcw className="h-5 w-5 text-primary" />
        <h3 className="font-bold text-lg uppercase tracking-wide text-primary">
          Pick Up Where You Left Off
        </h3>
      </div>
      <p className="text-muted-foreground text-sm mb-2">
        Last session: <span className="text-foreground font-medium">{lastSectionName}</span>{' '}
        <span className="text-muted-foreground">({timeSinceLastPractice})</span>
      </p>
      <p className="text-sm text-foreground/80 mb-5">
        Progress: <span className="font-semibold">{questionsInSession}</span> questions •{' '}
        <span className="font-semibold">{sessionAccuracy}%</span> accuracy
      </p>
      <div className="flex flex-wrap gap-3">
        <Link to={`/practice?section=${lastSection || 'quantitative'}`}>
          <Button className="gap-2">
            <ArrowRight className="h-4 w-4" />
            Continue Session
          </Button>
        </Link>
        <Button variant="outline" className="gap-2" onClick={onReset}>
          <Shuffle className="h-4 w-4" />
          Start Fresh
        </Button>
      </div>
    </div>
  );
}

// Recommendation Card Content
function RecommendContent({
  sectionName,
  section,
  reason,
  accuracy,
}: {
  sectionName: string;
  section: GMATSection;
  reason: string;
  accuracy: number | null;
}) {
  return (
    <div className="text-center sm:text-left">
      <div className="flex items-center gap-2 mb-3">
        <Target className="h-5 w-5 text-primary" />
        <h3 className="font-bold text-lg uppercase tracking-wide text-primary">
          Try Something New
        </h3>
      </div>
      <p className="text-muted-foreground text-sm mb-2">
        Based on your progress, we recommend:
      </p>
      <div className="flex items-center gap-3 mb-4 p-3 rounded-lg bg-primary/10 border border-primary/30">
        <div className="p-2 rounded-lg bg-primary/20">
          <Target className="h-5 w-5 text-primary" />
        </div>
        <div>
          <p className="font-semibold text-foreground">{sectionName}</p>
          <p className="text-xs text-muted-foreground">
            {accuracy !== null ? (
              <>This section {reason} • {accuracy}% accuracy</>
            ) : (
              <>This section is your {reason}</>
            )}
          </p>
        </div>
      </div>
      <div className="flex flex-wrap gap-3">
        <Link to={`/practice?section=${section}`}>
          <Button className="gap-2">
            <ArrowRight className="h-4 w-4" />
            Practice Now
          </Button>
        </Link>
        <Link to="/questions">
          <Button variant="outline" className="gap-2">
            <Shuffle className="h-4 w-4" />
            Browse Questions
          </Button>
        </Link>
      </div>
    </div>
  );
}
