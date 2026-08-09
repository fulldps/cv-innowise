import { renderHook } from '@testing-library/react';

const mockUseQuery = jest.fn();

jest.mock('@apollo/client/react', () => ({
  useQuery: (...args: unknown[]) => mockUseQuery(...args),
}));

import { useProfile } from './use-profile';

describe('useProfile', () => {
  it('queries the profile for the given user id', () => {
    const query = { data: undefined, loading: true };
    mockUseQuery.mockReturnValue(query);

    const { result } = renderHook(() => useProfile('u1'));

    expect(result.current).toBe(query);
    expect(mockUseQuery).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({ variables: { userId: 'u1' } }),
    );
  });
});
