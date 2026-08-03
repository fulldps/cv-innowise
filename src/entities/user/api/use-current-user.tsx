'use client';

import { createContext, useContext } from 'react';

import type { User } from '../model';
import { useQuery } from '@apollo/client/react';
import { USER_QUERY } from './user.queries';

const UserContext = createContext<User | null>(null);

interface UserProviderProps {
  user: User;
  children: React.ReactNode;
}

export function UserProvider({ user: initialUser, children }: UserProviderProps) {
  const { data } = useQuery(USER_QUERY, {
    variables: { userId: initialUser.id },
  });

  const currentUser = data?.user ?? initialUser;

  return <UserContext.Provider value={currentUser}>{children}</UserContext.Provider>;
}

export function useCurrentUser() {
  const user = useContext(UserContext);

  if (!user) {
    throw new Error('useCurrentUser must be used within UserProvider');
  }

  return user;
}
