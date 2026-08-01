'use client';

import { useCurrentUser } from '@/entities/user';

interface SidebarFooterProps {
  collapsed: boolean;
}

export function SidebarFooter({ collapsed }: SidebarFooterProps) {
  const currentUser = useCurrentUser();

  const initials = currentUser.email[0].toUpperCase();

  return (
    <div className="mt-auto pb-4 pl-2">
      <div className="flex items-center gap-2">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#bd2525] text-lg font-bold text-sidebar-primary-foreground">
          {initials}
        </div>

        {!collapsed && (
          <div className="min-w-0">
            <p className="truncate text-sidebar-foreground">{currentUser.email}</p>
          </div>
        )}
      </div>
    </div>
  );
}
