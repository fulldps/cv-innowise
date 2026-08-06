import type { Mastery } from '@/shared/api/graphql/graphql';

export type { Mastery } from '@/shared/api/graphql/graphql';

export const MASTERY = {
  Novice: 'Novice',
  Advanced: 'Advanced',
  Competent: 'Competent',
  Proficient: 'Proficient',
  Expert: 'Expert',
} as const satisfies Record<string, Mastery>;

export const MASTERIES = Object.values(MASTERY);

export const MASTERY_OPTIONS = MASTERIES.map((mastery) => ({
  id: mastery,
  name: mastery,
}));
