import { renderHook } from '@testing-library/react';

const mockMutate = jest.fn();

jest.mock('@apollo/client/react', () => ({
  useMutation: () => [mockMutate, {}],
}));

import { useCreateSkill } from './use-create-skill';

beforeEach(() => {
  jest.clearAllMocks();
  mockMutate.mockResolvedValue({});
});

describe('useCreateSkill', () => {
  it('mutates with the mapped input', async () => {
    const { result } = renderHook(() => useCreateSkill());

    await result.current.createSkill({ name: 'React', categoryId: 'c1' });

    expect(mockMutate).toHaveBeenCalledWith(
      expect.objectContaining({
        variables: { skill: { name: 'React', categoryId: 'c1' } },
        awaitRefetchQueries: true,
      }),
    );
  });
});
