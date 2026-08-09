import { addUserSkillSchema } from './add-user-skill.schema';

describe('addUserSkillSchema', () => {
  it('accepts a skill with a mastery level', () => {
    expect(addUserSkillSchema.safeParse({ skillId: 's1', mastery: 'Expert' }).success).toBe(true);
  });

  it('rejects a missing skill', () => {
    expect(addUserSkillSchema.safeParse({ skillId: '', mastery: 'Expert' }).success).toBe(false);
  });

  it('rejects an unknown mastery', () => {
    expect(addUserSkillSchema.safeParse({ skillId: 's1', mastery: 'Wizard' }).success).toBe(false);
  });
});
