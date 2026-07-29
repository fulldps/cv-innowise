import { Mastery, Proficiency, UserRole, type User } from './types';

export const mockUsers: User[] = [
  {
    id: '1',
    created_at: '2026-07-20T10:00:00.000Z',
    email: 'john.doe@innowise.com',
    is_verified: true,
    role: UserRole.Admin,

    department_name: 'Frontend',
    position_name: 'Senior Frontend Engineer',

    department: {
      id: 'dep-1',
      created_at: '2026-01-01T00:00:00.000Z',
      name: 'Frontend',
    },

    position: {
      id: 'pos-1',
      created_at: '2026-01-01T00:00:00.000Z',
      name: 'Senior Frontend Engineer',
    },

    profile: {
      id: 'profile-1',
      created_at: '2026-01-01T00:00:00.000Z',

      first_name: 'John',
      last_name: 'Doe',
      full_name: 'John Doe',

      avatar: null,

      skills: [
        {
          name: 'React',
          categoryId: '1',
          mastery: Mastery.Expert,
        },
        {
          name: 'TypeScript',
          categoryId: '2',
          mastery: Mastery.Proficient,
        },
      ],

      languages: [
        {
          name: 'English',
          proficiency: Proficiency.C1,
        },
      ],
    },

    cvs: [],
  },
];
