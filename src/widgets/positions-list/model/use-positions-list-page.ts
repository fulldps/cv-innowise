'use client';

import { useState } from 'react';

import { type Position, usePositions } from '@/entities/position';
import { USER_ROLE, useCurrentUser } from '@/entities/user';

import { useDebounce } from '@/shared/lib/hooks/use-debounce';
import { useSort } from '@/shared/lib/hooks/use-sort';

import type { PositionsTableRowModel } from '@/widgets/positions-table';

import { POSITIONS_SORT_FIELDS, type PositionsSortField } from './positions-sort-fields';

export function usePositionsListPage() {
  const positions = usePositions();

  const currentUser = useCurrentUser();

  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editingPosition, setEditingPosition] = useState<Position | null>(null);

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [deletingPositionId, setDeletingPositionId] = useState<string | null>(null);
  const [deletingPositionName, setDeletingPositionName] = useState('');

  const [searchValue, setSearchValue] = useState('');

  const debouncedSearch = useDebounce(searchValue, 600);

  const normalizedSearch = debouncedSearch.trim().toLowerCase();

  const { sort, toggleSort } = useSort(POSITIONS_SORT_FIELDS.name, 'asc');

  const positionsList = (positions.data?.positions ?? []).filter(
    (position): position is Position => position !== null,
  );

  const filteredPositions = !normalizedSearch
    ? positionsList
    : positionsList.filter((position) => position.name.toLowerCase().includes(normalizedSearch));

  const sortValueGetters = {
    [POSITIONS_SORT_FIELDS.name]: (position: Position) => position.name,
  } satisfies Record<PositionsSortField, (position: Position) => string>;

  const sortedPositions = [...filteredPositions];

  const getValue = sortValueGetters[sort.field];

  sortedPositions.sort((a, b) => {
    const result = getValue(a).localeCompare(getValue(b));

    return sort.direction === 'asc' ? result : -result;
  });

  const rows: PositionsTableRowModel[] = sortedPositions.map((position) => ({
    position,

    canEdit: currentUser.role === USER_ROLE.Admin,

    canDelete: currentUser.role === USER_ROLE.Admin,
  }));

  return {
    rows,

    loading: positions.loading,
    error: positions.error ?? null,

    searchValue,
    setSearchValue,

    sort,
    toggleSort,

    showCreateButton: currentUser.role === USER_ROLE.Admin,

    isCreateOpen,
    setIsCreateOpen,

    isEditOpen,
    setIsEditOpen,
    editingPosition,
    setEditingPosition,

    isDeleteOpen,
    setIsDeleteOpen,

    deletingPositionId,
    setDeletingPositionId,

    deletingPositionName,
    setDeletingPositionName,
  };
}
