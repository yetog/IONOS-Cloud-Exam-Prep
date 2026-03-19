import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, Target, MessageSquare, Save, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { cn } from '@/lib/utils';

interface DailyNote {
  date: string;
  focusArea: string;
  personalReminder: string;
  quickNotes: string;
  createdAt: string;
  updatedAt: string;
}

const FOCUS_AREAS = [
  { value: 'quant-ps', label: 'Quant - Problem Solving' },
  { value: 'quant-ds', label: 'Quant - Data Sufficiency' },
  { value: 'Unit 2: Core Services-rc', label: 'Unit 2: Core Services - Reading Comprehension' },
  { value: 'Unit 2: Core Services-cr', label: 'Unit 2: Core Services - Critical Reasoning' },
  { value: 'Unit 2: Core Services-sc', label: 'Unit 2: Core Services - Sentence Correction' },
  { value: 'ir', label: 'Unit 3: Management' },
  { value: 'general', label: 'General Practice' },
];

export function DailyMission() {
  const [isOpen, setIsOpen] = useState(true);
  const [dailyNotes, setDailyNotes] = useLocalStorage<Record<string, DailyNote>>('gmat-daily-notes', {});
  const [isSaving, setIsSaving] = useState(false);

  const today = new Date().toISOString().split('T')[0];
  const todayNote = dailyNotes[today] || {
    date: today,
    focusArea: '',
    personalReminder: '',
    quickNotes: '',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  const [focusArea, setFocusArea] = useState(todayNote.focusArea);
  const [personalReminder, setPersonalReminder] = useState(todayNote.personalReminder);
  const [quickNotes, setQuickNotes] = useState(todayNote.quickNotes);

  // Update local state when todayNote changes
  useEffect(() => {
    setFocusArea(todayNote.focusArea);
    setPersonalReminder(todayNote.personalReminder);
    setQuickNotes(todayNote.quickNotes);
  }, [todayNote.focusArea, todayNote.personalReminder, todayNote.quickNotes]);

  const handleSave = () => {
    setIsSaving(true);
    setDailyNotes((prev) => ({
      ...prev,
      [today]: {
        date: today,
        focusArea,
        personalReminder,
        quickNotes,
        createdAt: prev[today]?.createdAt || new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    }));
    setTimeout(() => setIsSaving(false), 500);
  };

  // Auto-save on change (debounced)
  useEffect(() => {
    const timer = setTimeout(() => {
      if (focusArea || personalReminder || quickNotes) {
        setDailyNotes((prev) => ({
          ...prev,
          [today]: {
            date: today,
            focusArea,
            personalReminder,
            quickNotes,
            createdAt: prev[today]?.createdAt || new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
        }));
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [focusArea, personalReminder, quickNotes, today, setDailyNotes]);

  // Get last 3 days of notes (excluding today)
  const recentNotes = Object.entries(dailyNotes)
    .filter(([date]) => date !== today)
    .sort(([a], [b]) => b.localeCompare(a))
    .slice(0, 3);

  return (
    <Card className="glass overflow-hidden">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
          <CardHeader className="cursor-pointer hover:bg-primary/5 transition-colors pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" />
                Today's Mission
              </CardTitle>
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">
                  {new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                </span>
                {isOpen ? (
                  <ChevronUp className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                )}
              </div>
            </div>
          </CardHeader>
        </CollapsibleTrigger>

        <CollapsibleContent>
          <CardContent className="space-y-4 pt-0">
            {/* Focus Area */}
            <div className="space-y-2">
              <Label htmlFor="focus-area" className="text-sm font-medium">
                Focus Area
              </Label>
              <Select value={focusArea} onValueChange={setFocusArea}>
                <SelectTrigger id="focus-area" className="w-full">
                  <SelectValue placeholder="What are you focusing on today?" />
                </SelectTrigger>
                <SelectContent>
                  {FOCUS_AREAS.map((area) => (
                    <SelectItem key={area.value} value={area.value}>
                      {area.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Personal Reminder */}
            <div className="space-y-2">
              <Label htmlFor="reminder" className="text-sm font-medium">
                Today's Reminder
              </Label>
              <Input
                id="reminder"
                placeholder="e.g., Focus on time management, Don't rush through RC..."
                value={personalReminder}
                onChange={(e) => setPersonalReminder(e.target.value)}
                className="text-sm"
              />
            </div>

            {/* Quick Notes */}
            <div className="space-y-2">
              <Label htmlFor="notes" className="text-sm font-medium flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                Quick Notes
              </Label>
              <Textarea
                id="notes"
                placeholder="Jot down thoughts, patterns noticed, areas to revisit..."
                value={quickNotes}
                onChange={(e) => setQuickNotes(e.target.value)}
                className="min-h-[80px] text-sm resize-none"
              />
            </div>

            {/* Save Button */}
            <div className="flex items-center justify-between pt-2">
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                <Clock className="h-3 w-3" />
                Auto-saves as you type
              </span>
              <Button
                size="sm"
                onClick={handleSave}
                disabled={isSaving}
                className="gap-1.5"
              >
                <Save className="h-3.5 w-3.5" />
                {isSaving ? 'Saving...' : 'Save'}
              </Button>
            </div>

            {/* Recent Notes History */}
            {recentNotes.length > 0 && (
              <div className="pt-4 border-t border-border/50">
                <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                  Recent Notes
                </h4>
                <div className="space-y-2">
                  {recentNotes.map(([date, note]) => (
                    <motion.div
                      key={date}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="p-2 rounded-md bg-muted/30 text-xs"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium text-foreground">
                          {new Date(date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                        </span>
                        {note.focusArea && (
                          <span className="text-primary text-[10px] bg-primary/10 px-1.5 py-0.5 rounded">
                            {FOCUS_AREAS.find((a) => a.value === note.focusArea)?.label || note.focusArea}
                          </span>
                        )}
                      </div>
                      {note.quickNotes && (
                        <p className="text-muted-foreground line-clamp-2">{note.quickNotes}</p>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
}

