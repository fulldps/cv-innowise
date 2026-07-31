import Image from 'next/image';
import { ChevronRight } from 'lucide-react';

import { TableCell, TableRow } from '@/shared/ui/table';

import type { UsersTableRowModel } from '../model/users-table-row-model';
import { UserActionsMenu } from './user-actions-menu';

interface UsersTableRowProps {
  row: UsersTableRowModel;

  onEdit(userId: string): void;
  onDelete?(userId: string, userFullName: string): void;
}

export function UsersTableRow({ row, onEdit, onDelete }: UsersTableRowProps) {
  const { user, canEdit } = row;
  const { profile } = user;

  const initials =
    `${profile.first_name?.[0] ?? profile.last_name?.[0] ?? ''}` || user.email[0].toUpperCase();

  const userFullName =
    [profile.first_name, profile.last_name].filter(Boolean).join(' ') || 'Anonymous';

  const cellClassName = 'px-4 text-[15px] text-primary';

  return (
    <TableRow className="h-15 border-border transition-colors hover:bg-accent/40">
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
        <div className="flex justify-end">
          {canEdit ? (
            <UserActionsMenu
              userId={user.id}
              userFullName={userFullName}
              canDelete={row.canDelete}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ) : (
            <ChevronRight className="h-5 w-5 text-muted-foreground" />
          )}
        </div>
      </TableCell>
    </TableRow>
  );
}
