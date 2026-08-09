import type { UserFormValues } from '@/features/users/model/user-form.types';

import { mapUpdateProfileInput } from './edit-profile.mapper';

const values: UserFormValues = {
  firstName: 'Anna',
  lastName: 'Smith',
  email: 'anna@x.com',
  password: 'secret123',
  departmentId: 'd1',
  positionId: 'p1',
  role: 'Admin',
};

describe('mapUpdateProfileInput', () => {
  it('maps id and the name fields', () => {
    expect(mapUpdateProfileInput('u1', values)).toEqual({
      userId: 'u1',
      first_name: 'Anna',
      last_name: 'Smith',
    });
  });
});
