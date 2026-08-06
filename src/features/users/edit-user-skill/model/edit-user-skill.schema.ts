import { z } from 'zod';

import { MASTERIES } from '@/entities/skill';

export const editUserSkillSchema = z.object({
  skillId: z.string(),

  mastery: z.enum(MASTERIES),
});

export type EditUserSkillFormValues = z.infer<typeof editUserSkillSchema>;
