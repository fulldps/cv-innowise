import { getCreatePositionDefaultValues } from './create-position.defaults';

describe('getCreatePositionDefaultValues', () => {
  it('returns an empty name', () => {
    expect(getCreatePositionDefaultValues()).toEqual({ name: '' });
  });
});
