import { getInitials } from './get-initials';

describe('getInitials', () => {
  it('uses the first name initial when available', () => {
    expect(getInitials({ firstName: 'John', lastName: 'Doe', email: 'j@x.com' })).toBe('J');
  });

  it('falls back to the last name initial when there is no first name', () => {
    expect(getInitials({ firstName: null, lastName: 'Doe', email: 'j@x.com' })).toBe('D');
  });

  it('falls back to the uppercased email initial when there are no names', () => {
    expect(getInitials({ firstName: null, lastName: null, email: 'john@x.com' })).toBe('J');
  });

  it('handles undefined names', () => {
    expect(getInitials({ firstName: undefined, lastName: undefined, email: 'anna@x.com' })).toBe(
      'A',
    );
  });
});
