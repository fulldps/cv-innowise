import { renderHook } from '@testing-library/react';

jest.mock('@apollo/client/react', () => ({
  useQuery: () => ({ data: undefined }),
}));

import { useCurrentUser } from './use-current-user';

describe('useCurrentUser', () => {
  it('throws when used outside of the UserProvider', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation(() => {});

    expect(() => renderHook(() => useCurrentUser())).toThrow(
      'useCurrentUser must be used within UserProvider',
    );

    spy.mockRestore();
  });
});
