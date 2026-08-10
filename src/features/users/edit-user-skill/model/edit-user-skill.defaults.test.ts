import type { EditingUserSkill } from './edit-user-skill.types';
import { getEditUserSkillDefaultValues } from './edit-user-skill.defaults';

describe('getEditUserSkillDefaultValues', () => {
  it('uses the skill name as id and keeps the mastery', () => {
    const editing = {
      name: 'React',
      categoryId: 'c1',
      mastery: 'Expert',
    } as unknown as EditingUserSkill;

    expect(getEditUserSkillDefaultValues(editing)).toEqual({ skillId: 'React', mastery: 'Expert' });
  });
});
