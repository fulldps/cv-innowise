import { UserRole } from '@/entities/user';
import { z } from 'zod';

export const createUserSchema = z.object({
  email: z.string().trim().min(1, 'Email is required').email({ message: 'Invalid email' }),

  password: z.string().min(8, 'Password must contain at least 8 characters'),

  firstName: z.string().trim().min(1, 'First name is required'),

  lastName: z.string().trim().min(1, 'Last name is required'),

  departmentId: z.string().min(1, 'Department is required'),

  positionId: z.string().min(1, 'Position is required'),

  role: z.enum(UserRole),
});
