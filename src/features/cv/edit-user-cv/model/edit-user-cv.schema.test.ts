import { editUserCvSchema } from './edit-user-cv.schema';

describe('editUserCvSchema', () => {
  it('accepts valid CV data', () => {
    const result = editUserCvSchema.safeParse({
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
    const result = editUserCvSchema.safeParse({
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
    const result = editUserCvSchema.safeParse({
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
    const result = editUserCvSchema.safeParse({
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
    const result = editUserCvSchema.safeParse({
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
    const result = editUserCvSchema.safeParse({
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
});
