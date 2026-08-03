'use client';

import { cn } from '@/shared/lib/utils';
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';

const tabs = [
  { segment: 'details', label: 'DETAILS' },
  { segment: 'preview', label: 'PREVIEW' },
  { segment: 'projects', label: 'PROJECTS' },
  { segment: 'skills', label: 'SKILLS' },
];

export default function CvsLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const pathname = usePathname();
  const { id } = useParams();

  return (
    <div className="flex gap-4">
      <nav>
        {tabs.map((tab) => {
          const href = `/cvs/${id}/${tab.segment}`;
          const isActive = pathname.startsWith(href);
          return (
            <Link key={tab.segment} href={href} className={cn(isActive && 'text-[#c72f31]')}>
              {tab.label}
            </Link>
          );
        })}
      </nav>
      {children}
    </div>
  );
}
