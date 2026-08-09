import { renderHook } from '@testing-library/react';

const mockMutate = jest.fn();

jest.mock('@apollo/client/react', () => ({
  useMutation: () => [mockMutate, {}],
}));

import { useCreatePosition } from './use-create-position';

beforeEach(() => {
  jest.clearAllMocks();
  mockMutate.mockResolvedValue({});
});

describe('useCreatePosition', () => {
  it('mutates with the mapped input', async () => {
    const { result } = renderHook(() => useCreatePosition());

    await result.current.createPosition({ name: 'Frontend Developer' });

    expect(mockMutate).toHaveBeenCalledWith(
      expect.objectContaining({
        variables: { position: { name: 'Frontend Developer' } },
        awaitRefetchQueries: true,
      }),
    );
  });
});
