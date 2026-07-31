import type { UpdateProfileInput } from '@/shared/api/graphql/graphql';
import { UserFormValues } from '@/shared/model/user-form.types';

export function mapUpdateProfileInput(
  userId: string,
  values: UserFormValues,
): UpdateProfileInput {
  return {
    userId,

    first_name: values.firstName,

    last_name: values.lastName,
  };
}
