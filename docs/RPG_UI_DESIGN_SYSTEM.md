# RPG UI Design System
## FF7R-Inspired Gaming Interface Language

**Purpose**: A portable design system specification that enables any AI agent or developer to recreate this FF7R/Matrix-inspired aesthetic. This document translates visual concepts into pure text/code descriptions.

**Last Updated**: January 2026

---

## 1. Design Philosophy

### Core Inspiration
- **Final Fantasy VII Remake**: Status screens, materia slots, equipment panels
- **The Matrix**: Neon green on black, digital rain, terminal aesthetics
- **Modern Gaming UIs**: Duolingo gamification, progression systems

### Key Principles
1. **Progression Over Time**: Levels, XP bars, mastery indicators
2. **Clear Feedback Loops**: Actions trigger visible, audible rewards
3. **Narrative Framing**: User journey as a hero's quest
4. **Emotional Reward**: Sound, animation, visual confirmation
5. **Clarity Under Complexity**: Deep systems, calm surface

### Target Emotions
- **Power**: "I am growing stronger"
- **Mastery**: "I understand this system"
- **Immersion**: "This feels like a game, not homework"

---

## 2. Visual Language

### 2.1 Color System

All colors use HSL format for maximum flexibility.

```css
:root {
  /* Primary: Matrix Green */
  --primary: 142 76% 45%;           /* hsl(142, 76%, 45%) - Vibrant green */
  --primary-foreground: 0 0% 100%;  /* White text on green */
  
  /* Background: Deep Black */
  --background: 0 0% 3%;            /* Near-black, #080808 */
  --foreground: 0 0% 98%;           /* Almost white text */
  
  /* Card: Elevated surfaces */
  --card: 0 0% 6%;                  /* Slightly lighter than bg */
  --card-foreground: 0 0% 98%;
  
  /* Muted: Secondary content */
  --muted: 0 0% 12%;
  --muted-foreground: 0 0% 60%;     /* Dimmed text */
  
  /* Accent: Interactive highlights */
  --accent: 0 0% 12%;
  --accent-foreground: 142 76% 55%; /* Brighter green */
  
  /* Status Colors */
  --destructive: 0 72% 51%;         /* Red for errors */
  --warning: 38 92% 50%;            /* Orange for warnings */
  --success: 142 76% 45%;           /* Green (same as primary) */
  --gold: 45 93% 47%;               /* Achievement gold */
}
```

### 2.2 Typography

```css
/* Headers: Clean, bold, tracked */
h1, h2, h3 { 
  font-weight: 700;
  letter-spacing: -0.02em;
}

/* Section Labels: Uppercase, tracked, small */
.ff7-header {
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: hsl(var(--primary));
  border-left: 3px solid hsl(var(--primary));
  padding-left: 0.75rem;
}

/* Stats/Numbers: Monospace for alignment */
.stat-value {
  font-family: 'SF Mono', 'Monaco', 'Consolas', monospace;
  font-weight: 600;
}

/* Abbreviations: 3-letter codes */
.stat-abbr {
  font-family: monospace;
  font-size: 0.625rem;
  font-weight: 700;
  text-transform: uppercase;
  opacity: 0.7;
}
```

### 2.3 Spacing & Layout Grid

```
Desktop (lg+): 3-column layout
┌─────────┬─────────────────┬──────────┐
│ 240px   │     1fr         │  280px   │
│ Sidebar │     Main        │  Panel   │
└─────────┴─────────────────┴──────────┘

Tablet (md): 2-column
┌────────────────┬──────────┐
│      1fr       │  280px   │
│      Main      │  Panel   │
└────────────────┴──────────┘

Mobile (sm): Single column, stacked
┌────────────────────────────┐
│           Panel            │
├────────────────────────────┤
│           Main             │
├────────────────────────────┤
│          Sidebar           │
└────────────────────────────┘
```

**Spacing Scale** (rem):
- xs: 0.25rem (4px)
- sm: 0.5rem (8px)
- md: 1rem (16px)
- lg: 1.5rem (24px)
- xl: 2rem (32px)

### 2.4 Border & Glow Treatments

