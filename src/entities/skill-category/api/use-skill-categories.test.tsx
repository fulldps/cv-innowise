import { renderHook } from '@testing-library/react';

const mockUseQuery = jest.fn();

jest.mock('@apollo/client/react', () => ({
  useQuery: () => mockUseQuery(),
}));

import { useSkillCategories } from './use-skill-categories';

describe('useSkillCategories', () => {
  it('returns the skill categories query result', () => {
    const query = { data: { skillCategories: [] }, loading: false, error: undefined };
    mockUseQuery.mockReturnValue(query);

    const { result } = renderHook(() => useSkillCategories());

    expect(result.current).toBe(query);
  });
});
