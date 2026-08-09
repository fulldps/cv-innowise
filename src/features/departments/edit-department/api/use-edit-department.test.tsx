import { renderHook } from '@testing-library/react';

const mockMutate = jest.fn();

jest.mock('@apollo/client/react', () => ({
  useMutation: () => [mockMutate, {}],
}));

import { useEditDepartment } from './use-edit-department';

beforeEach(() => {
  jest.clearAllMocks();
  mockMutate.mockResolvedValue({});
});

describe('useEditDepartment', () => {
  it('mutates with the id and mapped input', async () => {
    const { result } = renderHook(() => useEditDepartment());

    await result.current.editDepartment('d1', { name: 'Finance' });

    expect(mockMutate).toHaveBeenCalledWith(
      expect.objectContaining({
        variables: { department: { departmentId: 'd1', name: 'Finance' } },
        awaitRefetchQueries: true,
      }),
    );
  });
});
