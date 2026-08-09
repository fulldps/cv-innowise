import type { Department } from '@/entities/department';

import { getEditDepartmentDefaultValues } from './edit-department.defaults';

describe('getEditDepartmentDefaultValues', () => {
  it('takes the department name', () => {
    expect(getEditDepartmentDefaultValues({ name: 'HR' } as unknown as Department)).toEqual({
      name: 'HR',
    });
  });

  it('falls back to an empty string when name is missing', () => {
    expect(getEditDepartmentDefaultValues({} as unknown as Department)).toEqual({ name: '' });
  });
});
