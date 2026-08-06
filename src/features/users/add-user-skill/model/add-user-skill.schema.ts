import { z } from 'zod';

import { MASTERIES } from '@/entities/skill';

export const addUserSkillSchema = z.object({
  skillId: z.string().min(1, 'Skill is required'),

  mastery: z.enum(MASTERIES),
});

export type AddUserSkillFormValues = z.infer<typeof addUserSkillSchema>;
