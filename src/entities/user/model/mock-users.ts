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

      avatar: 'https://i.pravatar.cc/300?img=1',

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

  {
    id: '2',
    created_at: '2026-07-20T10:00:00.000Z',
    email: 'jane.smith@innowise.com',
    is_verified: true,
    role: UserRole.Employee,

    department_name: 'Frontend',
    position_name: 'Frontend Developer',

    department: {
      id: 'dep-1',
      created_at: '2026-01-01T00:00:00.000Z',
      name: 'Frontend',
    },

    position: {
      id: 'pos-2',
      created_at: '2026-01-01T00:00:00.000Z',
      name: 'Frontend Developer',
    },

    profile: {
      id: 'profile-2',
      created_at: '2026-01-01T00:00:00.000Z',

      first_name: 'Jane',
      last_name: 'Smith',
      full_name: 'Jane Smith',

      avatar: 'https://i.pravatar.cc/300?img=5',

      skills: [
        {
          name: 'React',
          categoryId: '1',
          mastery: Mastery.Advanced,
        },
      ],

      languages: [
        {
          name: 'English',
          proficiency: Proficiency.B2,
        },
      ],
    },

    cvs: [],
  },

  {
    id: '3',
    created_at: '2026-07-20T10:00:00.000Z',
    email: 'alex.lee@innowise.com',
    is_verified: true,
    role: UserRole.Employee,

    department_name: 'QA',
    position_name: 'QA Engineer',

    department: {
      id: 'dep-2',
      created_at: '2026-01-01T00:00:00.000Z',
      name: 'QA',
    },

    position: {
      id: 'pos-3',
      created_at: '2026-01-01T00:00:00.000Z',
      name: 'QA Engineer',
    },

    profile: {
      id: 'profile-3',
      created_at: '2026-01-01T00:00:00.000Z',

      first_name: 'Alex',
      last_name: 'Lee',
      full_name: 'Alex Lee',

      avatar: null,

      skills: [],

      languages: [
        {
          name: 'English',
          proficiency: Proficiency.B1,
        },
      ],
    },

    cvs: [],
  },
  {
    id: '4',
    created_at: '2026-07-20T10:00:00.000Z',
    email: 'michael.brown@innowise.com',
    is_verified: true,
    role: UserRole.Employee,

    department_name: 'Backend',
    position_name: 'Node.js Developer',

    department: {
      id: 'dep-3',
      created_at: '2026-01-01T00:00:00.000Z',
      name: 'Backend',
    },

    position: {
      id: 'pos-4',
      created_at: '2026-01-01T00:00:00.000Z',
      name: 'Node.js Developer',
    },

    profile: {
      id: 'profile-4',
      created_at: '2026-01-01T00:00:00.000Z',

      first_name: 'Michael',
      last_name: 'Brown',
      full_name: 'Michael Brown',

      avatar: 'https://i.pravatar.cc/300?img=8',

      skills: [
        {
          name: 'Node.js',
          categoryId: '3',
          mastery: Mastery.Expert,
        },
      ],

      languages: [
        {
          name: 'English',
          proficiency: Proficiency.C2,
        },
      ],
    },

    cvs: [],
  },
  {
    id: '5',
    created_at: '2026-07-20T10:00:00.000Z',
    email: 'emma.wilson@innowise.com',
    is_verified: false,
    role: UserRole.Employee,

    department_name: 'Design',
    position_name: 'UI/UX Designer',

    department: {
      id: 'dep-4',
      created_at: '2026-01-01T00:00:00.000Z',
      name: 'Design',
    },

    position: {
      id: 'pos-5',
      created_at: '2026-01-01T00:00:00.000Z',
      name: 'UI/UX Designer',
    },

    profile: {
      id: 'profile-5',
      created_at: '2026-01-01T00:00:00.000Z',

      first_name: 'Emma',
      last_name: 'Wilson',
      full_name: 'Emma Wilson',

      avatar: null,

      skills: [
        {
          name: 'Figma',
          categoryId: '4',
          mastery: Mastery.Expert,
        },
      ],

      languages: [
        {
          name: 'English',
          proficiency: Proficiency.Native,
        },
      ],
    },

    cvs: [],
  },
  {
    id: '6',
    created_at: '2026-07-20T10:00:00.000Z',
    email: 'david.miller@innowise.com',
    is_verified: true,
    role: UserRole.Admin,

    department_name: 'Management',
    position_name: 'Engineering Manager',

    department: {
      id: 'dep-5',
      created_at: '2026-01-01T00:00:00.000Z',
      name: 'Management',
    },

    position: {
      id: 'pos-6',
      created_at: '2026-01-01T00:00:00.000Z',
      name: 'Engineering Manager',
    },

    profile: {
      id: 'profile-6',
      created_at: '2026-01-01T00:00:00.000Z',

      first_name: 'David',
      last_name: 'Miller',
      full_name: 'David Miller',

      avatar: 'https://i.pravatar.cc/300?img=12',

      skills: [],

      languages: [
        {
          name: 'English',
          proficiency: Proficiency.Native,
        },
      ],
    },

    cvs: [],
  },
];
