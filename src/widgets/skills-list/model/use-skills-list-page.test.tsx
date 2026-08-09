import { act, renderHook } from '@testing-library/react';

const mockUseSkills = jest.fn();
const mockUseCurrentUser = jest.fn();

jest.mock('@/entities/skill/api/use-skills', () => ({
  useSkills: () => mockUseSkills(),
}));
jest.mock('@/entities/user/api/use-current-user', () => ({
  useCurrentUser: () => mockUseCurrentUser(),
}));
jest.mock('@/shared/lib/hooks/use-debounce', () => ({
  useDebounce: (value: string) => value,
}));

import { useSkillsListPage } from './use-skills-list-page';

const skills = [
  { id: '1', name: 'React', category: { name: 'Frontend' }, category_parent_name: 'Web' },
  { id: '2', name: 'Node', category: { name: 'Backend' }, category_parent_name: 'Server' },
];

beforeEach(() => {
  jest.clearAllMocks();
  mockUseSkills.mockReturnValue({ data: { skills }, loading: false, error: null });
  mockUseCurrentUser.mockReturnValue({ role: 'Admin' });
});

describe('useSkillsListPage', () => {
  it('sorts by name ascending by default', () => {
    const { result } = renderHook(() => useSkillsListPage());
    expect(result.current.rows.map((row) => row.skill.name)).toEqual(['Node', 'React']);
  });

  it('filters across name, category and parent', () => {
    const { result } = renderHook(() => useSkillsListPage());

    act(() => result.current.setSearchValue('frontend'));
    expect(result.current.rows.map((row) => row.skill.name)).toEqual(['React']);

    act(() => result.current.setSearchValue('server'));
    expect(result.current.rows.map((row) => row.skill.name)).toEqual(['Node']);
  });

  it('sorts by category when that field is selected', () => {
    const { result } = renderHook(() => useSkillsListPage());
    act(() => (result.current.toggleSort as (field: string) => void)('category'));
    expect(result.current.rows.map((row) => row.skill.category?.name)).toEqual([
      'Backend',
      'Frontend',
    ]);
  });

  it('grants management to admins only', () => {
    const admin = renderHook(() => useSkillsListPage());
    expect(admin.result.current.showCreateButton).toBe(true);

    mockUseCurrentUser.mockReturnValue({ role: 'Employee' });
    const employee = renderHook(() => useSkillsListPage());
    expect(employee.result.current.showCreateButton).toBe(false);
    expect(employee.result.current.rows[0].canEdit).toBe(false);
  });

  it('passes loading and error through', () => {
    const error = new Error('boom');
    mockUseSkills.mockReturnValue({ data: undefined, loading: true, error });
    const { result } = renderHook(() => useSkillsListPage());
    expect(result.current.loading).toBe(true);
    expect(result.current.error).toBe(error);
    expect(result.current.rows).toEqual([]);
  });
});
