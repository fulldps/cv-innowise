'use client';

import { useState } from 'react';

import { type Department, useDepartments } from '@/entities/department';
import { USER_ROLE, useCurrentUser } from '@/entities/user';

import { useDebounce } from '@/shared/lib/hooks/use-debounce';
import { useSort } from '@/shared/lib/hooks/use-sort';

import type { DepartmentsTableRowModel } from '@/widgets/departments-table';

import { DEPARTMENTS_SORT_FIELDS, type DepartmentsSortField } from './departments-sort-fields';

export function useDepartmentsListPage() {
  const departments = useDepartments();

  const currentUser = useCurrentUser();

  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editingDepartment, setEditingDepartment] = useState<Department | null>(null);

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [deletingDepartmentId, setDeletingDepartmentId] = useState<string | null>(null);
  const [deletingDepartmentName, setDeletingDepartmentName] = useState('');

  const [searchValue, setSearchValue] = useState('');

  const debouncedSearch = useDebounce(searchValue, 600);

  const normalizedSearch = debouncedSearch.trim().toLowerCase();

  const { sort, toggleSort } = useSort(DEPARTMENTS_SORT_FIELDS.name, 'asc');

  const departmentsList = (departments.data?.departments ?? []).filter(
    (department): department is Department => department !== null,
  );

  const filteredDepartments = !normalizedSearch
    ? departmentsList
    : departmentsList.filter((department) =>
        department.name.toLowerCase().includes(normalizedSearch),
      );

  const sortValueGetters = {
    [DEPARTMENTS_SORT_FIELDS.name]: (department: Department) => department.name,
  } satisfies Record<DepartmentsSortField, (department: Department) => string>;

  const sortedDepartments = [...filteredDepartments];

  const getValue = sortValueGetters[sort.field];

  sortedDepartments.sort((a, b) => {
    const result = getValue(a).localeCompare(getValue(b));

    return sort.direction === 'asc' ? result : -result;
  });

  const rows: DepartmentsTableRowModel[] = sortedDepartments.map((department) => ({
    department,

    canEdit: currentUser.role === USER_ROLE.Admin,

    canDelete: currentUser.role === USER_ROLE.Admin,
  }));

  return {
    rows,

    loading: departments.loading,
    error: departments.error ?? null,

    searchValue,
    setSearchValue,

    sort,
    toggleSort,

    showCreateButton: currentUser.role === USER_ROLE.Admin,

    isCreateOpen,
    setIsCreateOpen,

    isEditOpen,
    setIsEditOpen,
    editingDepartment,
    setEditingDepartment,

    isDeleteOpen,
    setIsDeleteOpen,

    deletingDepartmentId,
    setDeletingDepartmentId,

    deletingDepartmentName,
    setDeletingDepartmentName,
  };
}
