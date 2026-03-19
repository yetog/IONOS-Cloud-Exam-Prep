import { motion } from 'framer-motion';
import { ArrowLeft, Swords, Trophy, Target } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { SkillsPanel } from '@/components/SkillsPanel';
import { useSkills } from '@/hooks/useSkills';

export default function SkillsPage() {
  const { totalSkillXP, masteredSkillsCount, allSkills } = useSkills();

  return (
    <div className="min-h-screen bg-background bg-grid">
      <div className="fixed inset-0 bg-gradient-radial from-primary/5 via-transparent to-transparent pointer-events-none" />
      
      <div className="relative z-10 container mx-auto px-4 py-8 max-w-4xl">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-6"
        >
          <Link to="/profile">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Profile
            </Button>
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-primary/10">
              <Swords className="h-6 w-6 text-primary" />
            </div>
            <h1 className="text-3xl font-bold text-foreground">Skill Mastery</h1>
          </div>
          <p className="text-muted-foreground">
            Master these {allSkills.length} skills to dominate the GMAT. Level up by practicing questions and achieving accuracy targets.
          </p>
        </motion.div>

        {/* Hero Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-3 gap-4 mb-8"
        >
          <div className="glass rounded-xl p-4 text-center">
            <div className="flex items-center justify-center gap-2 mb-1">
              <Target className="h-5 w-5 text-primary" />
            </div>
            <p className="text-3xl font-bold text-primary">{totalSkillXP.toLocaleString()}</p>
            <p className="text-sm text-muted-foreground">Skill XP</p>
          </div>
          <div className="glass rounded-xl p-4 text-center">
            <div className="flex items-center justify-center gap-2 mb-1">
              <Trophy className="h-5 w-5 text-amber-400" />
            </div>
            <p className="text-3xl font-bold text-amber-400">{masteredSkillsCount}</p>
            <p className="text-sm text-muted-foreground">Mastered</p>
          </div>
          <div className="glass rounded-xl p-4 text-center">
            <div className="flex items-center justify-center gap-2 mb-1">
              <Swords className="h-5 w-5 text-foreground" />
            </div>
            <p className="text-3xl font-bold text-foreground">{allSkills.length}</p>
            <p className="text-sm text-muted-foreground">Total Skills</p>
          </div>
        </motion.div>

        {/* Skills Panel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <SkillsPanel />
        </motion.div>

        {/* Legend */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-8 glass rounded-xl p-4"
        >
          <h3 className="text-sm font-semibold text-foreground mb-3">Skill Levels</h3>
          <div className="flex flex-wrap gap-4 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-gray-500" />
              <span className="text-muted-foreground">Novice (0-24 XP)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-emerald-500" />
              <span className="text-muted-foreground">Apprentice (25-74 XP)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-500" />
              <span className="text-muted-foreground">Journeyman (75-174 XP)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-purple-500" />
              <span className="text-muted-foreground">Expert (175-349 XP)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-amber-500" />
              <span className="text-muted-foreground">Master (350+ XP)</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

