import { renderHook } from '@testing-library/react';

const mockMutate = jest.fn();

jest.mock('@apollo/client/react', () => ({
  useMutation: () => [mockMutate, {}],
}));

import { mapUpdateUserLanguageInput } from '../model/edit-user-language.mapper';
import type { EditUserLanguageFormValues } from '../model/edit-user-language.schema';
import type { EditingUserLanguage } from '../model/edit-user-language.types';
import { useEditUserLanguage } from './use-edit-user-language';

beforeEach(() => {
  jest.clearAllMocks();
  mockMutate.mockResolvedValue({});
});

describe('useEditUserLanguage', () => {
  it('mutates with the mapped update input', async () => {
    const { result } = renderHook(() => useEditUserLanguage('u1'));

    const values = { proficiency: 'C1' } as unknown as EditUserLanguageFormValues;
    const editing = { name: 'English', proficiency: 'B2' } as unknown as EditingUserLanguage;

    await result.current.editUserLanguage(values, editing);

    expect(mockMutate).toHaveBeenCalledWith(
      expect.objectContaining({
        variables: { language: mapUpdateUserLanguageInput(values, editing, 'u1') },
        awaitRefetchQueries: true,
      }),
    );
  });
});
