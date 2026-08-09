import { mapCreateDepartmentInput } from './create-department.mapper';

describe('mapCreateDepartmentInput', () => {
  it('maps the name into CreateDepartmentInput', () => {
    expect(mapCreateDepartmentInput({ name: 'HR' })).toEqual({ name: 'HR' });
  });
});
