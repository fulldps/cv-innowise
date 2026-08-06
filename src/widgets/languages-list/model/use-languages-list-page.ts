'use client';

import { useState } from 'react';

import { USER_ROLE, useCurrentUser } from '@/entities/user';
import { type Language, useLanguages } from '@/entities/language';

import { useDebounce } from '@/shared/lib/hooks/use-debounce';
import { useSort } from '@/shared/lib/hooks/use-sort';

import type { LanguagesTableRowModel } from '@/widgets/languages-table';

import { LANGUAGES_SORT_FIELDS, type LanguagesSortField } from './languages-sort-fields';

export function useLanguagesListPage() {
  const languages = useLanguages();

  const currentUser = useCurrentUser();

  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editingLanguage, setEditingLanguage] = useState<Language | null>(null);

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [deletingLanguageId, setDeletingLanguageId] = useState<string | null>(null);
  const [deletingLanguageName, setDeletingLanguageName] = useState('');

  const [searchValue, setSearchValue] = useState('');

  const debouncedSearch = useDebounce(searchValue, 600);

  const normalizedSearch = debouncedSearch.trim().toLowerCase();

  const { sort, toggleSort } = useSort(LANGUAGES_SORT_FIELDS.name, 'asc');

  const languagesList = (languages.data?.languages ?? []).filter(
    (language): language is Language => language !== null,
  );

  const filteredLanguages = !normalizedSearch
    ? languagesList
    : languagesList.filter((language) => language.name.toLowerCase().includes(normalizedSearch));

  const sortValueGetters = {
    [LANGUAGES_SORT_FIELDS.name]: (language: Language) => language.name,
  } satisfies Record<LanguagesSortField, (language: Language) => string>;

  const sortedLanguages = [...filteredLanguages];

  const getValue = sortValueGetters[sort.field];

  sortedLanguages.sort((a, b) => {
    const result = getValue(a).localeCompare(getValue(b));

    return sort.direction === 'asc' ? result : -result;
  });

  const rows: LanguagesTableRowModel[] = sortedLanguages.map((language) => ({
    language,

    canEdit: currentUser.role === USER_ROLE.Admin,

    canDelete: currentUser.role === USER_ROLE.Admin,
  }));

  return {
    rows,

    loading: languages.loading,
    error: languages.error ?? null,

    searchValue,
    setSearchValue,

    sort,
    toggleSort,

    showCreateButton: currentUser.role === USER_ROLE.Admin,

    isCreateOpen,
    setIsCreateOpen,

    isEditOpen,
    setIsEditOpen,
    editingLanguage,
    setEditingLanguage,

    isDeleteOpen,
    setIsDeleteOpen,

    deletingLanguageId,
    setDeletingLanguageId,

    deletingLanguageName,
    setDeletingLanguageName,
  };
}
