import type { Proficiency } from '@/shared/api/graphql/graphql';

export type { Proficiency } from '@/shared/api/graphql/graphql';

export const PROFICIENCY = {
  A1: 'A1',
  A2: 'A2',
  B1: 'B1',
  B2: 'B2',
  C1: 'C1',
  C2: 'C2',
  Native: 'Native',
} as const satisfies Record<string, Proficiency>;

export const PROFICIENCIES = Object.values(PROFICIENCY);

export const PROFICIENCY_OPTIONS = PROFICIENCIES.map((proficiency) => ({
  id: proficiency,
  name: proficiency,
}));
