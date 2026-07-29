import type { CreateUserInput } from '@/shared/api/graphql/graphql';
import { UserFormValues } from '@/shared/model/user-form.types';

export function mapCreateUserInput(values: UserFormValues): CreateUserInput {
  return {
    auth: {
      email: values.email,
      password: values.password,
    },

    profile: {
      first_name: values.firstName,
      last_name: values.lastName,
    },

    cvsIds: [],

    departmentId: values.departmentId,

    positionId: values.positionId,

    role: values.role,
  };
}
