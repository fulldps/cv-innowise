import { act, renderHook } from '@testing-library/react';

const mockUseDepartments = jest.fn();
const mockUseCurrentUser = jest.fn();

jest.mock('@/entities/department/api/use-departments', () => ({
  useDepartments: () => mockUseDepartments(),
}));
jest.mock('@/entities/user/api/use-current-user', () => ({
  useCurrentUser: () => mockUseCurrentUser(),
}));
jest.mock('@/shared/lib/hooks/use-debounce', () => ({
  useDebounce: (value: string) => value,
}));

import { useDepartmentsListPage } from './use-departments-list-page';

const departments = [
  { id: '1', name: 'Beta' },
  { id: '2', name: 'alpha' },
];

beforeEach(() => {
  jest.clearAllMocks();
  mockUseDepartments.mockReturnValue({ data: { departments }, loading: false, error: null });
  mockUseCurrentUser.mockReturnValue({ role: 'Admin' });
});

describe('useDepartmentsListPage', () => {
  it('sorts by name ascending by default', () => {
    const { result } = renderHook(() => useDepartmentsListPage());
    expect(result.current.rows.map((row) => row.department.name)).toEqual(['alpha', 'Beta']);
  });

  it('filters by search', () => {
    const { result } = renderHook(() => useDepartmentsListPage());
    act(() => result.current.setSearchValue('alp'));
    expect(result.current.rows).toHaveLength(1);
    expect(result.current.rows[0].department.name).toBe('alpha');
  });

  it('flips order on toggle', () => {
    const { result } = renderHook(() => useDepartmentsListPage());
    act(() => result.current.toggleSort('name'));
    expect(result.current.rows.map((row) => row.department.name)).toEqual(['Beta', 'alpha']);
  });

  it('grants management to admins, denies to employees', () => {
    const admin = renderHook(() => useDepartmentsListPage());
    expect(admin.result.current.showCreateButton).toBe(true);
    expect(admin.result.current.rows[0].canEdit).toBe(true);

    mockUseCurrentUser.mockReturnValue({ role: 'Employee' });
    const employee = renderHook(() => useDepartmentsListPage());
    expect(employee.result.current.showCreateButton).toBe(false);
    expect(employee.result.current.rows[0].canDelete).toBe(false);
  });

  it('passes loading and error through', () => {
    const error = new Error('boom');
    mockUseDepartments.mockReturnValue({ data: undefined, loading: true, error });
    const { result } = renderHook(() => useDepartmentsListPage());
    expect(result.current.loading).toBe(true);
    expect(result.current.error).toBe(error);
    expect(result.current.rows).toEqual([]);
  });
});
