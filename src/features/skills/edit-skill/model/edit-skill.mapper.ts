import type { UpdateSkillInput } from '@/entities/skill';
import { EditSkillFormValues } from './edit-skill.schema';

export function mapUpdateSkillInput(
  skillId: string,
  values: EditSkillFormValues,
): UpdateSkillInput {
  return {
    skillId,

    name: values.name,

    categoryId: values.categoryId,
  };
}
