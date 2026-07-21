import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { email, password } = await req.json();

  const res = await fetch(process.env.NEXT_PUBLIC_GRAPHQL_URL!, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: `query Login($auth: AuthInput!) {
        login(auth: $auth) { user { id email } access_token refresh_token }
      }`,
      variables: { auth: { email, password } },
    }),
  });

  const body = await res.json();

  if (body.errors) {
    return NextResponse.json({ error: body.errors[0].message }, { status: 401 });
  }

  const { user, access_token, refresh_token } = body.data.login;

  const cookieStore = await cookies();
  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax' as const,
    path: '/',
  };
  cookieStore.set('access_token', access_token, options);
  cookieStore.set('refresh_token', refresh_token, options);

  return NextResponse.json({ user });
}