```css
/* Panel Borders: Double-line effect with glow */
.ff7-panel {
  border: 2px solid hsl(var(--primary) / 0.6);
  border-radius: 0.75rem;
  background: hsl(var(--card) / 0.95);
  backdrop-filter: blur(16px);
  box-shadow: 
    inset 0 0 20px hsl(var(--primary) / 0.1),  /* Inner glow */
    0 0 30px hsl(var(--primary) / 0.15);       /* Outer glow */
}

/* Corner Accents (optional enhancement) */
.ff7-corners::before { /* Top-left bracket */ }
.ff7-corners::after  { /* Bottom-right bracket */ }

/* Text Glow Effect */
.text-glow {
  text-shadow: 0 0 10px hsl(var(--primary) / 0.5);
}
```

---

## 3. Component Patterns

### 3.1 Panel Frame (Primary Container)

**Purpose**: Main container for grouped content
**Feeling**: High-tech terminal, game menu, premium glass

**ASCII Representation**:
```
┌──────────────────────────────────────────────┐
│ ┌─                                        ─┐ │
│   ■ SECTION HEADER                          │
│   ─────────────────────────                 │
│                                             │
│   [Content Area]                            │
│                                             │
│ └─                                        ─┘ │
└──────────────────────────────────────────────┘
```

**CSS Implementation**:
```css
.ff7-panel {
  position: relative;
  border: 2px solid hsl(var(--primary) / 0.6);
  background: hsl(var(--card) / 0.95);
  backdrop-filter: blur(16px);
  border-radius: 0.75rem;
  padding: 1rem;
  box-shadow: 
    inset 0 0 20px hsl(var(--primary) / 0.1),
    0 0 30px hsl(var(--primary) / 0.15);
}

.ff7-header {
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: hsl(var(--primary));
  border-left: 3px solid hsl(var(--primary));
  padding-left: 0.75rem;
  margin-bottom: 1rem;
}
```

**React Pattern**:
```tsx
<div className="ff7-panel">
  <h3 className="ff7-header">Section Title</h3>
  {children}
</div>
```

### 3.2 Materia Indicator (Skill Mastery)

**Purpose**: Show progression level on 1-5 scale
**Inspiration**: FF7 materia slots on weapons/armor

**Visual Description**:
- Small diamond shapes (squares rotated 45°)
- Filled slots: Primary color with 8px glow
- Empty slots: Transparent with 40% primary border
- Horizontal arrangement with small gaps

**ASCII Example** (3/5 filled):
```
⬢ ⬢ ⬢ ⬡ ⬡
```

**CSS Implementation**:
```css
.materia-slot {
  width: 0.75rem;      /* 12px */
  height: 0.75rem;
  transform: rotate(45deg);
  border: 1px solid hsl(var(--primary) / 0.4);
  background: transparent;
  transition: all 0.2s ease;
}

.materia-slot.filled {
  background: hsl(var(--primary));
  border-color: hsl(var(--primary));
  box-shadow: 0 0 8px hsl(var(--primary));
}
```

**React Component**:
```tsx
interface MateriaIndicatorProps {
  filled: number;    // 0-5
  total?: number;    // Default 5
  size?: 'sm' | 'md' | 'lg';
}

function MateriaIndicator({ filled, total = 5, size = 'md' }: MateriaIndicatorProps) {
  const sizeClasses = {
    sm: 'w-2 h-2',
    md: 'w-3 h-3',
    lg: 'w-4 h-4',
  };
  
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className={cn(
            sizeClasses[size],
            'rotate-45 border transition-all',
            i < filled
              ? 'bg-primary border-primary shadow-[0_0_8px_hsl(var(--primary))]'
              : 'bg-transparent border-primary/40'
          )}
        />
      ))}
    </div>
  );
}
```

### 3.3 Attribute Bar (RPG Stats)

**Purpose**: Display stats with abbreviation, label, progress, and value
**Inspiration**: FF7R character status screen

**Layout**:
```
[ABBR] [Label    ] [████████░░░░░░░░] [Value]
 STR    Quant      ████████░░░░░░░░    78%
 INT    Verbal     ██████░░░░░░░░░░    62%
 WIS    IR         ███████░░░░░░░░░    71%
 DEX    Speed      ████████░░░░░░░░    85%
 CON    Streak     ██████████          7d
```

