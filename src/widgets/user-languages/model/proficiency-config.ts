import type { Proficiency } from '@/entities/language';

export const PROFICIENCY_CONFIG = {
  A1: {
    color: 'text-amber-400',
  },
  A2: {
    color: 'text-orange-500',
  },
  B1: {
    color: 'text-lime-400',
  },
  B2: {
    color: 'text-green-500',
  },
  C1: {
    color: 'text-sky-400',
  },
  C2: {
    color: 'text-blue-500',
  },
  Native: {
    color: 'text-red-500',
  },
} as const satisfies Record<Proficiency, { color: string }>;
