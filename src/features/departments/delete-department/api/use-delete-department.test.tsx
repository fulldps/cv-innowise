import { renderHook } from '@testing-library/react';

const mockMutate = jest.fn();

jest.mock('@apollo/client/react', () => ({
  useMutation: () => [mockMutate, {}],
}));

import { useDeleteDepartment } from './use-delete-department';

beforeEach(() => {
  jest.clearAllMocks();
  mockMutate.mockResolvedValue({});
});

describe('useDeleteDepartment', () => {
  it('mutates with the department id', async () => {
    const { result } = renderHook(() => useDeleteDepartment());

    await result.current.deleteDepartment('d1');

    expect(mockMutate).toHaveBeenCalledWith(
      expect.objectContaining({
        variables: { department: { departmentId: 'd1' } },
        awaitRefetchQueries: true,
      }),
    );
  });
});
