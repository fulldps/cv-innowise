'use client';

import { useCurrentUser } from '@/entities/user';
import { cn } from '@/shared/lib/utils';
import { Fragment } from 'react';
import { navigationByRole } from '../model/navigation';
import { NavigationItem } from './navigation-item';

interface SidebarNavigationProps {
  collapsed: boolean;
}

export function SidebarNavigation({ collapsed }: SidebarNavigationProps) {
  const { role } = useCurrentUser();
  const navigation = navigationByRole[role];

  return (
    <nav className="flex flex-col gap-2 pt-9">
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
