import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Pencil, Check, X, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { useProfile } from '@/hooks/useProfile';
import { useProgress } from '@/hooks/useProgress';
import { ProfileCard } from '@/components/ProfileCard';
import { GoalsCard } from '@/components/GoalsCard';
import { InsightsCard } from '@/components/InsightsCard';
import { DailyMission } from '@/components/DailyMission';

export default function ProfilePage() {
  const { 
    profile, 
    updateDisplayName, 
    updateAvatar, 
    updateGoals,
    daysUntilTest,
    memberSinceDays,
    todayQuestionsAnswered,
    weeklyTimeSpent,
    insights,
    readinessScore,
  } = useProfile();
  
  const { progress } = useProgress();

  return (
    <div className="min-h-screen bg-background bg-grid">
      <div className="fixed inset-0 bg-gradient-radial from-primary/5 via-transparent to-transparent pointer-events-none" />
      
      <div className="relative z-10 container mx-auto px-4 py-8 max-w-3xl">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-6"
        >
          <Link to="/">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Dashboard
            </Button>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* RPG-Style Profile Card */}
          <ProfileCard />

          {/* Today's Mission */}
          <DailyMission />

          {/* Goals Card */}
          <GoalsCard
            goals={profile.goals}
            onUpdateGoals={updateGoals}
            todayQuestionsAnswered={todayQuestionsAnswered}
            weeklyTimeSpent={weeklyTimeSpent}
            daysUntilTest={daysUntilTest}
          />

          {/* Test Insights */}
          <InsightsCard insights={insights} />

          {/* Study Timeline */}
          <Card className="glass">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                Study Timeline
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {daysUntilTest !== null && daysUntilTest > 0 ? (
                <>
                  <div className="text-center">
                    <p className="text-4xl font-bold text-primary">{daysUntilTest}</p>
                    <p className="text-sm text-muted-foreground">days until test</p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Estimated Readiness</span>
                      <span className="font-semibold text-foreground">{readinessScore}%</span>
                    </div>
                    <Progress value={readinessScore} className="h-3" />
                    <p className="text-xs text-muted-foreground text-center">
                      {readinessScore < 30 
                        ? 'Keep practicing to build your foundation'
                        : readinessScore < 60 
                          ? 'Good progress! Stay consistent'
                          : readinessScore < 80 
                            ? 'Strong preparation! Fine-tune weak areas'
                            : 'Excellent! You\'re well prepared'}
                    </p>
                  </div>

                  {/* Milestones */}
                  <div className="pt-4 border-t border-border/50">
                    <p className="text-sm font-medium mb-2">Milestones</p>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <div className={`h-2 w-2 rounded-full ${progress.totalQuestionsAnswered >= 10 ? 'bg-green-500' : 'bg-muted'}`} />
                        <span className={progress.totalQuestionsAnswered >= 10 ? 'text-foreground' : 'text-muted-foreground'}>
                          Complete 10 questions
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <div className={`h-2 w-2 rounded-full ${progress.totalQuestionsAnswered >= 50 ? 'bg-green-500' : 'bg-muted'}`} />
                        <span className={progress.totalQuestionsAnswered >= 50 ? 'text-foreground' : 'text-muted-foreground'}>
                          Complete 50 questions
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <div className={`h-2 w-2 rounded-full ${progress.currentStreak >= 7 ? 'bg-green-500' : 'bg-muted'}`} />
                        <span className={progress.currentStreak >= 7 ? 'text-foreground' : 'text-muted-foreground'}>
                          7-day practice streak
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <div className={`h-2 w-2 rounded-full ${progress.totalQuestionsAnswered >= 100 ? 'bg-green-500' : 'bg-muted'}`} />
                        <span className={progress.totalQuestionsAnswered >= 100 ? 'text-foreground' : 'text-muted-foreground'}>
                          Complete 100 questions
                        </span>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div className="text-center py-4">
                  <p className="text-muted-foreground">Set a test date in your goals to see your timeline.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
