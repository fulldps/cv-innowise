import type { EditingSkill } from './edit-skill.types';

import type { EditSkillFormValues } from './edit-skill.schema';

export function getEditSkillDefaultValues(editingSkill: EditingSkill): EditSkillFormValues {
  return {
    skillId: editingSkill.id,
    mastery: editingSkill.mastery,
  };
}
