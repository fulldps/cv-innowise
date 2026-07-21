'use client';

import { ChevronLeft } from 'lucide-react';

import { cn } from '@/shared/lib/utils';

interface SidebarCollapseButtonProps {
  collapsed: boolean;
  onToggle: () => void;
}

export function SidebarCollapseButton({ collapsed, onToggle }: SidebarCollapseButtonProps) {
  return (
    <div className={cn('flex pb-4', collapsed ? 'justify-center' : 'justify-start pl-2')}>
      <button
        type="button"
        aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        onClick={onToggle}
        className="flex h-8 w-8 items-center justify-center rounded-md text-sidebar-foreground transition-colors hover:bg-sidebar-accent"
      >
        <ChevronLeft
          strokeWidth={2.3}
          className={cn('h-5 w-5 transition-transform', collapsed && 'rotate-180')}
        />
      </button>
    </div>
  );
}
