import { getCreateUserCvDefaultValues } from './create-user-cv.defaults';

describe('getCreateUserCvDefaultValues', () => {
  it('returns empty default values', () => {
    expect(getCreateUserCvDefaultValues()).toEqual({
      name: '',
      description: '',
    });
  });
});
