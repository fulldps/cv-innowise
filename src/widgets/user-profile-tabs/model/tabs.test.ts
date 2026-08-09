import { getUserProfileTabs } from './tabs';

describe('getUserProfileTabs', () => {
  it('builds the four profile tabs for a user', () => {
    expect(getUserProfileTabs('u1')).toEqual([
      { label: 'PROFILE', href: '/users/u1/profile' },
      { label: 'SKILLS', href: '/users/u1/skills' },
      { label: 'LANGUAGES', href: '/users/u1/languages' },
      { label: 'CVS', href: '/users/u1/cvs' },
    ]);
  });
});
