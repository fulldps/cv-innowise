import { PROFICIENCIES } from '@/entities/language';

import { PROFICIENCY_CONFIG } from './proficiency-config';

describe('PROFICIENCY_CONFIG', () => {
  it('has an entry for every proficiency level', () => {
    expect(Object.keys(PROFICIENCY_CONFIG).sort()).toEqual([...PROFICIENCIES].sort());
  });

  it('exposes a text color for each level', () => {
    for (const config of Object.values(PROFICIENCY_CONFIG)) {
      expect(config.color).toMatch(/^text-/);
    }
  });
});
