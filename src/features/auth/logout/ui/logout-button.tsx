'use client';

import { LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { cn } from '@/shared/lib/utils';

interface LogoutButtonProps {
  collapsed?: boolean;
}

export function LogoutButton({ collapsed = false }: LogoutButtonProps) {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/auth/login');
    router.refresh();
  };

  return (
    <button
      type="button"
      onClick={handleLogout}
      aria-label="Log out"
      className={cn(
        'flex h-12 items-center gap-3 rounded-r-full pl-4 text-sidebar-foreground/70 transition-colors hover:bg-sidebar-accent/50 hover:text-sidebar-foreground',
        collapsed ? 'mr-2' : 'mr-6',
      )}
    >
      <LogOut className="h-5 w-5 shrink-0" />
      {!collapsed && <span className="truncate">Log out</span>}
    </button>
  );
}
