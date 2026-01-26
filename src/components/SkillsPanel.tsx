import { useState } from 'react';
import { motion } from 'framer-motion';
import { icons, ChevronDown, ChevronRight, Award } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useSkills } from '@/hooks/useSkills';
import { SkillBar } from './SkillBar';
import { SkillCategory, SKILL_CATEGORIES, SKILLS } from '@/types/skills';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { cn } from '@/lib/utils';

export function SkillsPanel() {
  const { skillsByCategory, getSkillProgress, totalSkillXP, masteredSkillsCount } = useSkills();
  const [expandedCategories, setExpandedCategories] = useState<Record<SkillCategory, boolean>>({
    'strategic-foundations': true,
    'quantitative-combat': true,
    'verbal-warfare': true,
    'data-integration': true,
    'mental-fortitude': true,
  });

  const toggleCategory = (category: SkillCategory) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  // Calculate category progress
  const getCategoryProgress = (category: SkillCategory) => {
    const skills = skillsByCategory[category];
    if (skills.length === 0) return { totalXP: 0, avgLevel: 0, masteredCount: 0 };

    const progresses = skills.map((skill) => getSkillProgress(skill.id));
    const totalXP = progresses.reduce((sum, p) => sum + p.xp, 0);
    const masteredCount = progresses.filter((p) => p.level === 'master').length;

    return {
      totalXP,
      avgProgress: (totalXP / (skills.length * 350)) * 100, // 350 = master threshold
      masteredCount,
      totalSkills: skills.length,
    };
  };

  const categories = Object.keys(SKILL_CATEGORIES) as SkillCategory[];

  return (
    <div className="space-y-6">
      {/* Summary Stats */}
      <Card className="glass">
        <CardContent className="p-4">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-primary">{totalSkillXP.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground">Total Skill XP</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-amber-400">{masteredSkillsCount}</p>
              <p className="text-xs text-muted-foreground">Skills Mastered</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{SKILLS.length}</p>
              <p className="text-xs text-muted-foreground">Total Skills</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Skill Categories */}
      {categories.map((categoryId) => {
        const categoryInfo = SKILL_CATEGORIES[categoryId];
        const categoryProgress = getCategoryProgress(categoryId);
        const skills = skillsByCategory[categoryId];
        const isExpanded = expandedCategories[categoryId];
        const IconComponent = icons[categoryInfo.icon as keyof typeof icons];

        return (
          <Card key={categoryId} className="glass overflow-hidden">
            <Collapsible open={isExpanded} onOpenChange={() => toggleCategory(categoryId)}>
              <CollapsibleTrigger asChild>
                <CardHeader className="cursor-pointer hover:bg-primary/5 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-primary/10">
                        {IconComponent && <IconComponent className="h-5 w-5 text-primary" />}
                      </div>
                      <div>
                        <CardTitle className="text-base">{categoryInfo.name}</CardTitle>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {categoryInfo.description}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right hidden sm:block">
                        <p className="text-sm font-semibold text-foreground">
                          {categoryProgress.masteredCount}/{categoryProgress.totalSkills}
                        </p>
                        <p className="text-xs text-muted-foreground">mastered</p>
                      </div>
                      <div className="w-24 hidden sm:block">
                        <Progress value={categoryProgress.avgProgress} className="h-2" />
                      </div>
                      {isExpanded ? (
                        <ChevronDown className="h-5 w-5 text-muted-foreground" />
                      ) : (
                        <ChevronRight className="h-5 w-5 text-muted-foreground" />
                      )}
                    </div>
                  </div>
                </CardHeader>
              </CollapsibleTrigger>

              <CollapsibleContent>
                <CardContent className="pt-0">
                  <div className="grid gap-3 sm:grid-cols-2">
                    {skills.map((skill) => (
                      <SkillBar
                        key={skill.id}
                        skill={skill}
                        progress={getSkillProgress(skill.id)}
                      />
                    ))}
                  </div>
                </CardContent>
              </CollapsibleContent>
            </Collapsible>
          </Card>
        );
      })}
    </div>
  );
}
