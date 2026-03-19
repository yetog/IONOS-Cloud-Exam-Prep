import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Save, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Question, IONOSSection, QuestionType, SECTION_INFO } from '@/types/gmat';

interface QuestionFormProps {
  initialData?: Partial<Question>;
  onSave: (question: Omit<Question, 'id'>) => void;
  onCancel: () => void;
}

const DIFFICULTY_TIMES: Record<string, number> = {
  easy: 60,
  medium: 90,
  hard: 120,
};

export function QuestionForm({ initialData, onSave, onCancel }: QuestionFormProps) {
  const [section, setSection] = useState<IONOSSection>(initialData?.section || 'unit1');
  const [type, setType] = useState<QuestionType>(initialData?.type || 'problem-solving');
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>(initialData?.difficulty || 'medium');
  const [question, setQuestion] = useState(initialData?.question || '');
  const [passage, setPassage] = useState(initialData?.passage || '');
  const [options, setOptions] = useState<string[]>(initialData?.options || ['', '', '', '', '']);
  const [correctAnswer, setCorrectAnswer] = useState(initialData?.correctAnswer ?? 0);
  const [explanation, setExplanation] = useState(initialData?.explanation || '');
  const [strategy, setStrategy] = useState(initialData?.strategy || '');
  const [traps, setTraps] = useState(initialData?.commonTraps?.join('\n') || '');
  const [targetTime, setTargetTime] = useState(initialData?.targetTime || 90);
  const [tags, setTags] = useState(initialData?.tags?.join(', ') || '');

  // Update type when section changes
  useEffect(() => {
    const validTypes = SECTION_INFO[section].types;
    if (!validTypes.find(t => t.value === type)) {
      setType(validTypes[0].value);
    }
  }, [section, type]);

  // Update target time when difficulty changes
  useEffect(() => {
    if (!initialData?.targetTime) {
      setTargetTime(DIFFICULTY_TIMES[difficulty] || 90);
    }
  }, [difficulty, initialData?.targetTime]);

  const updateOption = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const questionData: Omit<Question, 'id'> = {
      section,
      type,
      difficulty,
      question,
      passage: passage || undefined,
      options,
      correctAnswer,
      explanation,
      strategy,
      commonTraps: traps.split('\n').filter(t => t.trim()),
      targetTime,
      tags: tags.split(',').map(t => t.trim()).filter(Boolean),
    };

    onSave(questionData);
  };

  const needsPassage = ['reading-comprehension', 'multi-source-reasoning'].includes(type);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <Card className="glass">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>{initialData?.id ? 'Edit Question' : 'Add New Question'}</CardTitle>
          <Button variant="ghost" size="icon" onClick={onCancel}>
            <X className="w-5 h-5" />
          </Button>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Section, Type, Difficulty Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Section</Label>
                <Select value={section} onValueChange={(v) => setSection(v as IONOSSection)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Unit 1: Cloud Basics">Unit 1: Cloud Basics</SelectItem>
                    <SelectItem value="Unit 2: Core Services">Unit 2: Core Services</SelectItem>
                    <SelectItem value="integrated-reasoning">Unit 3: Management</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Question Type</Label>
                <Select value={type} onValueChange={(v) => setType(v as QuestionType)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {SECTION_INFO[section].types.map((t) => (
                      <SelectItem key={t.value} value={t.value}>
                        {t.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Difficulty</Label>
                <Select value={difficulty} onValueChange={(v) => setDifficulty(v as 'easy' | 'medium' | 'hard')}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="easy">Easy</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="hard">Hard</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Passage (conditional) */}
            {needsPassage && (
              <div className="space-y-2">
                <Label>Passage</Label>
                <Textarea
                  value={passage}
                  onChange={(e) => setPassage(e.target.value)}
                  placeholder="Enter the reading passage..."
                  className="min-h-[150px]"
                />
              </div>
            )}

            {/* Question */}
            <div className="space-y-2">
              <Label>Question *</Label>
              <Textarea
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Enter the question text..."
                required
                className="min-h-[100px]"
              />
            </div>

            {/* Options */}
            <div className="space-y-3">
              <Label>Answer Options *</Label>
              {['A', 'B', 'C', 'D', 'E'].map((letter, index) => (
                <div key={letter} className="flex items-center gap-2">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium cursor-pointer transition-colors ${
                      correctAnswer === index
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground hover:bg-muted/80'
                    }`}
                    onClick={() => setCorrectAnswer(index)}
                    title="Click to mark as correct answer"
                  >
                    {letter}
                  </div>
                  <Input
                    value={options[index]}
                    onChange={(e) => updateOption(index, e.target.value)}
                    placeholder={`Option ${letter}`}
                    required
                    className="flex-1"
                  />
                </div>
              ))}
              <p className="text-xs text-muted-foreground">
                Click a letter to mark it as the correct answer
              </p>
            </div>

            {/* Explanation */}
            <div className="space-y-2">
              <Label>Explanation *</Label>
              <Textarea
                value={explanation}
                onChange={(e) => setExplanation(e.target.value)}
                placeholder="Explain why the correct answer is right and why others are wrong..."
                required
                className="min-h-[100px]"
              />
            </div>

            {/* Strategy */}
            <div className="space-y-2">
              <Label>Strategy / Hint</Label>
              <Textarea
                value={strategy}
                onChange={(e) => setStrategy(e.target.value)}
                placeholder="General approach for this type of question..."
                className="min-h-[80px]"
              />
            </div>

            {/* Common Traps */}
            <div className="space-y-2">
              <Label>Common Traps (one per line)</Label>
              <Textarea
                value={traps}
                onChange={(e) => setTraps(e.target.value)}
                placeholder="Mistake 1&#10;Mistake 2&#10;Mistake 3"
                className="min-h-[80px]"
              />
            </div>

            {/* Target Time and Tags */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Target Time (seconds)</Label>
                <Input
                  type="number"
                  value={targetTime}
                  onChange={(e) => setTargetTime(parseInt(e.target.value) || 90)}
                  min={30}
                  max={300}
                />
              </div>

              <div className="space-y-2">
                <Label>Tags (comma-separated)</Label>
                <Input
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  placeholder="algebra, percentages, word-problems"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-4">
              <Button type="button" variant="outline" onClick={onCancel} className="flex-1">
                Cancel
              </Button>
              <Button type="submit" className="flex-1">
                <Save className="w-4 h-4 mr-2" />
                Save Question
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
}

