
# Profile Section Implementation Plan

## Overview
Add a new Profile page (`/profile`) accessible from the dashboard's Quick Access section. This page will include a profile picture upload, personal goals, test insights, and preparation timeline—making the app feel more personalized and goal-oriented.

---

## New Features

### 1. Profile Page (`/profile`)

**Sections to include:**

**Header Area:**
- Profile picture (uploadable, stored as base64 in localStorage)
- Display name (editable)
- "Member since" date
- Current level and total XP display

**My Goals Section:**
- Target GMAT score (205-805 range)
- Target test date (date picker)
- Daily practice goal (questions per day)
- Weekly time commitment goal
- Progress toward each goal shown visually

**Test Insights Section:**
- Strongest section (auto-calculated from stats)
- Weakest section (auto-calculated)
- Recommended focus area
- Average time per question vs target
- Recent accuracy trend (up/down/stable)

**Study Timeline:**
- Days until test date
- Estimated readiness score
- Milestones achieved

---

### 2. Profile Data Structure

New TypeScript interface for profile data:

```typescript
interface UserProfile {
  displayName: string;
  avatarUrl: string | null; // base64 data URL or null
  createdAt: string; // ISO date
  goals: {
    targetScore: number | null; // 205-805
    testDate: string | null; // ISO date
    dailyQuestionGoal: number;
    weeklyTimeGoal: number; // minutes
  };
}
```

Stored in localStorage as `gmat-profile`.

---

### 3. Profile Picture Upload

**Implementation approach:**
- Use HTML file input with accept="image/*"
- Convert uploaded image to base64 for localStorage storage
- Crop/resize to reasonable dimensions (200x200 max)
- Display with fallback avatar (initials or default icon)

**UI:**
- Circular avatar with camera/edit overlay on hover
- Click to trigger file picker
- Preview before saving

---

### 4. Dashboard Quick Access Card

Add to the existing Quick Access grid:
- Icon: User (from lucide-react)
- Title: "My Profile"
- Subtitle: "Goals & insights"
- Links to `/profile`

---

### 5. New Hook: useProfile

Create `src/hooks/useProfile.ts`:
- Manages profile state in localStorage
- Provides functions: updateProfile, updateGoals, updateAvatar
- Computes insights from progress data

---

## File Changes Summary

| File | Action |
|------|--------|
| `src/types/profile.ts` | Create - Profile interfaces |
| `src/hooks/useProfile.ts` | Create - Profile state management |
| `src/pages/ProfilePage.tsx` | Create - Main profile page |
| `src/components/AvatarUpload.tsx` | Create - Profile picture component |
| `src/components/GoalsCard.tsx` | Create - Goals display/edit card |
| `src/components/InsightsCard.tsx` | Create - Auto-calculated insights |
| `src/pages/Dashboard.tsx` | Modify - Add Profile quick access card |
| `src/App.tsx` | Modify - Add `/profile` route |

---

## UI Layout (ASCII Wireframe)

```text
+------------------------------------------+
| <- Back to Dashboard                     |
|                                          |
| +------+  [Display Name]        [Edit]   |
| | AVATAR|  Level 5 | 2,450 XP            |
| +------+  Member since Jan 2025          |
+------------------------------------------+
|                                          |
| MY GOALS                          [Edit] |
| +--------------------------------------+ |
| | Target Score: 720                    | |
| | [============================>] 720  | |
| +--------------------------------------+ |
| | Test Date: March 15, 2025            | |
| | [===========>          ] 45 days left| |
| +--------------------------------------+ |
| | Daily Goal: 15 questions             | |
| | Weekly Goal: 5 hours                 | |
| +--------------------------------------+ |
|                                          |
| TEST INSIGHTS                            |
| +--------------------------------------+ |
| | Strongest: Quantitative (78%)        | |
| | Weakest: Verbal (62%)                | |
| | Focus: Sentence Correction           | |
| | Avg Time: 85s (target: 90s)          | |
| +--------------------------------------+ |
|                                          |
| STUDY TIMELINE                           |
| +--------------------------------------+ |
| | 45 days until test                   | |
| | Estimated readiness: 72%             | |
| | [=====================>        ]     | |
| +--------------------------------------+ |
+------------------------------------------+
```

---

## Technical Details

### Avatar Upload Component
- Uses FileReader API to read image as base64
- Validates file type (image/jpeg, image/png, image/webp)
- Resizes using canvas if larger than 200x200
- Stores result in localStorage via useProfile hook

### Insights Calculation
- Pulls data from existing useProgress hook
- Strongest section = highest accuracy with minimum 5 questions
- Weakest section = lowest accuracy with minimum 5 questions
- Recommended focus = weakest sub-type within weakest section

### Goals Progress
- Score progress: estimated from accuracy trends
- Days remaining: calculated from testDate - today
- Daily goal: tracked against today's question count
- Weekly goal: sum of time spent in last 7 days

---

## Implementation Order

1. Create profile types (`src/types/profile.ts`)
2. Create useProfile hook with localStorage persistence
3. Build AvatarUpload component with image handling
4. Build GoalsCard component with editing capability
5. Build InsightsCard component with auto-calculations
6. Create ProfilePage assembling all components
7. Add route in App.tsx
8. Add Quick Access card on Dashboard

---

## Dependencies

No new dependencies required. Uses:
- Existing UI components (Card, Button, Input, Progress)
- Existing hooks pattern (useLocalStorage)
- FileReader API (browser native)
- Canvas API for image resizing (browser native)
