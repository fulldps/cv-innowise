import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

const GRAPHQL_URL = process.env.NEXT_PUBLIC_GRAPHQL_URL!;

function isAuthError(body: { errors?: { extensions?: { code?: string } }[] }) {
  return body.errors?.some((e) => e.extensions?.code === 'UNAUTHENTICATED') ?? false;
}

export async function POST(req: Request) {
  const payload = await req.text();
  const cookieStore = await cookies();

  const call = (token?: string) =>
    fetch(GRAPHQL_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: payload,
    });

  let res = await call(cookieStore.get('access_token')?.value);
  let body = await res.json();

  if (isAuthError(body)) {
    const refresh = cookieStore.get('refresh_token')?.value;
    const refreshRes = await fetch(GRAPHQL_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${refresh}` },
      body: JSON.stringify({ query: `mutation { updateToken { access_token refresh_token } }` }),
    });
    const refreshBody = await refreshRes.json();

    if (refreshBody.errors) {
      cookieStore.delete('access_token');
      cookieStore.delete('refresh_token');
      return NextResponse.json(body, { status: 401 });
    }

    const { access_token, refresh_token } = refreshBody.data.updateToken;
    const options = {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax' as const,
      path: '/',
    };
    cookieStore.set('access_token', access_token, options);
    cookieStore.set('refresh_token', refresh_token, options);

    res = await call(access_token);
    body = await res.json();
  }

  return NextResponse.json(body, { status: res.status });
}
