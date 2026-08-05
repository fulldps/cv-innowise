import { z } from 'zod';

import { MASTERIES } from '@/entities/skill';

export const editSkillSchema = z.object({
  skillId: z.string(),

  mastery: z.enum(MASTERIES),
});

export type EditSkillFormValues = z.infer<typeof editSkillSchema>;
