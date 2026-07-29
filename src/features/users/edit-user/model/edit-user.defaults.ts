import type { UserQuery } from '@/shared/api/graphql/graphql';

import { UserRole } from '@/entities/user';
import { UserFormValues } from '@/shared/model/user-form.types';

type UpdateUserData = NonNullable<UserQuery['user']>;

export function getEditUserDefaultValues(user: UpdateUserData): UserFormValues {
  return {
    firstName: user.profile.first_name ?? '',

    lastName: user.profile.last_name ?? '',

    email: user.email,

    password: '',

    departmentId: user.department?.id ?? '',

    positionId: user.position?.id ?? '',

    role: user.role as UserRole,
  };
}
