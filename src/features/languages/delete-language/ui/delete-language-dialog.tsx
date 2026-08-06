'use client';

import { toast } from 'sonner';

import { ConfirmDeleteDialog } from '@/shared/ui/confirm-delete-dialog';

import { useDeleteLanguage } from '../api/use-delete-language';

interface DeleteLanguageDialogProps {
  languageId: string | null;
  languageName: string;

  open: boolean;
  onOpenChange(open: boolean): void;

  onClosed(): void;
}

export function DeleteLanguageDialog({
  languageId,
  languageName,
  open,
  onOpenChange,
  onClosed,
}: DeleteLanguageDialogProps) {
  const { deleteLanguage, loading } = useDeleteLanguage();

  const handleDelete = async () => {
    if (!languageId) return;

    try {
      await deleteLanguage(languageId);

      toast.success('Language deleted successfully');
    } catch (error) {
      console.error(error);

      toast.error('Failed to delete language');

      throw error;
    }
  };

  return (
    <ConfirmDeleteDialog
      entityLabel="language"
      entityName={languageName}
      open={open}
      onOpenChange={onOpenChange}
      onDelete={handleDelete}
      onClosed={onClosed}
      loading={loading}
    />
  );
}
