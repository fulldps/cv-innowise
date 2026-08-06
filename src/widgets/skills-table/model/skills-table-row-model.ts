import type { Skill } from '@/entities/skill';

export interface SkillsTableRowModel {
  skill: Skill;

  canEdit: boolean;
  canDelete: boolean;
}
