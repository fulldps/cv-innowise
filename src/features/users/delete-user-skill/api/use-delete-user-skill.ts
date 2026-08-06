import { useMutation } from '@apollo/client/react';

import { PROFILE_QUERY } from '@/entities/profile';
import { DELETE_PROFILE_SKILL_MUTATION } from '@/entities/skill';

import { mapDeleteUserSkillInput } from '../model/delete-user-skill.mapper';

export function useDeleteUserSkill(userId: string) {
  const [mutate, state] = useMutation(DELETE_PROFILE_SKILL_MUTATION);

  const deleteUserSkills = async (skillNames: string[]) => {
    return mutate({
      variables: {
        skill: mapDeleteUserSkillInput(userId, skillNames),
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
    deleteUserSkills,
    ...state,
  };
}
