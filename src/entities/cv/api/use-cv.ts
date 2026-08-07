'use client';

import { useQuery } from '@apollo/client/react';

import { CV_QUERY } from './cv.queries';

export function useCv(cvId: string) {
  const { loading, error, data } = useQuery(CV_QUERY, { variables: { cvId } });
  return { cv: data?.cv ?? null, loading, error };
}
