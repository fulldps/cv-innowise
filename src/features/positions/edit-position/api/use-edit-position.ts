import { useMutation } from '@apollo/client/react';

import { UPDATE_POSITION_MUTATION, POSITIONS_QUERY } from '@/entities/position';

import { mapUpdatePositionInput } from '../model/edit-position.mapper';

import type { EditPositionFormValues } from '../model/edit-position.schema';

export function useEditPosition() {
  const [mutate, state] = useMutation(UPDATE_POSITION_MUTATION);

  const editPosition = async (positionId: string, values: EditPositionFormValues) => {
    return mutate({
      variables: {
        position: mapUpdatePositionInput(positionId, values),
      },

      refetchQueries: [{ query: POSITIONS_QUERY }],
      awaitRefetchQueries: true,
    });
  };

  return {
    editPosition,

    loading: state.loading,

    error: state.error,
  };
}
