'use client';

import { useState } from 'react';
import type { PropsWithChildren } from 'react';

import { Sidebar } from '@/widgets/sidebar';
import { useCurrentUser } from '@/entities/user';

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

      <main className="flex-1">{children}</main>
    </div>
  );
}
