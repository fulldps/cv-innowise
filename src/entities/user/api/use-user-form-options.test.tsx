import { renderHook } from '@testing-library/react';

const mockUseQuery = jest.fn();

jest.mock('@apollo/client/react', () => ({
  useQuery: () => mockUseQuery(),
}));

import { useUserFormOptions } from './use-user-form-options';

describe('useUserFormOptions', () => {
  it('combines departments and positions', () => {
    mockUseQuery
      .mockReturnValueOnce({ data: { departments: [{ id: 'd1' }] }, loading: false, error: undefined })
      .mockReturnValueOnce({ data: { positions: [{ id: 'p1' }] }, loading: false, error: undefined });

    const { result } = renderHook(() => useUserFormOptions());

    expect(result.current.departments).toEqual([{ id: 'd1' }]);
    expect(result.current.positions).toEqual([{ id: 'p1' }]);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('is loading when either query is loading', () => {
    mockUseQuery
      .mockReturnValueOnce({ data: undefined, loading: true, error: undefined })
      .mockReturnValueOnce({ data: undefined, loading: false, error: undefined });

    const { result } = renderHook(() => useUserFormOptions());

    expect(result.current.loading).toBe(true);
    expect(result.current.departments).toEqual([]);
    expect(result.current.positions).toEqual([]);
  });
});
