import type { EditingSkill } from './edit-skill.types';
import type { UpdateProfileSkillInput } from '@/entities/skill';

import type { EditSkillFormValues } from './edit-skill.schema';

export function mapUpdateSkillInput(
  values: EditSkillFormValues,
  editingSkill: EditingSkill,
  userId: string,
): UpdateProfileSkillInput {
  return {
    userId,
    name: editingSkill.name,
    categoryId: editingSkill.category?.id ?? null,
    mastery: values.mastery,
  };
}
