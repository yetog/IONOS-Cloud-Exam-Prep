import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, Calculator, BookOpen, Languages, Percent, Shapes, Scale } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const exponentRules = [
  { rule: 'xᵃ × xᵇ = xᵃ⁺ᵇ', example: '2³ × 2² = 2⁵ = 32' },
  { rule: 'xᵃ ÷ xᵇ = xᵃ⁻ᵇ', example: '3⁵ ÷ 3² = 3³ = 27' },
  { rule: '(xᵃ)ᵇ = xᵃᵇ', example: '(2²)³ = 2⁶ = 64' },
  { rule: 'x⁰ = 1', example: '5⁰ = 1 (if x ≠ 0)' },
  { rule: 'x⁻ⁿ = 1/xⁿ', example: '2⁻³ = 1/8' },
  { rule: '(xy)ⁿ = xⁿyⁿ', example: '(2×3)² = 4×9 = 36' },
  { rule: '(x/y)ⁿ = xⁿ/yⁿ', example: '(4/2)³ = 64/8 = 8' },
];

const wordTranslations = [
  { word: 'is, are, was, were', symbol: '=' },
  { word: 'of', symbol: '× (multiply)' },
  { word: 'per', symbol: '÷ (divide)' },
  { word: 'more than, greater than', symbol: '+' },
  { word: 'less than, fewer than', symbol: '−' },
  { word: 'times', symbol: '×' },
  { word: 'what, a number', symbol: 'x (variable)' },
  { word: 'percent', symbol: '÷ 100' },
  { word: 'ratio of a to b', symbol: 'a/b' },
  { word: 'sum', symbol: 'add all' },
  { word: 'product', symbol: 'multiply all' },
  { word: 'difference', symbol: 'subtract' },
  { word: 'quotient', symbol: 'divide' },
];

const percentFormulas = [
  { name: 'Percentage', formula: 'Part/Whole × 100', example: '25/100 = 25%' },
  { name: 'Part', formula: 'Whole × (Percent/100)', example: '20% of 50 = 10' },
  { name: 'Whole', formula: 'Part ÷ (Percent/100)', example: '10 is 20% of 50' },
  { name: 'Percent Change', formula: '(New - Old)/Old × 100', example: '(60-50)/50 = 20% increase' },
  { name: 'Successive %', formula: 'Multiply multipliers', example: '+20% then +10% = 1.2 × 1.1 = 1.32 (32% total)' },
];

const geometryFormulas = [
  { shape: 'Rectangle', area: 'l × w', perimeter: '2(l + w)' },
  { shape: 'Square', area: 's²', perimeter: '4s' },
  { shape: 'Triangle', area: '½ × b × h', perimeter: 'a + b + c' },
  { shape: 'Circle', area: 'πr²', perimeter: '2πr' },
  { shape: 'Trapezoid', area: '½(b₁ + b₂) × h', perimeter: 'Sum of sides' },
  { shape: 'Parallelogram', area: 'b × h', perimeter: '2(a + b)' },
];

const specialTriangles = [
  { name: '30-60-90', sides: '1 : √3 : 2', note: 'Short leg : Long leg : Hypotenuse' },
  { name: '45-45-90', sides: '1 : 1 : √2', note: 'Leg : Leg : Hypotenuse' },
  { name: '3-4-5', sides: '3 : 4 : 5', note: 'Common right triangle' },
  { name: '5-12-13', sides: '5 : 12 : 13', note: 'Common right triangle' },
  { name: '8-15-17', sides: '8 : 15 : 17', note: 'Common right triangle' },
];

