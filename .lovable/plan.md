
# Skill Mastery & Enhanced Profile Plan

## Overview
Transform the Profile page into a video game-style "party member panel" with a skill tree system based on GMAT competencies from the Princeton Review book. Add daily personal goals/notes and make the experience feel like leveling up a character in an RPG.

---

## Part 1: Skill Mastery System

### The Core Skills (Based on Princeton Review TOC)

Inspired by the book structure, skills are organized into **Skill Categories** with individual **Skills** that can be leveled up through practice and mastery:

| Category | Skills | How to Level Up |
|----------|--------|-----------------|
| **Strategic Foundations** | Adaptive Test Strategy, POE Mastery, Time Management | Complete orientation questions, use elimination effectively |
| **Quantitative Combat** | Number Theory, Arithmetic Mastery, Algebra, Geometry, Probability, Data Sufficiency Logic | Practice questions by sub-type with 70%+ accuracy |
| **Verbal Warfare** | Sentence Structure, Reading Tactics, Argument Analysis, Critical Logic | Practice verbal questions with accuracy thresholds |
| **Data Integration** | Multi-Source Synthesis, Visual Interpretation, Two-Part Reasoning, Table Analysis | Practice IR questions |
| **Mental Fortitude** | Focus Endurance, Speed Under Pressure, Pattern Recognition | Streak bonuses, timed performance, consistency |

### Skill Levels & XP
Each skill has 5 mastery levels:
- **Novice** (0-24 XP) - Just starting
- **Apprentice** (25-74 XP) - Learning the basics
- **Journeyman** (75-174 XP) - Competent
- **Expert** (175-349 XP) - Highly skilled
- **Master** (350+ XP) - Complete mastery

### How Skills Earn XP
- Correctly answering a question in that sub-type: +5-15 XP (based on difficulty)
- Speed bonus: +5 XP if under target time
- No hint bonus: +5 XP
- Streak bonus: +2 XP per consecutive correct in same skill

---

## Part 2: Video Game Profile Card ("Party Member Panel")

### Design Concept
A rectangular card styled like an RPG character panel with:

```text
┌──────────────────────────────────────────────────────────────┐
│  ╔════════════════════════════════════════════════════════╗  │
│  ║  [AVATAR]   PLAYER NAME                    LVL 12      ║  │
│  ║  ┌──────┐   ═══════════════════                        ║  │
│  ║  │      │   Class: GMAT Strategist                     ║  │
│  ║  │ IMG  │   XP: 2,450 / 3,800 [████████░░] 64%         ║  │
│  ║  │      │   Streak: 7 days                             ║  │
│  ║  └──────┘   Test Date: 45 days away                    ║  │
│  ╠════════════════════════════════════════════════════════╣  │
│  ║  STATS                                                 ║  │
│  ║  ┌─────────────────────────────────────────────────┐   ║  │
│  ║  │ STR: Quant      ████████░░  78%                 │   ║  │
│  ║  │ INT: Verbal     ██████░░░░  62%                 │   ║  │
│  ║  │ WIS: IR         ███████░░░  71%                 │   ║  │
│  ║  │ DEX: Speed      ████████░░  85s avg             │   ║  │
│  ║  │ CON: Streak     ██████████  7 days              │   ║  │
│  ║  └─────────────────────────────────────────────────┘   ║  │
│  ╠════════════════════════════════════════════════════════╣  │
│  ║  TOP SKILLS                     [View All Skills →]    ║  │
│  ║  ⚔ Data Sufficiency   Expert   ████████░░              ║  │
│  ║  ⚔ Critical Reasoning Expert   ███████░░░              ║  │
│  ║  ⚔ Algebra            Master   ██████████              ║  │
│  ╚════════════════════════════════════════════════════════╝  │
└──────────────────────────────────────────────────────────────┘
```

### Key Visual Elements
- Bordered frame with glow effects
- Avatar prominently displayed
- "Class" designation based on strongest area (e.g., "Quant Warrior", "Verbal Virtuoso", "IR Specialist", "GMAT Strategist")
- Stats displayed like RPG attributes (STR/INT/WIS/DEX/CON)
- Skill bars with mastery levels
- Accent colors and subtle animations

---

## Part 3: Daily Notes & Personal Goals

### New Section: "Today's Mission"
A collapsible section on the Profile page for:

**Daily Goals (Quick-set):**
- Questions to complete today: [ 15 ]
- Focus area: [ Verbal - CR ]
- Personal reminder: [ Free-text input ]

**Quick Notes:**
- A simple text area for jotting daily thoughts
- Auto-saves to localStorage
- Shows last 3 days of notes in a collapsible history

### Data Structure
```typescript
interface DailyNote {
  date: string; // YYYY-MM-DD
  focusArea?: string;
  personalReminder: string;
  quickNotes: string;
  createdAt: string;
  updatedAt: string;
}
```

---

## File Changes Summary