**Key Features**:
- 3-letter abbreviation in monospace, dimmed
- Human-readable label
- Segmented progress bar (not smooth gradient)
- Value aligned right, monospace

**Segmented Bar CSS**:
```css
.progress-segmented {
  background: hsl(var(--muted));
  border-radius: 2px;
  overflow: hidden;
}

.progress-segmented-fill {
  height: 100%;
  background: repeating-linear-gradient(
    90deg,
    hsl(var(--primary)) 0px,
    hsl(var(--primary)) 6px,
    transparent 6px,
    transparent 8px
  );
  transition: width 0.3s ease;
}
```

**React Component**:
```tsx
interface AttributeBarProps {
  name: string;        // "STR", "INT", etc.
  label: string;       // "Quant", "Verbal", etc.
  value: number;       // 0-100
  displayValue?: string; // Override value display
  color?: 'red' | 'blue' | 'purple' | 'yellow' | 'orange' | 'primary';
}

function AttributeBar({ name, label, value, displayValue, color = 'primary' }: AttributeBarProps) {
  return (
    <div className="flex items-center gap-2 text-sm">
      <span className="w-8 font-mono text-xs font-bold text-muted-foreground">
        {name}
      </span>
      <span className="w-16 text-foreground">{label}</span>
      <div className="flex-1 h-2 bg-muted rounded-sm overflow-hidden">
        <div 
          className="h-full progress-segmented-fill"
          style={{ width: `${Math.min(value, 100)}%` }}
        />
      </div>
      <span className="w-10 text-right font-mono text-foreground">
        {displayValue ?? `${value}%`}
      </span>
    </div>
  );
}
```

### 3.4 Equipment Slot (Current Focus)

**Purpose**: Display active skill/technique with materia
**Inspiration**: FF7R weapon/armor equipment slots

**Layout**:
```
┌────────────────────────────────────────────┐
│  ⚔ Data Sufficiency           ⬢⬢⬢⬡⬡       │
│    Expert • 1,250 XP                       │
├────────────────────────────────────────────┤
│  📖 Critical Reasoning        ⬢⬢⬡⬡⬡       │
│    Journeyman • 580 XP                     │
└────────────────────────────────────────────┘
```

**React Component**:
```tsx
interface EquipmentSlotProps {
  name: string;
  description: string;
  materiaFilled: number;  // 0-5
  isActive?: boolean;
  icon?: React.ReactNode;
}

function EquipmentSlot({ name, description, materiaFilled, isActive, icon }: EquipmentSlotProps) {
  return (
    <div className={cn(
      'flex items-center gap-3 p-3 rounded-lg border transition-colors',
      isActive 
        ? 'border-primary/50 bg-primary/5' 
        : 'border-border/50 bg-card/50'
    )}>
      <div className="p-2 rounded-lg bg-primary/20 text-primary">
        {icon ?? <Zap className="h-4 w-4" />}
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-medium text-foreground text-sm truncate">{name}</p>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
      <MateriaIndicator filled={materiaFilled} size="sm" />
    </div>
  );
}
```

### 3.5 Character Panel (Profile Display)

**Purpose**: Show user avatar, level, XP, and key stats
**Inspiration**: FF7R party member status

**Layout**:
```
┌──────────────────────────┐
│     ╭─────────────╮      │
│     │             │      │
│     │   [AVATAR]  │      │
│     │             │      │
│     ╰─────────────╯      │
│         Lv.12            │
│                          │
│      PLAYER NAME ⚡      │
│       Speed Demon        │
│                          │
│  EXP ━━━━━━━━━░░░        │
│      2,450 / 3,800       │
│                          │
│  🔥 7 day    📅 45 days  │
└──────────────────────────┘
```

**Key Features**:
- Circular avatar with glow ring
- Level badge overlapping avatar bottom
- Player "class" determined by stats
- XP bar with exact numbers
- Streak and countdown icons

### 3.6 Hero Navigation Card (Smart Carousel)