const probabilityRules = [
  { rule: 'P(A) = favorable/total', example: 'Rolling 6: 1/6' },
  { rule: 'P(A or B) = P(A) + P(B) − P(A and B)', example: 'Mutually exclusive: P(A) + P(B)' },
  { rule: 'P(A and B) = P(A) × P(B)', example: 'Independent events: multiply' },
  { rule: 'P(not A) = 1 − P(A)', example: 'Not rolling 6: 5/6' },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function ReferenceCardsPage() {
  return (
    <div className="min-h-screen bg-background bg-grid">
      <div className="fixed inset-0 bg-gradient-radial from-primary/5 via-transparent to-transparent pointer-events-none" />
      
      <div className="relative z-10 container mx-auto px-4 py-8 max-w-5xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Link to="/">
            <Button variant="ghost" size="sm" className="mb-4 text-muted-foreground hover:text-foreground">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
          
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 rounded-xl bg-primary/20">
              <Calculator className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                Math Quick Reference
              </h1>
              <p className="text-muted-foreground">
                Essential formulas and rules for GMAT Unit 1: Cloud Basics
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
        >
          <Tabs defaultValue="exponents" className="space-y-6">
            <TabsList className="flex flex-wrap h-auto gap-2 bg-transparent">
              <TabsTrigger value="exponents" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <Calculator className="w-4 h-4 mr-2" />
                Exponents
              </TabsTrigger>
              <TabsTrigger value="translations" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <Languages className="w-4 h-4 mr-2" />
                Word→Math
              </TabsTrigger>
              <TabsTrigger value="percentages" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <Percent className="w-4 h-4 mr-2" />
                Percentages
              </TabsTrigger>
              <TabsTrigger value="geometry" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <Shapes className="w-4 h-4 mr-2" />
                Geometry
              </TabsTrigger>
              <TabsTrigger value="probability" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <Scale className="w-4 h-4 mr-2" />
                Probability
              </TabsTrigger>
            </TabsList>

            {/* Exponents Tab */}
            <TabsContent value="exponents">
              <motion.div variants={item}>
                <Card className="glass">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calculator className="w-5 h-5 text-primary" />
                      Exponent Rules
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-3">
                      {exponentRules.map((rule, idx) => (
                        <div key={idx} className="flex items-center gap-4 p-3 rounded-lg bg-muted/30">
                          <code className="text-lg font-mono text-primary min-w-[160px]">{rule.rule}</code>
                          <span className="text-muted-foreground text-sm">{rule.example}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            {/* Word Translations Tab */}
            <TabsContent value="translations">
              <motion.div variants={item}>
                <Card className="glass">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Languages className="w-5 h-5 text-primary" />
                      Word Problem Translations
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {wordTranslations.map((trans, idx) => (
                        <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                          <span className="text-foreground">{trans.word}</span>
                          <code className="text-primary font-mono">{trans.symbol}</code>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            {/* Percentages Tab */}
            <TabsContent value="percentages">
              <motion.div variants={item}>
                <Card className="glass">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Percent className="w-5 h-5 text-primary" />
                      Percentage Formulas
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {percentFormulas.map((formula, idx) => (
                        <div key={idx} className="p-4 rounded-lg bg-muted/30">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-semibold text-foreground">{formula.name}</span>
                            <code className="text-primary font-mono">{formula.formula}</code>
                          </div>
                          <p className="text-sm text-muted-foreground">{formula.example}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            {/* Geometry Tab */}
            <TabsContent value="geometry">
              <motion.div variants={item} className="space-y-6">
                <Card className="glass">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shapes className="w-5 h-5 text-primary" />
                      Area & Perimeter
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-border">
                            <th className="text-left py-2 px-3 text-sm font-semibold text-foreground">Shape</th>
                            <th className="text-left py-2 px-3 text-sm font-semibold text-foreground">Area</th>
                            <th className="text-left py-2 px-3 text-sm font-semibold text-foreground">Perimeter</th>
                          </tr>
                        </thead>
                        <tbody>
                          {geometryFormulas.map((shape, idx) => (
                            <tr key={idx} className="border-b border-border/50">
                              <td className="py-3 px-3 text-foreground">{shape.shape}</td>
                              <td className="py-3 px-3"><code className="text-primary font-mono">{shape.area}</code></td>
                              <td className="py-3 px-3"><code className="text-primary font-mono">{shape.perimeter}</code></td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>

                <Card className="glass">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shapes className="w-5 h-5 text-primary" />
                      Special Right Triangles
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {specialTriangles.map((tri, idx) => (
                        <div key={idx} className="p-4 rounded-lg bg-muted/30">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-semibold text-foreground">{tri.name}</span>
                            <code className="text-primary font-mono">{tri.sides}</code>
                          </div>
                          <p className="text-sm text-muted-foreground">{tri.note}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            {/* Probability Tab */}
            <TabsContent value="probability">
              <motion.div variants={item}>
                <Card className="glass">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Scale className="w-5 h-5 text-primary" />
                      Probability Rules
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {probabilityRules.map((rule, idx) => (
                        <div key={idx} className="p-4 rounded-lg bg-muted/30">
                          <code className="text-primary font-mono block mb-2">{rule.rule}</code>
                          <p className="text-sm text-muted-foreground">{rule.example}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
}

