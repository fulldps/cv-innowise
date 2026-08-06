import { useMutation } from '@apollo/client/react';

import { PROFILE_QUERY } from '@/entities/profile';
import { ADD_PROFILE_SKILL_MUTATION } from '@/entities/skill';

import type { Skill } from '@/entities/skill';

import { mapAddUserSkillInput } from '../model/add-user-skill.mapper';
import type { AddUserSkillFormValues } from '../model/add-user-skill.schema';

export function useAddUserSkill(userId: string, skills: Skill[]) {
  const [mutate, state] = useMutation(ADD_PROFILE_SKILL_MUTATION);

  const addUserSkill = async (values: AddUserSkillFormValues) => {
    const skill = skills.find((item) => item.id === values.skillId);

    if (!skill) {
      throw new Error(`Skill not found: ${values.skillId}`);
    }

    return mutate({
      variables: {
        skill: mapAddUserSkillInput(values, skill, userId),
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
    addUserSkill,
    ...state,
  };
}
