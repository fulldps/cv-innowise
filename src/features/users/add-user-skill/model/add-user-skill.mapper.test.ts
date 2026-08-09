import type { Skill } from '@/entities/skill';

import { mapAddUserSkillInput } from './add-user-skill.mapper';
import type { AddUserSkillFormValues } from './add-user-skill.schema';

const values: AddUserSkillFormValues = { skillId: 's1', mastery: 'Expert' };

describe('mapAddUserSkillInput', () => {
  it('maps the selected skill and mastery into AddProfileSkillInput', () => {
    const skill = {
      id: 's1',
      name: 'React',
      category: { id: 'c1', name: 'Frontend', order: 1 },
    } as unknown as Skill;

    expect(mapAddUserSkillInput(values, skill, 'u1')).toEqual({
      userId: 'u1',
      name: 'React',
      categoryId: 'c1',
      mastery: 'Expert',
    });
  });

  it('uses null categoryId when the skill has no category', () => {
    const skill = { id: 's1', name: 'React', category: null } as unknown as Skill;

    expect(mapAddUserSkillInput(values, skill, 'u1').categoryId).toBeNull();
  });
});
