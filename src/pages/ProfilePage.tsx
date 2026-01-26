import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Trophy, Zap, Calendar, Pencil, Check, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { useProfile } from '@/hooks/useProfile';
import { useProgress } from '@/hooks/useProgress';
import { AvatarUpload } from '@/components/AvatarUpload';
import { GoalsCard } from '@/components/GoalsCard';
import { InsightsCard } from '@/components/InsightsCard';

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
  
  const { progress, xpProgress } = useProgress();
  
  const [isEditingName, setIsEditingName] = useState(false);
  const [nameValue, setNameValue] = useState(profile.displayName);

  const handleSaveName = () => {
    if (nameValue.trim()) {
      updateDisplayName(nameValue.trim());
    }
    setIsEditingName(false);
  };

  const handleCancelName = () => {
    setNameValue(profile.displayName);
    setIsEditingName(false);
  };

  const formatMemberSince = () => {
    const date = new Date(profile.createdAt);
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

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
          {/* Profile Header */}
          <Card className="glass">
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                {/* Avatar */}
                <AvatarUpload
                  avatarUrl={profile.avatarUrl}
                  displayName={profile.displayName}
                  onAvatarChange={updateAvatar}
                  size="lg"
                />

                {/* Info */}
                <div className="flex-1 text-center sm:text-left">
                  {/* Display Name */}
                  <div className="flex items-center justify-center sm:justify-start gap-2 mb-2">
                    {isEditingName ? (
                      <div className="flex items-center gap-2">
                        <Input
                          value={nameValue}
                          onChange={(e) => setNameValue(e.target.value)}
                          className="h-8 w-48"
                          autoFocus
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') handleSaveName();
                            if (e.key === 'Escape') handleCancelName();
                          }}
                        />
                        <Button variant="ghost" size="sm" onClick={handleCancelName}>
                          <X className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={handleSaveName}>
                          <Check className="h-4 w-4 text-primary" />
                        </Button>
                      </div>
                    ) : (
                      <>
                        <h1 className="text-2xl font-bold text-foreground">{profile.displayName}</h1>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => setIsEditingName(true)}
                          className="h-6 w-6 p-0"
                        >
                          <Pencil className="h-3 w-3" />
                        </Button>
                      </>
                    )}
                  </div>

                  {/* Level & XP */}
                  <div className="flex items-center justify-center sm:justify-start gap-4 text-sm mb-2">
                    <span className="flex items-center gap-1 text-primary">
                      <Trophy className="h-4 w-4" />
                      Level {progress.level}
                    </span>
                    <span className="flex items-center gap-1 text-gold">
                      <Zap className="h-4 w-4" />
                      {progress.totalXP.toLocaleString()} XP
                    </span>
                  </div>

                  {/* XP Progress */}
                  <div className="w-full max-w-xs mx-auto sm:mx-0 mb-2">
                    <Progress value={xpProgress.percentage} className="h-2" />
                    <p className="text-xs text-muted-foreground mt-1">
                      {xpProgress.current} / {xpProgress.required} XP to next level
                    </p>
                  </div>

                  {/* Member Since */}
                  <p className="text-sm text-muted-foreground flex items-center justify-center sm:justify-start gap-1">
                    <Calendar className="h-4 w-4" />
                    Member since {formatMemberSince()}
                    {memberSinceDays > 0 && ` (${memberSinceDays} days)`}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

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
