import { renderHook } from '@testing-library/react';

const mockMutate = jest.fn();

jest.mock('@apollo/client/react', () => ({
  useMutation: () => [mockMutate, {}],
}));

import { mapDeleteUserSkillInput } from '../model/delete-user-skill.mapper';
import { useDeleteUserSkill } from './use-delete-user-skill';

beforeEach(() => {
  jest.clearAllMocks();
  mockMutate.mockResolvedValue({});
});

describe('useDeleteUserSkill', () => {
  it('mutates with the mapped delete input', async () => {
    const { result } = renderHook(() => useDeleteUserSkill('u1'));

    await result.current.deleteUserSkills(['React', 'Vue']);

    expect(mockMutate).toHaveBeenCalledWith(
      expect.objectContaining({
        variables: { skill: mapDeleteUserSkillInput('u1', ['React', 'Vue']) },
        awaitRefetchQueries: true,
      }),
    );
  });
});
