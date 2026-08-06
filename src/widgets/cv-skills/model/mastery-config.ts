import type { Mastery } from '@/entities/skill';

export const MASTERY_CONFIG = {
  Novice: { progress: 20, color: 'bg-pink-500', background: 'bg-pink-500/50' },
  Advanced: { progress: 40, color: 'bg-sky-500', background: 'bg-sky-500/50' },
  Competent: { progress: 60, color: 'bg-green-500', background: 'bg-green-500/50' },
  Proficient: { progress: 80, color: 'bg-yellow-400', background: 'bg-yellow-400/50' },
  Expert: { progress: 100, color: 'bg-red-600', background: 'bg-red-600/50' },
} as const satisfies Record<Mastery, { progress: number; color: string; background: string }>;
