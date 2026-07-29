'use client';

import { toast } from 'sonner';

import { Button } from '@/shared/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/shared/ui/dialog';

import { useDeleteUser } from '../api/use-delete-user';

interface DeleteUserDialogProps {
  userId: string | null;

  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function DeleteUserDialog({ userId, open, onOpenChange }: DeleteUserDialogProps) {
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
    >
      <DialogContent className="max-w-md rounded-md px-8 pb-8 pt-6">
        <DialogHeader className="mb-4">
          <DialogTitle className="text-[18px] font-semibold">Delete User</DialogTitle>
        </DialogHeader>

        <p className="text-sm text-muted-foreground">
          Are you sure you want to delete this user? This action cannot be undone.
        </p>

        <DialogFooter className="mt-8 flex justify-end gap-4">
          <Button
            type="button"
            variant="outline"
            disabled={loading}
            onClick={handleClose}
            className="h-14 w-40 rounded-full uppercase tracking-wide"
          >
            Cancel
          </Button>

          <Button
            type="button"
            variant="destructive"
            disabled={loading}
            onClick={handleDelete}
            className="h-14 w-40 rounded-full uppercase tracking-wide"
          >
            {loading ? 'Deleting...' : 'Delete'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
