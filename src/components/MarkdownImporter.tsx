import { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, FileText, Check, AlertCircle, AlertTriangle, Copy, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { parseMarkdown, generateMarkdownTemplate } from '@/lib/markdownParser';
import { Question, GMATSection, QuestionType } from '@/types/gmat';

interface MarkdownImporterProps {
  onImport: (questions: Omit<Question, 'id'>[]) => void;
  onClose: () => void;
  presetSection?: GMATSection;
  presetType?: QuestionType;
}

export function MarkdownImporter({ onImport, onClose, presetSection, presetType }: MarkdownImporterProps) {
  const [markdown, setMarkdown] = useState('');
  const [parseResult, setParseResult] = useState<ReturnType<typeof parseMarkdown> | null>(null);
  const [selectedQuestions, setSelectedQuestions] = useState<Set<number>>(new Set());

  const handleParse = () => {
    const result = parseMarkdown(markdown);
    setParseResult(result);
    
    // Auto-select questions without errors
    const validIndices = result.questions
      .map((q, i) => (q.errors.length === 0 ? i : -1))
      .filter(i => i >= 0);
    setSelectedQuestions(new Set(validIndices));
  };

  const handleImport = () => {
    if (!parseResult) return;

    const questionsToImport = parseResult.questions
      .filter((_, i) => selectedQuestions.has(i))
      .map(q => q.question);

    onImport(questionsToImport);
    onClose();
  };

  const toggleQuestion = (index: number) => {
    const newSelected = new Set(selectedQuestions);
    if (newSelected.has(index)) {
      newSelected.delete(index);
    } else {
      newSelected.add(index);
    }
    setSelectedQuestions(newSelected);
  };

  const copyTemplate = () => {
    const template = generateMarkdownTemplate(presetSection, presetType);
    navigator.clipboard.writeText(template);
  };

  const clearAll = () => {
    setMarkdown('');
    setParseResult(null);
    setSelectedQuestions(new Set());
  };

  const validCount = parseResult?.questions.filter((_, i) => selectedQuestions.has(i)).length || 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
            <Upload className="w-5 h-5 text-primary" />
            Import from Markdown
          </h2>
          <p className="text-sm text-muted-foreground">
            Paste markdown-formatted questions to batch import
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={copyTemplate}>
            <Copy className="w-4 h-4 mr-1" />
            Copy Template
          </Button>
          <Button variant="ghost" size="sm" onClick={clearAll}>
            <Trash2 className="w-4 h-4 mr-1" />
            Clear
          </Button>
        </div>
      </div>

      {/* Input Area */}
      <Card className="glass">
        <CardContent className="p-4">
          <Textarea
            value={markdown}
            onChange={(e) => setMarkdown(e.target.value)}
            placeholder={`Paste your markdown here. Example format:

---
section: quantitative
type: problem-solving
difficulty: medium
targetTime: 90
tags: algebra, equations
---

# Question
If x + 5 = 10, what is x?

# Options
- A: 3
- B: 4
- C: 5
- D: 6
- E: 7

# Answer
C

# Explanation
x + 5 = 10, so x = 10 - 5 = 5

# Strategy
Isolate the variable by performing inverse operations.

# Traps
- Adding instead of subtracting
- Misreading the equation`}
            className="min-h-[300px] font-mono text-sm"
          />
          <div className="flex justify-between items-center mt-4">
            <p className="text-xs text-muted-foreground">
              Separate multiple questions with a blank line followed by ---
            </p>
            <Button onClick={handleParse} disabled={!markdown.trim()}>
              <FileText className="w-4 h-4 mr-2" />
              Parse Questions
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Parse Results */}
      {parseResult && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="glass">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Preview ({parseResult.questions.length} questions found)</span>
                {validCount > 0 && (
                  <Badge variant="default" className="bg-primary">
                    {validCount} ready to import
                  </Badge>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {/* Global Errors */}
              {parseResult.globalErrors.length > 0 && (
                <div className="mb-4 p-3 rounded-lg bg-destructive/10 border border-destructive/30">
                  <p className="text-sm font-medium text-destructive flex items-center gap-2">
                    <AlertCircle className="w-4 h-4" />
                    Parsing Errors
                  </p>
                  <ul className="mt-2 text-sm text-destructive/80 space-y-1">
                    {parseResult.globalErrors.map((err, i) => (
                      <li key={i}>• {err}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Question List */}
              <ScrollArea className="max-h-[400px]">
                <div className="space-y-3">
                  {parseResult.questions.map((q, index) => (
                    <div
                      key={index}
                      className={`p-4 rounded-lg border transition-colors cursor-pointer ${
                        q.errors.length > 0
                          ? 'border-destructive/30 bg-destructive/5 cursor-not-allowed'
                          : selectedQuestions.has(index)
                          ? 'border-primary bg-primary/10'
                          : 'border-border bg-muted/30 hover:bg-muted/50'
                      }`}
                      onClick={() => q.errors.length === 0 && toggleQuestion(index)}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant="outline" className="capitalize">
                              {q.question.section}
                            </Badge>
                            <Badge variant="secondary" className="capitalize">
                              {q.question.type.split('-').join(' ')}
                            </Badge>
                            <Badge
                              variant="outline"
                              className={
                                q.question.difficulty === 'hard'
                                  ? 'border-destructive/50 text-destructive'
                                  : q.question.difficulty === 'easy'
                                  ? 'border-primary/50 text-primary'
                                  : ''
                              }
                            >
                              {q.question.difficulty}
                            </Badge>
                          </div>
                          <p className="text-sm text-foreground line-clamp-2">
                            {q.question.question || '(No question text)'}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            Answer: {String.fromCharCode(65 + q.question.correctAnswer)} | 
                            Time: {q.question.targetTime}s
                          </p>
                        </div>

                        <div className="flex-shrink-0">
                          {q.errors.length > 0 ? (
                            <AlertCircle className="w-5 h-5 text-destructive" />
                          ) : selectedQuestions.has(index) ? (
                            <Check className="w-5 h-5 text-primary" />
                          ) : (
                            <div className="w-5 h-5 rounded border-2 border-muted-foreground/30" />
                          )}
                        </div>
                      </div>

                      {/* Errors */}
                      {q.errors.length > 0 && (
                        <div className="mt-2 text-xs text-destructive space-y-1">
                          {q.errors.map((err, i) => (
                            <p key={i} className="flex items-center gap-1">
                              <AlertCircle className="w-3 h-3" /> {err}
                            </p>
                          ))}
                        </div>
                      )}

                      {/* Warnings */}
                      {q.warnings.length > 0 && (
                        <div className="mt-2 text-xs text-warning space-y-1">
                          {q.warnings.map((warn, i) => (
                            <p key={i} className="flex items-center gap-1">
                              <AlertTriangle className="w-3 h-3" /> {warn}
                            </p>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </ScrollArea>

              {/* Import Button */}
              <div className="flex gap-3 mt-4 pt-4 border-t border-border">
                <Button variant="outline" onClick={onClose} className="flex-1">
                  Cancel
                </Button>
                <Button
                  onClick={handleImport}
                  disabled={validCount === 0}
                  className="flex-1"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Import {validCount} Question{validCount !== 1 ? 's' : ''}
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  );
}
