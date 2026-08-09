import { profileFormSchema } from './profile-form.schema';

const valid = {
  firstName: 'Anna',
  lastName: 'Smith',
  departmentId: 'd1',
  positionId: 'p1',
};

describe('profileFormSchema', () => {
  it('accepts valid values', () => {
    expect(profileFormSchema.safeParse(valid).success).toBe(true);
  });

  it('rejects a blank last name', () => {
    expect(profileFormSchema.safeParse({ ...valid, lastName: ' ' }).success).toBe(false);
  });

  it('rejects a missing department', () => {
    expect(profileFormSchema.safeParse({ ...valid, departmentId: '' }).success).toBe(false);
  });
});
