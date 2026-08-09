import { getEditUserCvDefaultValues } from './edit-user-cv.defaults';

describe('getEditUserCvDefaultValues', () => {
  it('returns CV values as form default values', () => {
    const cv = {
      name: 'My CV',
      description: 'Frontend developer',
    };

    expect(getEditUserCvDefaultValues(cv)).toEqual({
      name: 'My CV',
      description: 'Frontend developer',
    });
  });

  it('preserves empty strings', () => {
    const cv = {
      name: '',
      description: '',
    };

    expect(getEditUserCvDefaultValues(cv)).toEqual({
      name: '',
      description: '',
    });
  });
});
