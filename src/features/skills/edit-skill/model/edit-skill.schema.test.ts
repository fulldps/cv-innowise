import { editSkillSchema } from './edit-skill.schema';

describe('editSkillSchema', () => {
  it('accepts a name with a category', () => {
    expect(editSkillSchema.safeParse({ name: 'React', categoryId: 'c1' }).success).toBe(true);
  });

  it('rejects a missing category', () => {
    expect(editSkillSchema.safeParse({ name: 'React', categoryId: '' }).success).toBe(false);
  });
});
