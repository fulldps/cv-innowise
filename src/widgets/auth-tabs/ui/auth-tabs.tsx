'use client';

import { cn } from '@/shared/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const tabs = [
  {
    href: '/auth/login',
    label: 'LOG IN',
  },
  {
    href: '/auth/sighnup',
    label: 'SIGN UP',
  },
];
export function AuthTabs() {
  const pathname = usePathname();

  return (
    <header className="flex gap-1">
      {tabs.map((tab) => {
        const isActive = pathname === tab.href;
        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={cn(
              'flex h-12 w-42 items-center justify-center border-b-2',
              isActive
                ? 'border-[#c72f31] text-[#c72f31]'
                : 'border-transparent hover:border-[#c72f31]',
            )}
          >
            {tab.label}
          </Link>
        );
      })}
    </header>
  );
}
