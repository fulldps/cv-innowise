import { renderHook } from '@testing-library/react';

const mockMutate = jest.fn();

jest.mock('@apollo/client/react', () => ({
  useMutation: () => [mockMutate, {}],
}));

import { useCreateLanguage } from './use-create-language';

beforeEach(() => {
  jest.clearAllMocks();
  mockMutate.mockResolvedValue({});
});

describe('useCreateLanguage', () => {
  it('mutates with the mapped input', async () => {
    const { result } = renderHook(() => useCreateLanguage());

    await result.current.createLanguage({ name: 'German', nativeName: 'Deutsch', iso2: 'de' });

    expect(mockMutate).toHaveBeenCalledWith(
      expect.objectContaining({
        variables: { language: { name: 'German', native_name: 'Deutsch', iso2: 'de' } },
        awaitRefetchQueries: true,
      }),
    );
  });
});
