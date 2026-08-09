import { editUserSkillSchema } from './edit-user-skill.schema';

describe('editUserSkillSchema', () => {
  it('accepts a mastery level', () => {
    expect(editUserSkillSchema.safeParse({ skillId: 'React', mastery: 'Advanced' }).success).toBe(
      true,
    );
  });

  it('rejects an unknown mastery', () => {
    expect(editUserSkillSchema.safeParse({ skillId: 'React', mastery: 'Wizard' }).success).toBe(
      false,
    );
  });
});
