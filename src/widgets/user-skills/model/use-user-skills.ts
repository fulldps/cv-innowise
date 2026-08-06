'use client';

import { useState } from 'react';

import type { EditingUserSkill } from '@/features/users/edit-user-skill';

export function useUserSkills() {
  const [deleteMode, setDeleteMode] = useState(false);

  const [selectedSkills, setSelectedSkills] = useState<Set<string>>(new Set());

  const [editingUserSkill, setEditingUserSkill] = useState<EditingUserSkill | null>(null);

  const [editDialogOpen, setEditDialogOpen] = useState(false);

  const [addDialogOpen, setAddDialogOpen] = useState(false);

  const openEditDialog = (skill: EditingUserSkill) => {
    setEditingUserSkill(skill);
    setEditDialogOpen(true);
  };

  const closeEditDialog = () => {
    setEditDialogOpen(false);
    setEditingUserSkill(null);
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

    editingUserSkill,
    editDialogOpen,
    openEditDialog,
    closeEditDialog,

    addDialogOpen,
    openAddDialog,
    closeAddDialog,
  };
}
