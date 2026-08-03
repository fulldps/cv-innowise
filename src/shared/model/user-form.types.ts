import type { UserRole } from '@/entities/user';

export interface UserFormValues {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  departmentId: string;
  positionId: string;
  role: UserRole;
}
