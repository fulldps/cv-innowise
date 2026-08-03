import type { User } from '@/entities/user';

import type { ProfileFormValues } from './profile-form.schema';

export function getProfileDefaultValues(user: User): ProfileFormValues {
  return {
    firstName: user.profile.first_name ?? '',

    lastName: user.profile.last_name ?? '',

    departmentId: user.department?.id ?? '',

    positionId: user.position?.id ?? '',
  };
}
