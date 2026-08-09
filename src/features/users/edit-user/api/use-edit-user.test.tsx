import { renderHook } from '@testing-library/react';

const mockUpdateUser = jest.fn();
const mockUpdateProfile = jest.fn();
const mockRefetch = jest.fn();
const mockUseMutation = jest.fn();

jest.mock('@apollo/client/react', () => ({
  useMutation: () => mockUseMutation(),
  useApolloClient: () => ({ refetchQueries: mockRefetch }),
}));

import type { UserFormValues } from '@/features/users/model/user-form.types';

import { mapUpdateProfileInput } from '../model/edit-profile.mapper';
import { mapUpdateUserInput } from '../model/edit-user.mapper';
import { useEditUser } from './use-edit-user';

const values: UserFormValues = {
  firstName: 'Anna',
  lastName: 'Smith',
  email: 'anna@x.com',
  password: 'secret123',
  departmentId: 'd1',
  positionId: 'p1',
  role: 'Employee',
};

beforeEach(() => {
  jest.clearAllMocks();
  mockUpdateUser.mockResolvedValue({});
  mockUpdateProfile.mockResolvedValue({});
  mockRefetch.mockResolvedValue({});
  mockUseMutation
    .mockReturnValueOnce([mockUpdateUser, {}])
    .mockReturnValueOnce([mockUpdateProfile, {}]);
});

describe('useEditUser', () => {
  it('updates user and profile in parallel and refetches the users list', async () => {
    const { result } = renderHook(() => useEditUser());

    await result.current.editUser('u1', values);

    expect(mockUpdateUser).toHaveBeenCalledWith({
      variables: { user: mapUpdateUserInput('u1', values) },
    });
    expect(mockUpdateProfile).toHaveBeenCalledWith({
      variables: { profile: mapUpdateProfileInput('u1', values) },
    });
    expect(mockRefetch).toHaveBeenCalled();
  });
});
