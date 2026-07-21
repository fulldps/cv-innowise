'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/shared/lib/utils';

import type { NavigationItem as NavigationItemModel } from '../model/navigation';

interface NavigationItemProps {
  item: NavigationItemModel;
  collapsed: boolean;
}

export function NavigationItem({ item, collapsed }: NavigationItemProps) {
  const pathname = usePathname();

  const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
  const Icon = item.icon;

  return (
    <Link
      href={item.href}
      className={cn(
        'flex rounded-r-full h-11 transition-colors',
        collapsed ? 'mr-2 justify-center' : 'mr-6 justify-start pl-4',
        isActive
          ? 'bg-sidebar-accent text-sidebar-foreground'
          : 'text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground',
      )}
      aria-current={isActive ? 'page' : undefined}
    >
      <div className="flex items-center gap-3">
        <Icon
          className={cn(
            'h-5 w-5 shrink-0',
            isActive ? 'text-sidebar-foreground' : 'text-sidebar-foreground/70',
          )}
        />
        {!collapsed && <span className="truncate">{item.label}</span>}
      </div>
    </Link>
  );
}
