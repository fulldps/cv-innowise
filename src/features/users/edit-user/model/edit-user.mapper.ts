import { UserFormValues } from "@/shared/model/user-form.types";

export function mapUpdateUserInput(userId: string, values: UserFormValues) {
  return {
    userId,

    departmentId: values.departmentId,

    positionId: values.positionId,

    role: values.role,
  };
}
