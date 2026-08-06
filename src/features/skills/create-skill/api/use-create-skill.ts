import { useMutation } from '@apollo/client/react';

import { CREATE_SKILL_MUTATION, SKILLS_QUERY } from '@/entities/skill';
import { CreateSkillFormValues } from '../model/create-skill.schema';
import { mapCreateSkillInput } from '../model/create-skill.mapper';

export function useCreateSkill() {
  const [mutate, state] = useMutation(CREATE_SKILL_MUTATION);

  const createSkill = async (values: CreateSkillFormValues) => {
    return mutate({
      variables: {
        skill: mapCreateSkillInput(values),
      },

      refetchQueries: [{ query: SKILLS_QUERY }],
      awaitRefetchQueries: true,
    });
  };

  return {
    createSkill,
    ...state,
  };
}
