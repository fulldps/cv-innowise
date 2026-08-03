import type { PropsWithChildren } from 'react';

import { getClient } from '@/shared/api/apollo/apollo-client';

import { USER_QUERY, UserProvider } from '@/entities/user';
import { Breadcrumbs } from '@/widgets/breadcrumbs';
import { Sidebar } from '@/widgets/sidebar';

import { jwtDecode } from 'jwt-decode';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

interface JwtPayload {
  sub: string;
  email: string;
  role: string;
}

export default async function AppLayout({ children }: PropsWithChildren) {
  const cookieStore = await cookies();
  const tokenCookie = cookieStore.get('access_token');

  if (!tokenCookie?.value) {
    redirect('/auth/login');
  }

  const { sub } = jwtDecode<JwtPayload>(tokenCookie.value);

  const client = getClient();
  const { data } = await client.query({
    query: USER_QUERY,
    variables: { userId: sub },
  });

  if (!data?.user) {
    redirect('/auth/login');
  }

  return (
    <UserProvider user={data.user}>
      <div className="flex min-h-screen">
        <Sidebar />

        <main className="flex min-w-0 flex-1 bg-primary-foreground">
          <div className="flex w-full flex-col">
            <Breadcrumbs />
            {children}
          </div>
        </main>
      </div>
    </UserProvider>
  );
}
