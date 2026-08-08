'use client';

import { Sheet, SheetContent } from '@/shared/ui/sheet';

import { SidebarNavigation } from './sidebar-navigation';
import { SidebarFooter } from './sidebar-footer';

interface MobileSidebarProps {
  open: boolean;
  onOpenChange(open: boolean): void;
}

export function MobileSidebar({ open, onOpenChange }: MobileSidebarProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="left"
        className="w-50 text-[18px] border-r-0 bg-sidebar p-0"
        onClick={() => onOpenChange(false)}
      >
        <div className="flex h-full flex-col">
          <div className="flex-1">
            <SidebarNavigation collapsed={false} />
          </div>

          <div className="mb-6">
            <SidebarFooter collapsed={false} />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
