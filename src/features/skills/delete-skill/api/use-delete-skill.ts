import { useMutation } from '@apollo/client/react';

import { DELETE_SKILL_MUTATION, SKILLS_QUERY } from '@/entities/skill';

export function useDeleteSkill() {
  const [mutate, state] = useMutation(DELETE_SKILL_MUTATION);

  const deleteSkill = async (skillId: string) => {
    return mutate({
      variables: {
        skill: {
          skillId,
        },
      },

      refetchQueries: [{ query: SKILLS_QUERY }],
      awaitRefetchQueries: true,
    });
  };

  return {
    deleteSkill,
    ...state,
  };
}
