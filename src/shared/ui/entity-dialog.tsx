'use client';

import type { ReactNode } from 'react';

import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/shared/ui/dialog';

import { Button } from '@/shared/ui/button';

interface EntityDialogProps {
  open: boolean;
  onOpenChange(open: boolean): void;

  title: string;

  children: ReactNode;

  submitText: string;
  loadingText: string;

  loading?: boolean;
  submitDisabled?: boolean;

  onSubmit(): void;
  onCancel(): void;

  maxWidth?: string;
}

export function EntityDialog({
  open,
  onOpenChange,

  title,

  children,

  submitText,
  loadingText,

  loading = false,
  submitDisabled = false,

  onSubmit,
  onCancel,

  maxWidth = 'max-w-xl',
}: EntityDialogProps) {
  return (
    <Dialog
      open={open}
      onOpenChange={(nextOpen) => {
        if (!nextOpen) {
          if (loading) return;

          onCancel();
          return;
        }

        onOpenChange(true);
      }}
    >
      <DialogContent className={`${maxWidth} rounded-sm px-6 pb-2 pt-4`}>
        <DialogHeader className="mb-3">
          <DialogTitle className="text-[20px] font-semibold">{title}</DialogTitle>
        </DialogHeader>

        <form
          onSubmit={(event) => {
            event.preventDefault();

            onSubmit();
          }}
          className="flex flex-col gap-2"
        >
          {children}

          <DialogFooter className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              disabled={loading}
              onClick={onCancel}
              className="h-12 w-full sm:w-52 rounded-full uppercase tracking-wide"
            >
              Cancel
            </Button>

            <Button
              type="submit"
              disabled={loading || submitDisabled}
              className="h-12 w-full sm:w-52 rounded-full uppercase tracking-wide"
            >
              {loading ? loadingText : submitText}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