**Purpose**: Smart onboarding/continuation/recommendation system
**States**: 
1. Onboarding (new users)
2. Continue Session (returning users)
3. Recommendations (based on weak areas)

**Layout**:
```
     ●  ○  ○   (pagination dots)
┌──────────────────────────────────────────────┐
│ ┌─                                        ─┐ │
│   ✨ WELCOME TO GMAT MASTERY                 │
│   ───────────────────────────────────────    │
│                                              │
│   New here? Start with the basics.           │
│                                              │
│   1. Set your goals in Profile               │
│   2. Learn a technique in Learn              │
│   3. Practice questions to earn XP           │
│                                              │
│   [Start Learning]      [Set Goals →]        │
│                                              │
│ └─                                        ─┘ │
│ ◀                                        ▶   │
└──────────────────────────────────────────────┘
```

---

## 4. Animation & Sound Guidelines

### 4.1 Transition Timing

```css
/* Quick micro-interactions */
--transition-fast: 150ms ease-out;

/* Standard state changes */
--transition-normal: 200ms ease-out;

/* Emphasis animations */
--transition-slow: 300ms ease-out;

/* Page transitions */
--transition-page: 400ms ease-in-out;
```

### 4.2 Hover & Focus States

```css
/* Cards: Subtle lift + border highlight */
.card:hover {
  transform: translateY(-2px);
  border-color: hsl(var(--primary) / 0.5);
  box-shadow: 0 4px 20px hsl(var(--primary) / 0.1);
}

/* Buttons: Glow intensification */
.button-primary:hover {
  box-shadow: 0 0 20px hsl(var(--primary) / 0.4);
}

/* Links: Underline slide-in */
.link::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background: hsl(var(--primary));
  transform: scaleX(0);
  transform-origin: right;
  transition: transform 0.3s ease;
}
.link:hover::after {
  transform: scaleX(1);
  transform-origin: left;
}
```

### 4.3 Sound Design System

**Categories**:
1. **Feedback** - Confirms user actions (click, save, toggle)
2. **Reward** - Celebrates achievements (XP, level, streak)
3. **Status** - Indicates state changes (correct, incorrect)

**Sound Event Map**:
| Event | Type | Duration | Description |
|-------|------|----------|-------------|
| `xpGain` | Reward | 0.5s | Ascending chime, coin-like |
| `levelUp` | Reward | 2-3s | Triumphant fanfare |
| `correct` | Status | 0.3s | Bright, positive tone |
| `incorrect` | Status | 0.3s | Soft, descending tone |
| `click` | Feedback | 0.1s | Subtle UI click |
| `achievement` | Reward | 1.5s | Victory jingle |
| `save` | Feedback | 0.2s | Quick confirmation |

**Volume Guidelines**:
- UI clicks: 30% of master
- Status sounds: 50% of master
- Reward sounds: 100% (but short duration)

**Technical Requirements**:
- Format: MP3 (best compatibility)
- Sample rate: 44.1kHz
- Bitrate: 128kbps minimum

**Implementation**:
```tsx
// src/hooks/useGameSounds.ts
import useSound from 'use-sound';

export function useGameSounds() {
  const [settings] = useLocalStorage('sound-settings', { enabled: true, volume: 0.5 });
  
  const [playXpGain] = useSound('/sounds/xp-gain.mp3', { volume: settings.volume });
  const [playLevelUp] = useSound('/sounds/level-up.mp3', { volume: settings.volume });
  const [playCorrect] = useSound('/sounds/correct.mp3', { volume: settings.volume });
  const [playIncorrect] = useSound('/sounds/incorrect.mp3', { volume: settings.volume });
  const [playClick] = useSound('/sounds/ui-click.mp3', { volume: settings.volume * 0.3 });
  
  return { playXpGain, playLevelUp, playCorrect, playIncorrect, playClick, settings };
}
```

---

## 5. Implementation Reference

### 5.1 Complete CSS Utility Classes

Add to your `index.css`:

