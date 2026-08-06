'use client';

import { useState } from 'react';

import type { EditingUserLanguage } from '@/features/users/edit-user-language';

export function useUserLanguages() {
  const [deleteMode, setDeleteMode] = useState(false);

  const [selectedLanguages, setSelectedLanguages] = useState<Set<string>>(new Set());

  const [editingUserLanguage, setEditingUserLanguage] = useState<EditingUserLanguage | null>(null);

  const [editDialogOpen, setEditDialogOpen] = useState(false);

  const [addDialogOpen, setAddDialogOpen] = useState(false);

  const openEditDialog = (language: EditingUserLanguage) => {
    setEditingUserLanguage(language);
    setEditDialogOpen(true);
  };

  const closeEditDialog = () => {
    setEditDialogOpen(false);
    setEditingUserLanguage(null);
  };

  const openAddDialog = () => {
    setAddDialogOpen(true);
  };

  const closeAddDialog = () => {
    setAddDialogOpen(false);
  };

  const toggleLanguageSelection = (languageId: string) => {
    setSelectedLanguages((prev) => {
      const next = new Set(prev);

      if (next.has(languageId)) {
        next.delete(languageId);
      } else {
        next.add(languageId);
      }

      return next;
    });
  };

  const enterDeleteMode = () => {
    setDeleteMode(true);
  };

  const cancelDeleteMode = () => {
    setDeleteMode(false);
    setSelectedLanguages(new Set());
  };

  return {
    deleteMode,
    selectedLanguages,

    enterDeleteMode,
    cancelDeleteMode,

    toggleLanguageSelection,

    editingUserLanguage,
    editDialogOpen,
    openEditDialog,
    closeEditDialog,

    addDialogOpen,
    openAddDialog,
    closeAddDialog,
  };
}
