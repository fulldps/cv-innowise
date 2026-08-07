export function getUserProfileTabs(userId: string) {
  return [
    {
      label: 'PROFILE',
      href: `/users/${userId}/profile`,
    },
    {
      label: 'SKILLS',
      href: `/users/${userId}/skills`,
    },
    {
      label: 'LANGUAGES',
      href: `/users/${userId}/languages`,
    },
    {
      label: 'CVS',
      href: `/users/${userId}/cvs`,
    },
  ];
}
