import type { UpdateProfileInput } from '@/entities/user';

import type { ProfileFormValues } from './profile-form.schema';

export function mapUpdateProfileInput(
  userId: string,
  values: ProfileFormValues,
): UpdateProfileInput {
  return {
    userId,

    first_name: values.firstName,

    last_name: values.lastName,
  };
}
