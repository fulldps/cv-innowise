import { buildGroupedSkills } from './build-grouped-skills';

type Params = Parameters<typeof buildGroupedSkills>[0];

const categories = [
  { id: 'c2', name: 'Backend', order: 2 },
  { id: 'c1', name: 'Frontend', order: 1 },
];

describe('buildGroupedSkills', () => {
  it('groups skills into categories sorted by order', () => {
    const profile = {
      skills: [
        { name: 'React', categoryId: 'c1', mastery: 'Expert' },
        { name: 'Node', categoryId: 'c2', mastery: 'Advanced' },
      ],
    };

    const result = buildGroupedSkills({ profile, categories } as unknown as Params);

    expect(result.map((category) => category.name)).toEqual(['Frontend', 'Backend']);
    expect(result[0].skills.map((skill) => skill.name)).toEqual(['React']);
    expect(result[1].skills.map((skill) => skill.name)).toEqual(['Node']);
  });

  it('drops categories that have no matching skills', () => {
    const profile = { skills: [{ name: 'React', categoryId: 'c1', mastery: 'Expert' }] };

    const result = buildGroupedSkills({ profile, categories } as unknown as Params);

    expect(result.map((category) => category.name)).toEqual(['Frontend']);
  });
});
