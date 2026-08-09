import { forgotPasswordSchema } from './schema';

describe('forgotPasswordSchema', () => {
  it('passes with a valid email', () => {
    const result = forgotPasswordSchema.safeParse({
      email: 'test@test.com',
    });

    expect(result.success).toBe(true);
  });

  it('fails with an invalid email', () => {
    const result = forgotPasswordSchema.safeParse({
      email: 'not-an-email',
    });

    expect(result.success).toBe(false);
  });

  it('fails with an empty email', () => {
    const result = forgotPasswordSchema.safeParse({
      email: '',
    });

    expect(result.success).toBe(false);
  });
});
