import type { Mastery, Skill } from '@/entities/skill';

export interface EditingSkill extends Skill {
  mastery: Mastery;
}
