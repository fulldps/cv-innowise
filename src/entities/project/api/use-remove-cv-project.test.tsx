import { renderHook } from '@testing-library/react';
import { useMutation } from '@apollo/client/react';

import { useRemoveCvProject } from './use-remove-cv-project';

jest.mock('@apollo/client/react', () => ({
  useMutation: jest.fn(),
}));

describe('useRemoveCvProject', () => {
  it('configures remove CV project mutation', () => {
    const mockMutation = jest.fn();

    jest.mocked(useMutation).mockReturnValue([mockMutation, { loading: false }] as never);

    const { result } = renderHook(() => useRemoveCvProject());

    expect(useMutation).toHaveBeenCalledWith(expect.anything(), {
      refetchQueries: ['Cv'],
      awaitRefetchQueries: true,
    });

    expect(result.current[0]).toBe(mockMutation);
    expect(result.current[1]).toEqual({ loading: false });
  });
});
