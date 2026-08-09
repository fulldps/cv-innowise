import { renderHook } from '@testing-library/react';

const mockMutate = jest.fn();

jest.mock('@apollo/client/react', () => ({
  useMutation: () => [mockMutate, {}],
}));

import { useDeleteSkill } from './use-delete-skill';

beforeEach(() => {
  jest.clearAllMocks();
  mockMutate.mockResolvedValue({});
});

describe('useDeleteSkill', () => {
  it('mutates with the skill id', async () => {
    const { result } = renderHook(() => useDeleteSkill());

    await result.current.deleteSkill('s1');

    expect(mockMutate).toHaveBeenCalledWith(
      expect.objectContaining({
        variables: { skill: { skillId: 's1' } },
        awaitRefetchQueries: true,
      }),
    );
  });
});
