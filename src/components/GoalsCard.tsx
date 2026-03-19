import { useState } from 'react';
import { Target, Calendar, CheckCircle, Clock, Pencil, X, Check } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { UserGoals } from '@/types/profile';

interface GoalsCardProps {
  goals: UserGoals;
  onUpdateGoals: (goals: Partial<UserGoals>) => void;
  todayQuestionsAnswered: number;
  weeklyTimeSpent: number;
  daysUntilTest: number | null;
}

export function GoalsCard({
  goals,
  onUpdateGoals,
  todayQuestionsAnswered,
  weeklyTimeSpent,
  daysUntilTest,
}: GoalsCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValues, setEditValues] = useState({
    targetScore: goals.targetScore?.toString() || '',
    testDate: goals.testDate || '',
    dailyQuestionGoal: goals.dailyQuestionGoal.toString(),
    weeklyTimeGoal: (goals.weeklyTimeGoal / 60).toString(), // Convert to hours
  });

  const handleSave = () => {
    const score = editValues.targetScore ? parseInt(editValues.targetScore) : null;
    const daily = parseInt(editValues.dailyQuestionGoal) || 10;
    const weekly = (parseFloat(editValues.weeklyTimeGoal) || 5) * 60; // Convert to minutes

    // Validate score range
    if (score !== null && (score < 205 || score > 805)) {
      alert('Target score must be between 205 and 805');
      return;
    }

    onUpdateGoals({
      targetScore: score,
      testDate: editValues.testDate || null,
      dailyQuestionGoal: daily,
      weeklyTimeGoal: weekly,
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditValues({
      targetScore: goals.targetScore?.toString() || '',
      testDate: goals.testDate || '',
      dailyQuestionGoal: goals.dailyQuestionGoal.toString(),
      weeklyTimeGoal: (goals.weeklyTimeGoal / 60).toString(),
    });
    setIsEditing(false);
  };

  const dailyProgress = Math.min((todayQuestionsAnswered / goals.dailyQuestionGoal) * 100, 100);
  const weeklyProgress = Math.min((weeklyTimeSpent / (goals.weeklyTimeGoal / 60)) * 100, 100);

  return (
    <Card className="glass">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <Target className="h-5 w-5 text-primary" />
            My Goals
          </CardTitle>
          {!isEditing ? (
            <Button variant="ghost" size="sm" onClick={() => setIsEditing(true)}>
              <Pencil className="h-4 w-4" />
            </Button>
          ) : (
            <div className="flex gap-1">
              <Button variant="ghost" size="sm" onClick={handleCancel}>
                <X className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" onClick={handleSave}>
                <Check className="h-4 w-4 text-primary" />
              </Button>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Target Score */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground flex items-center gap-2">
              <Target className="h-4 w-4" />
              Target Score
            </span>
            {isEditing ? (
              <Input
                type="number"
                value={editValues.targetScore}
                onChange={(e) => setEditValues(prev => ({ ...prev, targetScore: e.target.value }))}
                placeholder="205-805"
                className="w-24 h-8 text-right"
                min={205}
                max={805}
              />
            ) : (
              <span className="font-semibold text-foreground">
                {goals.targetScore || 'Not set'}
              </span>
            )}
          </div>
        </div>

        {/* Test Date */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Test Date
            </span>
            {isEditing ? (
              <Input
                type="date"
                value={editValues.testDate}
                onChange={(e) => setEditValues(prev => ({ ...prev, testDate: e.target.value }))}
                className="w-36 h-8"
              />
            ) : (
              <span className="font-semibold text-foreground">
                {goals.testDate 
                  ? new Date(goals.testDate).toLocaleDateString('en-US', { 
                      month: 'short', 
                      day: 'numeric', 
                      year: 'numeric' 
                    })
                  : 'Not set'}
              </span>
            )}
          </div>
          {daysUntilTest !== null && daysUntilTest > 0 && (
            <div className="pl-6">
              <Progress value={Math.max(0, 100 - (daysUntilTest / 180) * 100)} className="h-2" />
              <p className="text-xs text-muted-foreground mt-1">
                {daysUntilTest} days remaining
              </p>
            </div>
          )}
        </div>

        {/* Daily Goal */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground flex items-center gap-2">
              <CheckCircle className="h-4 w-4" />
              Daily Goal
            </span>
            {isEditing ? (
              <div className="flex items-center gap-1">
                <Input
                  type="number"
                  value={editValues.dailyQuestionGoal}
                  onChange={(e) => setEditValues(prev => ({ ...prev, dailyQuestionGoal: e.target.value }))}
                  className="w-16 h-8 text-right"
                  min={1}
                  max={100}
                />
                <span className="text-xs text-muted-foreground">q/day</span>
              </div>
            ) : (
              <span className="font-semibold text-foreground">
                {goals.dailyQuestionGoal} questions
              </span>
            )}
          </div>
          {!isEditing && (
            <div className="pl-6">
              <Progress value={dailyProgress} className="h-2" />
              <p className="text-xs text-muted-foreground mt-1">
                {todayQuestionsAnswered} / {goals.dailyQuestionGoal} today
              </p>
            </div>
          )}
        </div>

        {/* Weekly Time Goal */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Weekly Goal
            </span>
            {isEditing ? (
              <div className="flex items-center gap-1">
                <Input
                  type="number"
                  value={editValues.weeklyTimeGoal}
                  onChange={(e) => setEditValues(prev => ({ ...prev, weeklyTimeGoal: e.target.value }))}
                  className="w-16 h-8 text-right"
                  min={1}
                  max={40}
                  step={0.5}
                />
                <span className="text-xs text-muted-foreground">hrs</span>
              </div>
            ) : (
              <span className="font-semibold text-foreground">
                {goals.weeklyTimeGoal / 60} hours
              </span>
            )}
          </div>
          {!isEditing && (
            <div className="pl-6">
              <Progress value={weeklyProgress} className="h-2" />
              <p className="text-xs text-muted-foreground mt-1">
                {weeklyTimeSpent} / {goals.weeklyTimeGoal / 60} hrs this week
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

