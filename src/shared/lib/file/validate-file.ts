interface ValidateFileOptions {
  maxSize: number;
  allowedTypes: string[];
}

export function validateFile(
  file: File,
  { maxSize, allowedTypes }: ValidateFileOptions,
): string | null {
  if (file.size > maxSize) {
    return `Maximum file size is ${Math.round(maxSize / 1024)} KB`;
  }

  if (!allowedTypes.includes(file.type)) {
    return `Supported formats: ${allowedTypes.map((type) => type.split('/')[1]).join(', ')}`;
  }

  return null;
}
