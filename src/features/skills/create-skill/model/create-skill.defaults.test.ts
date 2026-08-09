import { getCreateSkillDefaultValues } from './create-skill.defaults';

describe('getCreateSkillDefaultValues', () => {
  it('returns empty skill fields', () => {
    expect(getCreateSkillDefaultValues()).toEqual({ name: '', categoryId: '' });
  });
});
