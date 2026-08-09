import { renderHook } from '@testing-library/react';

const mockMutate = jest.fn();

jest.mock('@apollo/client/react', () => ({
  useMutation: () => [mockMutate, {}],
}));

import { useDeleteUser } from './use-delete-user';

beforeEach(() => {
  jest.clearAllMocks();
  mockMutate.mockResolvedValue({});
});

describe('useDeleteUser', () => {
  it('mutates with the user id', async () => {
    const { result } = renderHook(() => useDeleteUser());

    await result.current.deleteUser('u1');

    expect(mockMutate).toHaveBeenCalledWith(
      expect.objectContaining({
        variables: { userId: 'u1' },
        awaitRefetchQueries: true,
      }),
    );
  });
});
