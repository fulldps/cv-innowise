import { renderHook } from '@testing-library/react';

const mockUseQuery = jest.fn();

jest.mock('@apollo/client/react', () => ({
  useQuery: () => mockUseQuery(),
}));

import { useUsersList } from './use-users-list';

describe('useUsersList', () => {
  it('returns the users array and a null error', () => {
    mockUseQuery.mockReturnValue({
      data: { users: [{ id: '1' }] },
      loading: false,
      error: undefined,
    });

    const { result } = renderHook(() => useUsersList());

    expect(result.current.data).toEqual([{ id: '1' }]);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('falls back to an empty array while loading', () => {
    mockUseQuery.mockReturnValue({ data: undefined, loading: true, error: undefined });

    const { result } = renderHook(() => useUsersList());

    expect(result.current.data).toEqual([]);
    expect(result.current.loading).toBe(true);
  });
});
