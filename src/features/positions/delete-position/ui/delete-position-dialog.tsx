'use client';

import { toast } from 'sonner';

import { ConfirmDeleteDialog } from '@/shared/ui/confirm-delete-dialog';

import { useDeletePosition } from '../api/use-delete-position';

interface DeletePositionDialogProps {
  positionId: string | null;
  positionName: string;

  open: boolean;
  onOpenChange(open: boolean): void;

  onClosed(): void;
}

export function DeletePositionDialog({
  positionId,
  positionName,
  open,
  onOpenChange,
  onClosed,
}: DeletePositionDialogProps) {
  const { deletePosition, loading } = useDeletePosition();

  const handleDelete = async () => {
    if (!positionId) return;

    try {
      await deletePosition(positionId);

      toast.success('Position deleted successfully');
    } catch (error) {
      console.error(error);

      toast.error('Failed to delete position');

      throw error;
    }
  };

  return (
    <ConfirmDeleteDialog
      entityLabel="position"
      entityName={positionName}
      open={open}
      onOpenChange={onOpenChange}
      onDelete={handleDelete}
      onClosed={onClosed}
      loading={loading}
    />
  );
}
