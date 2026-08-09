import { renderHook } from '@testing-library/react';

const mockMutate = jest.fn();

jest.mock('@apollo/client/react', () => ({
  useMutation: () => [mockMutate, {}],
}));

import { useEditPosition } from './use-edit-position';

beforeEach(() => {
  jest.clearAllMocks();
  mockMutate.mockResolvedValue({});
});

describe('useEditPosition', () => {
  it('mutates with the id and mapped input', async () => {
    const { result } = renderHook(() => useEditPosition());

    await result.current.editPosition('p1', { name: 'QA Engineer' });

    expect(mockMutate).toHaveBeenCalledWith(
      expect.objectContaining({
        variables: { position: { positionId: 'p1', name: 'QA Engineer' } },
        awaitRefetchQueries: true,
      }),
    );
  });
});
