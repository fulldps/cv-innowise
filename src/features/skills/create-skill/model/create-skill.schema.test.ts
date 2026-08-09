import { createSkillSchema } from './create-skill.schema';

describe('createSkillSchema', () => {
  it('accepts a name with a category', () => {
    expect(createSkillSchema.safeParse({ name: 'React', categoryId: 'c1' }).success).toBe(true);
  });

  it('rejects a missing category', () => {
    expect(createSkillSchema.safeParse({ name: 'React', categoryId: '' }).success).toBe(false);
  });
});
