'use client';

import Link from 'next/link';
import Image from 'next/image';

import { useCurrentUser } from '@/entities/user';
import { getInitials } from '@/shared/lib/user/get-initials';

interface SidebarFooterProps {
  collapsed: boolean;
}

export function SidebarFooter({ collapsed }: SidebarFooterProps) {
  const currentUser = useCurrentUser();
  const { profile, id } = currentUser;

  const initials = getInitials({
    firstName: profile.first_name,
    lastName: profile.last_name,
    email: currentUser.email,
  });

  const profileUrl = `/users/${id}/profile`;

  return (
    <div className="mt-auto pb-4 pl-2">
      <div className="flex items-center gap-2">
        <Link
          href={profileUrl}
          className="block cursor-pointer transition-opacity hover:opacity-80"
        >
          {profile.avatar ? (
            <Image
              src={profile.avatar}
              alt={profile.full_name ?? currentUser.email}
              width={36}
              height={36}
              className="size-9 shrink-0 rounded-full object-cover"
            />
          ) : (
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#bd2525] text-lg font-bold text-sidebar-primary-foreground">
              {initials}
            </div>
          )}
        </Link>

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
