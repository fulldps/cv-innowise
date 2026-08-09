import { act, renderHook } from '@testing-library/react';

const mockUseLanguages = jest.fn();
const mockUseCurrentUser = jest.fn();

jest.mock('@/entities/language/api/use-languages', () => ({
  useLanguages: () => mockUseLanguages(),
}));
jest.mock('@/entities/user/api/use-current-user', () => ({
  useCurrentUser: () => mockUseCurrentUser(),
}));
jest.mock('@/shared/lib/hooks/use-debounce', () => ({
  useDebounce: (value: string) => value,
}));

import { useLanguagesListPage } from './use-languages-list-page';

const languages = [
  { id: '1', name: 'German' },
  { id: '2', name: 'english' },
];

beforeEach(() => {
  jest.clearAllMocks();
  mockUseLanguages.mockReturnValue({ data: { languages }, loading: false, error: null });
  mockUseCurrentUser.mockReturnValue({ role: 'Admin' });
});

describe('useLanguagesListPage', () => {
  it('sorts by name ascending by default', () => {
    const { result } = renderHook(() => useLanguagesListPage());
    expect(result.current.rows.map((row) => row.language.name)).toEqual(['english', 'German']);
  });

  it('filters by search', () => {
    const { result } = renderHook(() => useLanguagesListPage());
    act(() => result.current.setSearchValue('germ'));
    expect(result.current.rows).toHaveLength(1);
    expect(result.current.rows[0].language.name).toBe('German');
  });

  it('flips order on toggle', () => {
    const { result } = renderHook(() => useLanguagesListPage());
    act(() => result.current.toggleSort('name'));
    expect(result.current.rows.map((row) => row.language.name)).toEqual(['German', 'english']);
  });

  it('grants management to admins, denies to employees', () => {
    const admin = renderHook(() => useLanguagesListPage());
    expect(admin.result.current.showCreateButton).toBe(true);
    expect(admin.result.current.rows[0].canEdit).toBe(true);

    mockUseCurrentUser.mockReturnValue({ role: 'Employee' });
    const employee = renderHook(() => useLanguagesListPage());
    expect(employee.result.current.showCreateButton).toBe(false);
    expect(employee.result.current.rows[0].canDelete).toBe(false);
  });

  it('passes loading and error through', () => {
    const error = new Error('boom');
    mockUseLanguages.mockReturnValue({ data: undefined, loading: true, error });
    const { result } = renderHook(() => useLanguagesListPage());
    expect(result.current.loading).toBe(true);
    expect(result.current.error).toBe(error);
    expect(result.current.rows).toEqual([]);
  });
});
