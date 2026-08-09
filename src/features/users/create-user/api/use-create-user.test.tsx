import { renderHook } from '@testing-library/react';

const mockMutate = jest.fn();

jest.mock('@apollo/client/react', () => ({
  useMutation: () => [mockMutate, {}],
}));

import { mapCreateUserInput } from '../model/create-user.mapper';
import { useCreateUser } from './use-create-user';

const values = {
  firstName: 'Anna',
  lastName: 'Smith',
  email: 'anna@x.com',
  password: 'password123',
  departmentId: 'd1',
  positionId: 'p1',
  role: 'Employee' as const,
};

beforeEach(() => {
  jest.clearAllMocks();
  mockMutate.mockResolvedValue({});
});

describe('useCreateUser', () => {
  it('mutates with the mapped user input', async () => {
    const { result } = renderHook(() => useCreateUser());

    await result.current.createUser(values);

    expect(mockMutate).toHaveBeenCalledWith(
      expect.objectContaining({
        variables: { user: mapCreateUserInput(values) },
        awaitRefetchQueries: true,
      }),
    );
  });
});
