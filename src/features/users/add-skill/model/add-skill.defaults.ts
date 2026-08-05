import type { AddSkillFormValues } from './add-skill.schema';

export function getAddSkillDefaultValues(): AddSkillFormValues {
  return {
    skillId: '',
    mastery: 'Novice',
  };
}
