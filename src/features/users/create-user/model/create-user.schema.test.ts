import { createUserSchema } from './create-user.schema';

const valid = {
  email: 'anna@x.com',
  password: 'password123',
  firstName: 'Anna',
  lastName: 'Smith',
  departmentId: 'd1',
  positionId: 'p1',
  role: 'Employee',
};

describe('createUserSchema', () => {
  it('accepts a valid user', () => {
    expect(createUserSchema.safeParse(valid).success).toBe(true);
  });

  it('rejects an invalid email', () => {
    expect(createUserSchema.safeParse({ ...valid, email: 'nope' }).success).toBe(false);
  });

  it('rejects a short password', () => {
    expect(createUserSchema.safeParse({ ...valid, password: '123' }).success).toBe(false);
  });

  it('rejects a missing department', () => {
    expect(createUserSchema.safeParse({ ...valid, departmentId: '' }).success).toBe(false);
  });

  it('rejects an unknown role', () => {
    expect(createUserSchema.safeParse({ ...valid, role: 'Manager' }).success).toBe(false);
  });
});
