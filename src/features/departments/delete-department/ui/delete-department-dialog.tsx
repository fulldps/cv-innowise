'use client';

import { toast } from 'sonner';

import { ConfirmDeleteDialog } from '@/shared/ui/confirm-delete-dialog';

import { useDeleteDepartment } from '../api/use-delete-department';

interface DeleteDepartmentDialogProps {
  departmentId: string | null;
  departmentName: string;

  open: boolean;
  onOpenChange(open: boolean): void;

  onClosed(): void;
}

export function DeleteDepartmentDialog({
  departmentId,
  departmentName,
  open,
  onOpenChange,
  onClosed,
}: DeleteDepartmentDialogProps) {
  const { deleteDepartment, loading } = useDeleteDepartment();

  const handleDelete = async () => {
    if (!departmentId) return;

    try {
      await deleteDepartment(departmentId);

      toast.success('Department deleted successfully');
    } catch (error) {
      console.error(error);

      toast.error('Failed to delete department');

      throw error;
    }
  };

  return (
    <ConfirmDeleteDialog
      entityLabel="department"
      entityName={departmentName}
      open={open}
      onOpenChange={onOpenChange}
      onDelete={handleDelete}
      onClosed={onClosed}
      loading={loading}
    />
  );
}
