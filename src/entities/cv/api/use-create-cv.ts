'use client';

import { graphql } from '@/shared/api/graphql';
import { useMutation } from '@apollo/client/react';

const CreateCv = graphql(`
  mutation CreateCv($cv: CreateCvInput!) {
    createCv(cv: $cv) {
      id
      name
      description
    }
  }
`);

export function useCreateCv() {
  const createdCv = useMutation(CreateCv, { refetchQueries: ['Cvs'], awaitRefetchQueries: true });
  return createdCv;
}
