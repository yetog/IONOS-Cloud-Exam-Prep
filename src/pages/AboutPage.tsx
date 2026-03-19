import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, Target, Clock, Zap, Brain, Flame, Trophy, Lightbulb, CheckCircle, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background bg-grid">
      <div className="fixed inset-0 bg-gradient-radial from-primary/5 via-transparent to-transparent pointer-events-none" />
      
      <div className="relative z-10 container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Link to="/">
            <Button variant="ghost" size="sm" className="mb-4 text-muted-foreground hover:text-foreground">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
          
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-2">
            About <span className="text-primary text-glow">GMAT Mastery</span>
          </h1>
          <p className="text-lg text-muted-foreground">
            Train like a champion. Think like a strategist.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="space-y-8"
        >
          {/* The Mission */}
          <motion.div variants={item}>
            <Card className="glass overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-primary/50 to-transparent" />
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl">
                  <Target className="w-6 h-6 text-primary" />
                  The Mission
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-foreground leading-relaxed">
                  This application was born from a simple realization: <span className="text-primary font-semibold">preparing for the GMAT is like training for a timed chess match</span>.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Both require precision, focus, and high-quality decision-making under pressure. Both reward pattern recognition and punish careless mistakes. And both can be mastered through deliberate practice.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  As I studied for the GMAT, I realized it's all about using <span className="text-foreground font-medium">inductive and deductive reasoning</span>—understanding how to nail these questions down, figuring out the right tactics, and training yourself to answer in a timely manner without wasting precious seconds.
                </p>
                <div className="flex items-center gap-2 mt-4">
                  <Badge variant="secondary" className="bg-primary/10 text-primary">
                    9-Month Journey
                  </Badge>
                  <Badge variant="secondary" className="bg-primary/10 text-primary">
                    Deliberate Practice
                  </Badge>
                  <Badge variant="secondary" className="bg-primary/10 text-primary">
                    Pattern Mastery
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* The Philosophy */}
          <motion.div variants={item}>
            <Card className="glass">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl">
                  <Brain className="w-6 h-6 text-primary" />
                  The Philosophy
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-lg bg-primary/20 shrink-0">
                        <Clock className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground">Time is Your Enemy</h4>
                        <p className="text-sm text-muted-foreground">
                          Every question has a target time. Learn to make decisions quickly and move on—dwelling on hard questions costs you easy points elsewhere.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-lg bg-primary/20 shrink-0">
                        <Zap className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground">Repetition Builds Intuition</h4>
                        <p className="text-sm text-muted-foreground">
                          Rack up repetitions until pattern recognition becomes automatic. Your brain should identify question types before you finish reading.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-lg bg-primary/20 shrink-0">
                        <Lightbulb className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground">Analyze Every Mistake</h4>
                        <p className="text-sm text-muted-foreground">
                          Wrong answers are gold. Understanding WHY you missed a question teaches more than getting it right ever could.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-lg bg-primary/20 shrink-0">
                        <Target className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground">Know the Traps</h4>
                        <p className="text-sm text-muted-foreground">
                          The GMAT uses predictable trap answers. Learn to spot them and you'll eliminate wrong choices before they tempt you.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* How to Use This App */}
          <motion.div variants={item}>
            <Card className="glass">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl">
                  <CheckCircle className="w-6 h-6 text-primary" />
                  How to Use This App
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* 3-Mode Workflow */}
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="p-4 rounded-lg bg-muted/30 border border-primary/20">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-2xl font-bold text-primary">1</span>
                      <h4 className="font-semibold text-foreground">Practice</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Drill questions under timed conditions. Build muscle memory for each question type.
                    </p>
                  </div>
                  <div className="p-4 rounded-lg bg-muted/30 border border-primary/20">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-2xl font-bold text-primary">2</span>
                      <h4 className="font-semibold text-foreground">Learn</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Study strategies, identify sub-types, and understand the solution framework for each.
                    </p>
                  </div>
                  <div className="p-4 rounded-lg bg-muted/30 border border-primary/20">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-2xl font-bold text-primary">3</span>
                      <h4 className="font-semibold text-foreground">Notes</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Capture insights, track weak spots, and build your personal playbook.
                    </p>
                  </div>
                </div>

                {/* Recommended Routine */}
                <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                  <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                    <Flame className="w-4 h-4 text-orange-500" />
                    Recommended Daily Routine
                  </h4>
                  <ol className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-primary font-medium">1.</span>
                      Review one technique page (10 min) — focus on a specific question type
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary font-medium">2.</span>
                      Practice 10-15 questions of that type (20-30 min) — timed, no hints first
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary font-medium">3.</span>
                      Review missed questions (10 min) — understand the trap you fell for
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary font-medium">4.</span>
                      Add notes on patterns you noticed (5 min) — build your personal playbook
                    </li>
                  </ol>
                </div>

                {/* XP and Hints */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg bg-muted/30">
                    <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                      <Trophy className="w-4 h-4 text-gold" />
                      XP & Levels
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Earn XP for correct answers. Bonus points for speed and no-hint streaks. Level up to unlock achievements and track your mastery.
                    </p>
                  </div>
                  <div className="p-4 rounded-lg bg-muted/30">
                    <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                      <Lightbulb className="w-4 h-4 text-warning" />
                      Hints System
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Stuck? Reveal strategy hints—but it costs XP. Use hints to learn, then wean yourself off them as you master each type.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* The Vision */}
          <motion.div variants={item}>
            <Card className="glass border-primary/30">
              <CardContent className="p-6">
                <blockquote className="text-lg text-foreground italic border-l-4 border-primary pl-4">
                  "All I have to do is study each individual section, break down all the different types of questions, learn how to solve each type, and give myself a time limit. From there, I can rack up repetition, analyze every mistake, and this will improve my scores. This app is built to help gamify all of this—making test prep feel less like a chore and more like leveling up in a game."
                </blockquote>
              </CardContent>
            </Card>
          </motion.div>

          {/* CTA */}
          <motion.div variants={item} className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/learn">
              <Button size="lg" className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground font-semibold glow-primary">
                Start Learning
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Link to="/practice">
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                Jump into Practice
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

