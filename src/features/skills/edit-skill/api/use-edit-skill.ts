import { useMutation } from '@apollo/client/react';

import { UPDATE_SKILL_MUTATION, SKILLS_QUERY } from '@/entities/skill';

import { mapUpdateSkillInput } from '../model/edit-skill.mapper';
import { EditSkillFormValues } from '../model/edit-skill.schema';

export function useEditSkill() {
  const [mutate, state] = useMutation(UPDATE_SKILL_MUTATION);

  const editSkill = async (skillId: string, values: EditSkillFormValues) => {
    return mutate({
      variables: {
        skill: mapUpdateSkillInput(skillId, values),
      },

      refetchQueries: [{ query: SKILLS_QUERY }],
      awaitRefetchQueries: true,
    });
  };

  return {
    editSkill,

    loading: state.loading,

    error: state.error,
  };
}
