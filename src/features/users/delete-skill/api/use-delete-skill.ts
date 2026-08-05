import { useMutation } from '@apollo/client/react';

import { PROFILE_QUERY } from '@/entities/profile';
import { DELETE_PROFILE_SKILL_MUTATION } from '@/entities/skill';

import { mapDeleteSkillInput } from '../model/delete-skill.mapper';

export function useDeleteSkill(userId: string) {
  const [mutate, state] = useMutation(DELETE_PROFILE_SKILL_MUTATION);

  const deleteSkills = async (skillNames: string[]) => {
    return mutate({
      variables: {
        skill: mapDeleteSkillInput(userId, skillNames),
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
    deleteSkills,
    ...state,
  };
}
