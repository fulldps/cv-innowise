import { useMutation } from '@apollo/client/react';

import { DELETE_POSITION_MUTATION, POSITIONS_QUERY } from '@/entities/position';
import { USERS_QUERY } from '@/entities/user';

export function useDeletePosition() {
  const [mutate, state] = useMutation(DELETE_POSITION_MUTATION);

  const deletePosition = async (positionId: string) => {
    return mutate({
      variables: {
        position: {
          positionId,
        },
      },

      refetchQueries: [{ query: POSITIONS_QUERY }, { query: USERS_QUERY }],
      awaitRefetchQueries: true,
    });
  };

  return {
    deletePosition,
    ...state,
  };
}
