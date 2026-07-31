'use client';

import { graphql } from '@/shared/api/graphql';
import { useQuery } from '@apollo/client/react';

const CvsDocument = graphql(`
  query Cvs {
    cvs {
      id
      name
      description
      education
      user {
        id
        email
      }
    }
  }
`);

export const useCvsList = () => {
  const { loading, error, data } = useQuery(CvsDocument);
  return { cvs: data?.cvs ?? [], loading, error };
};
