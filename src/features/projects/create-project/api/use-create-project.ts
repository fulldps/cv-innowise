import { useMutation } from '@apollo/client/react';

import { CREATE_PROJECT_MUTATION } from '@/entities/project';

import { mapCreateProjectInput } from '../model/create-project.mapper';
import type { CreateProjectFormValues } from '../model/create-project.schema';

export function useCreateProject() {
  const [mutate, state] = useMutation(CREATE_PROJECT_MUTATION);

  const createProject = async (values: CreateProjectFormValues) => {
    return mutate({
      variables: {
        project: mapCreateProjectInput(values),
      },

      refetchQueries: ['Projects'],
      awaitRefetchQueries: true,
    });
  };

  return {
    createProject,
    ...state,
  };
}
