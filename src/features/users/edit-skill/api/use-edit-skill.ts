import { useMutation } from '@apollo/client/react';

import { PROFILE_QUERY } from '@/entities/profile';
import { UPDATE_PROFILE_SKILL_MUTATION } from '@/entities/skill';

import { mapUpdateSkillInput } from '../model/edit-skill.mapper';
import type { EditSkillFormValues } from '../model/edit-skill.schema';
import type { EditingSkill } from '../model/edit-skill.types';

export function useEditSkill(userId: string) {
  const [mutate, state] = useMutation(UPDATE_PROFILE_SKILL_MUTATION);

  const editSkill = async (values: EditSkillFormValues, editingSkill: EditingSkill) => {
    return mutate({
      variables: {
        skill: mapUpdateSkillInput(values, editingSkill, userId),
      },

      refetchQueries: [
        {
          query: PROFILE_QUERY,
          variables: {
            userId,
          },
        },
      ],

      awaitRefetchQueries: true,
    });
  };

  return {
    editSkill,
    ...state,
  };
}
