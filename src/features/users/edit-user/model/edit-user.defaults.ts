import type { User } from '@/entities/user';

import { UserFormValues } from '@/features/users/model/user-form.types';

export function getEditUserDefaultValues(user: User): UserFormValues {
  return {
    firstName: user.profile.first_name ?? '',

    lastName: user.profile.last_name ?? '',

    email: user.email,

    password: '**********',

    departmentId: user.department?.id ?? '',

    positionId: user.position?.id ?? '',

    role: user.role,
  };
}
