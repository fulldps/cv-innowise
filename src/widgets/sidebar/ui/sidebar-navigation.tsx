'use client';

import { UserRole } from '@/entities/user';
import { navigationByRole } from '../model/navigation';
import { NavigationItem } from './navigation-item';
import { Fragment } from 'react';
import { cn } from '@/shared/lib/utils';

interface SidebarNavigationProps {
  role: UserRole;
  collapsed: boolean;
}

export function SidebarNavigation({ role, collapsed }: SidebarNavigationProps) {
  const navigation = navigationByRole[role];

  return (
    <nav className="flex flex-col gap-1 pt-8">
      {navigation.map((item) => (
        <Fragment key={item.href}>
          <NavigationItem item={item} collapsed={collapsed} />

          {item.dividerAfter && (
            <div
              className={cn('my-3 border-t border-sidebar-border', collapsed ? 'mr-2' : 'mr-6')}
            />
          )}
        </Fragment>
      ))}
    </nav>
  );
}
