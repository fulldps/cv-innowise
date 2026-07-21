'use client';

import { Button } from '@/shared/ui/button';
import { useRouter } from 'next/navigation';

export function LogoutButton() {
  const router = useRouter();
  return (
    <Button
      onClick={async () => {
        await fetch('/api/auth/logout', { method: 'POST' });
        router.push('/auth/login');
        router.refresh();
      }}
    >
      LOG OUT
    </Button>
  );
}
