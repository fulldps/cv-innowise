import { Skill } from '@/entities/skill';
import { EditSkillFormValues } from './edit-skill.schema';

export function getEditSkillDefaultValues(skill: Skill): EditSkillFormValues {
  return {
    name: skill.name ?? '',

    categoryId: skill.category?.id ?? '',
  };
}
