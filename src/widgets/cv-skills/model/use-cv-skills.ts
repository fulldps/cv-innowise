'use client';

import { useState } from 'react';

import type { EditingCvSkill } from '@/features/cv/edit-cv-skill';

export function useCvSkills() {
  const [deleteMode, setDeleteMode] = useState(false);
  const [selectedSkills, setSelectedSkills] = useState<Set<string>>(new Set());

  const [addDialogOpen, setAddDialogOpen] = useState(false);

  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState<EditingCvSkill | null>(null);

  const enterDeleteMode = () => setDeleteMode(true);
  const cancelDeleteMode = () => {
    setDeleteMode(false);
    setSelectedSkills(new Set());
  };

  const toggleSkillSelection = (name: string) => {
    setSelectedSkills((prev) => {
      const next = new Set(prev);
      if (next.has(name)) {
        next.delete(name);
      } else {
        next.add(name);
      }
      return next;
    });
  };

  const openAddDialog = () => setAddDialogOpen(true);
  const closeAddDialog = () => setAddDialogOpen(false);

  const openEditDialog = (skill: EditingCvSkill) => {
    setEditingSkill(skill);
    setEditDialogOpen(true);
  };
  const closeEditDialog = () => {
    setEditDialogOpen(false);
    setEditingSkill(null);
  };

  return {
    deleteMode,
    selectedSkills,
    enterDeleteMode,
    cancelDeleteMode,
    toggleSkillSelection,

    addDialogOpen,
    openAddDialog,
    closeAddDialog,

    editDialogOpen,
    editingSkill,
    openEditDialog,
    closeEditDialog,
  };
}
