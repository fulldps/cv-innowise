import { HttpLink } from '@apollo/client';
import { SetContextLink } from '@apollo/client/link/context';
import {
  ApolloClient,
  InMemoryCache,
  registerApolloClient,
} from '@apollo/client-integration-nextjs';
import { cookies } from 'next/headers';

export const { getClient, query, PreloadQuery } = registerApolloClient(() => {
  const authLink = new SetContextLink(async () => {
    const token = (await cookies()).get('access_token')?.value;
    return token ? { headers: { Authorization: `Bearer ${token}` } } : {};
  });

  return new ApolloClient({
    cache: new InMemoryCache(),
    link: authLink.concat(new HttpLink({ uri: process.env.NEXT_PUBLIC_GRAPHQL_URL })),
  });
});
