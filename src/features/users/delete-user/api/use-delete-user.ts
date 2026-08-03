import { useMutation } from '@apollo/client/react';

import { DELETE_USER_MUTATION, USERS_QUERY } from '@/entities/user';

export function useDeleteUser() {
  const [mutate, state] = useMutation(DELETE_USER_MUTATION);

  const deleteUser = async (userId: string) => {
    return mutate({
      variables: {
        userId,
      },

      refetchQueries: [{ query: USERS_QUERY }],
      awaitRefetchQueries: true,
    });
  };

  return {
    deleteUser,
    ...state,
  };
}
