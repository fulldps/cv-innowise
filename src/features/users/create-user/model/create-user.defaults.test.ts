import { getCreateUserDefaultValues } from './create-user.defaults';

describe('getCreateUserDefaultValues', () => {
  it('returns empty fields with an Employee role', () => {
    expect(getCreateUserDefaultValues()).toEqual({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      departmentId: '',
      positionId: '',
      role: 'Employee',
    });
  });
});
