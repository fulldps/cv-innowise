'use client';

import { useState } from 'react';

import type { EditingSkill } from '@/features/users/edit-skill';

export function useUserSkills() {
  const [deleteMode, setDeleteMode] = useState(false);

  const [selectedSkills, setSelectedSkills] = useState<Set<string>>(new Set());

  const [editingSkill, setEditingSkill] = useState<EditingSkill | null>(null);

  const [editDialogOpen, setEditDialogOpen] = useState(false);

  const [addDialogOpen, setAddDialogOpen] = useState(false);

  const openEditDialog = (skill: EditingSkill) => {
    setEditingSkill(skill);
    setEditDialogOpen(true);
  };

  const closeEditDialog = () => {
    setEditDialogOpen(false);
    setEditingSkill(null);
  };

  const openAddDialog = () => {
    setAddDialogOpen(true);
  };

  const closeAddDialog = () => {
    setAddDialogOpen(false);
  };

  const toggleSkillSelection = (skillId: string) => {
    setSelectedSkills((prev) => {
      const next = new Set(prev);

      if (next.has(skillId)) {
        next.delete(skillId);
      } else {
        next.add(skillId);
      }

      return next;
    });
  };

  const enterDeleteMode = () => {
    setDeleteMode(true);
  };

  const cancelDeleteMode = () => {
    setDeleteMode(false);
    setSelectedSkills(new Set());
  };

  return {
    deleteMode,
    selectedSkills,

    enterDeleteMode,
    cancelDeleteMode,

    toggleSkillSelection,

    editingSkill,
    editDialogOpen,
    openEditDialog,
    closeEditDialog,

    addDialogOpen,
    openAddDialog,
    closeAddDialog,
  };
}
