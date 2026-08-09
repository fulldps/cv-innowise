import type { ProfileFormValues } from './profile-form.schema';
import { mapUpdateUserInput } from './update-user.mapper';

const values: ProfileFormValues = {
  firstName: 'Anna',
  lastName: 'Smith',
  departmentId: 'd1',
  positionId: 'p1',
};

describe('mapUpdateUserInput', () => {
  it('maps id, department and position', () => {
    expect(mapUpdateUserInput('u1', values)).toEqual({
      userId: 'u1',
      departmentId: 'd1',
      positionId: 'p1',
    });
  });
});
