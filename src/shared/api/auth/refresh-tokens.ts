export interface RefreshedTokens {
  access_token: string;
  refresh_token: string;
}

export async function refreshTokens(refreshToken: string): Promise<RefreshedTokens | null> {
  const res = await fetch(process.env.NEXT_PUBLIC_GRAPHQL_URL!, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${refreshToken}` },
    body: JSON.stringify({ query: `mutation { updateToken { access_token refresh_token } }` }),
  });

  const body = await res.json();

  if (body.errors) {
    return null;
  }

  return body.data.updateToken;
}
