import { renderHook } from '@testing-library/react';
import { useQuery } from '@apollo/client/react';

import { useProjectsList } from './use-projects-list';

jest.mock('@apollo/client/react', () => ({
  useQuery: jest.fn(),
}));

describe('useProjectsList', () => {
  it('returns projects', () => {
    const projects = [
      {
        id: 'project-1',
        name: 'HRM System',
        internal_name: 'hrm',
        domain: 'hrm.com',
        start_date: '2026-01-01',
        end_date: null,
        description: 'HR management system',
        environment: ['React', 'TypeScript'],
      },
      {
        id: 'project-2',
        name: 'E-commerce',
        internal_name: 'ecommerce',
        domain: 'shop.com',
        start_date: '2026-02-01',
        end_date: '2026-06-01',
        description: 'E-commerce application',
        environment: ['Next.js', 'TypeScript'],
      },
    ];

    jest.mocked(useQuery).mockReturnValue({
      loading: false,
      error: undefined,
      data: { projects },
    } as never);

    const { result } = renderHook(() => useProjectsList());

    expect(useQuery).toHaveBeenCalledWith(expect.anything());

    expect(result.current).toEqual({
      projects,
      loading: false,
      error: undefined,
    });
  });

  it('returns empty array when projects data is missing', () => {
    jest.mocked(useQuery).mockReturnValue({
      loading: false,
      error: undefined,
      data: undefined,
    } as never);

    const { result } = renderHook(() => useProjectsList());

    expect(result.current.projects).toEqual([]);
  });

  it('returns loading and error states', () => {
    const error = new Error('Failed to load projects');

    jest.mocked(useQuery).mockReturnValue({
      loading: true,
      error,
      data: undefined,
    } as never);

    const { result } = renderHook(() => useProjectsList());

    expect(result.current.loading).toBe(true);
    expect(result.current.error).toBe(error);
  });
});
