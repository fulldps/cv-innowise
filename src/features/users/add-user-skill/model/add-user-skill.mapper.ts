import type { AddProfileSkillInput, Skill } from '@/entities/skill';

import type { AddUserSkillFormValues } from './add-user-skill.schema';

export function mapAddUserSkillInput(
  values: AddUserSkillFormValues,
  skill: Skill,
  userId: string,
): AddProfileSkillInput {
  return {
    userId,
    name: skill.name,
    categoryId: skill.category?.id ?? null,
    mastery: values.mastery,
  };
}
