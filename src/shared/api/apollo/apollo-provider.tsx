'use client';

import { HttpLink } from '@apollo/client';
import {
  ApolloClient,
  ApolloNextAppProvider,
  InMemoryCache,
} from '@apollo/client-integration-nextjs';

function makeClient() {
  return new ApolloClient({
    cache: new InMemoryCache({
      typePolicies: {
        Profile: {
          fields: {
            skills: {
              merge: false,
            },
            languages: {
              merge: false,
            },
          },
        },
      },
    }),
    link: new HttpLink({ uri: '/api/graphql' }),
    defaultOptions: {
      watchQuery: {
        fetchPolicy: 'cache-and-network',
      },
    },
  });
}

export function ApolloProvider({ children }: { children: React.ReactNode }) {
  return <ApolloNextAppProvider makeClient={makeClient}>{children}</ApolloNextAppProvider>;
}
