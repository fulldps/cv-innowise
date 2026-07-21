'use client';

import Image from 'next/image';

import type { User } from '@/entities/user';
import { cn } from '@/shared/lib/utils';

interface SidebarFooterProps {
  currentUser: User;
  collapsed: boolean;
}

export function SidebarFooter({ currentUser, collapsed }: SidebarFooterProps) {
  const { profile } = currentUser;

  const initials =
    `${profile.first_name?.[0] ?? profile.last_name?.[0] ?? ''}` ||
    currentUser.email[0].toUpperCase();

  return (
    <div className={cn('mt-auto p-4', collapsed ? 'flex flex-col items-center' : 'pl-2')}>
      <div className="flex items-center gap-2">
        {profile.avatar ? (
          <Image
            src={profile.avatar}
            alt={profile.full_name ?? currentUser.email}
            width={40}
            height={40}
            className="rounded-full object-cover"
          />
        ) : (
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#bd2525] text-lg font-bold text-sidebar-primary-foreground">
            {initials}
          </div>
        )}

        {!collapsed && (
          <div className="min-w-0">
            <p className="truncate text-sidebar-foreground">{profile.full_name ?? currentUser.email}</p>
          </div>
        )}
      </div>
    </div>
  );
}
