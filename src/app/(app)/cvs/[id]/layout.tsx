'use client';

import { cn } from '@/shared/lib/utils';
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';

const tabs = [
  { segment: 'details', label: 'DETAILS' },
  { segment: 'skills', label: 'SKILLS' },
  { segment: 'projects', label: 'PROJECTS' },
  { segment: 'preview', label: 'PREVIEW' },
];

export default function CvsLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const pathname = usePathname();
  const { id } = useParams();

  return (
    <div className="flex flex-col gap-8">
      <nav className="lg:w-140">
        <ul className="flex w-full items-center">
          {tabs.map((tab) => {
            const href = `/cvs/${id}/${tab.segment}`;
            const isActive = pathname.startsWith(href);

            return (
              <li key={tab.segment} className="flex-1">
                <Link
                  href={href}
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

      {children}
    </div>
  );
}
