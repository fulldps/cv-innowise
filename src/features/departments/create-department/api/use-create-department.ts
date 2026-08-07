import { useMutation } from '@apollo/client/react';

import { CREATE_DEPARTMENT_MUTATION, DEPARTMENTS_QUERY } from '@/entities/department';

import type { CreateDepartmentFormValues } from '../model/create-department.schema';
import { mapCreateDepartmentInput } from '../model/create-department.mapper';

export function useCreateDepartment() {
  const [mutate, state] = useMutation(CREATE_DEPARTMENT_MUTATION);

  const createDepartment = async (values: CreateDepartmentFormValues) => {
    return mutate({
      variables: {
        department: mapCreateDepartmentInput(values),
      },

      refetchQueries: [{ query: DEPARTMENTS_QUERY }],
      awaitRefetchQueries: true,
    });
  };

  return {
    createDepartment,
    ...state,
  };
}
