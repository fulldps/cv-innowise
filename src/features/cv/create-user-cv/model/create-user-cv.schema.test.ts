import { createUserCvSchema } from './create-user-cv.schema';

describe('createUserCvSchema', () => {
  it('accepts valid CV data', () => {
    const result = createUserCvSchema.safeParse({
      name: 'My CV',
      description: 'Frontend developer',
    });

    expect(result.success).toBe(true);

    if (result.success) {
      expect(result.data).toEqual({
        name: 'My CV',
        description: 'Frontend developer',
      });
    }
  });

  it('trims name and description', () => {
    const result = createUserCvSchema.safeParse({
      name: '  My CV  ',
      description: '  Frontend developer  ',
    });

    expect(result.success).toBe(true);

    if (result.success) {
      expect(result.data).toEqual({
        name: 'My CV',
        description: 'Frontend developer',
      });
    }
  });

  it('rejects empty name', () => {
    const result = createUserCvSchema.safeParse({
      name: '',
      description: 'Frontend developer',
    });

    expect(result.success).toBe(false);

    if (!result.success) {
      expect(result.error.issues).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            path: ['name'],
            message: 'Name is required',
          }),
        ]),
      );
    }
  });

  it('rejects whitespace-only name', () => {
    const result = createUserCvSchema.safeParse({
      name: '   ',
      description: 'Frontend developer',
    });

    expect(result.success).toBe(false);

    if (!result.success) {
      expect(result.error.issues).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            path: ['name'],
            message: 'Name is required',
          }),
        ]),
      );
    }
  });

  it('rejects empty description', () => {
    const result = createUserCvSchema.safeParse({
      name: 'My CV',
      description: '',
    });

    expect(result.success).toBe(false);

    if (!result.success) {
      expect(result.error.issues).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            path: ['description'],
            message: 'Description is required',
          }),
        ]),
      );
    }
  });

  it('rejects whitespace-only description', () => {
    const result = createUserCvSchema.safeParse({
      name: 'My CV',
      description: '   ',
    });

    expect(result.success).toBe(false);

    if (!result.success) {
      expect(result.error.issues).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            path: ['description'],
            message: 'Description is required',
          }),
        ]),
      );
    }
  });

  it('rejects non-string values', () => {
    const result = createUserCvSchema.safeParse({
      name: 123,
      description: true,
    });

    expect(result.success).toBe(false);
  });
});
