'use client';

import { useState } from 'react';
import type { PropsWithChildren } from 'react';

import { Sidebar } from '@/widgets/sidebar';
import { useCurrentUser } from '@/entities/user';
import { Breadcrumbs } from '@/widgets/breadcrumbs';

export default function AppLayout({ children }: PropsWithChildren) {
  const currentUser = useCurrentUser();

  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen">
      <Sidebar
        currentUser={currentUser}
        collapsed={collapsed}
        onToggle={() => setCollapsed((prev) => !prev)}
      />

      <main className="flex min-w-0 flex-1 bg-primary-foreground">
        <div className="flex w-full flex-col">
          <Breadcrumbs />

          {children}
        </div>
      </main>
    </div>
  );
}
