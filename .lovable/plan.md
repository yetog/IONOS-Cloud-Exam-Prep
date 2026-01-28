
# FF7R-Inspired Profile & Dashboard Overhaul

## Vision
Transform the Profile page into a **full-screen FF7R-style character status panel** and enhance the Dashboard with **smart navigation cards** for onboarding and session continuity.

---

## Part 1: FF7R Character Panel Design

### Layout Analysis (From Reference Image)

The FF7R UI has these key zones:

```text
┌─────────────────────────────────────────────────────────────────────────────┐
│  PARTY                                                                      │
│  ┌────────┐        EQUIPMENT SLOTS              ┌────────────────────────┐  │
│  │ Cloud  │  ┌─────────────────────────────┐    │                        │  │
│  │ Tifa   │  │  Iron Blade      ⬡⬡⬡⬡       │    │    CHARACTER           │  │
│  │ Barret │  │  A greatsword cast from...  │    │    PORTRAIT            │  │
│  └────────┘  ├─────────────────────────────┤    │                        │  │
│              │  Iron Bangle     ⬡⬡⬡⬡       │    │    Level: 13           │  │
│              │  An armband crafted from... │    │    EXP: 1139/1199      │  │
│              ├─────────────────────────────┤    │    HP: 1310/1720       │  │
│              │  Power Wristguards          │    │    MP: 18/79           │  │
│              │  Wristguards capable of...  │    │                        │  │
│              └─────────────────────────────┘    └────────────────────────┘  │
│  ┌───────────────────────────────────────────────────────────────────────┐  │
│  │  ATTRIBUTES                           AFFINITIES / RESISTANCES        │  │
│  │  ▸ Attack       99                   Lesser Resistances    ■■■■       │  │
│  │  ▸ Magic Attack 89                   Greater Resistances   ■■■        │  │
│  │  ▸ Defense      46                   Immunities            ■■■        │  │
│  │  ▸ Magic Def    38                   Absorbed Elements     ■          │  │
│  │  ▸ Strength     35                                                    │  │
│  │  ▸ Magic        29                                                    │  │
│  │  ▸ Vitality     25                                                    │  │
│  └───────────────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────────────┘
```

### GMAT Translation

| FF7R Element | GMAT Equivalent |
|--------------|-----------------|
| Party List | Study Modes (Practice, Learn, Notes) |
| Equipment Slots | "Active Focus" areas (e.g., current section, current technique) |
| Materia Slots (⬡) | Skill mastery indicators |
| Character Portrait | User avatar (large, prominent) |
| Level / EXP / HP / MP | Level / XP bar / Questions answered / Accuracy |
| Attributes | STR/INT/WIS/DEX/CON stats |
| Affinities | Strong/Weak sections, Skill breakdown |

---

## Part 2: New Profile Page Structure

### Full-Page Layout

