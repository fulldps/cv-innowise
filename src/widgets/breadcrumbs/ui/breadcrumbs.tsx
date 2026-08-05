'use client';

import { Fragment } from 'react';
import { User } from 'lucide-react';

import { useBreadcrumbs } from '../model/use-breadcrumbs';
import { useUser } from '@/entities/user';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/shared/ui/breadcrumb';

export function Breadcrumbs() {
  const { breadcrumbs, profileUserId } = useBreadcrumbs();

  const { data } = useUser(profileUserId ?? undefined);

  if (breadcrumbs.length === 0) {
    return null;
  }

  const hasNestedBreadcrumbs = breadcrumbs.length > 1;

  return (
    <Breadcrumb className="p-3 pb-0">
      <BreadcrumbList className="text-[16px]">
        {breadcrumbs.map((breadcrumb, index) => {
          const isLast = index === breadcrumbs.length - 1;

          let label = breadcrumb.label;
          const isProfileBreadcrumb = profileUserId && breadcrumb.label === null;

          if (isProfileBreadcrumb) {
            const fullName = data?.user?.profile.full_name || data?.user?.email || '';

            label = (
              <span className="flex items-center gap-2">
                <User className="h-4 w-4" />
                {fullName}
              </span>
            );
          }

          return (
            <Fragment key={breadcrumb.href}>
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage
                    className={hasNestedBreadcrumbs ? 'text-destructive' : 'text-muted-foreground'}
                  >
                    {label}
                  </BreadcrumbPage>
                ) : (
                  <BreadcrumbLink href={breadcrumb.href} className="text-foreground">
                    {label}
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>

              {!isLast && <BreadcrumbSeparator />}
            </Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
