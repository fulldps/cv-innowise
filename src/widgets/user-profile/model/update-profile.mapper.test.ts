import type { ProfileFormValues } from './profile-form.schema';
import { mapUpdateProfileInput } from './update-profile.mapper';

const values: ProfileFormValues = {
  firstName: 'Anna',
  lastName: 'Smith',
  departmentId: 'd1',
  positionId: 'p1',
};

describe('mapUpdateProfileInput', () => {
  it('maps id and name fields', () => {
    expect(mapUpdateProfileInput('u1', values)).toEqual({
      userId: 'u1',
      first_name: 'Anna',
      last_name: 'Smith',
    });
  });
});
