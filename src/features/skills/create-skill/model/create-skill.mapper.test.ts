import { mapCreateSkillInput } from './create-skill.mapper';

describe('mapCreateSkillInput', () => {
  it('maps name and category id into CreateSkillInput', () => {
    expect(mapCreateSkillInput({ name: 'React', categoryId: 'c1' })).toEqual({
      name: 'React',
      categoryId: 'c1',
    });
  });
});
