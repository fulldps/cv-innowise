import type { Mastery, Skill } from '@/entities/skill';

export interface EditingUserSkill extends Skill {
  mastery: Mastery;
}
