import { renderHook } from '@testing-library/react';

import { useMutation } from '@apollo/client/react';

import { useUpdateCvProject } from './use-update-cv-project';

jest.mock('@apollo/client/react', () => ({
  useMutation: jest.fn(),
}));

const mockUseMutation = useMutation as jest.Mock;

describe('useUpdateCvProject', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    mockUseMutation.mockReturnValue([jest.fn(), { loading: false }]);
  });

  it('configures mutation with refetching CV data', () => {
    renderHook(() => useUpdateCvProject());

    expect(mockUseMutation).toHaveBeenCalledWith(expect.anything(), {
      refetchQueries: ['Cv'],
      awaitRefetchQueries: true,
    });
  });

  it('returns mutation result', () => {
    const mutationResult = [jest.fn(), { loading: true }];

    mockUseMutation.mockReturnValue(mutationResult);

    const { result } = renderHook(() => useUpdateCvProject());

    expect(result.current).toBe(mutationResult);
  });
});
