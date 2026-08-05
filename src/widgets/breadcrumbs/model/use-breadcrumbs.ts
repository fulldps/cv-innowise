'use client';

import { usePathname } from 'next/navigation';

import type { BreadcrumbItem } from './types';
import { breadcrumbMap } from './breadcrumb-map';

export function useBreadcrumbs() {
  const pathname = usePathname();

  const segments = pathname.split('/').filter(Boolean);

  if (segments.length === 0) {
    return {
      breadcrumbs: [] as BreadcrumbItem[],
      profileUserId: null as string | null,
    };
  }

  const profilePages = ['profile', 'skills', 'languages'];

  if (segments.length === 3 && segments[0] === 'users' && profilePages.includes(segments[2])) {
    const currentPage = segments[2];

    return {
      breadcrumbs: [
        {
          label: breadcrumbMap.users,
          href: '/users',
        },
        {
          label: null,
          href: `/users/${segments[1]}/profile`,
        },
        ...(currentPage !== 'profile'
          ? [
              {
                label: breadcrumbMap[currentPage],
                href: pathname,
              },
            ]
          : []),
      ],
      profileUserId: segments[1],
    };
  }

  const breadcrumbs = segments.map((segment, index) => ({
    label: breadcrumbMap[segment] ?? segment,
    href: `/${segments.slice(0, index + 1).join('/')}`,
  }));

  return {
    breadcrumbs,
    profileUserId: null,
  };
}
