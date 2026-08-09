import { act, renderHook } from '@testing-library/react';

import { useSort } from './use-sort';

describe('useSort', () => {
  it('initializes with the given field and direction', () => {
    const { result } = renderHook(() => useSort('name'));

    expect(result.current.sort).toEqual({ field: 'name', direction: 'asc' });
  });

  it('toggles direction when the same field is sorted again', () => {
    const { result } = renderHook(() => useSort('name'));

    act(() => result.current.toggleSort('name'));
    expect(result.current.sort.direction).toBe('desc');

    act(() => result.current.toggleSort('name'));
    expect(result.current.sort.direction).toBe('asc');
  });

  it('resets to asc when a different field is chosen', () => {
    const { result } = renderHook(() => useSort<'name' | 'age'>('name', 'desc'));

    act(() => result.current.toggleSort('age'));

    expect(result.current.sort).toEqual({ field: 'age', direction: 'asc' });
  });
});
