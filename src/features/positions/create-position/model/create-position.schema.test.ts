import { createPositionSchema } from './create-position.schema';

describe('createPositionSchema', () => {
  it('accepts a non-empty name', () => {
    expect(createPositionSchema.safeParse({ name: 'Developer' }).success).toBe(true);
  });

  it('rejects a blank name', () => {
    expect(createPositionSchema.safeParse({ name: '   ' }).success).toBe(false);
  });
});
