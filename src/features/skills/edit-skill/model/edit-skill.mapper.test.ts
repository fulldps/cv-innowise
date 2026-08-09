import { mapUpdateSkillInput } from './edit-skill.mapper';

describe('mapUpdateSkillInput', () => {
  it('maps id, name and category id into UpdateSkillInput', () => {
    expect(mapUpdateSkillInput('s1', { name: 'Vue', categoryId: 'c2' })).toEqual({
      skillId: 's1',
      name: 'Vue',
      categoryId: 'c2',
    });
  });
});
