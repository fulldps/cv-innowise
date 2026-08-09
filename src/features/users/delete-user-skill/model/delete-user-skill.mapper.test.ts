import { mapDeleteUserSkillInput } from './delete-user-skill.mapper';

describe('mapDeleteUserSkillInput', () => {
  it('maps userId and skill names into DeleteProfileSkillInput', () => {
    expect(mapDeleteUserSkillInput('u1', ['React', 'Vue'])).toEqual({
      userId: 'u1',
      name: ['React', 'Vue'],
    });
  });

  it('handles an empty selection', () => {
    expect(mapDeleteUserSkillInput('u1', [])).toEqual({ userId: 'u1', name: [] });
  });
});
