import { editUserSchema } from './edit-user.schema';

const valid = {
  email: 'anna@x.com',
  password: '**********',
  firstName: 'Anna',
  lastName: 'Smith',
  departmentId: 'd1',
  positionId: 'p1',
  role: 'Employee',
};

describe('editUserSchema', () => {
  it('accepts valid values', () => {
    expect(editUserSchema.safeParse(valid).success).toBe(true);
  });

  it('rejects a blank first name', () => {
    expect(editUserSchema.safeParse({ ...valid, firstName: ' ' }).success).toBe(false);
  });

  it('rejects a missing position', () => {
    expect(editUserSchema.safeParse({ ...valid, positionId: '' }).success).toBe(false);
  });

  it('rejects an unknown role', () => {
    expect(editUserSchema.safeParse({ ...valid, role: 'Owner' }).success).toBe(false);
  });
});
