import type { Mastery } from '@/entities/skill';

export interface EditingUserSkill {
  name: string;
  categoryId: string | null;
  mastery: Mastery;
}
