import { renderHook } from '@testing-library/react';

const mockUseQuery = jest.fn();

jest.mock('@apollo/client/react', () => ({
  useQuery: () => mockUseQuery(),
}));

import { useLanguages } from './use-languages';

describe('useLanguages', () => {
  it('returns the languages query result', () => {
    const query = { data: { languages: [] }, loading: false, error: undefined };
    mockUseQuery.mockReturnValue(query);

    const { result } = renderHook(() => useLanguages());

    expect(result.current).toBe(query);
  });
});
