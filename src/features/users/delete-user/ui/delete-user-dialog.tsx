'use client';

import { toast } from 'sonner';

import { Button } from '@/shared/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/shared/ui/dialog';

import { useDeleteUser } from '../api/use-delete-user';

interface DeleteUserDialogProps {
  userId: string | null;
  userFullName: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onClosed: () => void;
}

export function DeleteUserDialog({ userId, userFullName, open, onOpenChange, onClosed }: DeleteUserDialogProps) {
  const { deleteUser, loading } = useDeleteUser();

  const handleClose = () => {
    onOpenChange(false);
  };

  const handleDelete = async () => {
    if (!userId) return;

    try {
      await deleteUser(userId);

      toast.success('User deleted successfully');

      handleClose();
    } catch (error) {
      console.error(error);

      toast.error('Failed to delete user');
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(nextOpen) => {
        if (!nextOpen) {
          handleClose();
          return;
        }

        onOpenChange(true);
      }}
      onOpenChangeComplete={(nextOpen) => {
        if (!nextOpen) {
          onClosed();
        }
      }}
    >
      <DialogContent className="max-w-xl rounded-sm px-6 pb-2 pt-4">
        <DialogHeader className="mb-3">
          <DialogTitle className="text-[20px] font-semibold">Delete user</DialogTitle>
        </DialogHeader>

        <p className="text-base text-foreground">
          Are you sure you want to delete user <span className="font-semibold">{userFullName}</span>?
        </p>

        <DialogFooter className="flex justify-end gap-2">
          <Button
            type="button"
            variant="outline"
            disabled={loading}
            onClick={handleClose}
            className="h-12 w-52 rounded-full uppercase tracking-wide"
          >
            Cancel
          </Button>

          <Button
            type="button"
            disabled={loading}
            onClick={handleDelete}
            className="h-12 w-52 rounded-full uppercase tracking-wide"
          >
            {loading ? 'Deleting...' : 'Delete'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
