import { CreateSkillFormValues } from './create-skill.schema';

export function getCreateSkillDefaultValues(): CreateSkillFormValues {
  return {
    name: '',
    categoryId: '',
  };
}
