import type { UserFormValues } from '@/features/users/model/user-form.types';

import { mapCreateUserInput } from './create-user.mapper';

describe('mapCreateUserInput', () => {
  it('maps form values into CreateUserInput', () => {
    const values: UserFormValues = {
      email: 'john@x.com',
      password: 'secret12',
      firstName: 'John',
      lastName: 'Doe',
      departmentId: 'd1',
      positionId: 'p1',
      role: 'Admin',
    };

    expect(mapCreateUserInput(values)).toEqual({
      auth: { email: 'john@x.com', password: 'secret12' },
      profile: { first_name: 'John', last_name: 'Doe' },
      cvsIds: [],
      departmentId: 'd1',
      positionId: 'p1',
      role: 'Admin',
    });
  });
});
