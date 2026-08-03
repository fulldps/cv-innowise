'use client';

import { graphql } from '@/shared/api/graphql';
import { useMutation } from '@apollo/client/react';

const DeleteCv = graphql(`
  mutation DeleteCv($cv: DeleteCvInput!) {
    deleteCv(cv: $cv) {
      affected
    }
  }
`);

export function useDeleteCv() {
  const result = useMutation(DeleteCv, { refetchQueries: ['Cvs'], awaitRefetchQueries: true });
  return result;
}
