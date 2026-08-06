'use client';

import { toast } from 'sonner';

import { ConfirmDeleteDialog } from '@/shared/ui/confirm-delete-dialog';

import { useDeleteUser } from '../api/use-delete-user';

interface DeleteUserDialogProps {
  userId: string | null;
  userFullName: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onClosed: () => void;
}

export function DeleteUserDialog({
  userId,
  userFullName,
  open,
  onOpenChange,
  onClosed,
}: DeleteUserDialogProps) {
  const { deleteUser, loading } = useDeleteUser();

  const handleDelete = async () => {
    if (!userId) return;

    try {
      await deleteUser(userId);

      toast.success('User deleted successfully');
    } catch (error) {
      console.error(error);

      toast.error('Failed to delete user');

      throw error;
    }
  };

  return (
    <ConfirmDeleteDialog
      entityLabel="user"
      entityName={userFullName}
      open={open}
      onOpenChange={onOpenChange}
      onDelete={handleDelete}
      onClosed={onClosed}
      loading={loading}
    />
  );
}
