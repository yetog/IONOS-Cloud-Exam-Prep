import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, Trophy, Zap, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useProgress } from '@/hooks/useProgress';
import { ACHIEVEMENTS } from '@/types/gmat';
import { AchievementBadge } from '@/components/AchievementBadge';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function AchievementsPage() {
  const { achievements } = useProgress();

  const unlockedAchievements = ACHIEVEMENTS.filter(a => 
    achievements.unlocked.includes(a.id)
  );
  const lockedAchievements = ACHIEVEMENTS.filter(a => 
    !achievements.unlocked.includes(a.id)
  );

  const totalXPFromAchievements = unlockedAchievements.reduce(
    (sum, a) => sum + a.xpReward, 
    0
  );

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
          <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-4">
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Link>
          
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
                <Trophy className="w-8 h-8 text-gold" />
                Achievements
              </h1>
              <p className="text-muted-foreground mt-2">
                {achievements.unlocked.length} of {ACHIEVEMENTS.length} unlocked
              </p>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-1 text-gold">
                <Zap className="w-5 h-5" />
                <span className="text-2xl font-bold">{totalXPFromAchievements}</span>
              </div>
              <p className="text-xs text-muted-foreground">XP from achievements</p>
            </div>
          </div>
        </motion.div>

        {/* Unlocked Achievements */}
        {unlockedAchievements.length > 0 && (
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="mb-8"
          >
            <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <Trophy className="w-5 h-5 text-primary" />
              Unlocked ({unlockedAchievements.length})
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {unlockedAchievements.map((achievement) => (
                <motion.div key={achievement.id} variants={item}>
                  <AchievementBadge
                    achievement={achievement}
                    unlocked={true}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Locked Achievements */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
        >
          <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <Lock className="w-5 h-5 text-muted-foreground" />
            Locked ({lockedAchievements.length})
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {lockedAchievements.map((achievement) => (
              <motion.div key={achievement.id} variants={item}>
                <AchievementBadge
                  achievement={achievement}
                  unlocked={false}
                  progress={achievements.progress[achievement.id] || 0}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

