import { renderHook } from '@testing-library/react';

const mockUseQuery = jest.fn();

jest.mock('@apollo/client/react', () => ({
  useQuery: () => mockUseQuery(),
}));

import { useSkills } from './use-skills';

describe('useSkills', () => {
  it('returns the skills query result', () => {
    const query = { data: { skills: [] }, loading: false, error: undefined };
    mockUseQuery.mockReturnValue(query);

    const { result } = renderHook(() => useSkills());

    expect(result.current).toBe(query);
  });
});
