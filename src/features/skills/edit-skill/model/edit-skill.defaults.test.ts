import type { Skill } from '@/entities/skill';

import { getEditSkillDefaultValues } from './edit-skill.defaults';

describe('getEditSkillDefaultValues', () => {
  it('maps name and category id', () => {
    expect(
      getEditSkillDefaultValues({ name: 'React', category: { id: 'c1' } } as unknown as Skill),
    ).toEqual({ name: 'React', categoryId: 'c1' });
  });

  it('falls back to empty strings when fields are missing', () => {
    expect(getEditSkillDefaultValues({} as unknown as Skill)).toEqual({ name: '', categoryId: '' });
  });
});
