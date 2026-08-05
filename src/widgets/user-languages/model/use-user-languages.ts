'use client';

import { useState } from 'react';

import type { EditingLanguage } from '@/features/users/edit-language';

export function useUserLanguages() {
  const [deleteMode, setDeleteMode] = useState(false);

  const [selectedLanguages, setSelectedLanguages] = useState<Set<string>>(new Set());

  const [editingLanguage, setEditingLanguage] = useState<EditingLanguage | null>(null);

  const [editDialogOpen, setEditDialogOpen] = useState(false);

  const [addDialogOpen, setAddDialogOpen] = useState(false);

  const openEditDialog = (language: EditingLanguage) => {
    setEditingLanguage(language);
    setEditDialogOpen(true);
  };

  const closeEditDialog = () => {
    setEditDialogOpen(false);
    setEditingLanguage(null);
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

    editingLanguage,
    editDialogOpen,
    openEditDialog,
    closeEditDialog,

    addDialogOpen,
    openAddDialog,
    closeAddDialog,
  };
}
