import { cvSchema } from './schema';

describe('cvSchema', () => {
  it('passes with valid values', () => {
    const result = cvSchema.safeParse({
      name: 'My CV',
      description: 'Frontend developer',
      education: 'BSUIR',
    });

    expect(result.success).toBe(true);
  });

  it('passes without education', () => {
    const result = cvSchema.safeParse({
      name: 'My CV',
      description: 'Frontend developer',
    });

    expect(result.success).toBe(true);
  });

  it('fails when name is empty', () => {
    const result = cvSchema.safeParse({
      name: '',
      description: 'Frontend developer',
      education: 'BSUIR',
    });

    expect(result.success).toBe(false);
  });

  it('fails when description is empty', () => {
    const result = cvSchema.safeParse({
      name: 'My CV',
      description: '',
      education: 'BSUIR',
    });

    expect(result.success).toBe(false);
  });

  it('fails when both required fields are empty', () => {
    const result = cvSchema.safeParse({
      name: '',
      description: '',
    });

    expect(result.success).toBe(false);
  });
});
