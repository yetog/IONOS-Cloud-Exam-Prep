import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Swords, 
  Trophy, 
  Flame, 
  Calendar, 
  ChevronRight,
  Target,
  BookOpen,
  FileText,
  Settings,
  Zap,
  CheckCircle,
  Circle
} from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { useProfile } from '@/hooks/useProfile';
import { useProgress } from '@/hooks/useProgress';
import { useSkills } from '@/hooks/useSkills';
import { AttributeBar } from './AttributeBar';
import { EquipmentSlot } from './EquipmentSlot';
import { MateriaIndicator } from './MateriaIndicator';
import { DailyMission } from './DailyMission';
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

// Map skill level to materia count (1-5)
function getMateriaCount(level: string): number {
  switch (level) {
    case 'novice': return 1;
    case 'apprentice': return 2;
    case 'journeyman': return 3;
    case 'expert': return 4;
    case 'master': return 5;
    default: return 0;
  }
}

export function FF7ProfilePanel() {
  const { 
    profile, 
    daysUntilTest, 
    memberSinceDays,
    readinessScore,
    insights,
  } = useProfile();
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

  const avgTimePerformance = progress.totalQuestionsAnswered > 0 ? 70 : 0;
  const playerClass = getPlayerClass(quantAccuracy, verbalAccuracy, irAccuracy, avgTimePerformance);

  // Get top 2 skills for equipped focus
  const equippedFocus = topSkills.slice(0, 2);

  // Milestones
  const milestones = [
    { label: 'First Blood', achieved: progress.totalCorrect >= 1, icon: Zap },
    { label: '10 Questions', achieved: progress.totalQuestionsAnswered >= 10, icon: Target },
    { label: '50 Questions', achieved: progress.totalQuestionsAnswered >= 50, icon: Target },
    { label: '7-Day Streak', achieved: progress.longestStreak >= 7, icon: Flame },
    { label: '100 Questions', achieved: progress.totalQuestionsAnswered >= 100, icon: Trophy },
  ];

  return (
    <div className="min-h-screen bg-background bg-grid">
      <div className="fixed inset-0 bg-gradient-radial from-primary/5 via-transparent to-transparent pointer-events-none" />
      
      <div className="relative z-10 container mx-auto px-4 py-6 max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-6"
        >
          <Link to="/">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Dashboard
            </Button>
          </Link>
          <Button variant="ghost" size="sm" className="gap-2">
            <Settings className="h-4 w-4" />
            Settings
          </Button>
        </motion.div>

        {/* Main FF7R Grid Layout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid lg:grid-cols-[240px_1fr_280px] gap-4"
        >
          {/* Left Column - Party Modes */}
          <div className="ff7-panel p-4 space-y-4">
            <h3 className="ff7-header">Party Modes</h3>
            
            <div className="space-y-2">
              <Link to="/practice">
                <div className="group flex items-center gap-3 p-3 rounded-lg hover:bg-primary/10 transition-colors cursor-pointer">
                  <div className="p-2 rounded-lg bg-primary/20 text-primary group-hover:bg-primary/30">
                    <Swords className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-foreground text-sm">Practice</p>
                    <p className="text-xs text-muted-foreground">Timed Drills</p>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary" />
                </div>
              </Link>

              <Link to="/learn">
                <div className="group flex items-center gap-3 p-3 rounded-lg hover:bg-primary/10 transition-colors cursor-pointer">
                  <div className="p-2 rounded-lg bg-primary/20 text-primary group-hover:bg-primary/30">
                    <BookOpen className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-foreground text-sm">Learn</p>
                    <p className="text-xs text-muted-foreground">Techniques</p>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary" />
                </div>
              </Link>

              <Link to="/notes">
                <div className="group flex items-center gap-3 p-3 rounded-lg hover:bg-primary/10 transition-colors cursor-pointer">
                  <div className="p-2 rounded-lg bg-primary/20 text-primary group-hover:bg-primary/30">
                    <FileText className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-foreground text-sm">Notes</p>
                    <p className="text-xs text-muted-foreground">Insights</p>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary" />
                </div>
              </Link>
            </div>

            <div className="border-t border-primary/20 pt-4">
              <Link to="/skills">
                <Button variant="outline" size="sm" className="w-full gap-2">
                  <Trophy className="h-4 w-4" />
                  View Skills
                </Button>
              </Link>
            </div>
          </div>

          {/* Center Column - Focus & Mission */}
          <div className="space-y-4">
            {/* Equipped Focus */}
            <div className="ff7-panel p-4">
              <h3 className="ff7-header mb-4">Equipped Focus</h3>
              <div className="space-y-3">
                {equippedFocus.length > 0 ? (
                  equippedFocus.map(({ skill, progress: skillProgress }) => (
                    <EquipmentSlot
                      key={skill.id}
                      name={skill.name}
                      description={`${skillProgress.level} • ${skillProgress.xp} XP`}
                      materiaFilled={getMateriaCount(skillProgress.level)}
                      isActive={true}
                    />
                  ))
                ) : (
                  <>
                    <EquipmentSlot
                      name="No Focus Set"
                      description="Start practicing to unlock skills"
                      materiaFilled={0}
                    />
                    <EquipmentSlot
                      name="Recommended: Data Sufficiency"
                      description="Great for beginners"
                      materiaFilled={0}
                    />
                  </>
                )}
              </div>
            </div>

            {/* Today's Mission */}
            <div className="ff7-panel p-4">
              <DailyMission />
            </div>

            {/* Attributes */}
            <div className="ff7-panel p-4">
              <h3 className="ff7-header mb-4">Attributes</h3>
              <div className="space-y-3">
                <AttributeBar name="STR" label="Quant" value={quantAccuracy} color="red" />
                <AttributeBar name="INT" label="Verbal" value={verbalAccuracy} color="blue" />
                <AttributeBar name="WIS" label="IR" value={irAccuracy} color="purple" />
                <AttributeBar name="DEX" label="Speed" value={avgTimePerformance} color="yellow" />
                <AttributeBar 
                  name="CON" 
                  label="Streak" 
                  value={Math.min(progress.currentStreak * 10, 100)} 
                  displayValue={`${progress.currentStreak}d`}
                  color="orange" 
                />
              </div>

              {/* Strengths & Weaknesses */}
              <div className="grid grid-cols-2 gap-4 mt-6 pt-4 border-t border-primary/20">
                <div>
                  <h4 className="text-xs uppercase tracking-wide text-muted-foreground mb-2">Strengths</h4>
                  {insights.strongestSection ? (
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-success" />
                      <span className="text-foreground">{insights.strongestSection.section}</span>
                      <span className="text-muted-foreground">{insights.strongestSection.accuracy}%</span>
                    </div>
                  ) : (
                    <p className="text-xs text-muted-foreground">Practice more to discover</p>
                  )}
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-wide text-muted-foreground mb-2">Weaknesses</h4>
                  {insights.weakestSection ? (
                    <div className="flex items-center gap-2 text-sm">
                      <Target className="h-4 w-4 text-destructive" />
                      <span className="text-foreground">{insights.weakestSection.section}</span>
                      <span className="text-muted-foreground">{insights.weakestSection.accuracy}%</span>
                    </div>
                  ) : (
                    <p className="text-xs text-muted-foreground">Practice more to discover</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Character Panel */}
          <div className="space-y-4">
            {/* Character Portrait */}
            <div className="ff7-panel p-4 text-center">
              {/* Avatar */}
              <div className="relative inline-block mb-4">
                <div className="absolute -inset-2 bg-gradient-to-br from-primary/30 to-primary/10 rounded-full blur-md" />
                <Avatar className="relative h-24 w-24 border-2 border-primary/50">
                  {profile.avatarUrl ? (
                    <AvatarImage src={profile.avatarUrl} alt={profile.displayName} />
                  ) : (
                    <AvatarFallback className="bg-primary/20 text-primary text-3xl font-bold">
                      {profile.displayName.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  )}
                </Avatar>
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-card border border-primary rounded-full px-2 py-0.5 text-xs font-bold text-primary">
                  Lv.{progress.level}
                </div>
              </div>

              {/* Name & Class */}
              <h2 className="text-xl font-bold text-foreground flex items-center justify-center gap-2">
                {profile.displayName}
                <span>{playerClass.icon}</span>
              </h2>
              <p className="text-sm text-primary font-medium mb-4">{playerClass.name}</p>

              {/* XP Bar */}
              <div className="mb-4">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-muted-foreground">EXP</span>
                  <span className="text-primary font-mono">
                    {xpProgress.current} / {xpProgress.required}
                  </span>
                </div>
                <Progress value={xpProgress.percentage} className="h-2" />
              </div>

              {/* Quick Stats */}
              <div className="flex justify-center gap-4 text-sm">
                <div className="flex items-center gap-1.5 text-orange-400">
                  <Flame className="h-4 w-4" />
                  <span className="font-semibold">{progress.currentStreak}</span>
                  <span className="text-xs text-muted-foreground">day</span>
                </div>
                {daysUntilTest !== null && daysUntilTest > 0 && (
                  <div className="flex items-center gap-1.5 text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span className="font-medium">{daysUntilTest}</span>
                    <span className="text-xs">days</span>
                  </div>
                )}
              </div>
            </div>

            {/* Timeline & Milestones */}
            <div className="ff7-panel p-4">
              <h3 className="ff7-header mb-4">Timeline</h3>
              
              {/* Readiness */}
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-muted-foreground">Readiness</span>
                  <span className="font-semibold text-foreground">{readinessScore}%</span>
                </div>
                <Progress value={readinessScore} className="h-2" />
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-2 text-sm mb-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Questions:</span>
                  <span className="font-mono">{progress.totalQuestionsAnswered}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Accuracy:</span>
                  <span className="font-mono">
                    {progress.totalQuestionsAnswered > 0 
                      ? Math.round((progress.totalCorrect / progress.totalQuestionsAnswered) * 100)
                      : 0}%
                  </span>
                </div>
              </div>

              {/* Milestones */}
              <h4 className="text-xs uppercase tracking-wide text-muted-foreground mb-2">Milestones</h4>
              <div className="space-y-1.5">
                {milestones.map((m) => (
                  <div key={m.label} className="flex items-center gap-2 text-sm">
                    {m.achieved ? (
                      <CheckCircle className="h-4 w-4 text-success" />
                    ) : (
                      <Circle className="h-4 w-4 text-muted-foreground" />
                    )}
                    <span className={m.achieved ? 'text-foreground' : 'text-muted-foreground'}>
                      {m.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