```text
┌─────────────────────────────────────────────────────────────────────────────┐
│  ← Back to Dashboard                                           [Settings]  │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌────────────────┐  ┌─────────────────────────────────────────────────┐   │
│  │  PARTY MODES   │  │  EQUIPPED FOCUS                                 │   │
│  │  ─────────────  │  │  ┌──────────────────────────────────────────┐   │   │
│  │  ▸ Practice    │  │  │  ⚔ Data Sufficiency       ⬢⬢⬢⬡⬡          │   │   │
│  │    Timed Drills│  │  │  Your current focus area                  │   │   │
│  │                │  │  ├──────────────────────────────────────────┤   │   │
│  │  ▸ Learn       │  │  │  📖 Critical Reasoning    ⬢⬢⬡⬡⬡          │   │   │
│  │    Techniques  │  │  │  Next recommended skill                  │   │   │
│  │                │  │  └──────────────────────────────────────────┘   │   │
│  │  ▸ Notes       │  │                                                 │   │
│  │    Insights    │  │  TODAY'S MISSION                               │   │
│  │                │  │  ┌──────────────────────────────────────────┐   │   │
│  │                │  │  │  Focus: [ Verbal - CR           ]       │   │   │
│  │  ─────────────  │  │  │  Reminder: [ Review wrong answers ]     │   │   │
│  │  [View Skills] │  │  │  Notes: ____________________________    │   │   │
│  └────────────────┘  │  └──────────────────────────────────────────┘   │   │
│                      └─────────────────────────────────────────────────┘   │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │  ATTRIBUTES                               CHARACTER PANEL           │   │
│  │  ─────────────────────────────────        ─────────────────────     │   │
│  │  ▸ STR  Quant      ████████░░  78%        ┌──────────────────┐     │   │
│  │  ▸ INT  Verbal     ██████░░░░  62%        │                  │     │   │
│  │  ▸ WIS  IR         ███████░░░  71%        │   [AVATAR]       │     │   │
│  │  ▸ DEX  Speed      ████████░░  85%        │                  │     │   │
│  │  ▸ CON  Streak     ██████████  7d         │   GMAT Student   │     │   │
│  │                                            │   Lv. 12         │     │   │
│  │  RESISTANCES (Weaknesses)                 │   ━━━━━━━━━░░░   │     │   │
│  │  ─────────────────────────────────        │   2,450 / 3,800  │     │   │
│  │  ✗ Geometry             52%               │                  │     │   │
│  │  ✗ Sentence Correction  48%               │   🔥 7 day streak│     │   │
│  │                                            │   📅 45 days     │     │   │
│  │  AFFINITIES (Strengths)                   └──────────────────┘     │   │
│  │  ─────────────────────────────────                                  │   │
│  │  ✓ Number Theory        92%                                         │   │
│  │  ✓ Critical Reasoning   88%                                         │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │  TIMELINE                                    MILESTONES              │   │
│  │  ─────────────────────────────────          ──────────────────       │   │
│  │  Days to Test: 45                           ✓ First Blood            │   │
│  │  Readiness:    ████████░░  72%              ✓ 10 Questions           │   │
│  │  Questions:    156                          ○ 50 Questions           │   │
│  │  Accuracy:     74%                          ○ 100 Questions          │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Part 3: Dashboard Onboarding & Navigation

### Your Girlfriend's Feedback (Implemented)

**Problem**: "I don't know where to start" / "Hopping between every single one"

**Solution**: Add a **Hero Navigation Card** at the top with 3 swipeable states:

```text
┌─────────────────────────────────────────────────────────────────────────────┐
│  ⟨  ●  ○  ○  ⟩                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │  👋 WELCOME TO GMAT MASTERY                                          │   │
│  │  ─────────────────────────────────────────────────────────────────   │   │
│  │  New here? Start with the basics.                                    │   │
│  │                                                                       │   │
│  │  1. Set your goals in Profile                                        │   │
│  │  2. Learn a technique in the Learn section                           │   │
│  │  3. Practice questions to earn XP                                    │   │
│  │                                                                       │   │
│  │  [ Start Learning ]                              [ Skip for now → ]  │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────────────┘
```

**State 2: Continue Session** (appears after first practice)

```text
┌─────────────────────────────────────────────────────────────────────────────┐
│  ⟨  ○  ●  ○  ⟩                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │  ↩ PICK UP WHERE YOU LEFT OFF                                        │   │
│  │  ─────────────────────────────────────────────────────────────────   │   │
│  │  Last session: Data Sufficiency (3 hours ago)                        │   │
│  │  Progress: 8/15 questions • 75% accuracy                             │   │
│  │                                                                       │   │
│  │  [ Continue Session ]                             [ Start Fresh → ]  │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────────────┘
```

**State 3: Try Something New** (smart recommendation)

```text
┌─────────────────────────────────────────────────────────────────────────────┐
│  ⟨  ○  ○  ●  ⟩                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │  🎲 TRY SOMETHING NEW                                                │   │
│  │  ─────────────────────────────────────────────────────────────────   │   │
│  │  Based on your progress, we recommend:                               │   │
│  │                                                                       │   │
│  │  📊 Sentence Correction                                              │   │
│  │  You haven't practiced this in 4 days. Your accuracy is 52%.         │   │
│  │                                                                       │   │
│  │  [ Practice Now ]                                   [ Show Another ] │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Part 4: Visual Design Specifications

### FF7R-Inspired Styling (Keeping Matrix Green Theme)

**Key Visual Elements:**

