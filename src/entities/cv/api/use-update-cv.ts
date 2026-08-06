'use client';

import { graphql } from '@/shared/api/graphql';
import { useMutation } from '@apollo/client/react';

const UpdateCv = graphql(`
  mutation UpdateCv($cv: UpdateCvInput!) {
    updateCv(cv: $cv) {
      id
      name
      education
      description
    }
  }
`);

export function useUpdateCv() {
  const updatedCv = useMutation(UpdateCv, { refetchQueries: ['Cvs'], awaitRefetchQueries: true });
  return updatedCv;
}
