import { validateFile } from './validate-file';

const options = { maxSize: 1024 * 1024, allowedTypes: ['image/png', 'image/jpeg'] };

function makeFile(size: number, type: string): File {
  const file = new File(['x'], 'avatar', { type });
  Object.defineProperty(file, 'size', { value: size });
  return file;
}

describe('validateFile', () => {
  it('returns null for a valid file', () => {
    expect(validateFile(makeFile(500, 'image/png'), options)).toBeNull();
  });

  it('rejects an oversized file with a KB message', () => {
    expect(validateFile(makeFile(2 * 1024 * 1024, 'image/png'), options)).toBe(
      'Maximum file size is 1024 KB',
    );
  });

  it('rejects a disallowed type and lists supported formats', () => {
    expect(validateFile(makeFile(500, 'application/pdf'), options)).toBe(
      'Supported formats: png, jpeg',
    );
  });
});
