'use client';

import { toast } from 'sonner';

import { ConfirmDeleteDialog } from '@/shared/ui/confirm-delete-dialog';

import { useDeleteProject } from '../api/use-delete-project';

interface DeleteProjectDialogProps {
  projectId: string | null;
  projectName: string;

  open: boolean;
  onOpenChange(open: boolean): void;

  onClosed(): void;
}

export function DeleteProjectDialog({
  projectId,
  projectName,
  open,
  onOpenChange,
  onClosed,
}: DeleteProjectDialogProps) {
  const { deleteProject, loading } = useDeleteProject();

  const handleDelete = async () => {
    if (!projectId) return;

    try {
      await deleteProject(projectId);

      toast.success('Project deleted successfully');
    } catch (error) {
      console.error(error);

      toast.error('Failed to delete project');

      throw error;
    }
  };

  return (
    <ConfirmDeleteDialog
      entityLabel="project"
      entityName={projectName}
      open={open}
      onOpenChange={onOpenChange}
      onDelete={handleDelete}
      onClosed={onClosed}
      loading={loading}
    />
  );
}
