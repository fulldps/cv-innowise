'use client';

import { Button } from '@/shared/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/shared/ui/dialog';

interface ConfirmDeleteDialogProps {
  entityName: string;
  entityLabel: string;

  open: boolean;
  onOpenChange(open: boolean): void;

  onDelete(): Promise<void>;

  onClosed?(): void;

  loading?: boolean;
}

export function ConfirmDeleteDialog({
  entityName,
  entityLabel,
  open,
  onOpenChange,
  onDelete,
  onClosed,
  loading = false,
}: ConfirmDeleteDialogProps) {
  const handleClose = () => {
    onOpenChange(false);
  };

  const handleDelete = async () => {
    try {
      await onDelete();

      handleClose();
    } catch {
      // ошибка уже обработана внутри feature
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
          onClosed?.();
        }
      }}
    >
      <DialogContent className="max-w-xl rounded-sm px-6 pb-2 pt-4">
        <DialogHeader className="mb-3">
          <DialogTitle className="text-[20px] font-semibold">Delete {entityLabel}</DialogTitle>
        </DialogHeader>

        <p className="min-w-0 text-base text-foreground">
          Are you sure you want to delete{' '}
          <span className="wrap-anywhere font-semibold">{entityName}</span>?
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
            {loading ? 'Deleting...' : 'Confirm'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
