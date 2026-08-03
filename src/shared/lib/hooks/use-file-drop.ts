import { useState } from 'react';
import type { DragEvent } from 'react';

interface UseFileDropOptions {
  disabled?: boolean;
  onFile: (file: File) => void | Promise<void>;
}

export function useFileDrop({ disabled = false, onFile }: UseFileDropOptions) {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragEnter = (event: DragEvent<HTMLDivElement>) => {
    if (disabled) return;

    event.preventDefault();

    setIsDragging(true);
  };

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    if (disabled) return;

    event.preventDefault();
  };

  const handleDragLeave = (event: DragEvent<HTMLDivElement>) => {
    if (disabled) return;

    event.preventDefault();

    if (event.currentTarget.contains(event.relatedTarget as Node)) {
      return;
    }

    setIsDragging(false);
  };

  const handleDrop = async (event: DragEvent<HTMLDivElement>) => {
    if (disabled) return;

    event.preventDefault();

    setIsDragging(false);

    const file = event.dataTransfer.files?.[0];

    if (!file) return;

    await onFile(file);
  };

  return {
    isDragging,

    handleDragEnter,
    handleDragOver,
    handleDragLeave,
    handleDrop,
  };
}
