import type { Position } from '@/entities/position';

import { getEditPositionDefaultValues } from './edit-position.defaults';

describe('getEditPositionDefaultValues', () => {
  it('takes the position name', () => {
    expect(getEditPositionDefaultValues({ name: 'Developer' } as unknown as Position)).toEqual({
      name: 'Developer',
    });
  });

  it('falls back to an empty string when name is missing', () => {
    expect(getEditPositionDefaultValues({} as unknown as Position)).toEqual({ name: '' });
  });
});
