import { act, renderHook } from '@testing-library/react';

const mockUsePositions = jest.fn();
const mockUseCurrentUser = jest.fn();

jest.mock('@/entities/position/api/use-positions', () => ({
  usePositions: () => mockUsePositions(),
}));

jest.mock('@/entities/user/api/use-current-user', () => ({
  useCurrentUser: () => mockUseCurrentUser(),
}));

jest.mock('@/shared/lib/hooks/use-debounce', () => ({
  useDebounce: (value: string) => value,
}));

import { usePositionsListPage } from './use-positions-list-page';

const positions = [
  { id: '1', name: 'Beta' },
  { id: '2', name: 'alpha' },
];

beforeEach(() => {
  jest.clearAllMocks();
  mockUsePositions.mockReturnValue({ data: { positions }, loading: false, error: null });
  mockUseCurrentUser.mockReturnValue({ role: 'Admin' });
});

describe('usePositionsListPage', () => {
  it('sorts positions ascending by name by default', () => {
    const { result } = renderHook(() => usePositionsListPage());

    expect(result.current.rows.map((row) => row.position.name)).toEqual(['alpha', 'Beta']);
  });

  it('filters rows by the search value', () => {
    const { result } = renderHook(() => usePositionsListPage());

    act(() => result.current.setSearchValue('alp'));

    expect(result.current.rows).toHaveLength(1);
    expect(result.current.rows[0].position.name).toBe('alpha');
  });

  it('flips order when sort is toggled', () => {
    const { result } = renderHook(() => usePositionsListPage());

    act(() => result.current.toggleSort('name'));

    expect(result.current.rows.map((row) => row.position.name)).toEqual(['Beta', 'alpha']);
  });

  it('grants create/edit/delete to admins', () => {
    const { result } = renderHook(() => usePositionsListPage());

    expect(result.current.showCreateButton).toBe(true);
    expect(result.current.rows[0].canEdit).toBe(true);
    expect(result.current.rows[0].canDelete).toBe(true);
  });

  it('denies management to employees', () => {
    mockUseCurrentUser.mockReturnValue({ role: 'Employee' });

    const { result } = renderHook(() => usePositionsListPage());

    expect(result.current.showCreateButton).toBe(false);
    expect(result.current.rows[0].canEdit).toBe(false);
  });

  it('passes loading and error through', () => {
    const error = new Error('boom');
    mockUsePositions.mockReturnValue({ data: undefined, loading: true, error });

    const { result } = renderHook(() => usePositionsListPage());

    expect(result.current.loading).toBe(true);
    expect(result.current.error).toBe(error);
    expect(result.current.rows).toEqual([]);
  });
});
