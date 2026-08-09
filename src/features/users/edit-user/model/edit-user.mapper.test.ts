import type { UserFormValues } from '@/features/users/model/user-form.types';

import { mapUpdateUserInput } from './edit-user.mapper';

const values: UserFormValues = {
  firstName: 'Anna',
  lastName: 'Smith',
  email: 'anna@x.com',
  password: 'secret123',
  departmentId: 'd1',
  positionId: 'p1',
  role: 'Admin',
};

describe('mapUpdateUserInput', () => {
  it('maps id, department, position and role', () => {
    expect(mapUpdateUserInput('u1', values)).toEqual({
      userId: 'u1',
      departmentId: 'd1',
      positionId: 'p1',
      role: 'Admin',
    });
  });
});
