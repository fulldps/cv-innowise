'use client';

import { toast } from 'sonner';

import { ConfirmDeleteDialog } from '@/shared/ui/confirm-delete-dialog';

import { useDeleteUserCv } from '../api/use-delete-user-cv';

interface DeleteUserCvDialogProps {
  cvId: string | null;
  cvName: string;

  open: boolean;
  onOpenChange(open: boolean): void;

  onClosed(): void;
}

export function DeleteUserCvDialog({
  cvId,
  cvName,
  open,
  onOpenChange,
  onClosed,
}: DeleteUserCvDialogProps) {
  const { deleteUserCv, loading } = useDeleteUserCv();

  const handleDelete = async () => {
    if (!cvId) return;

    try {
      await deleteUserCv(cvId);

      toast.success('CV deleted successfully');
    } catch (error) {
      console.error(error);

      toast.error('Failed to delete CV');

      throw error;
    }
  };

  return (
    <ConfirmDeleteDialog
      entityLabel="CV"
      entityName={cvName}
      open={open}
      onOpenChange={onOpenChange}
      onDelete={handleDelete}
      onClosed={onClosed}
      loading={loading}
    />
  );
}
