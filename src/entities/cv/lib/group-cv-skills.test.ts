import { groupCvSkills } from './group-cv-skills';

describe('groupCvSkills', () => {
  const categories = [
    {
      id: 'frontend',
      name: 'Frontend',
      order: 2,
      parent: null,
      children: [],
    },
    {
      id: 'backend',
      name: 'Backend',
      order: 1,
      parent: null,
      children: [],
    },
    {
      id: 'testing',
      name: 'Testing',
      order: 3,
      parent: null,
      children: [],
    },
  ];

  it('groups skills by category and sorts categories by order', () => {
    const skills = [
      {
        name: 'React',
        categoryId: 'frontend',
      },
      {
        name: 'Node.js',
        categoryId: 'backend',
      },
      {
        name: 'Jest',
        categoryId: 'testing',
      },
    ];

    expect(groupCvSkills(skills, categories)).toEqual([
      {
        category: 'Backend',
        skills: [
          {
            name: 'Node.js',
            categoryId: 'backend',
          },
        ],
      },
      {
        category: 'Frontend',
        skills: [
          {
            name: 'React',
            categoryId: 'frontend',
          },
        ],
      },
      {
        category: 'Testing',
        skills: [
          {
            name: 'Jest',
            categoryId: 'testing',
          },
        ],
      },
    ]);
  });

  it('removes categories without skills', () => {
    const skills = [
      {
        name: 'React',
        categoryId: 'frontend',
      },
    ];

    expect(groupCvSkills(skills, categories)).toEqual([
      {
        category: 'Frontend',
        skills: [
          {
            name: 'React',
            categoryId: 'frontend',
          },
        ],
      },
    ]);
  });

  it('ignores skills without a matching category', () => {
    const skills = [
      {
        name: 'React',
        categoryId: 'frontend',
      },
      {
        name: 'Unknown',
        categoryId: 'unknown',
      },
      {
        name: 'No category',
        categoryId: null,
      },
    ];

    expect(groupCvSkills(skills, categories)).toEqual([
      {
        category: 'Frontend',
        skills: [
          {
            name: 'React',
            categoryId: 'frontend',
          },
        ],
      },
    ]);
  });

  it('returns an empty array when there are no skills', () => {
    expect(groupCvSkills([], categories)).toEqual([]);
  });

  it('does not mutate the categories array', () => {
    const originalCategories = [...categories];

    groupCvSkills([], categories);

    expect(categories).toEqual(originalCategories);
  });
});
