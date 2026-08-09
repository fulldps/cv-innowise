'use client';

import { Plus, Trash2 } from 'lucide-react';

import { cn } from '@/shared/lib/utils';
import { Button } from '@/shared/ui/button';

interface LanguagesActionsProps {
  canManage: boolean;

  deleteMode: boolean;

  selectedCount: number;

  onAddLanguage: () => void;

  onEnterDeleteMode: () => void;
  onCancelDeleteMode: () => void;
  onDelete: () => void;

  disabled?: boolean;
}

export function LanguagesActions({
  canManage,
  deleteMode,
  selectedCount,
  onAddLanguage,
  onEnterDeleteMode,
  onCancelDeleteMode,
  onDelete,
  disabled = false,
}: LanguagesActionsProps) {
  if (!canManage) return null;

  return (
    <div className="mt-7 flex justify-end">
      <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
        <Button
          type="button"
          variant={deleteMode ? 'outline' : 'ghost'}
          onClick={deleteMode ? onCancelDeleteMode : onAddLanguage}
          disabled={deleteMode ? disabled : false}
          className={cn(
            'h-12 w-full rounded-full uppercase tracking-wide sm:w-52',
            !deleteMode &&
              'gap-3 text-[13px] font-semibold text-muted-foreground hover:bg-transparent hover:text-muted-foreground/70',
          )}
        >
          {!deleteMode && <Plus className="size-5" />}

          {deleteMode ? 'Cancel' : 'Add Language'}
        </Button>

        <Button
          type="button"
          variant={deleteMode ? 'default' : 'ghost'}
          disabled={(deleteMode && selectedCount === 0) || disabled}
          onClick={deleteMode ? onDelete : onEnterDeleteMode}
          className={cn(
            'h-12 w-full rounded-full uppercase tracking-wide sm:w-52',
            deleteMode && 'gap-5',
            !deleteMode &&
              'gap-3 text-[13px] font-semibold text-destructive hover:bg-transparent hover:text-destructive/70',
          )}
        >
          {deleteMode ? (
            <>
              <span>Delete</span>

              <span
                className={`
                flex h-6 min-w-6 items-center justify-center
                rounded-full
                bg-primary
                px-1.5
                text-sm
                font-semibold
                text-destructive
                `}
              >
                {selectedCount}
              </span>
            </>
          ) : (
            <>
              <Trash2 className="size-5" />
              <span>Remove Languages</span>
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
