'use client';

import { useState } from 'react';

import { useSkills, type Skill } from '@/entities/skill';
import { USER_ROLE, useCurrentUser } from '@/entities/user';

import { useDebounce } from '@/shared/lib/hooks/use-debounce';
import { useSort } from '@/shared/lib/hooks/use-sort';

import type { SkillsTableRowModel } from '@/widgets/skills-table';

import { SKILLS_SORT_FIELDS, type SkillsSortField } from './skills-sort-fields';

export function useSkillsListPage() {
  const skills = useSkills();

  const currentUser = useCurrentUser();

  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [deletingSkillId, setDeletingSkillId] = useState<string | null>(null);
  const [deletingSkillName, setDeletingSkillName] = useState('');

  const [searchValue, setSearchValue] = useState('');

  const debouncedSearch = useDebounce(searchValue, 600);

  const normalizedSearch = debouncedSearch.trim().toLowerCase();

  const { sort, toggleSort } = useSort(SKILLS_SORT_FIELDS.name, 'asc');

  const skillsList = skills.data?.skills ?? [];

  const filteredSkills = !normalizedSearch
    ? skillsList
    : skillsList.filter((skill) => {
        const searchText = [skill.name, skill.category?.name, skill.category_parent_name]
          .filter(Boolean)
          .join(' ')
          .toLowerCase();

        return searchText.includes(normalizedSearch);
      });

  const sortValueGetters = {
    [SKILLS_SORT_FIELDS.name]: (skill: Skill) => skill.name,

    [SKILLS_SORT_FIELDS.type]: (skill: Skill) => skill.category_parent_name ?? '',

    [SKILLS_SORT_FIELDS.category]: (skill: Skill) => skill.category?.name ?? '',
  } satisfies Record<SkillsSortField, (skill: Skill) => string>;

  const sortedSkills = [...filteredSkills];

  const getValue = sortValueGetters[sort.field];

  sortedSkills.sort((a, b) => {
    const result = getValue(a).localeCompare(getValue(b));

    return sort.direction === 'asc' ? result : -result;
  });

  const rows: SkillsTableRowModel[] = sortedSkills.map((skill) => ({
    skill,

    canEdit: currentUser.role === USER_ROLE.Admin,

    canDelete: currentUser.role === USER_ROLE.Admin,
  }));

  return {
    rows,

    loading: skills.loading,
    error: skills.error ?? null,

    searchValue,
    setSearchValue,

    sort,
    toggleSort,

    showCreateButton: currentUser.role === USER_ROLE.Admin,

    isCreateOpen,
    setIsCreateOpen,

    isEditOpen,
    setIsEditOpen,
    editingSkill,
    setEditingSkill,

    isDeleteOpen,
    setIsDeleteOpen,
    deletingSkillId,
    setDeletingSkillId,

    deletingSkillName,
    setDeletingSkillName,
  };
}
