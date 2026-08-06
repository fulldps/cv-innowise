import type { EditingUserSkill } from './edit-user-skill.types';
import type { UpdateProfileSkillInput } from '@/entities/skill';

import type { EditUserSkillFormValues } from './edit-user-skill.schema';

export function mapUpdateUserSkillInput(
  values: EditUserSkillFormValues,
  editingUserSkill: EditingUserSkill,
  userId: string,
): UpdateProfileSkillInput {
  return {
    userId,
    name: editingUserSkill.name,
    categoryId: editingUserSkill.category?.id ?? null,
    mastery: values.mastery,
  };
}
