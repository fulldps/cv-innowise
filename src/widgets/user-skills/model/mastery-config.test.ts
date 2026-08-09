import { MASTERIES } from '@/entities/skill';

import { MASTERY_CONFIG } from './mastery-config';

describe('MASTERY_CONFIG', () => {
  it('has an entry for every mastery level', () => {
    expect(Object.keys(MASTERY_CONFIG).sort()).toEqual([...MASTERIES].sort());
  });

  it('exposes a progress and colors for each level', () => {
    for (const config of Object.values(MASTERY_CONFIG)) {
      expect(typeof config.progress).toBe('number');
      expect(config.color).toMatch(/^bg-/);
      expect(config.background).toMatch(/^bg-/);
    }
  });

  it('increases progress from Novice to Expert', () => {
    expect(MASTERY_CONFIG.Novice.progress).toBeLessThan(MASTERY_CONFIG.Expert.progress);
  });
});
