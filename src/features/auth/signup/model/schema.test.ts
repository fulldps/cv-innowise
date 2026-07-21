import { signupSchema } from './schema';

describe('signupSchema', () => {
  it('passes with valid email and password', () => {
    const result = signupSchema.safeParse({ email: 'test@test.com', password: 'password123' });
    expect(result.success).toBe(true);
  });

  it('fails with an invalid email', () => {
    const result = signupSchema.safeParse({ email: 'not-an-email', password: 'password123' });
    expect(result.success).toBe(false);
  });

  it('fails with a password shorter than 8 characters', () => {
    const result = signupSchema.safeParse({ email: 'test@test.com', password: 'short' });
    expect(result.success).toBe(false);
  });

  it('fails with an empty email', () => {
    const result = signupSchema.safeParse({ email: '', password: 'password123' });
    expect(result.success).toBe(false);
  });
});
