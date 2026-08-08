'use client';

import { Fragment } from 'react';
import Link from 'next/link';
import { User } from 'lucide-react';

import { useUser } from '@/entities/user';
import { useBreadcrumbs } from '../model/use-breadcrumbs';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/shared/ui/breadcrumb';

import { MobileMenuButton } from './mobile-menu-button';

interface BreadcrumbsProps {
  onOpenMobileSidebar(): void;
}

export function Breadcrumbs({ onOpenMobileSidebar }: BreadcrumbsProps) {
  const { breadcrumbs, profileUserId } = useBreadcrumbs();

  const { data } = useUser(profileUserId ?? undefined);

  const hasNestedBreadcrumbs = breadcrumbs.length > 1;

  return (
    <div className="flex items-center">
      <div className="mt-2">
        <MobileMenuButton onClick={onOpenMobileSidebar} />
      </div>

      {breadcrumbs.length > 0 && (
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
                        className={
                          hasNestedBreadcrumbs ? 'text-destructive' : 'text-muted-foreground'
                        }
                      >
                        {label}
                      </BreadcrumbPage>
                    ) : (
                      <BreadcrumbLink
                        render={<Link href={breadcrumb.href} />}
                        className="text-foreground"
                      >
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
      )}
    </div>
  );
}
