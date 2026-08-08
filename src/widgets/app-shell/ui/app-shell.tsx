'use client';

import { useState, type PropsWithChildren } from 'react';

import { Sidebar } from '@/widgets/sidebar';
import { Breadcrumbs } from '@/widgets/breadcrumbs';

export function AppShell({ children }: PropsWithChildren) {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen">
      <Sidebar mobileOpen={isMobileSidebarOpen} onMobileOpenChange={setIsMobileSidebarOpen} />

      <main className="flex min-w-0 flex-1 bg-primary-foreground">
        <div className="flex w-full flex-col">
          <Breadcrumbs onOpenMobileSidebar={() => setIsMobileSidebarOpen(true)} />
          {children}
        </div>
      </main>
    </div>
  );
}
