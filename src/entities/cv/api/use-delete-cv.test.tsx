import { renderHook } from '@testing-library/react';
import { useMutation } from '@apollo/client/react';

import { useDeleteCv } from './use-delete-cv';

jest.mock('@apollo/client/react', () => ({
  useMutation: jest.fn(),
}));

describe('useDeleteCv', () => {
  it('configures delete CV mutation', () => {
    const mockMutation = jest.fn();

    jest.mocked(useMutation).mockReturnValue([mockMutation, { loading: false }] as never);

    const { result } = renderHook(() => useDeleteCv());

    expect(useMutation).toHaveBeenCalledWith(expect.anything(), {
      refetchQueries: ['Cvs'],
      awaitRefetchQueries: true,
    });

    expect(result.current[0]).toBe(mockMutation);
    expect(result.current[1]).toEqual({ loading: false });
  });
});