```css
/* ========================================
   FF7R-INSPIRED UTILITY CLASSES
   ======================================== */

/* Panel Frame */
.ff7-panel {
  @apply relative border-2 border-primary/60 bg-card/95 backdrop-blur-lg rounded-xl p-4;
  box-shadow: 
    inset 0 0 20px hsl(var(--primary) / 0.1),
    0 0 30px hsl(var(--primary) / 0.15);
}

/* Section Header */
.ff7-header {
  @apply uppercase tracking-widest text-xs font-bold text-primary mb-4;
  border-left: 3px solid hsl(var(--primary));
  padding-left: 0.75rem;
}

/* Segmented Progress Bar */
.progress-segmented {
  @apply h-2 bg-muted rounded-sm overflow-hidden;
}
.progress-segmented-fill {
  @apply h-full;
  background: repeating-linear-gradient(
    90deg,
    hsl(var(--primary)) 0px,
    hsl(var(--primary)) 6px,
    transparent 6px,
    transparent 8px
  );
}

/* Text Glow */
.text-glow {
  text-shadow: 0 0 10px hsl(var(--primary) / 0.5);
}

/* Grid Background */
.bg-grid {
  background-image: 
    linear-gradient(hsl(var(--primary) / 0.03) 1px, transparent 1px),
    linear-gradient(90deg, hsl(var(--primary) / 0.03) 1px, transparent 1px);
  background-size: 32px 32px;
}

/* Radial Gradient Overlay */
.bg-gradient-radial {
  background: radial-gradient(circle at 50% 50%, var(--tw-gradient-stops));
}

/* Glass Effect */
.glass {
  @apply bg-card/80 backdrop-blur-md border border-border/50;
}

/* Hover Lift */
.hover-lift {
  @apply transition-all duration-200;
}
.hover-lift:hover {
  @apply -translate-y-0.5;
  box-shadow: 0 4px 20px hsl(var(--primary) / 0.1);
}
```

### 5.2 Tailwind Config Additions

```js
// tailwind.config.ts
module.exports = {
  theme: {
    extend: {
      colors: {
        gold: 'hsl(45, 93%, 47%)',
        warning: 'hsl(38, 92%, 50%)',
        success: 'hsl(var(--primary))',
      },
      animation: {
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'fade-in': 'fade-in 0.3s ease-out',
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.6' },
        },
        'fade-in': {
          from: { opacity: '0', transform: 'translateY(10px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
};
```

### 5.3 TypeScript Interfaces

```typescript
// types/ui.ts

interface MateriaLevel {
  filled: number;      // 0-5
  total: number;       // Usually 5
}

interface Attribute {
  abbr: string;        // "STR", "INT", etc.
  label: string;       // "Quant", "Verbal", etc.
  value: number;       // 0-100
  displayValue?: string;
  color?: 'red' | 'blue' | 'purple' | 'yellow' | 'orange' | 'primary';
}

interface PlayerClass {
  name: string;        // "Speed Demon", "Quant Warrior", etc.
  icon: string;        // Emoji or icon name
}

interface EquipmentFocus {
  id: string;
  name: string;
  description: string;
  materiaLevel: MateriaLevel;
  isActive: boolean;
}

interface CharacterProfile {
  displayName: string;
  avatarUrl?: string;
  level: number;
  xp: { current: number; required: number; percentage: number };
  playerClass: PlayerClass;
  streak: number;
  daysUntilTest?: number;
}
```

---

## 6. Page Layout Examples

