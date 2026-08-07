'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/shared/lib/utils';
import { getUserProfileTabs } from '../model/tabs';

interface UserProfileTabsProps {
  userId: string;
}

export function UserProfileTabs({ userId }: UserProfileTabsProps) {
  const pathname = usePathname();
  const tabs = getUserProfileTabs(userId);

  return (
    <nav className="w-140">
      <ul className="flex w-full items-center">
        {tabs.map((tab) => {
          const isActive = pathname === tab.href;

          return (
            <li key={tab.href} className="flex-1">
              <Link
                href={tab.href}
                className={cn(
                  'flex w-full justify-center border-b-2 py-3 text-[13px] font-semibold transition-colors',
                  isActive
                    ? 'border-destructive text-destructive'
                    : 'border-transparent text-primary hover:text-destructive',
                )}
              >
                {tab.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
