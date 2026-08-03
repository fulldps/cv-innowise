export async function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      const result = reader.result;

      if (typeof result !== 'string') {
        reject(new Error('Failed to read file'));

        return;
      }

      resolve(result.split(',')[1]);
    };

    reader.onerror = () => reject(reader.error);

    reader.readAsDataURL(file);
  });
}
