import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Trophy, Zap, Flame, Calendar, Swords, ChevronRight } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { useProfile } from '@/hooks/useProfile';
import { useProgress } from '@/hooks/useProgress';
import { useSkills } from '@/hooks/useSkills';
import { SkillBar } from './SkillBar';
import { cn } from '@/lib/utils';

// Determine player "class" based on performance
function getPlayerClass(
  quantAccuracy: number,
  verbalAccuracy: number,
  irAccuracy: number,
  avgTimePerformance: number
): { name: string; icon: string } {
  const quant = quantAccuracy || 0;
  const verbal = verbalAccuracy || 0;
  const ir = irAccuracy || 0;

  if (avgTimePerformance > 85) {
    return { name: 'Speed Demon', icon: '⚡' };
  }
  if (quant > verbal + 10 && quant > ir) {
    return { name: 'Quant Warrior', icon: '⚔️' };
  }
  if (verbal > quant + 10 && verbal > ir) {
    return { name: 'Verbal Virtuoso', icon: '📚' };
  }
  if (ir > quant && ir > verbal && ir > 60) {
    return { name: 'IR Specialist', icon: '📊' };
  }
  return { name: 'GMAT Strategist', icon: '🎯' };
}

export function ProfileCard() {
  const { profile, daysUntilTest } = useProfile();
  const { progress, xpProgress } = useProgress();
  const { topSkills, getSkillProgress } = useSkills();

  // Calculate section accuracies
  const quantStats = progress.sectionStats['quantitative'];
  const verbalStats = progress.sectionStats['verbal'];
  const irStats = progress.sectionStats['integrated-reasoning'];

  const quantAccuracy = quantStats?.questionsAnswered > 0
    ? Math.round((quantStats.correct / quantStats.questionsAnswered) * 100)
    : 0;
  const verbalAccuracy = verbalStats?.questionsAnswered > 0
    ? Math.round((verbalStats.correct / verbalStats.questionsAnswered) * 100)
    : 0;
  const irAccuracy = irStats?.questionsAnswered > 0
    ? Math.round((irStats.correct / irStats.questionsAnswered) * 100)
    : 0;

  // Calculate speed performance (% under target time)
  const avgTimePerformance = progress.totalQuestionsAnswered > 0 ? 70 : 0; // Placeholder

  const playerClass = getPlayerClass(quantAccuracy, verbalAccuracy, irAccuracy, avgTimePerformance);

  // RPG Stats
  const stats = [
    { name: 'STR', label: 'Quant', value: quantAccuracy, color: 'text-red-400' },
    { name: 'INT', label: 'Verbal', value: verbalAccuracy, color: 'text-blue-400' },
    { name: 'WIS', label: 'IR', value: irAccuracy, color: 'text-purple-400' },
    { name: 'DEX', label: 'Speed', value: avgTimePerformance, color: 'text-yellow-400' },
    { name: 'CON', label: 'Streak', value: Math.min(progress.currentStreak * 10, 100), color: 'text-orange-400' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative overflow-hidden"
    >
      {/* Outer Frame */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-primary/10 rounded-xl" />
      <div className="relative border-2 border-primary/40 rounded-xl bg-card/90 backdrop-blur-sm overflow-hidden">
        {/* Corner Accents */}
        <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-primary" />
        <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-primary" />
        <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-primary" />
        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-primary" />

        {/* Header Section */}
        <div className="p-4 border-b border-primary/20">
          <div className="flex items-center gap-4">
            {/* Avatar */}
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-br from-primary/50 to-primary/20 rounded-full blur-sm" />
              <Avatar className="relative h-16 w-16 border-2 border-primary/50">
                {profile.avatarUrl ? (
                  <AvatarImage src={profile.avatarUrl} alt={profile.displayName} />
                ) : (
                  <AvatarFallback className="bg-primary/20 text-primary text-xl font-bold">
                    {profile.displayName.charAt(0).toUpperCase()}
                  </AvatarFallback>
                )}
              </Avatar>
              <div className="absolute -bottom-1 -right-1 bg-card border border-primary rounded-full px-1.5 py-0.5 text-xs font-bold text-primary">
                {progress.level}
              </div>
            </div>

            {/* Player Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-foreground truncate">{profile.displayName}</h2>
                <span className="text-lg">{playerClass.icon}</span>
              </div>
              <p className="text-sm text-primary font-medium">{playerClass.name}</p>
              
              {/* XP Bar */}
              <div className="mt-2">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-muted-foreground">Level {progress.level}</span>
                  <span className="text-primary font-semibold">
                    {progress.totalXP.toLocaleString()} XP
                  </span>
                </div>
                <Progress value={xpProgress.percentage} className="h-2" />
              </div>
            </div>

            {/* Quick Stats */}
            <div className="hidden sm:flex flex-col items-end gap-1 text-sm">
              <div className="flex items-center gap-1.5 text-orange-400">
                <Flame className="h-4 w-4" />
                <span className="font-semibold">{progress.currentStreak}</span>
                <span className="text-muted-foreground text-xs">day streak</span>
              </div>
              {daysUntilTest !== null && daysUntilTest > 0 && (
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span className="font-medium">{daysUntilTest}</span>
                  <span className="text-xs">days to test</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="p-4 border-b border-primary/20">
          <div className="flex items-center gap-2 mb-3">
            <Swords className="h-4 w-4 text-primary" />
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wide">Stats</h3>
          </div>
          <div className="grid grid-cols-5 gap-2">
            {stats.map((stat) => (
              <div key={stat.name} className="text-center">
                <div className={cn('text-lg font-bold', stat.color)}>{stat.name}</div>
                <div className="text-xs text-muted-foreground mb-1">{stat.label}</div>
                <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${stat.value}%` }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className={cn('h-full rounded-full', {
                      'bg-red-500': stat.name === 'STR',
                      'bg-blue-500': stat.name === 'INT',
                      'bg-purple-500': stat.name === 'WIS',
                      'bg-yellow-500': stat.name === 'DEX',
                      'bg-orange-500': stat.name === 'CON',
                    })}
                  />
                </div>
                <div className="text-xs font-medium mt-1">
                  {stat.name === 'CON' ? `${progress.currentStreak}d` : `${stat.value}%`}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Skills Section */}
        <div className="p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Trophy className="h-4 w-4 text-primary" />
              <h3 className="text-sm font-semibold text-foreground uppercase tracking-wide">Top Skills</h3>
            </div>
            <Link to="/skills">
              <Button variant="ghost" size="sm" className="h-6 text-xs gap-1 text-primary hover:text-primary/80">
                View All
                <ChevronRight className="h-3 w-3" />
              </Button>
            </Link>
          </div>
          
          {topSkills.length > 0 ? (
            <div className="space-y-2">
              {topSkills.slice(0, 3).map(({ skill, progress: skillProgress }) => (
                <SkillBar key={skill.id} skill={skill} progress={skillProgress} compact />
              ))}
            </div>
          ) : (
            <div className="text-center py-4 text-sm text-muted-foreground">
              <Zap className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p>Start practicing to unlock skills!</p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
