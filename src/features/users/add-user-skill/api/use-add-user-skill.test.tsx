import { renderHook } from '@testing-library/react';

const mockMutate = jest.fn();

jest.mock('@apollo/client/react', () => ({
  useMutation: () => [mockMutate, {}],
}));

import type { Skill } from '@/entities/skill';

import { mapAddUserSkillInput } from '../model/add-user-skill.mapper';
import { useAddUserSkill } from './use-add-user-skill';

const skills = [
  { id: 's1', name: 'React', category: { id: 'c1', name: 'Frontend' } },
] as unknown as Skill[];

beforeEach(() => {
  jest.clearAllMocks();
  mockMutate.mockResolvedValue({});
});

describe('useAddUserSkill', () => {
  it('resolves the skill and mutates with the mapped input', async () => {
    const { result } = renderHook(() => useAddUserSkill('u1', skills));

    const values = { skillId: 's1', mastery: 'Expert' as const };
    await result.current.addUserSkill(values);

    expect(mockMutate).toHaveBeenCalledWith(
      expect.objectContaining({
        variables: { skill: mapAddUserSkillInput(values, skills[0], 'u1') },
        awaitRefetchQueries: true,
      }),
    );
  });

  it('throws when the skill is not in the catalog', async () => {
    const { result } = renderHook(() => useAddUserSkill('u1', skills));

    await expect(
      result.current.addUserSkill({ skillId: 'missing', mastery: 'Expert' }),
    ).rejects.toThrow('Skill not found');
    expect(mockMutate).not.toHaveBeenCalled();
  });
});
