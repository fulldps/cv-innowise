import { useMutation } from '@apollo/client/react';

import { PROFILE_QUERY } from '@/entities/profile';
import { UPDATE_PROFILE_SKILL_MUTATION } from '@/entities/skill';

import { mapUpdateUserSkillInput } from '../model/edit-user-skill.mapper';
import type { EditUserSkillFormValues } from '../model/edit-user-skill.schema';
import type { EditingUserSkill } from '../model/edit-user-skill.types';

export function useEditUserSkill(userId: string) {
  const [mutate, state] = useMutation(UPDATE_PROFILE_SKILL_MUTATION);

  const editUserSkill = async (values: EditUserSkillFormValues, editingUserSkill: EditingUserSkill) => {
    return mutate({
      variables: {
        skill: mapUpdateUserSkillInput(values, editingUserSkill, userId),
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
    editUserSkill,
    ...state,
  };
}
