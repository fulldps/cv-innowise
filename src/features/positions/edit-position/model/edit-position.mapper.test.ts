import { mapUpdatePositionInput } from './edit-position.mapper';

describe('mapUpdatePositionInput', () => {
  it('maps the id and name into UpdatePositionInput', () => {
    expect(mapUpdatePositionInput('p1', { name: 'QA Engineer' })).toEqual({
      positionId: 'p1',
      name: 'QA Engineer',
    });
  });
});
