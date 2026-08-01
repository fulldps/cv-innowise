'use client';

import { useState } from 'react';

import { USERS_SORT_FIELDS, type UsersSort, type UsersSortField } from './sort';

export function useUsersSort() {
  const [sort, setSort] = useState<UsersSort>({
    field: USERS_SORT_FIELDS.firstName,
    direction: 'desc',
  });

  const toggleSort = (field: UsersSortField) => {
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
