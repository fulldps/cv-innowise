import { USER_ROLE, USER_ROLE_OPTIONS, USER_ROLES } from './user-role';

describe('user-role', () => {
  it('exposes Admin and Employee roles', () => {
    expect(USER_ROLE).toEqual({ Admin: 'Admin', Employee: 'Employee' });
  });

  it('USER_ROLES lists the values', () => {
    expect(USER_ROLES).toEqual(['Admin', 'Employee']);
  });

  it('USER_ROLE_OPTIONS maps each role to an {id,name} option', () => {
    expect(USER_ROLE_OPTIONS).toEqual(USER_ROLES.map((role) => ({ id: role, name: role })));
  });
});
