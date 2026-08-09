import type { ChangeEvent } from 'react';

import { act, renderHook } from '@testing-library/react';

const mockUpload = jest.fn();
const mockDelete = jest.fn();
const mockValidate = jest.fn();
const mockToBase64 = jest.fn();
const mockToastError = jest.fn();
const mockToastSuccess = jest.fn();

jest.mock('../api/use-upload-avatar', () => ({
  useUploadAvatar: () => ({ uploadAvatar: mockUpload, loading: false }),
}));
jest.mock('../api/use-delete-avatar', () => ({
  useDeleteAvatar: () => ({ deleteAvatar: mockDelete, loading: false }),
}));
jest.mock('@/shared/lib/file/validate-file', () => ({
  validateFile: (...args: unknown[]) => mockValidate(...args),
}));
jest.mock('@/shared/lib/file/file-to-base64', () => ({
  fileToBase64: (...args: unknown[]) => mockToBase64(...args),
}));
jest.mock('@/shared/lib/hooks/use-file-drop', () => ({
  useFileDrop: () => ({
    isDragging: false,
    handleDragEnter: jest.fn(),
    handleDragOver: jest.fn(),
    handleDragLeave: jest.fn(),
    handleDrop: jest.fn(),
  }),
}));
jest.mock('sonner', () => ({
  toast: {
    error: (...args: unknown[]) => mockToastError(...args),
    success: (...args: unknown[]) => mockToastSuccess(...args),
  },
}));

import { useProfileAvatar } from './use-profile-avatar';

const setDisabled = jest.fn();

const fileSelectEvent = (file: File | undefined) =>
  ({ target: { files: file ? [file] : [], value: 'x' } }) as unknown as ChangeEvent<HTMLInputElement>;

beforeEach(() => {
  jest.clearAllMocks();
  mockValidate.mockReturnValue(null);
  mockToBase64.mockResolvedValue('base64data');
  mockUpload.mockResolvedValue(undefined);
  mockDelete.mockResolvedValue(undefined);
});

describe('useProfileAvatar', () => {
  it('uploads a valid selected file', async () => {
    const { result } = renderHook(() =>
      useProfileAvatar({ userId: 'u1', canEdit: true, setDisabled }),
    );

    const file = new File(['x'], 'avatar.png', { type: 'image/png' });

    await act(async () => {
      await result.current.handleFileSelect(fileSelectEvent(file));
    });

    expect(mockUpload).toHaveBeenCalledWith({
      userId: 'u1',
      base64: 'base64data',
      size: file.size,
      type: 'image/png',
    });
    expect(mockToastSuccess).toHaveBeenCalled();
    expect(setDisabled).toHaveBeenCalledWith(false);
  });

  it('rejects an invalid file with a toast and skips upload', async () => {
    mockValidate.mockReturnValue('File is too big');

    const { result } = renderHook(() =>
      useProfileAvatar({ userId: 'u1', canEdit: true, setDisabled }),
    );

    const file = new File(['x'], 'avatar.png', { type: 'image/png' });

    await act(async () => {
      await result.current.handleFileSelect(fileSelectEvent(file));
    });

    expect(mockToastError).toHaveBeenCalledWith('File is too big');
    expect(mockUpload).not.toHaveBeenCalled();
  });

  it('deletes the avatar when editing is allowed', async () => {
    const { result } = renderHook(() =>
      useProfileAvatar({ userId: 'u1', canEdit: true, setDisabled }),
    );

    await act(async () => {
      await result.current.handleDelete();
    });

    expect(mockDelete).toHaveBeenCalledWith('u1');
    expect(mockToastSuccess).toHaveBeenCalled();
  });

  it('does nothing on delete when editing is not allowed', async () => {
    const { result } = renderHook(() =>
      useProfileAvatar({ userId: 'u1', canEdit: false, setDisabled }),
    );

    await act(async () => {
      await result.current.handleDelete();
    });

    expect(mockDelete).not.toHaveBeenCalled();
  });
});
