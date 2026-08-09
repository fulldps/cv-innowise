import { renderHook } from '@testing-library/react';

const mockMutate = jest.fn();

jest.mock('@apollo/client/react', () => ({
  useMutation: () => [mockMutate, {}],
}));

import { useDeletePosition } from './use-delete-position';

beforeEach(() => {
  jest.clearAllMocks();
  mockMutate.mockResolvedValue({});
});

describe('useDeletePosition', () => {
  it('mutates with the position id', async () => {
    const { result } = renderHook(() => useDeletePosition());

    await result.current.deletePosition('p1');

    expect(mockMutate).toHaveBeenCalledWith(
      expect.objectContaining({
        variables: { position: { positionId: 'p1' } },
        awaitRefetchQueries: true,
      }),
    );
  });
});
