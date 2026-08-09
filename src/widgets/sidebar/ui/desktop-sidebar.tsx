'use client';

import { useState } from 'react';

import { LogoutButton } from '@/features/auth/logout/ui/logout-button';
import { cn } from '@/shared/lib/utils';

import { SidebarCollapseButton } from './sidebar-collapse-button';
import { SidebarFooter } from './sidebar-footer';
import { SidebarNavigation } from './sidebar-navigation';

export function DesktopSidebar() {
  const [collapsed, setCollapsed] = useState(false);

  const handleToggle = () => {
    setCollapsed((prev) => !prev);
  };

  return (
    <aside
      className={cn('sticky top-0 flex h-screen flex-col bg-sidebar', collapsed ? 'w-16' : 'w-50')}
    >
      <div className="flex-1">
        <SidebarNavigation collapsed={collapsed} />
      </div>

      <SidebarFooter collapsed={collapsed} />

      <LogoutButton collapsed={collapsed} />

      <SidebarCollapseButton collapsed={collapsed} onToggle={handleToggle} />
    </aside>
  );
}
