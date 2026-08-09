import { renderHook } from '@testing-library/react';

const mockMutate = jest.fn();

jest.mock('@apollo/client/react', () => ({
  useMutation: () => [mockMutate, {}],
}));

import { useEditLanguage } from './use-edit-language';

beforeEach(() => {
  jest.clearAllMocks();
  mockMutate.mockResolvedValue({});
});

describe('useEditLanguage', () => {
  it('mutates with the id and mapped input', async () => {
    const { result } = renderHook(() => useEditLanguage());

    await result.current.editLanguage('l1', { name: 'German', nativeName: 'Deutsch', iso2: 'de' });

    expect(mockMutate).toHaveBeenCalledWith(
      expect.objectContaining({
        variables: {
          language: { languageId: 'l1', name: 'German', iso2: 'de', native_name: 'Deutsch' },
        },
        awaitRefetchQueries: true,
      }),
    );
  });
});
