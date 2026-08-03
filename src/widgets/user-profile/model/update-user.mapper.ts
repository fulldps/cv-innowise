import type { ProfileFormValues } from './profile-form.schema';

export function mapUpdateUserInput(userId: string, values: ProfileFormValues) {
  return {
    userId,

    departmentId: values.departmentId,

    positionId: values.positionId,
  };
}
