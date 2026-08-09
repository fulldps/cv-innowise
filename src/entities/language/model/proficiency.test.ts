import { PROFICIENCIES, PROFICIENCY, PROFICIENCY_OPTIONS } from './proficiency';

describe('proficiency', () => {
  it('exposes all proficiency levels', () => {
    expect(PROFICIENCY).toEqual({
      A1: 'A1',
      A2: 'A2',
      B1: 'B1',
      B2: 'B2',
      C1: 'C1',
      C2: 'C2',
      Native: 'Native',
    });
  });

  it('PROFICIENCIES lists the values', () => {
    expect(PROFICIENCIES).toEqual(Object.values(PROFICIENCY));
  });

  it('PROFICIENCY_OPTIONS maps each value to an {id,name} option', () => {
    expect(PROFICIENCY_OPTIONS).toEqual(
      PROFICIENCIES.map((proficiency) => ({ id: proficiency, name: proficiency })),
    );
  });
});
