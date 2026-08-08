import { UserFormValues } from '@/features/users/model/user-form.types';

export function getCreateUserDefaultValues(): UserFormValues {
  return {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    departmentId: '',
    positionId: '',
    role: 'Employee',
  };
}
