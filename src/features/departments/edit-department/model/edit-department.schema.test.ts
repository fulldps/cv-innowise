import { editDepartmentSchema } from './edit-department.schema';

describe('editDepartmentSchema', () => {
  it('accepts a non-empty name', () => {
    expect(editDepartmentSchema.safeParse({ name: 'HR' }).success).toBe(true);
  });

  it('rejects a blank name', () => {
    expect(editDepartmentSchema.safeParse({ name: '  ' }).success).toBe(false);
  });
});
