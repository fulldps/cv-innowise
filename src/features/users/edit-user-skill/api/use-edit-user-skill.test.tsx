import { renderHook } from '@testing-library/react';

const mockMutate = jest.fn();

jest.mock('@apollo/client/react', () => ({
  useMutation: () => [mockMutate, {}],
}));

import { mapUpdateUserSkillInput } from '../model/edit-user-skill.mapper';
import type { EditUserSkillFormValues } from '../model/edit-user-skill.schema';
import type { EditingUserSkill } from '../model/edit-user-skill.types';
import { useEditUserSkill } from './use-edit-user-skill';

beforeEach(() => {
  jest.clearAllMocks();
  mockMutate.mockResolvedValue({});
});

describe('useEditUserSkill', () => {
  it('mutates with the mapped update input', async () => {
    const { result } = renderHook(() => useEditUserSkill('u1'));

    const values: EditUserSkillFormValues = { skillId: 's1', mastery: 'Advanced' };
    const editing: EditingUserSkill = { name: 'React', categoryId: 'c1', mastery: 'Expert' };

    await result.current.editUserSkill(values, editing);

    expect(mockMutate).toHaveBeenCalledWith(
      expect.objectContaining({
        variables: { skill: mapUpdateUserSkillInput(values, editing, 'u1') },
        awaitRefetchQueries: true,
      }),
    );
  });
});
