import { loginSchema } from './schema';

describe('loginSchema', () => {
  it('passes with valid email and password', () => {
    const result = loginSchema.safeParse({ email: 'test@test.com', password: 'password123' });
    expect(result.success).toBe(true);
  });

  it('fails with an invalid email', () => {
    const result = loginSchema.safeParse({ email: 'not-an-email', password: 'password123' });
    expect(result.success).toBe(false);
  });

  it('fails with an empty email', () => {
    const result = loginSchema.safeParse({ email: '', password: 'password123' });
    expect(result.success).toBe(false);
  });

  it('fails with an empty password', () => {
    const result = loginSchema.safeParse({ email: 'test@test.com', password: '' });
    expect(result.success).toBe(false);
  });
});
