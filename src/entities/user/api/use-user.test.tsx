import { renderHook } from '@testing-library/react';

const mockUseQuery = jest.fn();

jest.mock('@apollo/client/react', () => ({
  useQuery: (...args: unknown[]) => mockUseQuery(...args),
}));

import { useUser } from './use-user';

beforeEach(() => jest.clearAllMocks());

describe('useUser', () => {
  it('queries the user when an id is provided', () => {
    mockUseQuery.mockReturnValue({});
    renderHook(() => useUser('u1'));

    expect(mockUseQuery).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({ variables: { userId: 'u1' }, skip: false }),
    );
  });

  it('skips the query when no id is provided', () => {
    mockUseQuery.mockReturnValue({});
    renderHook(() => useUser());

    expect(mockUseQuery).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({ variables: { userId: '' }, skip: true }),
    );
  });
});
