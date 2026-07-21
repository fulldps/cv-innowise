import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST() {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get('refresh_token')?.value;

  if (!refreshToken) {
    return NextResponse.json({ error: 'No refresh token' }, { status: 401 });
  }

  const res = await fetch(process.env.NEXT_PUBLIC_GRAPHQL_URL!, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${refreshToken}`,
    },
    body: JSON.stringify({ query: `mutation { updateToken { access_token refresh_token } }` }),
  });

  const body = await res.json();

  if (body.errors) {
    cookieStore.delete('access_token');
    cookieStore.delete('refresh_token');
    return NextResponse.json({ error: 'Session expired' }, { status: 401 });
  }

  const { access_token, refresh_token } = body.data.updateToken;
  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax' as const,
    path: '/',
  };

  cookieStore.set('access_token', access_token, options);
  cookieStore.set('refresh_token', refresh_token, options);

  return NextResponse.json({ ok: true });
}
