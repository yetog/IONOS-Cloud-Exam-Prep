import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Achievement } from '@/types/gmat';
import { 
  Zap, Timer, Flame, Brain, Target, Award, 
  Calculator, BookOpen, BarChart3, Clock, Lock 
} from 'lucide-react';
import { cn } from '@/lib/utils';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Zap,
  Timer,
  Flame,
  Brain,
  Target,
  Award,
  Calculator,
  BookOpen,
  BarChart3,
  Clock,
};

interface AchievementBadgeProps {
  achievement: Achievement;
  unlocked: boolean;
  compact?: boolean;
  progress?: number;
}

export function AchievementBadge({ achievement, unlocked, compact, progress }: AchievementBadgeProps) {
  const Icon = iconMap[achievement.icon] || Award;

  if (compact) {
    return (
      <motion.div
        whileHover={{ scale: 1.05 }}
        className={cn(
          "relative p-3 rounded-xl text-center transition-all",
          unlocked 
            ? "bg-primary/10 border border-primary/30" 
            : "bg-muted/30 border border-border/50"
        )}
      >
        <div className={cn(
          "mx-auto w-10 h-10 rounded-full flex items-center justify-center mb-2",
          unlocked ? "bg-primary/20" : "bg-muted"
        )}>
          {unlocked ? (
            <Icon className="w-5 h-5 text-primary" />
          ) : (
            <Lock className="w-4 h-4 text-muted-foreground" />
          )}
        </div>
        <p className={cn(
          "text-xs font-medium truncate",
          unlocked ? "text-foreground" : "text-muted-foreground"
        )}>
          {achievement.name}
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.02 }}
    >
      <Card className={cn(
        "overflow-hidden transition-all",
        unlocked 
          ? "glass border-primary/30 glow-primary" 
          : "bg-muted/20 border-border/30"
      )}>
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <div className={cn(
              "p-3 rounded-xl shrink-0",
              unlocked ? "bg-primary/20" : "bg-muted"
            )}>
              {unlocked ? (
                <Icon className="w-6 h-6 text-primary" />
              ) : (
                <Lock className="w-5 h-5 text-muted-foreground" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className={cn(
                "font-semibold mb-1",
                unlocked ? "text-foreground" : "text-muted-foreground"
              )}>
                {achievement.name}
              </h3>
              <p className="text-sm text-muted-foreground">
                {achievement.description}
              </p>
              {unlocked && (
                <div className="mt-2 inline-flex items-center gap-1 text-xs text-gold font-medium">
                  <Zap className="w-3 h-3" />
                  +{achievement.xpReward} XP
                </div>
              )}
              {!unlocked && progress !== undefined && progress > 0 && (
                <div className="mt-2">
                  <div className="flex justify-between text-xs text-muted-foreground mb-1">
                    <span>Progress</span>
                    <span>{progress}/{achievement.requirement}</span>
                  </div>
                  <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary/50 rounded-full transition-all"
                      style={{ width: `${Math.min((progress / achievement.requirement) * 100, 100)}%` }}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
