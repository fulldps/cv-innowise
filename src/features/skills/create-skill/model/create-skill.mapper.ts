import type { CreateSkillInput } from '@/entities/skill';
import { CreateSkillFormValues } from './create-skill.schema';

export function mapCreateSkillInput(values: CreateSkillFormValues): CreateSkillInput {
  return {
    name: values.name,
    categoryId: values.categoryId,
  };
}
