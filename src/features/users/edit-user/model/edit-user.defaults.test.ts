import type { User } from '@/entities/user';

import { getEditUserDefaultValues } from './edit-user.defaults';

const user = {
  email: 'anna@x.com',
  role: 'Admin',
  profile: { first_name: 'Anna', last_name: 'Smith' },
  department: { id: 'd1' },
  position: { id: 'p1' },
} as unknown as User;

describe('getEditUserDefaultValues', () => {
  it('maps the user into the form shape with a masked password', () => {
    expect(getEditUserDefaultValues(user)).toEqual({
      firstName: 'Anna',
      lastName: 'Smith',
      email: 'anna@x.com',
      password: '**********',
      departmentId: 'd1',
      positionId: 'p1',
      role: 'Admin',
    });
  });

  it('falls back to empty ids when department and position are missing', () => {
    const result = getEditUserDefaultValues({
      email: 'x@x.com',
      role: 'Employee',
      profile: {},
    } as unknown as User);

    expect(result.departmentId).toBe('');
    expect(result.positionId).toBe('');
    expect(result.firstName).toBe('');
  });
});
