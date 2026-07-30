'use client';

import { Edit2, Trash2, EllipsisVertical } from 'lucide-react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/ui/dropdown-menu';

interface UserActionsMenuProps {
  userId: string;
  userFullName: string;
  canDelete: boolean;

  onEdit(userId: string): void;
  onDelete?(userId: string, userFullName: string): void;
}

export function UserActionsMenu({
  userId,
  userFullName,
  canDelete,
  onEdit,
  onDelete,
}: UserActionsMenuProps) {

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
        <EllipsisVertical className="h-5 w-5 text-foreground" />
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => onEdit(userId)} className="cursor-pointer">
          <Edit2 className="mr-1 size-4" />
          Edit
        </DropdownMenuItem>

        {canDelete && onDelete && (
          <DropdownMenuItem
            className="text-destructive focus:text-destructive cursor-pointer"
            onClick={() => onDelete(userId, userFullName)}
          >
            <Trash2 className="mr-1 size-4" />
            Delete
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
