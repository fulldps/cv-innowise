import type { User } from '@/entities/user';

import { getProfileDefaultValues } from './profile-form.defaults';

describe('getProfileDefaultValues', () => {
  it('maps the user profile into the form shape', () => {
    const user = {
      profile: { first_name: 'Anna', last_name: 'Smith' },
      department: { id: 'd1' },
      position: { id: 'p1' },
    } as unknown as User;

    expect(getProfileDefaultValues(user)).toEqual({
      firstName: 'Anna',
      lastName: 'Smith',
      departmentId: 'd1',
      positionId: 'p1',
    });
  });

  it('falls back to empty strings when fields are missing', () => {
    expect(getProfileDefaultValues({ profile: {} } as unknown as User)).toEqual({
      firstName: '',
      lastName: '',
      departmentId: '',
      positionId: '',
    });
  });
});
