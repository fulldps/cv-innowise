import Image from 'next/image';
import { ChevronRight } from 'lucide-react';

import type { UsersTableRowModel } from '../model/users-table-row-model';

import { TableCell, TableRow } from '@/shared/ui/table';
import { ActionsMenu } from '@/shared/ui/data-table/actions-menu';
import { getInitials } from '@/shared/lib/user/get-initials';

interface UsersTableRowProps {
  row: UsersTableRowModel;
  onOpenProfile(userId: string): void;
  onEdit(userId: string): void;
  onDelete?(userId: string, userFullName: string): void;
}

export function UsersTableRow({ row, onOpenProfile, onEdit, onDelete }: UsersTableRowProps) {
  const { user, canEdit } = row;
  const { profile } = user;

  const initials = getInitials({
    firstName: profile.first_name,
    lastName: profile.last_name,
    email: user.email,
  });

  const userFullName =
    [profile.first_name, profile.last_name].filter(Boolean).join(' ') || 'Anonymous';

  const cellClassName = 'px-4 text-[15px] text-primary whitespace-normal break-words';

  return (
    <TableRow
      onClick={() => onOpenProfile(user.id)}
      className="h-15 cursor-pointer border-border transition-colors hover:bg-accent/40"
    >
      {/* Avatar */}
      <TableCell className="pl-3">
        {profile.avatar ? (
          <Image
            src={profile.avatar}
            alt={profile.full_name ?? user.email}
            width={40}
            height={40}
            className="h-9 w-9 rounded-full object-cover"
          />
        ) : (
          <div className="bg-ring text-primary-foreground flex h-9 w-9 items-center justify-center rounded-full text-lg font-medium">
            {initials}
          </div>
        )}
      </TableCell>

      {/* First name */}
      <TableCell className={cellClassName}>{profile.first_name ?? '—'}</TableCell>

      {/* Last name */}
      <TableCell className={cellClassName}>{profile.last_name ?? '—'}</TableCell>

      {/* Email */}
      <TableCell className={cellClassName}>{user.email}</TableCell>

      {/* Department */}
      <TableCell className={cellClassName}>{user.department_name ?? '—'}</TableCell>

      {/* Position */}
      <TableCell className={cellClassName}>{user.position_name ?? '—'}</TableCell>

      {/* Actions */}
      <TableCell className="pr-4">
        <div onClick={(e) => e.stopPropagation()} className="flex justify-end">
          {canEdit ? (
            <ActionsMenu
              canDelete={row.canDelete}
              onEdit={() => onEdit(user.id)}
              onDelete={() => onDelete?.(user.id, userFullName)}
            />
          ) : (
            <ChevronRight className="h-5 w-5 text-muted-foreground" />
          )}
        </div>
      </TableCell>
    </TableRow>
  );
}
