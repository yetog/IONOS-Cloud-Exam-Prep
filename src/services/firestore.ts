import {
  doc, getDoc, setDoc, collection,
  addDoc, getDocs, deleteDoc,
  serverTimestamp, query, orderBy, limit,
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { UserProgress, UserAchievements, QuestionAttempt } from '@/types/gmat';

// ── Helpers ────────────────────────────────────────────────────────────────

const userDoc   = (uid: string, path: string) => doc(db, 'users', uid, 'data', path);
const userCol   = (uid: string, col: string)  => collection(db, 'users', uid, col);

// ── Progress ───────────────────────────────────────────────────────────────

export async function loadProgress(uid: string): Promise<UserProgress | null> {
  const snap = await getDoc(userDoc(uid, 'progress'));
  return snap.exists() ? (snap.data() as UserProgress) : null;
}

export async function saveProgress(uid: string, progress: UserProgress): Promise<void> {
  await setDoc(userDoc(uid, 'progress'), progress);
}

// ── Achievements ───────────────────────────────────────────────────────────

export async function loadAchievements(uid: string): Promise<UserAchievements | null> {
  const snap = await getDoc(userDoc(uid, 'achievements'));
  return snap.exists() ? (snap.data() as UserAchievements) : null;
}

export async function saveAchievements(uid: string, achievements: UserAchievements): Promise<void> {
  await setDoc(userDoc(uid, 'achievements'), achievements);
}

// ── Attempts ───────────────────────────────────────────────────────────────

export async function loadAttempts(uid: string): Promise<QuestionAttempt[]> {
  const q    = query(userCol(uid, 'attempts'), orderBy('answeredAt', 'desc'), limit(500));
  const snap = await getDocs(q);
  return snap.docs.map(d => d.data() as QuestionAttempt);
}

export async function addAttempt(uid: string, attempt: QuestionAttempt): Promise<void> {
  await addDoc(userCol(uid, 'attempts'), attempt);
}

// ── Profile ────────────────────────────────────────────────────────────────

export async function loadUserProfile(uid: string): Promise<Record<string, unknown> | null> {
  const snap = await getDoc(userDoc(uid, 'profile'));
  return snap.exists() ? snap.data() : null;
}

export async function saveUserProfile(uid: string, profile: Record<string, unknown>): Promise<void> {
  await setDoc(userDoc(uid, 'profile'), profile);
}

// ── Notes ──────────────────────────────────────────────────────────────────

export async function loadNotes(uid: string): Promise<unknown[]> {
  const snap = await getDocs(userCol(uid, 'notes'));
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

export async function saveNote(uid: string, note: Record<string, unknown>): Promise<string> {
  const ref = await addDoc(userCol(uid, 'notes'), { ...note, updatedAt: serverTimestamp() });
  return ref.id;
}

export async function deleteNote(uid: string, noteId: string): Promise<void> {
  await deleteDoc(doc(db, 'users', uid, 'notes', noteId));
}

// ── Session History ────────────────────────────────────────────────────────

export async function loadSessionHistory(uid: string): Promise<Record<string, unknown> | null> {
  const snap = await getDoc(userDoc(uid, 'sessionHistory'));
  return snap.exists() ? snap.data() : null;
}

export async function saveSessionHistory(uid: string, history: Record<string, unknown>): Promise<void> {
  await setDoc(userDoc(uid, 'sessionHistory'), history);
}

// ── Notes list (array stored as a single document) ────────────────────────
// Simpler than the per-note subcollection approach; avoids ID-mismatch issues.

export async function loadNotesList(uid: string): Promise<Record<string, unknown>[] | null> {
  const snap = await getDoc(userDoc(uid, 'notesList'));
  if (!snap.exists()) return null;
  const notes = snap.data().notes;
  return Array.isArray(notes) ? (notes as Record<string, unknown>[]) : null;
}

export async function saveNotesList(uid: string, notes: Record<string, unknown>[]): Promise<void> {
  await setDoc(userDoc(uid, 'notesList'), { notes });
}

// ── Migration: localStorage → Firestore ───────────────────────────────────
// Called once on first login to carry over any existing guest progress.

export async function migrateLocalStorageToFirestore(uid: string): Promise<void> {
  try {
    const progressRaw  = localStorage.getItem('ionos-progress');
    const achieveRaw   = localStorage.getItem('ionos-achievements');
    const profileRaw   = localStorage.getItem('ionos-profile');
    const sessionRaw   = localStorage.getItem('ionos-session-history');

    const [existingProgress] = await Promise.all([loadProgress(uid)]);

    // Only migrate if no Firestore data exists yet
    if (!existingProgress) {
      if (progressRaw)  await saveProgress(uid, JSON.parse(progressRaw));
      if (achieveRaw)   await saveAchievements(uid, JSON.parse(achieveRaw));
      if (profileRaw)   await saveUserProfile(uid, JSON.parse(profileRaw));
      if (sessionRaw)   await saveSessionHistory(uid, JSON.parse(sessionRaw));
    }
  } catch {
    // Migration is best-effort — never block login
  }
}
