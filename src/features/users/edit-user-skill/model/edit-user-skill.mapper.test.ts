import { mapUpdateUserSkillInput } from './edit-user-skill.mapper';
import type { EditUserSkillFormValues } from './edit-user-skill.schema';
import type { EditingUserSkill } from './edit-user-skill.types';

describe('mapUpdateUserSkillInput', () => {
  it('keeps the skill identity and applies the new mastery', () => {
    const values: EditUserSkillFormValues = { skillId: 's1', mastery: 'Advanced' };
    const editing: EditingUserSkill = { name: 'React', categoryId: 'c1', mastery: 'Expert' };

    expect(mapUpdateUserSkillInput(values, editing, 'u1')).toEqual({
      userId: 'u1',
      name: 'React',
      categoryId: 'c1',
      mastery: 'Advanced',
    });
  });
});
