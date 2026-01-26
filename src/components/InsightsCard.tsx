import { TrendingUp, TrendingDown, Minus, Brain, AlertTriangle, Zap, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TestInsights } from '@/types/profile';
import { cn } from '@/lib/utils';

interface InsightsCardProps {
  insights: TestInsights;
  targetTime?: number; // Target seconds per question
}

export function InsightsCard({ insights, targetTime = 90 }: InsightsCardProps) {
  const { strongestSection, weakestSection, recommendedFocus, averageTimePerQuestion, accuracyTrend } = insights;

  const TrendIcon = accuracyTrend === 'up' 
    ? TrendingUp 
    : accuracyTrend === 'down' 
      ? TrendingDown 
      : Minus;

  const trendColor = accuracyTrend === 'up' 
    ? 'text-green-500' 
    : accuracyTrend === 'down' 
      ? 'text-red-500' 
      : 'text-muted-foreground';

  const trendLabel = accuracyTrend === 'up' 
    ? 'Improving' 
    : accuracyTrend === 'down' 
      ? 'Declining' 
      : 'Stable';

  const hasData = strongestSection || weakestSection || averageTimePerQuestion > 0;

  return (
    <Card className="glass">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <Brain className="h-5 w-5 text-primary" />
          Test Insights
        </CardTitle>
      </CardHeader>
      <CardContent>
        {!hasData ? (
          <div className="text-center py-4 text-muted-foreground">
            <p className="text-sm">Complete at least 5 questions in a section to see insights.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Strongest Section */}
            {strongestSection && (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded bg-green-500/20">
                    <Zap className="h-4 w-4 text-green-500" />
                  </div>
                  <span className="text-sm text-muted-foreground">Strongest</span>
                </div>
                <div className="text-right">
                  <span className="font-semibold text-foreground">{strongestSection.section}</span>
                  <span className="text-sm text-green-500 ml-2">({strongestSection.accuracy}%)</span>
                </div>
              </div>
            )}

            {/* Weakest Section */}
            {weakestSection && (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded bg-orange-500/20">
                    <AlertTriangle className="h-4 w-4 text-orange-500" />
                  </div>
                  <span className="text-sm text-muted-foreground">Weakest</span>
                </div>
                <div className="text-right">
                  <span className="font-semibold text-foreground">{weakestSection.section}</span>
                  <span className="text-sm text-orange-500 ml-2">({weakestSection.accuracy}%)</span>
                </div>
              </div>
            )}

            {/* Recommended Focus */}
            {recommendedFocus && (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded bg-primary/20">
                    <Brain className="h-4 w-4 text-primary" />
                  </div>
                  <span className="text-sm text-muted-foreground">Focus Area</span>
                </div>
                <span className="font-semibold text-primary">{recommendedFocus}</span>
              </div>
            )}

            {/* Average Time */}
            {averageTimePerQuestion > 0 && (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded bg-primary/20">
                    <Clock className="h-4 w-4 text-primary" />
                  </div>
                  <span className="text-sm text-muted-foreground">Avg Time</span>
                </div>
                <div className="text-right">
                  <span className={cn(
                    "font-semibold",
                    averageTimePerQuestion <= targetTime ? "text-green-500" : "text-orange-500"
                  )}>
                    {averageTimePerQuestion}s
                  </span>
                  <span className="text-sm text-muted-foreground ml-1">(target: {targetTime}s)</span>
                </div>
              </div>
            )}

            {/* Accuracy Trend */}
            <div className="flex items-center justify-between pt-2 border-t border-border/50">
              <div className="flex items-center gap-2">
                <div className={cn("p-1.5 rounded", 
                  accuracyTrend === 'up' ? 'bg-green-500/20' : 
                  accuracyTrend === 'down' ? 'bg-red-500/20' : 
                  'bg-muted'
                )}>
                  <TrendIcon className={cn("h-4 w-4", trendColor)} />
                </div>
                <span className="text-sm text-muted-foreground">Trend</span>
              </div>
              <span className={cn("font-semibold", trendColor)}>{trendLabel}</span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
