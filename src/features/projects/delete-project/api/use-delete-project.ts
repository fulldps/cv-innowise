import { useMutation } from '@apollo/client/react';

import { DELETE_PROJECT_MUTATION } from '@/entities/project';

export function useDeleteProject() {
  const [mutate, state] = useMutation(DELETE_PROJECT_MUTATION);

  const deleteProject = async (projectId: string) => {
    return mutate({
      variables: {
        project: {
          projectId,
        },
      },

      refetchQueries: ['Projects'],
      awaitRefetchQueries: true,
    });
  };

  return {
    deleteProject,
    ...state,
  };
}
