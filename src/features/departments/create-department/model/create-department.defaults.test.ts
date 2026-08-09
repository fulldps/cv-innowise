import { getCreateDepartmentDefaultValues } from './create-department.defaults';

describe('getCreateDepartmentDefaultValues', () => {
  it('returns an empty name', () => {
    expect(getCreateDepartmentDefaultValues()).toEqual({ name: '' });
  });
});
