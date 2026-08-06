import type { EditingUserSkill } from './edit-user-skill.types';

import type { EditUserSkillFormValues } from './edit-user-skill.schema';

export function getEditUserSkillDefaultValues(
  editingUserSkill: EditingUserSkill,
): EditUserSkillFormValues {
  return {
    skillId: editingUserSkill.name,
    mastery: editingUserSkill.mastery,
  };
}
