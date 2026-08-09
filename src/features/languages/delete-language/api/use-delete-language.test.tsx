import { renderHook } from '@testing-library/react';

const mockMutate = jest.fn();

jest.mock('@apollo/client/react', () => ({
  useMutation: () => [mockMutate, {}],
}));

import { useDeleteLanguage } from './use-delete-language';

beforeEach(() => {
  jest.clearAllMocks();
  mockMutate.mockResolvedValue({});
});

describe('useDeleteLanguage', () => {
  it('mutates with the language id', async () => {
    const { result } = renderHook(() => useDeleteLanguage());

    await result.current.deleteLanguage('l1');

    expect(mockMutate).toHaveBeenCalledWith(
      expect.objectContaining({
        variables: { language: { languageId: 'l1' } },
        awaitRefetchQueries: true,
      }),
    );
  });
});
