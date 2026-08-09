import { mapUpdateDepartmentInput } from './edit-department.mapper';

describe('mapUpdateDepartmentInput', () => {
  it('maps the id and name into UpdateDepartmentInput', () => {
    expect(mapUpdateDepartmentInput('d1', { name: 'Finance' })).toEqual({
      departmentId: 'd1',
      name: 'Finance',
    });
  });
});
