'use client';

import { useRef } from 'react';
import type { ChangeEvent } from 'react';
import { toast } from 'sonner';

import { fileToBase64 } from '@/shared/lib/file/file-to-base64';
import { validateFile } from '@/shared/lib/file/validate-file';
import { useFileDrop } from '@/shared/lib/hooks/use-file-drop';

import { useUploadAvatar } from '../api/use-upload-avatar';
import { useDeleteAvatar } from '../api/use-delete-avatar';

const MAX_FILE_SIZE = 500 * 1024;

const ALLOWED_TYPES = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif'];

interface UseProfileAvatarParams {
  userId: string;
  canEdit: boolean;
  setDisabled: (value: boolean) => void;
}

export function useProfileAvatar({ userId, canEdit, setDisabled }: UseProfileAvatarParams) {
  const inputRef = useRef<HTMLInputElement>(null);

  const { uploadAvatar, loading: uploading } = useUploadAvatar();

  const { deleteAvatar, loading: deleting } = useDeleteAvatar();

  const loading = uploading || deleting;

  const processFile = async (file: File) => {
    const validationError = validateFile(file, {
      maxSize: MAX_FILE_SIZE,
      allowedTypes: ALLOWED_TYPES,
    });

    if (validationError) {
      toast.error(validationError);
      return;
    }

    setDisabled(true);

    try {
      const base64 = await fileToBase64(file);

      await uploadAvatar({
        userId,
        base64,
        size: file.size,
        type: file.type,
      });

      toast.success('Avatar uploaded successfully');
    } catch (error) {
      console.error(error);

      toast.error('Failed to upload avatar');
    } finally {
      setDisabled(false);
    }
  };

  const { isDragging, handleDragEnter, handleDragOver, handleDragLeave, handleDrop } = useFileDrop({
    disabled: !canEdit || loading,
    onFile: processFile,
  });

  const handleClick = () => {
    if (!canEdit || loading) return;

    inputRef.current?.click();
  };

  const handleFileSelect = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    event.target.value = '';

    if (!file) return;

    await processFile(file);
  };

  const handleDelete = async () => {
    if (!canEdit || loading) return;

    setDisabled(true);

    try {
      await deleteAvatar(userId);

      toast.success('Avatar deleted successfully');
    } catch (error) {
      console.error(error);

      toast.error('Failed to delete avatar');
    } finally {
      setDisabled(false);
    }
  };

  return {
    inputRef,

    loading,
    isDragging,

    handleClick,
    handleFileSelect,

    handleDragEnter,
    handleDragOver,
    handleDragLeave,
    handleDrop,

    handleDelete,
  };
}
