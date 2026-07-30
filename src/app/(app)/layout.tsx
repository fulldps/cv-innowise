import type { PropsWithChildren } from 'react';

import { UserProvider, UserRole, type User } from '@/entities/user';
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
  const cookiesStore = await cookies();
  const tokenCookie = cookiesStore.get('access_token');

  if (!tokenCookie?.value) {
    redirect('/login');
  }

  const decoded = jwtDecode<JwtPayload>(tokenCookie.value);
  const { sub, email, role } = decoded;
  const user: User = {
    id: sub,
    email,
    role: role as UserRole,
    created_at: '',
    is_verified: true,
    profile: {
      id: '',
      created_at: '',
      first_name: null,
      last_name: null,
      full_name: null,
      avatar: null,
      skills: [],
      languages: [],
    },
    cvs: null,
    department: null,
    department_name: null,
    position: null,
    position_name: null,
  };

  return (
    <UserProvider user={user}>
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
