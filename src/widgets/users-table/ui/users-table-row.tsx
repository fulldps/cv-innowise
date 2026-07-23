import Image from 'next/image';
import { ChevronRight, EllipsisVertical } from 'lucide-react';

import { TableCell, TableRow } from '@/shared/ui/table';

import type { UsersTableRowModel } from '../model/users-table-row';

interface UsersTableRowProps {
  row: UsersTableRowModel;
}

export function UsersTableRow({ row }: UsersTableRowProps) {
  const { user, canManage } = row;
  const { profile } = user;

  const initials =
    `${profile.first_name?.[0] ?? profile.last_name?.[0] ?? ''}` ||
    user.email[0].toUpperCase();

  const cellClassName = 'px-4 text-[15px] text-primary';

  return (
    <TableRow className="h-17 border-border transition-colors hover:bg-accent/40">
      {/* Avatar */}
      <TableCell className="w-18 pl-3">
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
      <TableCell className="w-16 pr-4">
        <div className="flex justify-end">
          {canManage ? (
            <EllipsisVertical className="h-5 w-5 text-chart-3" />
          ) : (
            <ChevronRight className="h-5 w-5 text-chart-3" />
          )}
        </div>
      </TableCell>
    </TableRow>
  );
}
