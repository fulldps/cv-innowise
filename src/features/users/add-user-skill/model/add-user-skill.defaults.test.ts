import { getAddUserSkillDefaultValues } from './add-user-skill.defaults';

describe('getAddUserSkillDefaultValues', () => {
  it('defaults to no skill and Novice mastery', () => {
    expect(getAddUserSkillDefaultValues()).toEqual({ skillId: '', mastery: 'Novice' });
  });
});
