import { useMutation } from '@apollo/client/react';

import { DELETE_DEPARTMENT_MUTATION, DEPARTMENTS_QUERY } from '@/entities/department';
import { USERS_QUERY } from '@/entities/user';

export function useDeleteDepartment() {
  const [mutate, state] = useMutation(DELETE_DEPARTMENT_MUTATION);

  const deleteDepartment = async (departmentId: string) => {
    return mutate({
      variables: {
        department: {
          departmentId,
        },
      },

      refetchQueries: [{ query: DEPARTMENTS_QUERY }, { query: USERS_QUERY }],
      awaitRefetchQueries: true,
    });
  };

  return {
    deleteDepartment,
    ...state,
  };
}
