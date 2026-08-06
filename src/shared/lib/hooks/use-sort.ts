'use client';

import { useState } from 'react';

import type { SortState } from '@/shared/model/sort';

export function useSort<TField extends string>(
  initialField: TField,
  initialDirection: 'asc' | 'desc' = 'asc',
) {
  const [sort, setSort] = useState<SortState<TField>>({
    field: initialField,
    direction: initialDirection,
  });

  const toggleSort = (field: TField) => {
    setSort((current) => {
      if (current.field !== field) {
        return {
          field,
          direction: 'asc',
        };
      }

      return {
        field,
        direction: current.direction === 'asc' ? 'desc' : 'asc',
      };
    });
  };

  return {
    sort,
    toggleSort,
  };
}
