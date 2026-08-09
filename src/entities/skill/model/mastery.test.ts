import { MASTERIES, MASTERY, MASTERY_OPTIONS } from './mastery';

describe('mastery', () => {
  it('exposes all mastery levels', () => {
    expect(MASTERY).toEqual({
      Novice: 'Novice',
      Advanced: 'Advanced',
      Competent: 'Competent',
      Proficient: 'Proficient',
      Expert: 'Expert',
    });
  });

  it('MASTERIES lists the values', () => {
    expect(MASTERIES).toEqual(Object.values(MASTERY));
  });

  it('MASTERY_OPTIONS maps each value to an {id,name} option', () => {
    expect(MASTERY_OPTIONS).toEqual(MASTERIES.map((mastery) => ({ id: mastery, name: mastery })));
  });
});
