import { act, renderHook } from '@testing-library/react';

import { useDebounce } from './use-debounce';

beforeEach(() => jest.useFakeTimers());
afterEach(() => jest.useRealTimers());

describe('useDebounce', () => {
  it('returns the initial value immediately', () => {
    const { result } = renderHook(() => useDebounce('a', 200));
    expect(result.current).toBe('a');
  });

  it('updates the value only after the delay', () => {
    const { result, rerender } = renderHook(({ value }) => useDebounce(value, 200), {
      initialProps: { value: 'a' },
    });

    rerender({ value: 'b' });
    expect(result.current).toBe('a');

    act(() => {
      jest.advanceTimersByTime(200);
    });
    expect(result.current).toBe('b');
  });
});
