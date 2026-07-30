'use client';

import { useCurrentUser } from '@/entities/user';
import Image from 'next/image';

interface SidebarFooterProps {
  collapsed: boolean;
}

export function SidebarFooter({ collapsed }: SidebarFooterProps) {
  const currentUser = useCurrentUser();
  const { profile } = currentUser;

  const initials =
    `${profile.first_name?.[0] ?? profile.last_name?.[0] ?? ''}` ||
    currentUser.email[0].toUpperCase();

  return (
    <div className="mt-auto pb-4 pl-2">
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
            <p className="truncate text-sidebar-foreground">
              {profile.full_name ?? currentUser.email}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
