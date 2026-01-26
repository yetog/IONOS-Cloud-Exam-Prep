import { motion } from 'framer-motion';
import { icons } from 'lucide-react';
import { Skill, SkillProgress, SKILL_LEVEL_COLORS, getSkillLevelProgress } from '@/types/skills';
import { cn } from '@/lib/utils';

interface SkillBarProps {
  skill: Skill;
  progress: SkillProgress;
  compact?: boolean;
}

export function SkillBar({ skill, progress, compact = false }: SkillBarProps) {
  const levelProgress = getSkillLevelProgress(progress.xp);
  const levelColors = SKILL_LEVEL_COLORS[progress.level];
  const IconComponent = icons[skill.icon as keyof typeof icons];

  if (compact) {
    return (
      <div className="flex items-center gap-3">
        <div className={cn('p-1.5 rounded', levelColors.bg)}>
          {IconComponent && <IconComponent className={cn('h-4 w-4', levelColors.text)} />}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <span className="text-sm font-medium text-foreground truncate">{skill.name}</span>
            <span className={cn('text-xs font-semibold capitalize', levelColors.text)}>
              {progress.level}
            </span>
          </div>
          <div className="h-1.5 bg-muted rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${levelProgress.percentage}%` }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className={cn('h-full rounded-full', {
                'bg-gray-500': progress.level === 'novice',
                'bg-emerald-500': progress.level === 'apprentice',
                'bg-blue-500': progress.level === 'journeyman',
                'bg-purple-500': progress.level === 'expert',
                'bg-amber-500': progress.level === 'master',
              })}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        'p-4 rounded-lg border border-border/50 bg-card/50 hover:bg-card/80 transition-colors',
        levelColors.glow && progress.level === 'master' && 'ring-1 ring-amber-500/30'
      )}
    >
      <div className="flex items-start gap-3">
        <div className={cn('p-2 rounded-lg', levelColors.bg, levelColors.glow)}>
          {IconComponent && <IconComponent className={cn('h-5 w-5', levelColors.text)} />}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <h4 className="font-semibold text-foreground">{skill.name}</h4>
            <span className={cn('text-xs font-bold uppercase tracking-wide', levelColors.text)}>
              {progress.level}
            </span>
          </div>
          <p className="text-xs text-muted-foreground mb-2 line-clamp-1">{skill.description}</p>
          
          {/* Progress bar */}
          <div className="relative h-2 bg-muted rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${levelProgress.percentage}%` }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              className={cn('h-full rounded-full', {
                'bg-gray-500': progress.level === 'novice',
                'bg-emerald-500': progress.level === 'apprentice',
                'bg-blue-500': progress.level === 'journeyman',
                'bg-purple-500': progress.level === 'expert',
                'bg-gradient-to-r from-amber-500 to-yellow-400': progress.level === 'master',
              })}
            />
          </div>
          
          {/* XP info */}
          <div className="flex items-center justify-between mt-1.5 text-xs text-muted-foreground">
            <span>{progress.xp} XP</span>
            <span>
              {progress.questionsAttempted > 0
                ? `${Math.round((progress.correctAnswers / progress.questionsAttempted) * 100)}% accuracy`
                : 'Not started'}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
