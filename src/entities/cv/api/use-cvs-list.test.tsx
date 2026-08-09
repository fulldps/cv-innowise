import { renderHook } from '@testing-library/react';
import { useQuery } from '@apollo/client/react';

import { useCvsList } from './use-cvs-list';

jest.mock('@apollo/client/react', () => ({
  useQuery: jest.fn(),
}));

describe('useCvsList', () => {
  it('returns CVs', () => {
    const cvs = [
      {
        id: 'cv-1',
        name: 'CV 1',
      },
      {
        id: 'cv-2',
        name: 'CV 2',
      },
    ];

    jest.mocked(useQuery).mockReturnValue({
      loading: false,
      error: undefined,
      data: { cvs },
    } as never);

    const { result } = renderHook(() => useCvsList());

    expect(result.current).toEqual({
      cvs,
      loading: false,
      error: undefined,
    });
  });

  it('returns empty array when CVs data is missing', () => {
    jest.mocked(useQuery).mockReturnValue({
      loading: false,
      error: undefined,
      data: undefined,
    } as never);

    const { result } = renderHook(() => useCvsList());

    expect(result.current.cvs).toEqual([]);
  });

  it('returns loading and error states', () => {
    const error = new Error('Failed to load CVs');

    jest.mocked(useQuery).mockReturnValue({
      loading: true,
      error,
      data: undefined,
    } as never);

    const { result } = renderHook(() => useCvsList());

    expect(result.current.loading).toBe(true);
    expect(result.current.error).toBe(error);
  });
});
