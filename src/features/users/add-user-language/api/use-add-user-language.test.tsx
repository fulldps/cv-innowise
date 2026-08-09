import { renderHook } from '@testing-library/react';

const mockMutate = jest.fn();

jest.mock('@apollo/client/react', () => ({
  useMutation: () => [mockMutate, {}],
}));

import type { Language } from '@/entities/language';

import { mapAddUserLanguageInput } from '../model/add-user-language.mapper';
import { useAddUserLanguage } from './use-add-user-language';

const languages = [{ id: 'l1', name: 'English' }] as unknown as Language[];

beforeEach(() => {
  jest.clearAllMocks();
  mockMutate.mockResolvedValue({});
});

describe('useAddUserLanguage', () => {
  it('resolves the language and mutates with the mapped input', async () => {
    const { result } = renderHook(() => useAddUserLanguage('u1', languages));

    const values = { languageId: 'l1', proficiency: 'C1' as const };
    await result.current.addUserLanguage(values);

    expect(mockMutate).toHaveBeenCalledWith(
      expect.objectContaining({
        variables: { language: mapAddUserLanguageInput(values, languages[0], 'u1') },
        awaitRefetchQueries: true,
      }),
    );
  });

  it('throws when the language is not in the catalog', async () => {
    const { result } = renderHook(() => useAddUserLanguage('u1', languages));

    await expect(
      result.current.addUserLanguage({ languageId: 'missing', proficiency: 'C1' }),
    ).rejects.toThrow('Language not found');
    expect(mockMutate).not.toHaveBeenCalled();
  });
});
