import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Pencil, Trash2, Eye, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Question, GMATSection, QuestionType, SECTION_INFO } from '@/types/gmat';

interface QuestionTableProps {
  questions: Question[];
  customQuestionIds: Set<string>;
  onEdit: (question: Question) => void;
  onDelete: (id: string) => void;
  onView: (question: Question) => void;
}

export function QuestionTable({
  questions,
  customQuestionIds,
  onEdit,
  onDelete,
  onView,
}: QuestionTableProps) {
  const [search, setSearch] = useState('');
  const [sectionFilter, setSectionFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [difficultyFilter, setDifficultyFilter] = useState<string>('all');
  const [sourceFilter, setSourceFilter] = useState<string>('all');

  const filteredQuestions = useMemo(() => {
    return questions.filter((q) => {
      // Search filter
      if (search) {
        const searchLower = search.toLowerCase();
        const matchesSearch =
          q.question.toLowerCase().includes(searchLower) ||
          q.tags?.some((t) => t.toLowerCase().includes(searchLower)) ||
          q.explanation.toLowerCase().includes(searchLower);
        if (!matchesSearch) return false;
      }

      // Section filter
      if (sectionFilter !== 'all' && q.section !== sectionFilter) return false;

      // Type filter
      if (typeFilter !== 'all' && q.type !== typeFilter) return false;

      // Difficulty filter
      if (difficultyFilter !== 'all' && q.difficulty !== difficultyFilter) return false;

      // Source filter
      if (sourceFilter === 'custom' && !customQuestionIds.has(q.id)) return false;
      if (sourceFilter === 'sample' && customQuestionIds.has(q.id)) return false;

      return true;
    });
  }, [questions, search, sectionFilter, typeFilter, difficultyFilter, sourceFilter, customQuestionIds]);

  // Get available types based on section filter
  const availableTypes = useMemo(() => {
    if (sectionFilter === 'all') {
      return Object.values(SECTION_INFO).flatMap((s) => s.types);
    }
    return SECTION_INFO[sectionFilter as GMATSection]?.types || [];
  }, [sectionFilter]);

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + '...';
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return 'border-primary/50 text-primary';
      case 'hard':
        return 'border-destructive/50 text-destructive';
      default:
        return '';
    }
  };

  return (
    <div className="space-y-4">
      {/* Filters */}
      <Card className="glass">
        <CardContent className="p-4">
          <div className="flex flex-wrap gap-3">
            {/* Search */}
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search questions, tags..."
                className="pl-9"
              />
            </div>

            {/* Section Filter */}
            <Select value={sectionFilter} onValueChange={setSectionFilter}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Section" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Sections</SelectItem>
                <SelectItem value="quantitative">Quantitative</SelectItem>
                <SelectItem value="verbal">Verbal</SelectItem>
                <SelectItem value="integrated-reasoning">IR</SelectItem>
              </SelectContent>
            </Select>

            {/* Type Filter */}
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                {availableTypes.map((t) => (
                  <SelectItem key={t.value} value={t.value}>
                    {t.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Difficulty Filter */}
            <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Difficulty" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="easy">Easy</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="hard">Hard</SelectItem>
              </SelectContent>
            </Select>

            {/* Source Filter */}
            <Select value={sourceFilter} onValueChange={setSourceFilter}>
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Source" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="sample">Sample</SelectItem>
                <SelectItem value="custom">Custom</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between mt-3 text-sm text-muted-foreground">
            <span>
              Showing {filteredQuestions.length} of {questions.length} questions
            </span>
            <span>
              {customQuestionIds.size} custom questions
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Question List */}
      <Card className="glass">
        <ScrollArea className="h-[500px]">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50%]">Question</TableHead>
                <TableHead>Section</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Difficulty</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredQuestions.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                    No questions found matching your filters
                  </TableCell>
                </TableRow>
              ) : (
                filteredQuestions.map((question) => (
                  <TableRow key={question.id}>
                    <TableCell>
                      <div className="space-y-1">
                        <p className="text-sm text-foreground">
                          {truncateText(question.question, 80)}
                        </p>
                        <div className="flex items-center gap-2">
                          {customQuestionIds.has(question.id) && (
                            <Badge variant="secondary" className="text-xs">
                              <Star className="w-3 h-3 mr-1" />
                              Custom
                            </Badge>
                          )}
                          {question.tags?.slice(0, 2).map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="capitalize">
                        {question.section === 'integrated-reasoning' ? 'IR' : question.section}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm text-muted-foreground capitalize">
                        {question.type.split('-').join(' ')}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={getDifficultyColor(question.difficulty)}>
                        {question.difficulty}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => onView(question)}
                          title="View"
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        {customQuestionIds.has(question.id) && (
                          <>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => onEdit(question)}
                              title="Edit"
                            >
                              <Pencil className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => onDelete(question.id)}
                              title="Delete"
                              className="text-destructive hover:text-destructive"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </ScrollArea>
      </Card>
    </div>
  );
}
