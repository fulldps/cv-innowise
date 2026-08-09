import { renderHook } from '@testing-library/react';
import { useQuery } from '@apollo/client/react';

import { useCv } from './use-cv';

jest.mock('@apollo/client/react', () => ({
  useQuery: jest.fn(),
}));

describe('useCv', () => {
  it('returns CV data', () => {
    const cv = {
      id: 'cv-1',
      name: 'My CV',
    };

    jest.mocked(useQuery).mockReturnValue({
      loading: false,
      error: undefined,
      data: { cv },
    } as never);

    const { result } = renderHook(() => useCv('cv-1'));

    expect(useQuery).toHaveBeenCalledWith(expect.anything(), {
      variables: {
        cvId: 'cv-1',
      },
    });

    expect(result.current).toEqual({
      cv,
      loading: false,
      error: undefined,
    });
  });

  it('returns null when CV is not found', () => {
    jest.mocked(useQuery).mockReturnValue({
      loading: false,
      error: undefined,
      data: undefined,
    } as never);

    const { result } = renderHook(() => useCv('cv-1'));

    expect(result.current.cv).toBeNull();
  });

  it('returns loading and error states', () => {
    const error = new Error('Failed to load CV');

    jest.mocked(useQuery).mockReturnValue({
      loading: true,
      error,
      data: undefined,
    } as never);

    const { result } = renderHook(() => useCv('cv-1'));

    expect(result.current.loading).toBe(true);
    expect(result.current.error).toBe(error);
  });
});
