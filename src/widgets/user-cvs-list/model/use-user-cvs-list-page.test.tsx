import { act, renderHook } from '@testing-library/react';

const mockUseCvsList = jest.fn();
const mockUseCurrentUser = jest.fn();

jest.mock('@/entities/cv/api/use-cvs-list', () => ({
  useCvsList: () => mockUseCvsList(),
}));
jest.mock('@/entities/user/api/use-current-user', () => ({
  useCurrentUser: () => mockUseCurrentUser(),
}));
jest.mock('@/shared/lib/hooks/use-debounce', () => ({
  useDebounce: (value: string) => value,
}));

import { useUserCvsListPage } from './use-user-cvs-list-page';

const cvs = [
  { id: '1', name: 'Beta CV', description: 'react developer', user: { id: 'u1' } },
  { id: '2', name: 'Alpha CV', description: 'node', user: { id: 'u1' } },
  { id: '3', name: 'Other CV', description: '', user: { id: 'u2' } },
];

beforeEach(() => {
  jest.clearAllMocks();
  mockUseCvsList.mockReturnValue({ cvs, loading: false, error: null });
  mockUseCurrentUser.mockReturnValue({ id: 'u1', role: 'Employee' });
});

describe('useUserCvsListPage', () => {
  it('shows only the given user cvs, sorted by name', () => {
    const { result } = renderHook(() => useUserCvsListPage('u1'));
    expect(result.current.rows.map((row) => row.cv.name)).toEqual(['Alpha CV', 'Beta CV']);
  });

  it('filters by name or description', () => {
    const { result } = renderHook(() => useUserCvsListPage('u1'));
    act(() => result.current.setSearchValue('react'));
    expect(result.current.rows.map((row) => row.cv.name)).toEqual(['Beta CV']);
  });

  it('grants rights to the owner', () => {
    const { result } = renderHook(() => useUserCvsListPage('u1'));
    expect(result.current.showCreateButton).toBe(true);
    expect(result.current.rows[0].canEdit).toBe(true);
    expect(result.current.rows[0].canDelete).toBe(true);
  });

  it('denies rights to a non-owner employee', () => {
    mockUseCurrentUser.mockReturnValue({ id: 'someone-else', role: 'Employee' });
    const { result } = renderHook(() => useUserCvsListPage('u1'));
    expect(result.current.showCreateButton).toBe(false);
    expect(result.current.rows[0].canEdit).toBe(false);
  });

  it('passes loading and error through', () => {
    const error = new Error('boom');
    mockUseCvsList.mockReturnValue({ cvs: undefined, loading: true, error });
    const { result } = renderHook(() => useUserCvsListPage('u1'));
    expect(result.current.loading).toBe(true);
    expect(result.current.error).toBe(error);
    expect(result.current.rows).toEqual([]);
  });
});
