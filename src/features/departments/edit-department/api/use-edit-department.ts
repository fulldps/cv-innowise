import { useMutation } from '@apollo/client/react';

import { UPDATE_DEPARTMENT_MUTATION, DEPARTMENTS_QUERY } from '@/entities/department';
import { USERS_QUERY } from '@/entities/user';

import { mapUpdateDepartmentInput } from '../model/edit-department.mapper';

import type { EditDepartmentFormValues } from '../model/edit-department.schema';

export function useEditDepartment() {
  const [mutate, state] = useMutation(UPDATE_DEPARTMENT_MUTATION);

  const editDepartment = async (departmentId: string, values: EditDepartmentFormValues) => {
    return mutate({
      variables: {
        department: mapUpdateDepartmentInput(departmentId, values),
      },

      refetchQueries: [{ query: DEPARTMENTS_QUERY }, { query: USERS_QUERY }],
      awaitRefetchQueries: true,
    });
  };

  return {
    editDepartment,

    loading: state.loading,

    error: state.error,
  };
}
