import { act, renderHook } from '@testing-library/react';

import type { EditingUserSkill } from '@/features/users/edit-user-skill';

import { useUserSkills } from './use-user-skills';

const skill = { name: 'React', categoryId: 'c1', mastery: 'Expert' } as unknown as EditingUserSkill;

describe('useUserSkills', () => {
  it('enters delete mode and clears selection on cancel', () => {
    const { result } = renderHook(() => useUserSkills());

    expect(result.current.deleteMode).toBe(false);

    act(() => result.current.enterDeleteMode());
    act(() => result.current.toggleSkillSelection('React'));

    expect(result.current.deleteMode).toBe(true);
    expect(result.current.selectedSkills.has('React')).toBe(true);

    act(() => result.current.cancelDeleteMode());

    expect(result.current.deleteMode).toBe(false);
    expect(result.current.selectedSkills.size).toBe(0);
  });

  it('toggles a skill selection on and off', () => {
    const { result } = renderHook(() => useUserSkills());

    act(() => result.current.toggleSkillSelection('React'));
    expect(result.current.selectedSkills.has('React')).toBe(true);

    act(() => result.current.toggleSkillSelection('React'));
    expect(result.current.selectedSkills.has('React')).toBe(false);
  });

  it('opens and closes the edit dialog with the skill', () => {
    const { result } = renderHook(() => useUserSkills());

    act(() => result.current.openEditDialog(skill));
    expect(result.current.editDialogOpen).toBe(true);
    expect(result.current.editingUserSkill).toEqual(skill);

    act(() => result.current.closeEditDialog());
    expect(result.current.editDialogOpen).toBe(false);
    expect(result.current.editingUserSkill).toBeNull();
  });

  it('opens and closes the add dialog', () => {
    const { result } = renderHook(() => useUserSkills());

    act(() => result.current.openAddDialog());
    expect(result.current.addDialogOpen).toBe(true);

    act(() => result.current.closeAddDialog());
    expect(result.current.addDialogOpen).toBe(false);
  });
});