### 6.1 Profile Page (Character Status Screen)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  ← Back to Dashboard                                           [Settings]  │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌────────────────┐  ┌─────────────────────────────────────┬──────────────┐│
│  │  PARTY MODES   │  │  EQUIPPED FOCUS                     │  CHARACTER   ││
│  │  ─────────────  │  │  ┌────────────────────────────────┐ │  ──────────  ││
│  │  ▸ Practice    │  │  │  ⚔ Data Sufficiency   ⬢⬢⬢⬡⬡    │ │   [AVATAR]  ││
│  │  ▸ Learn       │  │  │  Expert • 1,250 XP              │ │    Lv.12    ││
│  │  ▸ Notes       │  │  ├────────────────────────────────┤ │             ││
│  │                │  │  │  📖 Critical Reasoning ⬢⬢⬡⬡⬡    │ │  Username   ││
│  │  ─────────────  │  │  │  Journeyman • 580 XP           │ │  Speed Demon││
│  │  [View Skills] │  │  └────────────────────────────────┘ │             ││
│  └────────────────┘  │                                      │  EXP Bar    ││
│                      │  TODAY'S MISSION                     │  2450/3800  ││
│                      │  ┌────────────────────────────────┐ │             ││
│                      │  │  Focus: Verbal - CR            │ │  🔥 7 day   ││
│                      │  │  Target: 10 questions          │ │  📅 45 days ││
│                      │  └────────────────────────────────┘ │             ││
│                      └─────────────────────────────────────┴──────────────┘│
│                                                                             │
│  ┌───────────────────────────────────────────────────────────────────────┐ │
│  │  ATTRIBUTES                                                           │ │
│  │  ─────────────────────────────────────────────────────────────────    │ │
│  │  STR  Quant   ████████░░░░░░░░  78%                                   │ │
│  │  INT  Verbal  ██████░░░░░░░░░░  62%                                   │ │
│  │  WIS  IR      ███████░░░░░░░░░  71%                                   │ │
│  │  DEX  Speed   ████████░░░░░░░░  85%                                   │ │
│  │  CON  Streak  ██████████        7d                                    │ │
│  │                                                                        │ │
│  │  ┌─────────────────────────────┬──────────────────────────────────┐   │ │
│  │  │ STRENGTHS                   │ WEAKNESSES                       │   │ │
│  │  │ ✓ Number Theory      92%    │ ✗ Geometry            52%        │   │ │
│  │  │ ✓ Critical Reasoning 88%    │ ✗ Sentence Correction 48%        │   │ │
│  │  └─────────────────────────────┴──────────────────────────────────┘   │ │
│  └───────────────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 6.2 Dashboard with Hero Nav Card

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  GMAT Mastery                                    Lv.12  🔥7  [Avatar]      │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌───────────────────────────────────────────────────────────────────────┐ │
│  │                        ●  ○  ○  (dots)                                │ │
│  │  ┌─                                                                ─┐ │ │
│  │    ✨ WELCOME TO GMAT MASTERY                                         │ │
│  │    ───────────────────────────────────────────                       │ │
│  │    New here? Start with the basics...                                │ │
│  │    [Start Learning]                         [Set Goals →]            │ │
│  │  └─                                                                ─┘ │ │
│  │  ◀                                                                ▶   │ │
│  └───────────────────────────────────────────────────────────────────────┘ │
│                                                                             │
│  ┌───────────────────────────────────────────────────────────────────────┐ │
│  │  STUDY MODES                                                          │ │
│  │  ─────────────                                                        │ │
│  │  ┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐          │ │
│  │  │  ⚔ PRACTICE     │ │  📖 LEARN       │ │  📝 NOTES       │          │ │
│  │  │  Timed Drills   │ │  Techniques     │ │  Insights       │          │ │
│  │  └─────────────────┘ └─────────────────┘ └─────────────────┘          │ │
│  └───────────────────────────────────────────────────────────────────────┘ │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 7. Checklist for Recreation

When rebuilding this design system in a new project:

### Setup
- [ ] Add HSL color variables to `:root` in CSS
- [ ] Add utility classes (`.ff7-panel`, `.ff7-header`, etc.)
- [ ] Configure Tailwind with custom colors and animations
- [ ] Install `framer-motion` for animations
- [ ] Install `use-sound` for audio feedback

### Core Components
- [ ] Create `MateriaIndicator` component
- [ ] Create `AttributeBar` component  
- [ ] Create `EquipmentSlot` component
- [ ] Create panel container with `.ff7-panel` class
- [ ] Set up `useGameSounds` hook

### Layout
- [ ] 3-column grid for desktop profile
- [ ] Responsive breakpoints for tablet/mobile
- [ ] Glass morphism card backgrounds
- [ ] Grid pattern overlay on background

### Polish
- [ ] Hover lift effects on cards
- [ ] Text glow on primary headlines
- [ ] Border glow on focus states
- [ ] Sound feedback on key interactions

---

*This design system was created for the GMAT Mastery project and can be adapted for any gamified learning or productivity application.*
