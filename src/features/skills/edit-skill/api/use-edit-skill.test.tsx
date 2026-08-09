import { renderHook } from '@testing-library/react';

const mockMutate = jest.fn();

jest.mock('@apollo/client/react', () => ({
  useMutation: () => [mockMutate, {}],
}));

import { useEditSkill } from './use-edit-skill';

beforeEach(() => {
  jest.clearAllMocks();
  mockMutate.mockResolvedValue({});
});

describe('useEditSkill', () => {
  it('mutates with the id and mapped input', async () => {
    const { result } = renderHook(() => useEditSkill());

    await result.current.editSkill('s1', { name: 'Vue', categoryId: 'c2' });

    expect(mockMutate).toHaveBeenCalledWith(
      expect.objectContaining({
        variables: { skill: { skillId: 's1', name: 'Vue', categoryId: 'c2' } },
        awaitRefetchQueries: true,
      }),
    );
  });
});
