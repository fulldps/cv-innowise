import { renderHook } from '@testing-library/react';

const mockMutate = jest.fn();

jest.mock('@apollo/client/react', () => ({
  useMutation: () => [mockMutate, {}],
}));

import { mapDeleteUserLanguageInput } from '../model/delete-user-language.mapper';
import { useDeleteUserLanguage } from './use-delete-user-language';

beforeEach(() => {
  jest.clearAllMocks();
  mockMutate.mockResolvedValue({});
});

describe('useDeleteUserLanguage', () => {
  it('mutates with the mapped delete input', async () => {
    const { result } = renderHook(() => useDeleteUserLanguage('u1'));

    await result.current.deleteUserLanguages(['English', 'German']);

    expect(mockMutate).toHaveBeenCalledWith(
      expect.objectContaining({
        variables: { language: mapDeleteUserLanguageInput('u1', ['English', 'German']) },
        awaitRefetchQueries: true,
      }),
    );
  });
});
