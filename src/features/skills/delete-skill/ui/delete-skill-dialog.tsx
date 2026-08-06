'use client';

import { toast } from 'sonner';

import { ConfirmDeleteDialog } from '@/shared/ui/confirm-delete-dialog';

import { useDeleteSkill } from '../api/use-delete-skill';

interface DeleteSkillDialogProps {
  skillId: string | null;
  skillName: string;

  open: boolean;
  onOpenChange(open: boolean): void;

  onClosed(): void;
}

export function DeleteSkillDialog({
  skillId,
  skillName,
  open,
  onOpenChange,
  onClosed,
}: DeleteSkillDialogProps) {
  const { deleteSkill, loading } = useDeleteSkill();

  const handleDelete = async () => {
    if (!skillId) return;

    try {
      await deleteSkill(skillId);

      toast.success('Skill deleted successfully');
    } catch (error) {
      console.error(error);

      toast.error('Failed to delete skill');

      throw error;
    }
  };

  return (
    <ConfirmDeleteDialog
      entityLabel="skill"
      entityName={skillName}
      open={open}
      onOpenChange={onOpenChange}
      onDelete={handleDelete}
      onClosed={onClosed}
      loading={loading}
    />
  );
}
