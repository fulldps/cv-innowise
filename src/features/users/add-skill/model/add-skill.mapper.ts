import type { AddProfileSkillInput, Skill } from '@/entities/skill';

import type { AddSkillFormValues } from './add-skill.schema';

export function mapAddSkillInput(
  values: AddSkillFormValues,
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
