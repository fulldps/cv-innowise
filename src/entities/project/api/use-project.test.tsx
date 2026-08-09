import { renderHook } from '@testing-library/react';
import { useQuery } from '@apollo/client/react';

import { useProject } from './use-project';

jest.mock('@apollo/client/react', () => ({
  useQuery: jest.fn(),
}));

describe('useProject', () => {
  it('returns project data', () => {
    const project = {
      id: 'project-1',
      name: 'HRM System',
      internal_name: 'hrm',
      domain: 'hrm.com',
      start_date: '2026-01-01',
      end_date: null,
      description: 'HR management system',
      environment: ['React', 'TypeScript'],
    };

    jest.mocked(useQuery).mockReturnValue({
      loading: false,
      error: undefined,
      data: { project },
    } as never);

    const { result } = renderHook(() => useProject('project-1'));

    expect(useQuery).toHaveBeenCalledWith(expect.anything(), {
      variables: {
        projectId: 'project-1',
      },
    });

    expect(result.current).toEqual({
      project,
      loading: false,
      error: undefined,
    });
  });

  it('returns null when project data is missing', () => {
    jest.mocked(useQuery).mockReturnValue({
      loading: false,
      error: undefined,
      data: undefined,
    } as never);

    const { result } = renderHook(() => useProject('project-1'));

    expect(result.current.project).toBeNull();
  });

  it('returns loading and error states', () => {
    const error = new Error('Failed to load project');

    jest.mocked(useQuery).mockReturnValue({
      loading: true,
      error,
      data: undefined,
    } as never);

    const { result } = renderHook(() => useProject('project-1'));

    expect(result.current.loading).toBe(true);
    expect(result.current.error).toBe(error);
  });
});
