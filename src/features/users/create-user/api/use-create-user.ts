import { useMutation } from '@apollo/client/react';

import { CREATE_USER_MUTATION, USERS_QUERY } from '@/entities/user';

import { mapCreateUserInput } from '../model/create-user.mapper';
import { UserFormValues } from '@/features/users/model/user-form.types';

export function useCreateUser() {
  const [mutate, state] = useMutation(CREATE_USER_MUTATION);

  const createUser = async (values: UserFormValues) => {
    return mutate({
      variables: {
        user: mapCreateUserInput(values),
      },

      refetchQueries: [{ query: USERS_QUERY }],
      awaitRefetchQueries: true,
    });
  };

  return {
    createUser,
    ...state,
  };
}
