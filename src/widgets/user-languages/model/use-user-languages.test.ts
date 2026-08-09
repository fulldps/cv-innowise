import { act, renderHook } from '@testing-library/react';

import type { EditingUserLanguage } from '@/features/users/edit-user-language';

import { useUserLanguages } from './use-user-languages';

const language = { name: 'English', proficiency: 'C1' } as unknown as EditingUserLanguage;

describe('useUserLanguages', () => {
  it('enters delete mode and clears selection on cancel', () => {
    const { result } = renderHook(() => useUserLanguages());

    act(() => result.current.enterDeleteMode());
    act(() => result.current.toggleLanguageSelection('English'));

    expect(result.current.deleteMode).toBe(true);
    expect(result.current.selectedLanguages.has('English')).toBe(true);

    act(() => result.current.cancelDeleteMode());

    expect(result.current.deleteMode).toBe(false);
    expect(result.current.selectedLanguages.size).toBe(0);
  });

  it('toggles a language selection on and off', () => {
    const { result } = renderHook(() => useUserLanguages());

    act(() => result.current.toggleLanguageSelection('English'));
    expect(result.current.selectedLanguages.has('English')).toBe(true);

    act(() => result.current.toggleLanguageSelection('English'));
    expect(result.current.selectedLanguages.has('English')).toBe(false);
  });

  it('opens and closes the edit dialog with the language', () => {
    const { result } = renderHook(() => useUserLanguages());

    act(() => result.current.openEditDialog(language));
    expect(result.current.editDialogOpen).toBe(true);
    expect(result.current.editingUserLanguage).toEqual(language);

    act(() => result.current.closeEditDialog());
    expect(result.current.editDialogOpen).toBe(false);
    expect(result.current.editingUserLanguage).toBeNull();
  });

  it('opens and closes the add dialog', () => {
    const { result } = renderHook(() => useUserLanguages());

    act(() => result.current.openAddDialog());
    expect(result.current.addDialogOpen).toBe(true);

    act(() => result.current.closeAddDialog());
    expect(result.current.addDialogOpen).toBe(false);
  });
});