| Element | Style |
|---------|-------|
| Borders | Double-line `border-2` with subtle glow |
| Section Headers | Uppercase, tracked, with left border accent |
| Progress Bars | Segmented style (not smooth gradient) |
| Materia Slots | Diamond shapes (⬢ filled, ⬡ empty) |
| Panel Separators | Horizontal lines with corner notches |
| Typography | Monospace for stats, clean sans for text |

**New CSS Classes:**

```css
/* FF7R Panel Frame */
.ff7-panel {
  @apply relative border-2 border-primary/60 bg-card/95 backdrop-blur-lg;
  box-shadow: 
    inset 0 0 20px hsl(var(--primary) / 0.1),
    0 0 30px hsl(var(--primary) / 0.2);
}

/* Corner Brackets */
.ff7-corners::before,
.ff7-corners::after { /* Corner decorations */ }

/* Segmented Progress Bar */
.progress-segmented {
  background: repeating-linear-gradient(
    90deg,
    hsl(var(--primary)) 0px,
    hsl(var(--primary)) 8px,
    transparent 8px,
    transparent 10px
  );
}

/* Materia Slot */
.materia-slot {
  @apply w-3 h-3 rotate-45 border border-primary/50;
}
.materia-slot.filled {
  @apply bg-primary shadow-[0_0_8px_hsl(var(--primary))];
}

/* Section Header */
.ff7-header {
  @apply uppercase tracking-widest text-sm font-bold text-primary;
  border-left: 3px solid hsl(var(--primary));
  padding-left: 12px;
}
```

---

## Part 5: Technical Implementation

### Files to Create

| File | Purpose |
|------|---------|
| `src/components/FF7ProfilePanel.tsx` | Main character panel component |
| `src/components/EquipmentSlot.tsx` | Current focus area with materia |
| `src/components/AttributeBar.tsx` | RPG stat display (STR/INT etc) |
| `src/components/HeroNavCard.tsx` | Dashboard onboarding carousel |
| `src/components/MateriaIndicator.tsx` | Skill level diamond display |
| `src/hooks/useSessionHistory.ts` | Track last session for "continue" |

### Files to Modify

| File | Changes |
|------|---------|
| `src/pages/ProfilePage.tsx` | Replace with FF7 panel layout |
| `src/pages/Dashboard.tsx` | Add HeroNavCard above mode selector |
| `src/index.css` | Add FF7R-inspired utility classes |
| `src/hooks/useProfile.ts` | Add current focus tracking |
| `src/types/profile.ts` | Add session history types |

### New Types

```typescript
interface SessionHistory {
  lastSection: GMATSection | null;
  lastType: QuestionType | null;
  lastPracticeTime: string | null;
  questionsInSession: number;
  sessionAccuracy: number;
}

interface EquippedFocus {
  primary: { skillId: string; progress: number } | null;
  secondary: { skillId: string; progress: number } | null;
}
```

---

## Part 6: Implementation Order

| Phase | Task | Complexity |
|-------|------|------------|
| 1 | Add FF7R CSS utilities to index.css | Low |
| 2 | Create `MateriaIndicator` component | Low |
| 3 | Create `AttributeBar` component | Low |
| 4 | Create `EquipmentSlot` component | Medium |
| 5 | Create `FF7ProfilePanel` (main layout) | High |
| 6 | Add `useSessionHistory` hook | Medium |
| 7 | Create `HeroNavCard` with carousel | Medium |
| 8 | Update Dashboard with HeroNavCard | Low |
| 9 | Replace ProfilePage layout | Medium |
| 10 | Polish animations and transitions | Medium |

---

## Part 7: Mobile Responsiveness

The FF7R layout will adapt:

**Desktop (lg+)**: Full 3-column layout as shown
**Tablet (md)**: 2-column with stacked sections
**Mobile (sm)**: Single column, vertical scroll with collapsible sections

Key breakpoint behavior:
- Avatar moves from right column to top-center on mobile
- Attributes grid becomes 2-column on mobile
- Party modes sidebar becomes horizontal tabs on mobile

---

## Summary

This redesign creates a cohesive RPG experience:

1. **Profile becomes a character status screen** - immersive, detailed, game-like
2. **Dashboard gains smart navigation** - solves the "where do I start" problem
3. **Visual language stays Matrix-green** - but with FF7R structural inspiration
4. **Session continuity** - pick up where you left off encourages daily practice
5. **Recommendations** - "try something new" keeps learning diverse
