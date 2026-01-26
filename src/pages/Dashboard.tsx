import { motion } from 'framer-motion';
import { Flame, Trophy, Target, Clock, Zap, TrendingUp } from 'lucide-react';
import { useProgress } from '@/hooks/useProgress';
import { useQuestions } from '@/hooks/useQuestions';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { SECTION_INFO, GMATSection } from '@/types/gmat';
import { SectionCard } from '@/components/SectionCard';
import { StatsCard } from '@/components/StatsCard';
import { AchievementBadge } from '@/components/AchievementBadge';
import { ACHIEVEMENTS } from '@/types/gmat';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function Dashboard() {
  const { progress, achievements, xpProgress, getSectionAccuracy } = useProgress();
  const { getQuestionCount } = useQuestions();

  const sections: GMATSection[] = ['quantitative', 'verbal', 'integrated-reasoning'];

  const recentAchievements = ACHIEVEMENTS.filter(a => 
    achievements.unlocked.includes(a.id)
  ).slice(-3);

  return (
    <div className="min-h-screen bg-background bg-grid">
      {/* Background gradient */}
      <div className="fixed inset-0 bg-gradient-radial from-primary/5 via-transparent to-transparent pointer-events-none" />
      
      <div className="relative z-10 container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-2">
            GMAT <span className="text-primary text-glow">Mastery</span>
          </h1>
          <p className="text-muted-foreground text-lg">
            Train like a champion. Think like a strategist.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="space-y-8"
        >
          {/* Top Stats Row */}
          <motion.div variants={item} className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {/* Level & XP */}
            <Card className="glass hover-lift col-span-2 md:col-span-1">
              <CardContent className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 rounded-lg bg-primary/20">
                    <Trophy className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wide">Level</p>
                    <p className="text-2xl font-bold text-foreground">{progress.level}</p>
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>{xpProgress.current} XP</span>
                    <span>{xpProgress.required} XP</span>
                  </div>
                  <Progress value={xpProgress.percentage} className="h-2" />
                </div>
              </CardContent>
            </Card>

            {/* Streak */}
            <Card className={`glass hover-lift ${progress.currentStreak > 0 ? 'border-primary/50 pulse-glow' : ''}`}>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${progress.currentStreak > 0 ? 'bg-orange-500/20' : 'bg-muted'}`}>
                    <Flame className={`w-5 h-5 ${progress.currentStreak > 0 ? 'text-orange-500' : 'text-muted-foreground'}`} />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wide">Streak</p>
                    <p className="text-2xl font-bold text-foreground">{progress.currentStreak}</p>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Best: {progress.longestStreak} days
                </p>
              </CardContent>
            </Card>

            {/* Total XP */}
            <Card className="glass hover-lift">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-gold/20">
                    <Zap className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wide">Total XP</p>
                    <p className="text-2xl font-bold text-foreground">{progress.totalXP.toLocaleString()}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Accuracy */}
            <Card className="glass hover-lift">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/20">
                    <Target className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wide">Accuracy</p>
                    <p className="text-2xl font-bold text-foreground">
                      {progress.totalQuestionsAnswered > 0 
                        ? Math.round((progress.totalCorrect / progress.totalQuestionsAnswered) * 100)
                        : 0}%
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Quick Practice Button */}
          <motion.div variants={item}>
            <Link to="/practice">
              <Button 
                size="lg" 
                className="w-full md:w-auto bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-lg py-6 px-8 glow-primary"
              >
                <Zap className="w-5 h-5 mr-2" />
                Start Quick Practice
              </Button>
            </Link>
          </motion.div>

          {/* Section Cards */}
          <motion.div variants={item}>
            <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              Practice Sections
            </h2>
            <div className="grid md:grid-cols-3 gap-4">
              {sections.map((section) => (
                <SectionCard
                  key={section}
                  section={section}
                  info={SECTION_INFO[section]}
                  accuracy={getSectionAccuracy(section)}
                  questionCount={getQuestionCount(section)}
                  stats={progress.sectionStats[section]}
                />
              ))}
            </div>
          </motion.div>

          {/* Stats Grid */}
          <motion.div variants={item}>
            <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5 text-primary" />
              Your Stats
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <StatsCard
                icon={Target}
                label="Questions"
                value={progress.totalQuestionsAnswered}
              />
              <StatsCard
                icon={Zap}
                label="Correct"
                value={progress.totalCorrect}
              />
              <StatsCard
                icon={Clock}
                label="Time Spent"
                value={`${Math.floor(progress.totalTimeSpent / 60)}m`}
              />
              <StatsCard
                icon={Trophy}
                label="Achievements"
                value={achievements.unlocked.length}
              />
            </div>
          </motion.div>

          {/* Recent Achievements */}
          {recentAchievements.length > 0 && (
            <motion.div variants={item}>
              <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                <Trophy className="w-5 h-5 text-gold" />
                Recent Achievements
              </h2>
              <div className="flex flex-wrap gap-4">
                {recentAchievements.map((achievement) => (
                  <AchievementBadge
                    key={achievement.id}
                    achievement={achievement}
                    unlocked={true}
                  />
                ))}
              </div>
            </motion.div>
          )}

          {/* All Achievements Preview */}
          <motion.div variants={item}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
                <Trophy className="w-5 h-5 text-primary" />
                All Achievements
              </h2>
              <Link to="/achievements">
                <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                  View All →
                </Button>
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {ACHIEVEMENTS.slice(0, 6).map((achievement) => (
                <AchievementBadge
                  key={achievement.id}
                  achievement={achievement}
                  unlocked={achievements.unlocked.includes(achievement.id)}
                  compact
                />
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
