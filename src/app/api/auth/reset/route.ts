import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { token, newPassword } = await req.json();

  const res = await fetch(process.env.NEXT_PUBLIC_GRAPHQL_URL!, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      query: `mutation ResetPassword($auth: ResetPasswordInput!) {
        resetPassword(auth: $auth)
      }`,
      variables: { auth: { newPassword } },
    }),
  });

  const body = await res.json();

  if (body.errors) {
    return NextResponse.json({ error: body.errors[0].message }, { status: 400 });
  }

  return NextResponse.json({ ok: true });
}
