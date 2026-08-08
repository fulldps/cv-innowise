'use client';

import { DesktopSidebar } from './desktop-sidebar';
import { MobileSidebar } from './mobile-sidebar';

interface SidebarProps {
  mobileOpen: boolean;
  onMobileOpenChange(open: boolean): void;
}

export function Sidebar({ mobileOpen, onMobileOpenChange }: SidebarProps) {
  return (
    <>
      <div className="hidden lg:block">
        <DesktopSidebar />
      </div>

      <div className="lg:hidden">
        <MobileSidebar open={mobileOpen} onOpenChange={onMobileOpenChange} />
      </div>
    </>
  );
}
