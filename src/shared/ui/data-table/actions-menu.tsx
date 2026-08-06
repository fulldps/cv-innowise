'use client';

import { Edit2, EllipsisVertical, Trash2 } from 'lucide-react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/ui/dropdown-menu';

interface ActionsMenuProps {
  canDelete?: boolean;

  onEdit(): void;

  onDelete?(): void;
}

export function ActionsMenu({ canDelete = false, onEdit, onDelete }: ActionsMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className="
          flex
          w-full
          justify-end
          rounded-md
          p-1
          hover:bg-accent
          focus-visible:ring-2
          focus-visible:ring-ring
          cursor-pointer
        "
      >
        <EllipsisVertical className="size-5 text-foreground" />
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={onEdit} className="cursor-pointer">
          <Edit2 className="mr-1 size-4" />
          Edit
        </DropdownMenuItem>

        {canDelete && onDelete && (
          <DropdownMenuItem
            onClick={onDelete}
            className="cursor-pointer text-destructive focus:text-destructive"
          >
            <Trash2 className="mr-1 size-4" />
            Delete
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
