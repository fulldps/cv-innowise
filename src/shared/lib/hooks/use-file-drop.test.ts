import type { DragEvent } from 'react';

import { act, renderHook } from '@testing-library/react';

import { useFileDrop } from './use-file-drop';

const dragEvent = (over: Record<string, unknown> = {}) =>
  ({
    preventDefault: jest.fn(),
    currentTarget: { contains: () => false },
    relatedTarget: null,
    dataTransfer: { files: [] },
    ...over,
  }) as unknown as DragEvent<HTMLDivElement>;

describe('useFileDrop', () => {
  it('toggles dragging on enter and leave', () => {
    const { result } = renderHook(() => useFileDrop({ onFile: jest.fn() }));

    act(() => result.current.handleDragEnter(dragEvent()));
    expect(result.current.isDragging).toBe(true);

    act(() => result.current.handleDragLeave(dragEvent()));
    expect(result.current.isDragging).toBe(false);
  });

  it('calls onFile with the dropped file', async () => {
    const onFile = jest.fn();
    const file = new File(['x'], 'a.png', { type: 'image/png' });

    const { result } = renderHook(() => useFileDrop({ onFile }));

    await act(async () => {
      await result.current.handleDrop(dragEvent({ dataTransfer: { files: [file] } }));
    });

    expect(onFile).toHaveBeenCalledWith(file);
    expect(result.current.isDragging).toBe(false);
  });

  it('ignores events when disabled', () => {
    const onFile = jest.fn();
    const { result } = renderHook(() => useFileDrop({ disabled: true, onFile }));

    act(() => result.current.handleDragEnter(dragEvent()));
    expect(result.current.isDragging).toBe(false);
  });
});
