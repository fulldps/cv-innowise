import { renderHook, waitFor } from '@testing-library/react';

import { useDeleteCv } from '@/entities/cv/api/use-delete-cv';

import { useDeleteUserCv } from './use-delete-user-cv';

const mockMutate = jest.fn();

jest.mock('@/entities/cv/api/use-delete-cv', () => ({
  useDeleteCv: jest.fn(),
}));

describe('useDeleteUserCv', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    jest.mocked(useDeleteCv).mockReturnValue([
      mockMutate,
      {
        loading: false,
        error: undefined,
      },
    ] as never);
  });

  it('returns loading and error state from useDeleteCv', () => {
    const error = new Error('Deletion failed');

    jest.mocked(useDeleteCv).mockReturnValue([
      mockMutate,
      {
        loading: true,
        error,
      },
    ] as never);

    const { result } = renderHook(() => useDeleteUserCv());

    expect(result.current.loading).toBe(true);
    expect(result.current.error).toBe(error);
  });

  it('deletes a CV with the correct CV id', async () => {
    mockMutate.mockResolvedValue({
      data: {
        deleteCv: {
          affected: 1,
        },
      },
    });

    const { result } = renderHook(() => useDeleteUserCv());

    await result.current.deleteUserCv('cv-123');

    expect(mockMutate).toHaveBeenCalledWith({
      variables: {
        cv: {
          cvId: 'cv-123',
        },
      },
    });
  });

  it('returns the mutation result', async () => {
    const mutationResult = {
      data: {
        deleteCv: {
          affected: 1,
        },
      },
    };

    mockMutate.mockResolvedValue(mutationResult);

    const { result } = renderHook(() => useDeleteUserCv());

    const response = await result.current.deleteUserCv('cv-123');

    expect(response).toBe(mutationResult);
  });

  it('propagates mutation errors', async () => {
    const error = new Error('Deletion failed');

    mockMutate.mockRejectedValue(error);

    const { result } = renderHook(() => useDeleteUserCv());

    await expect(result.current.deleteUserCv('cv-123')).rejects.toThrow('Deletion failed');
  });
});
