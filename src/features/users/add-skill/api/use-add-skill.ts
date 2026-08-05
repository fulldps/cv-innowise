import { useMutation } from '@apollo/client/react';

import { PROFILE_QUERY } from '@/entities/profile';
import { ADD_PROFILE_SKILL_MUTATION } from '@/entities/skill';

import type { Skill } from '@/entities/skill';

import { mapAddSkillInput } from '../model/add-skill.mapper';
import type { AddSkillFormValues } from '../model/add-skill.schema';

export function useAddSkill(userId: string, skills: Skill[]) {
  const [mutate, state] = useMutation(ADD_PROFILE_SKILL_MUTATION);

  const addSkill = async (values: AddSkillFormValues) => {
    const skill = skills.find((item) => item.id === values.skillId);

    if (!skill) {
      throw new Error(`Skill not found: ${values.skillId}`);
    }

    return mutate({
      variables: {
        skill: mapAddSkillInput(values, skill, userId),
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
    addSkill,
    ...state,
  };
}
