import { renderHook } from '@testing-library/react';

const mockMutate = jest.fn();

jest.mock('@apollo/client/react', () => ({
  useMutation: () => [mockMutate, {}],
}));

import { useCreateDepartment } from './use-create-department';

beforeEach(() => {
  jest.clearAllMocks();
  mockMutate.mockResolvedValue({});
});

describe('useCreateDepartment', () => {
  it('mutates with the mapped input and awaits refetch', async () => {
    const { result } = renderHook(() => useCreateDepartment());

    await result.current.createDepartment({ name: 'HR' });

    expect(mockMutate).toHaveBeenCalledWith(
      expect.objectContaining({
        variables: { department: { name: 'HR' } },
        awaitRefetchQueries: true,
      }),
    );
  });
});
