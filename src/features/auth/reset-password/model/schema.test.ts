import { resetPasswordSchema } from './schema';

describe('resetPasswordSchema', () => {
  it('passes with a valid password', () => {
    const result = resetPasswordSchema.safeParse({
      newPassword: 'password123',
    });

    expect(result.success).toBe(true);
  });

  it('passes with a password of exactly 8 characters', () => {
    const result = resetPasswordSchema.safeParse({
      newPassword: '12345678',
    });

    expect(result.success).toBe(true);
  });

  it('fails with a password shorter than 8 characters', () => {
    const result = resetPasswordSchema.safeParse({
      newPassword: 'short',
    });

    expect(result.success).toBe(false);
  });

  it('fails with an empty password', () => {
    const result = resetPasswordSchema.safeParse({
      newPassword: '',
    });

    expect(result.success).toBe(false);
  });
});