| File | Action |
|------|--------|
| `src/types/skills.ts` | **Create** - Skill definitions, categories, levels |
| `src/hooks/useSkills.ts` | **Create** - Skill progress management, XP calculation |
| `src/components/ProfileCard.tsx` | **Create** - Video game style party member panel |
| `src/components/SkillBar.tsx` | **Create** - Individual skill progress bar |
| `src/components/SkillsPanel.tsx` | **Create** - Full skills view with all categories |
| `src/components/DailyMission.tsx` | **Create** - Today's goals and quick notes |
| `src/pages/ProfilePage.tsx` | **Modify** - Replace current layout with enhanced components |
| `src/pages/SkillsPage.tsx` | **Create** - Dedicated page for full skill tree view |
| `src/types/profile.ts` | **Modify** - Add dailyNotes array and skill tracking |
| `src/hooks/useProgress.ts` | **Modify** - Integrate skill XP on question completion |
| `src/App.tsx` | **Modify** - Add `/skills` route |
| `src/index.css` | **Modify** - Add RPG-style visual effects |

---

## Technical Details

### Skill Type Definitions
```typescript
type SkillLevel = 'novice' | 'apprentice' | 'journeyman' | 'expert' | 'master';

interface Skill {
  id: string;
  name: string;
  category: SkillCategory;
  description: string;
  icon: string; // Lucide icon name
  linkedQuestionTypes?: QuestionType[];
  linkedSubTypes?: string[]; // From questionSubTypes.ts
}

interface SkillProgress {
  skillId: string;
  xp: number;
  level: SkillLevel;
  questionsAttempted: number;
  correctAnswers: number;
  lastPracticed?: string;
}
```

### Class Designation Logic
Based on performance distribution:
- **Quant Warrior**: Quantitative accuracy > Verbal by 10%+
- **Verbal Virtuoso**: Verbal accuracy > Quantitative by 10%+
- **IR Specialist**: IR accuracy highest with 20+ questions
- **Speed Demon**: Average time under 75% of target
- **GMAT Strategist**: Balanced performance (default)

### RPG Stat Mapping
| RPG Stat | GMAT Metric |
|----------|-------------|
| STR (Strength) | Quantitative accuracy |
| INT (Intelligence) | Verbal accuracy |
| WIS (Wisdom) | Integrated Reasoning accuracy |
| DEX (Dexterity) | Average time performance |
| CON (Constitution) | Current streak |

---

## Visual Design Details

### Color Scheme for Skill Levels
- **Novice**: Gray (#6B7280)
- **Apprentice**: Green (#10B981)
- **Journeyman**: Blue (#3B82F6)
- **Expert**: Purple (#8B5CF6)
- **Master**: Gold (#F59E0B) with glow effect

### Profile Card Styling
- Dark background with subtle gradient
- Neon-style border (green primary)
- Pixel-perfect spacing
- Subtle hover animations
- "Achievement unlocked" style notifications

---

## Implementation Order

1. **Types & Data** - Create skill types and data structures
2. **useSkills Hook** - Build skill tracking logic with localStorage
3. **SkillBar Component** - Visual skill progress bar
4. **ProfileCard Component** - Main video game style card
5. **DailyMission Component** - Today's goals and notes
6. **Integrate with useProgress** - Link skill XP to question attempts
7. **Update ProfilePage** - Assemble new components
8. **SkillsPage** - Full skill tree view
9. **Visual Polish** - Add animations and effects

---

## Skills List (Complete)

### Strategic Foundations
1. **Adaptive Strategy** - Understanding how the CAT works and optimal pacing
2. **POE Mastery** - Process of elimination techniques
3. **Time Management** - Staying on pace and knowing when to guess

### Quantitative Combat
4. **Number Theory** - Primes, factors, divisibility, remainders
5. **Arithmetic Mastery** - Percentages, ratios, rates, averages
6. **Algebraic Equations** - Solving equations, systems, quadratics
7. **Geometric Reasoning** - Shapes, angles, coordinate geometry
8. **Probability & Counting** - Combinations, permutations, probability
9. **Data Sufficiency Logic** - The unique GMAT question format

### Verbal Warfare
10. **Sentence Structure** - Grammar rules, SC techniques
11. **Reading Tactics** - Passage mapping, main idea, inference
12. **Argument Analysis** - CR premise/conclusion identification
13. **Critical Logic** - Strengthen, weaken, assumption questions

### Data Integration
14. **Multi-Source Synthesis** - Combining info from multiple tabs
15. **Visual Interpretation** - Charts, graphs, data visualization
16. **Two-Part Reasoning** - Solving linked questions
17. **Table Analysis** - Sorting and analyzing data tables

### Mental Fortitude
18. **Focus Endurance** - Maintaining concentration (tracked via session length)
19. **Speed Under Pressure** - Performing quickly without sacrificing accuracy
20. **Pattern Recognition** - Identifying question types and traps quickly

---

## Dependencies

No new npm dependencies required. Uses:
- Existing UI components (Card, Progress, etc.)
- Framer Motion for animations (already installed)
- Lucide icons (already installed)
- localStorage for persistence (existing pattern)
