import { mapCreatePositionInput } from './create-position.mapper';

describe('mapCreatePositionInput', () => {
  it('maps the name into CreatePositionInput', () => {
    expect(mapCreatePositionInput({ name: 'Frontend Developer' })).toEqual({
      name: 'Frontend Developer',
    });
  });
});
