'use client';

import type { User } from '@/entities/user';

import { SidebarFooter } from './sidebar-footer';
import { SidebarNavigation } from './sidebar-navigation';
import { SidebarCollapseButton } from './sidebar-collapse-button';
import { cn } from '@/shared/lib/utils';

interface SidebarProps {
  currentUser: User;
  collapsed: boolean;
  onToggle: () => void;
}

export function Sidebar({ currentUser, collapsed, onToggle }: SidebarProps) {
  return (
    <aside
      className={cn(
        'flex h-screen sticky top-0 flex-col transition-[width] duration-200 bg-sidebar',
        collapsed ? 'w-16' : 'w-50',
      )}
    >
      <div className="flex-1">
        <SidebarNavigation role={currentUser.role} collapsed={collapsed} />
      </div>

      <SidebarFooter currentUser={currentUser} collapsed={collapsed} />

      <SidebarCollapseButton collapsed={collapsed} onToggle={onToggle} />
    </aside>
  );
}
