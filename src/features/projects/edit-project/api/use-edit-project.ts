import { useMutation } from '@apollo/client/react';

import { UPDATE_PROJECT_MUTATION } from '@/entities/project';

import { mapUpdateProjectInput } from '../model/edit-project.mapper';
import type { EditProjectFormValues } from '../model/edit-project.schema';

export function useEditProject() {
  const [mutate, state] = useMutation(UPDATE_PROJECT_MUTATION);

  const editProject = async (projectId: string, values: EditProjectFormValues) => {
    return mutate({
      variables: {
        project: mapUpdateProjectInput(projectId, values),
      },

      refetchQueries: ['Projects'],
      awaitRefetchQueries: true,
    });
  };

  return {
    editProject,
    ...state,
  };
}
