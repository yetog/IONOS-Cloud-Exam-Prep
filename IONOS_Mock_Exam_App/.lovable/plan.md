

# RPG UI Design System Documentation & Sound Effects Integration

## Overview

This plan covers two interconnected features:

1. **Design System Documentation** - Create a comprehensive, agent-readable markdown file that captures the FF7R-inspired UI design system so any AI agent (even without image capabilities) can recreate this visual language in future projects

2. **Sound Effects System** - Add immersive audio feedback using the `use-sound` library for XP gains, level ups, navigation, and interactions

---

## Part 1: Design System Documentation

### Purpose

The goal is to create a **portable design language specification** that:
- Translates visual concepts into pure text/code descriptions
- Can be copy-pasted into any new project
- Enables AI agents without vision to recreate the exact aesthetic
- Includes ready-to-use CSS, component patterns, and implementation examples

### File Location

```
docs/
  RPG_UI_DESIGN_SYSTEM.md
```

### Document Structure

The documentation will be organized into these sections:

```text
1. Design Philosophy
   - Core inspiration (FF7R, Matrix, gaming UIs)
   - Key principles (progression, feedback loops, narrative framing)
   - Target emotions (power, mastery, immersion)

2. Visual Language
   - Color System (with HSL values)
   - Typography rules
   - Spacing and layout grids
   - Border and glow treatments

3. Component Patterns
   - Panel/Card frames (with ASCII diagrams)
   - Progress indicators (segmented bars, materia slots)
   - Stat displays (attribute bars, RPG stats)
   - Navigation patterns (carousel, corner accents)
   - Button and interaction states

4. Animation & Sound Guidelines
   - Transition timing
   - Hover/focus behaviors
   - Sound trigger points
   - Audio file specifications

5. Implementation Reference
   - Complete CSS utility classes
   - React component templates
   - Tailwind config additions
   - TypeScript interfaces

6. Examples & Wireframes
   - Full-page layouts in ASCII
   - Component composition patterns
   - Responsive breakpoint behaviors
```

### Key Content Sections

**Section: Panel Frame Pattern**
```text
FF7 PANEL FRAME
===============
Purpose: Primary container for grouped content
Feeling: High-tech terminal, game menu, premium glass

Visual Description:
- Double-line border (2px) with 60% opacity primary color
- Background: 95% opacity card color with heavy blur (16px+)
- Inner glow: 20px inward shadow using primary at 10%
- Outer glow: 30px outward shadow using primary at 15%
- Corner decorations: Small L-shaped brackets at corners

ASCII Representation:
┌──────────────────────────────┐
│ ┌─                        ─┐ │
│   [CONTENT AREA]            │
│ └─                        ─┘ │
└──────────────────────────────┘

CSS Implementation:
.ff7-panel {
  position: relative;
  border: 2px solid hsl(var(--primary) / 0.6);
  background: hsl(var(--card) / 0.95);
  backdrop-filter: blur(16px);
  border-radius: 0.75rem;
  box-shadow: 
    inset 0 0 20px hsl(var(--primary) / 0.1),
    0 0 30px hsl(var(--primary) / 0.15);
}
```

**Section: Materia Indicator Pattern**
```text
MATERIA SLOTS (Skill Mastery)
=============================
Purpose: Show progression level (1-5 scale)
Inspiration: FF7 materia slots on weapons/armor

Visual Description:
- Small diamond shapes (rotated 45 degrees)
- Filled slots: Primary color with 8px glow
- Empty slots: Transparent with 40% primary border
- Arranged horizontally with small gaps

Example (3/5 filled):
  ⬢ ⬢ ⬢ ⬡ ⬡

React Component Pattern:
{Array.from({ length: 5 }).map((_, i) => (
  <div className={cn(
    'w-3 h-3 rotate-45 border',
    i < filled 
      ? 'bg-primary border-primary shadow-[0_0_8px_hsl(var(--primary))]'
      : 'bg-transparent border-primary/40'
  )} />
))}
```

**Section: Attribute Bar Pattern**
```text
RPG ATTRIBUTE BAR
=================
Purpose: Display stats with label and percentage
Inspiration: FF7R character status screen

Layout:
[ABBR] [Label    ] [████████░░░░░░░░] [Value]
 ^       ^              ^               ^
 |       |              |               └─ Monospace number/percentage
 |       |              └─ Segmented progress (not smooth)
 |       └─ Human-readable name
 └─ 3-letter abbreviation (STR, INT, WIS, DEX, CON)

Segmented Bar CSS:
background: repeating-linear-gradient(
  90deg,
  currentColor 0px,
  currentColor 6px,
  transparent 6px,
  transparent 8px
);
```

---

## Part 2: Sound Effects System

### Library Choice: `use-sound`

Using Josh Comeau's `use-sound` library (wrapper around Howler.js):
- Simple React hook API
- Supports sprites (multiple sounds in one file)
- Volume control, playback rate, interruption handling
- Lightweight and well-maintained

### Installation

```bash
npm install use-sound
```

### Sound Events to Implement

| Event | Sound Type | Description |
|-------|-----------|-------------|
| `xpGain` | Coin/chime | Short ascending tone when earning XP |
| `levelUp` | Fanfare | Triumphant jingle for level up |
| `correct` | Success | Bright confirmation for correct answer |
| `incorrect` | Error | Soft negative tone for wrong answer |
| `navigate` | UI click | Subtle click for menu navigation |
| `hover` | Soft tick | Very quiet hover feedback |
| `achievement` | Victory | Celebratory sound for unlocked achievements |
| `streakBonus` | Power-up | Rising tone for streak bonuses |
| `save` | Confirm | Quick save confirmation sound |

