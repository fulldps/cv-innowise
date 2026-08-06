'use client';

import { Plus, Trash2 } from 'lucide-react';

import { cn } from '@/shared/lib/utils';
import { Button } from '@/shared/ui/button';

interface SkillsActionsProps {
  canManage: boolean;

  deleteMode: boolean;

  selectedCount: number;

  onAddSkill: () => void;

  onEnterDeleteMode: () => void;
  onCancelDeleteMode: () => void;
  onDelete: () => void;

  disabled?: boolean;
}

export function SkillsActions({
  canManage,
  deleteMode,
  selectedCount,
  onAddSkill,
  onEnterDeleteMode,
  onCancelDeleteMode,
  onDelete,
  disabled = false,
}: SkillsActionsProps) {
  if (!canManage) return null;

  return (
    <div className="mt-7 flex justify-end">
      <div className="flex gap-3">
        <Button
          type="button"
          variant={deleteMode ? 'outline' : 'ghost'}
          onClick={deleteMode ? onCancelDeleteMode : onAddSkill}
          disabled={deleteMode ? disabled : false}
          className={cn(
            'h-12 w-52 rounded-full uppercase tracking-wide',
            !deleteMode &&
              'gap-3 text-[13px] font-semibold text-muted-foreground hover:bg-transparent hover:text-muted-foreground/70',
          )}
        >
          {!deleteMode && <Plus className="size-5" />}

          {deleteMode ? 'Cancel' : 'Add Skill'}
        </Button>
        <Button
          type="button"
          variant={deleteMode ? 'default' : 'ghost'}
          disabled={(deleteMode && selectedCount === 0) || disabled}
          onClick={deleteMode ? onDelete : onEnterDeleteMode}
          className={cn(
            'h-12 w-52 rounded-full uppercase tracking-wide',
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
                bg-primary-foreground
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
              <span>Remove Skills</span>
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
