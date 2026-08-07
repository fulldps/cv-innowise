import { useMutation } from '@apollo/client/react';

import { CREATE_POSITION_MUTATION, POSITIONS_QUERY } from '@/entities/position';

import type { CreatePositionFormValues } from '../model/create-position.schema';
import { mapCreatePositionInput } from '../model/create-position.mapper';

export function useCreatePosition() {
  const [mutate, state] = useMutation(CREATE_POSITION_MUTATION);

  const createPosition = async (values: CreatePositionFormValues) => {
    return mutate({
      variables: {
        position: mapCreatePositionInput(values),
      },

      refetchQueries: [{ query: POSITIONS_QUERY }],
      awaitRefetchQueries: true,
    });
  };

  return {
    createPosition,
    ...state,
  };
}
