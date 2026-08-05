import { z } from 'zod';

import { MASTERIES } from '@/entities/skill';

export const addSkillSchema = z.object({
  skillId: z.string().min(1, 'Skill is required'),

  mastery: z.enum(MASTERIES),
});

export type AddSkillFormValues = z.infer<typeof addSkillSchema>;
