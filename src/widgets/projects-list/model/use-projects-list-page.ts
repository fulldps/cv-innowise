'use client';

import { useState } from 'react';

import { type Project, useProjectsList } from '@/entities/project';
import { USER_ROLE, useCurrentUser } from '@/entities/user';

import { useDebounce } from '@/shared/lib/hooks/use-debounce';
import { useSort } from '@/shared/lib/hooks/use-sort';

import type { ProjectsTableRowModel } from '@/widgets/projects-table';

import { PROJECTS_SORT_FIELDS, type ProjectsSortField } from './projects-sort-fields';

export function useProjectsListPage() {
  const { projects, loading, error } = useProjectsList();

  const currentUser = useCurrentUser();

  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [deletingProjectId, setDeletingProjectId] = useState<string | null>(null);
  const [deletingProjectName, setDeletingProjectName] = useState('');

  const [searchValue, setSearchValue] = useState('');

  const debouncedSearch = useDebounce(searchValue, 600);

  const normalizedSearch = debouncedSearch.trim().toLowerCase();

  const { sort, toggleSort } = useSort(PROJECTS_SORT_FIELDS.name, 'asc');

  const filteredProjects = !normalizedSearch
    ? projects
    : projects.filter(
        (project) =>
          project.name.toLowerCase().includes(normalizedSearch) ||
          project.internal_name.toLowerCase().includes(normalizedSearch) ||
          project.domain.toLowerCase().includes(normalizedSearch),
      );

  const sortValueGetters = {
    [PROJECTS_SORT_FIELDS.name]: (project: Project) => project.name,
  } satisfies Record<ProjectsSortField, (project: Project) => string>;

  const sortedProjects = [...filteredProjects];

  const getValue = sortValueGetters[sort.field];

  sortedProjects.sort((a, b) => {
    const result = getValue(a).localeCompare(getValue(b));

    return sort.direction === 'asc' ? result : -result;
  });

  const rows: ProjectsTableRowModel[] = sortedProjects.map((project) => ({
    project,

    canEdit: currentUser.role === USER_ROLE.Admin,

    canDelete: currentUser.role === USER_ROLE.Admin,
  }));

  return {
    rows,

    loading,
    error: error ?? null,

    searchValue,
    setSearchValue,

    sort,
    toggleSort,

    showCreateButton: currentUser.role === USER_ROLE.Admin,

    isCreateOpen,
    setIsCreateOpen,

    isEditOpen,
    setIsEditOpen,
    editingProject,
    setEditingProject,

    isDeleteOpen,
    setIsDeleteOpen,

    deletingProjectId,
    setDeletingProjectId,

    deletingProjectName,
    setDeletingProjectName,
  };
}
