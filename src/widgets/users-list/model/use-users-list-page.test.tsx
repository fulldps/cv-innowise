import { act, renderHook } from '@testing-library/react';

const mockUseUsersList = jest.fn();
const mockUseCurrentUser = jest.fn();
const mockPush = jest.fn();

jest.mock('@/entities/user/api/use-users-list', () => ({
  useUsersList: () => mockUseUsersList(),
}));
jest.mock('@/entities/user/api/use-current-user', () => ({
  useCurrentUser: () => mockUseCurrentUser(),
}));
jest.mock('@/shared/lib/hooks/use-debounce', () => ({
  useDebounce: (value: string) => value,
}));
jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: mockPush }),
}));

import { useUsersListPage } from './use-users-list-page';

const makeUser = (over: Record<string, unknown>) => ({
  id: 'x',
  email: 'x@x.com',
  profile: { first_name: 'X', last_name: 'Y', full_name: 'X Y' },
  department_name: 'Dept',
  position_name: 'Pos',
  ...over,
});

const anna = makeUser({
  id: 'a',
  email: 'anna@x.com',
  profile: { first_name: 'Anna', last_name: 'A', full_name: 'Anna A' },
});
const bob = makeUser({
  id: 'b',
  email: 'bob@x.com',
  profile: { first_name: 'Bob', last_name: 'B', full_name: 'Bob B' },
});

beforeEach(() => {
  jest.clearAllMocks();
  mockUseUsersList.mockReturnValue({ data: [anna, bob], loading: false, error: null });
  mockUseCurrentUser.mockReturnValue({ id: 'z', role: 'Admin' });
});

describe('useUsersListPage', () => {
  it('sorts by first name descending by default', () => {
    const { result } = renderHook(() => useUsersListPage());
    expect(result.current.rows.map((row) => row.user.id)).toEqual(['b', 'a']);
  });

  it('filters by full name', () => {
    const { result } = renderHook(() => useUsersListPage());
    act(() => result.current.setSearchValue('anna'));
    expect(result.current.rows.map((row) => row.user.id)).toEqual(['a']);
  });

  it('pins the current user to the top', () => {
    mockUseCurrentUser.mockReturnValue({ id: 'a', role: 'Employee' });
    const { result } = renderHook(() => useUsersListPage());
    expect(result.current.rows[0].user.id).toBe('a');
  });

  it('lets admins edit anyone but not delete themselves', () => {
    mockUseCurrentUser.mockReturnValue({ id: 'a', role: 'Admin' });
    const { result } = renderHook(() => useUsersListPage());
    const self = result.current.rows.find((row) => row.user.id === 'a')!;
    const other = result.current.rows.find((row) => row.user.id === 'b')!;
    expect(self.canEdit).toBe(true);
    expect(self.canDelete).toBe(false);
    expect(other.canDelete).toBe(true);
  });

  it('lets an employee edit only themselves and hides create', () => {
    mockUseCurrentUser.mockReturnValue({ id: 'a', role: 'Employee' });
    const { result } = renderHook(() => useUsersListPage());
    const self = result.current.rows.find((row) => row.user.id === 'a')!;
    const other = result.current.rows.find((row) => row.user.id === 'b')!;
    expect(self.canEdit).toBe(true);
    expect(other.canEdit).toBe(false);
    expect(result.current.showCreateButton).toBe(false);
  });

  it('navigates to a user profile', () => {
    const { result } = renderHook(() => useUsersListPage());
    act(() => result.current.openProfile('a'));
    expect(mockPush).toHaveBeenCalledWith('/users/a/profile');
  });
});
