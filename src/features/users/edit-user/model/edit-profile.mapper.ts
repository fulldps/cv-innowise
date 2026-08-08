import type { UpdateProfileInput } from '@/entities/user';
import { UserFormValues } from '@/features/users/model/user-form.types';

export function mapUpdateProfileInput(userId: string, values: UserFormValues): UpdateProfileInput {
  return {
    userId,

    first_name: values.firstName,

    last_name: values.lastName,
  };
}
