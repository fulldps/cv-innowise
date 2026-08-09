import { fileToBase64 } from './file-to-base64';

describe('fileToBase64', () => {
  it('resolves the base64 payload of the data url', async () => {
    const file = new File(['hello'], 'a.txt', { type: 'text/plain' });

    await expect(fileToBase64(file)).resolves.toBe('aGVsbG8=');
  });
});
