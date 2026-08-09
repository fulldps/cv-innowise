import { renderHook } from '@testing-library/react';

const mockUsePathname = jest.fn();

jest.mock('next/navigation', () => ({
  usePathname: () => mockUsePathname(),
}));

import { useBreadcrumbs } from './use-breadcrumbs';

describe('useBreadcrumbs', () => {
  it('returns nothing at the root', () => {
    mockUsePathname.mockReturnValue('/');
    const { result } = renderHook(() => useBreadcrumbs());
    expect(result.current.breadcrumbs).toEqual([]);
    expect(result.current.profileUserId).toBeNull();
  });

  it('maps plain segments through the label map', () => {
    mockUsePathname.mockReturnValue('/departments');
    const { result } = renderHook(() => useBreadcrumbs());
    expect(result.current.breadcrumbs).toEqual([{ label: 'Departments', href: '/departments' }]);
    expect(result.current.profileUserId).toBeNull();
  });

  it('builds a profile trail for a nested user page', () => {
    mockUsePathname.mockReturnValue('/users/u1/skills');
    const { result } = renderHook(() => useBreadcrumbs());
    expect(result.current.breadcrumbs).toEqual([
      { label: 'Employees', href: '/users' },
      { label: null, href: '/users/u1/profile' },
      { label: 'Skills', href: '/users/u1/skills' },
    ]);
    expect(result.current.profileUserId).toBe('u1');
  });

  it('omits the extra crumb on the profile page itself', () => {
    mockUsePathname.mockReturnValue('/users/u1/profile');
    const { result } = renderHook(() => useBreadcrumbs());
    expect(result.current.breadcrumbs).toEqual([
      { label: 'Employees', href: '/users' },
      { label: null, href: '/users/u1/profile' },
    ]);
    expect(result.current.profileUserId).toBe('u1');
  });
});
