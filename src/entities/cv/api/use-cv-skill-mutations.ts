'use client';

import { useMutation } from '@apollo/client/react';

import type {
  AddCvSkillInput,
  DeleteCvSkillInput,
  UpdateCvSkillInput,
} from '@/shared/api/graphql/graphql';

import {
  ADD_CV_SKILL_MUTATION,
  DELETE_CV_SKILL_MUTATION,
  UPDATE_CV_SKILL_MUTATION,
} from './cv.skills.mutations';

const options = { refetchQueries: ['Cv'], awaitRefetchQueries: true };

export function useAddCvSkill() {
  const [mutate, { loading }] = useMutation(ADD_CV_SKILL_MUTATION, options);
  const addCvSkill = (skill: AddCvSkillInput) => mutate({ variables: { skill } });
  return { addCvSkill, loading };
}

export function useUpdateCvSkill() {
  const [mutate, { loading }] = useMutation(UPDATE_CV_SKILL_MUTATION, options);
  const updateCvSkill = (skill: UpdateCvSkillInput) => mutate({ variables: { skill } });
  return { updateCvSkill, loading };
}

export function useDeleteCvSkill() {
  const [mutate, { loading }] = useMutation(DELETE_CV_SKILL_MUTATION, options);
  const deleteCvSkill = (skill: DeleteCvSkillInput) => mutate({ variables: { skill } });
  return { deleteCvSkill, loading };
}
