import { UserRole } from '@/entities/user';
import { UserFormValues } from '@/shared/model/user-form.types';

export function getCreateUserDefaultValues(): UserFormValues {
  return {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    departmentId: '',
    positionId: '',
    role: UserRole.Employee,
  };
}
