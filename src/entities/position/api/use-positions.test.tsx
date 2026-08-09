import { renderHook } from '@testing-library/react';

const mockUseQuery = jest.fn();

jest.mock('@apollo/client/react', () => ({
  useQuery: () => mockUseQuery(),
}));

import { usePositions } from './use-positions';

describe('usePositions', () => {
  it('returns the positions query result', () => {
    const query = { data: { positions: [] }, loading: false, error: undefined };
    mockUseQuery.mockReturnValue(query);

    const { result } = renderHook(() => usePositions());

    expect(result.current).toBe(query);
  });
});