### Sound File Strategy

Option A: Use a sprite sheet (single MP3 with multiple sounds)
Option B: Individual MP3 files in `public/sounds/`

Recommended: **Individual files** for easier maintenance

```
public/
  sounds/
    xp-gain.mp3
    level-up.mp3
    correct.mp3
    incorrect.mp3
    ui-click.mp3
    ui-hover.mp3
    achievement.mp3
    streak-bonus.mp3
    save.mp3
```

### Hook Implementation

**File: `src/hooks/useGameSounds.ts`**

```typescript
import useSound from 'use-sound';
import { useLocalStorage } from './useLocalStorage';

interface SoundSettings {
  enabled: boolean;
  volume: number; // 0-1
}

export function useGameSounds() {
  const [settings, setSettings] = useLocalStorage<SoundSettings>(
    'gmat-sound-settings',
    { enabled: true, volume: 0.5 }
  );

  const soundOptions = { 
    volume: settings.volume,
    soundEnabled: settings.enabled 
  };

  const [playXpGain] = useSound('/sounds/xp-gain.mp3', soundOptions);
  const [playLevelUp] = useSound('/sounds/level-up.mp3', soundOptions);
  const [playCorrect] = useSound('/sounds/correct.mp3', soundOptions);
  const [playIncorrect] = useSound('/sounds/incorrect.mp3', soundOptions);
  const [playClick] = useSound('/sounds/ui-click.mp3', { 
    ...soundOptions, 
    volume: settings.volume * 0.3 
  });
  const [playAchievement] = useSound('/sounds/achievement.mp3', soundOptions);

  return {
    // Sounds
    playXpGain,
    playLevelUp,
    playCorrect,
    playIncorrect,
    playClick,
    playAchievement,
    // Settings
    soundEnabled: settings.enabled,
    soundVolume: settings.volume,
    toggleSound: () => setSettings(s => ({ ...s, enabled: !s.enabled })),
    setVolume: (v: number) => setSettings(s => ({ ...s, volume: v })),
  };
}
```

### Integration Points

| Component | Trigger | Sound |
|-----------|---------|-------|
| `PracticeMode.tsx` | Answer correct | `playCorrect` |
| `PracticeMode.tsx` | Answer incorrect | `playIncorrect` |
| `useProgress.ts` | XP gained | `playXpGain` |
| `useProgress.ts` | Level up | `playLevelUp` |
| `AchievementBadge.tsx` | Achievement unlocked | `playAchievement` |
| `HeroNavCard.tsx` | Carousel swipe | `playClick` |
| `EquipmentSlot.tsx` | Slot clicked | `playClick` |

### Sound Settings UI

Add to Profile/Settings:
- Toggle: Sound Effects On/Off
- Slider: Volume (0-100%)

---

## Part 3: Documentation for Reuse

After implementing sound effects, add a section to the design system document:

```text
AUDIO DESIGN SYSTEM
===================

Purpose: Provide tactile feedback for all meaningful interactions.
Inspiration: Final Fantasy menu sounds, Duolingo gamification

Sound Categories:
1. Feedback - Confirms user actions (click, save, toggle)
2. Reward - Celebrates achievements (XP, level, streak)
3. Status - Indicates state changes (correct, incorrect)

Technical Requirements:
- Format: MP3 (best compatibility)
- Duration: 0.1-2 seconds for UI, up to 4 seconds for fanfares
- Sample rate: 44.1kHz
- Bitrate: 128kbps minimum

Volume Guidelines:
- UI clicks: 30% of master volume
- Feedback sounds: 50% of master volume
- Reward sounds: 100% of master volume (but short duration)

Implementation Pattern:
[Code example for useGameSounds hook]
```

---

## Implementation Order

| Phase | Task | Files |
|-------|------|-------|
| 1 | Create design system documentation | `docs/RPG_UI_DESIGN_SYSTEM.md` |
| 2 | Install use-sound package | `package.json` |
| 3 | Add placeholder sound files | `public/sounds/*.mp3` |
| 4 | Create useGameSounds hook | `src/hooks/useGameSounds.ts` |
| 5 | Integrate sounds into PracticeMode | `src/pages/PracticeMode.tsx` |
| 6 | Integrate sounds into progress system | `src/hooks/useProgress.ts` |
| 7 | Add sound settings to Profile | `src/components/FF7ProfilePanel.tsx` |
| 8 | Update design system with audio section | `docs/RPG_UI_DESIGN_SYSTEM.md` |

---

## Sound File Sources

For placeholder sounds, we can:

1. **Use royalty-free game sound packs** (OpenGameArt, Freesound)
2. **Generate with ElevenLabs SFX API** (already documented in project)
3. **Use simple synthesized tones** (Web Audio API)

Recommended: Start with free CC0 sounds, replace with custom-generated sounds later.

---

## Technical Notes

### Browser Audio Policies

Modern browsers require user interaction before playing audio. The hook handles this by:
- Sounds only play after first user click/interaction
- No autoplay on page load
- Graceful fallback if audio fails

### Performance

- Sound files lazy-load on first use
- No impact on initial page load
- Files cached by browser after first play

### Accessibility

- All sounds are optional (toggle in settings)
- No critical information conveyed only through sound
- Visual feedback always accompanies audio feedback

---

## Summary

This plan delivers:

1. **Portable Design System** - A comprehensive markdown file that any AI agent can read to recreate this FF7R-inspired aesthetic in new projects

2. **Immersive Sound Effects** - A complete audio feedback system using the `use-sound` library with proper settings management

3. **Reusable Documentation** - Both visual and audio design systems documented together for future projects

The design system document will be the "source of truth" that captures everything special about this UI in agent-readable form.

