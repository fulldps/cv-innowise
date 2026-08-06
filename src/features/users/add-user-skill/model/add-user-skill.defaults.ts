import type { AddUserSkillFormValues } from './add-user-skill.schema';

export function getAddUserSkillDefaultValues(): AddUserSkillFormValues {
  return {
    skillId: '',
    mastery: 'Novice',
  };
}
