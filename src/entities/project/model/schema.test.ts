import { projectSchema } from './schema';

describe('projectSchema', () => {
  it('accepts valid required fields', () => {
    const result = projectSchema.safeParse({
      projectId: 'project-1',
      start_date: '2026-01-01',
    });

    expect(result.success).toBe(true);
  });

  it('accepts all project fields', () => {
    const result = projectSchema.safeParse({
      projectId: 'project-1',
      start_date: '2026-01-01',
      end_date: '2026-06-01',
      roles: 'Frontend Developer\nReact Developer',
      responsibilities: 'Develop UI\nFix bugs',
    });

    expect(result.success).toBe(true);
  });

  it('rejects empty projectId', () => {
    const result = projectSchema.safeParse({
      projectId: '',
      start_date: '2026-01-01',
    });

    expect(result.success).toBe(false);

    if (!result.success) {
      expect(result.error.issues).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            path: ['projectId'],
            message: 'Project is required',
          }),
        ]),
      );
    }
  });

  it('rejects empty start_date', () => {
    const result = projectSchema.safeParse({
      projectId: 'project-1',
      start_date: '',
    });

    expect(result.success).toBe(false);

    if (!result.success) {
      expect(result.error.issues).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            path: ['start_date'],
            message: 'Start date is required',
          }),
        ]),
      );
    }
  });

  it('allows empty optional fields', () => {
    const result = projectSchema.safeParse({
      projectId: 'project-1',
      start_date: '2026-01-01',
      end_date: '',
      roles: '',
      responsibilities: '',
    });

    expect(result.success).toBe(true);
  });

  it('allows optional fields to be omitted', () => {
    const result = projectSchema.safeParse({
      projectId: 'project-1',
      start_date: '2026-01-01',
    });

    expect(result.success).toBe(true);
  });
});
