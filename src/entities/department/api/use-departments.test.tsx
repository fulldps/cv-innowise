import { renderHook } from '@testing-library/react';

const mockUseQuery = jest.fn();

jest.mock('@apollo/client/react', () => ({
  useQuery: () => mockUseQuery(),
}));

import { useDepartments } from './use-departments';

describe('useDepartments', () => {
  it('returns the departments query result', () => {
    const query = { data: { departments: [] }, loading: false, error: undefined };
    mockUseQuery.mockReturnValue(query);

    const { result } = renderHook(() => useDepartments());

    expect(result.current).toBe(query);
  });
});
