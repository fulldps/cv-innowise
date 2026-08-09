import { act, renderHook } from '@testing-library/react';

import { useCvSkills } from './use-cv-skills';

describe('useCvSkills', () => {
  it('initializes with default state', () => {
    const { result } = renderHook(() => useCvSkills());

    expect(result.current.deleteMode).toBe(false);
    expect(result.current.selectedSkills).toEqual(new Set());

    expect(result.current.addDialogOpen).toBe(false);

    expect(result.current.editDialogOpen).toBe(false);
    expect(result.current.editingSkill).toBeNull();
  });

  it('enters delete mode', () => {
    const { result } = renderHook(() => useCvSkills());

    act(() => {
      result.current.enterDeleteMode();
    });

    expect(result.current.deleteMode).toBe(true);
  });

  it('cancels delete mode and clears selected skills', () => {
    const { result } = renderHook(() => useCvSkills());

    act(() => {
      result.current.enterDeleteMode();
      result.current.toggleSkillSelection('React');
      result.current.toggleSkillSelection('TypeScript');
    });

    expect(result.current.deleteMode).toBe(true);
    expect(result.current.selectedSkills).toEqual(new Set(['React', 'TypeScript']));

    act(() => {
      result.current.cancelDeleteMode();
    });

    expect(result.current.deleteMode).toBe(false);
    expect(result.current.selectedSkills).toEqual(new Set());
  });

  it('selects a skill when it is not selected', () => {
    const { result } = renderHook(() => useCvSkills());

    act(() => {
      result.current.toggleSkillSelection('React');
    });

    expect(result.current.selectedSkills).toEqual(new Set(['React']));
  });

  it('deselects a skill when it is already selected', () => {
    const { result } = renderHook(() => useCvSkills());

    act(() => {
      result.current.toggleSkillSelection('React');
    });

    expect(result.current.selectedSkills).toEqual(new Set(['React']));

    act(() => {
      result.current.toggleSkillSelection('React');
    });

    expect(result.current.selectedSkills).toEqual(new Set());
  });

  it('can select multiple skills', () => {
    const { result } = renderHook(() => useCvSkills());

    act(() => {
      result.current.toggleSkillSelection('React');
      result.current.toggleSkillSelection('TypeScript');
      result.current.toggleSkillSelection('Next.js');
    });

    expect(result.current.selectedSkills).toEqual(new Set(['React', 'TypeScript', 'Next.js']));
  });

  it('toggles one skill without affecting other selected skills', () => {
    const { result } = renderHook(() => useCvSkills());

    act(() => {
      result.current.toggleSkillSelection('React');
      result.current.toggleSkillSelection('TypeScript');
    });

    act(() => {
      result.current.toggleSkillSelection('React');
    });

    expect(result.current.selectedSkills).toEqual(new Set(['TypeScript']));
  });

  it('opens and closes add dialog', () => {
    const { result } = renderHook(() => useCvSkills());

    act(() => {
      result.current.openAddDialog();
    });

    expect(result.current.addDialogOpen).toBe(true);

    act(() => {
      result.current.closeAddDialog();
    });

    expect(result.current.addDialogOpen).toBe(false);
  });

  it('opens edit dialog with the selected skill', () => {
    const { result } = renderHook(() => useCvSkills());

    const skill = {
      skillId: 'skill-1',
      name: 'React',
      mastery: 'Expert',
    } as never;

    act(() => {
      result.current.openEditDialog(skill);
    });

    expect(result.current.editDialogOpen).toBe(true);
    expect(result.current.editingSkill).toBe(skill);
  });

  it('closes edit dialog and clears editing skill', () => {
    const { result } = renderHook(() => useCvSkills());

    const skill = {
      skillId: 'skill-1',
      name: 'React',
      mastery: 'Expert',
    } as never;

    act(() => {
      result.current.openEditDialog(skill);
    });

    expect(result.current.editDialogOpen).toBe(true);
    expect(result.current.editingSkill).toBe(skill);

    act(() => {
      result.current.closeEditDialog();
    });

    expect(result.current.editDialogOpen).toBe(false);
    expect(result.current.editingSkill).toBeNull();
  });

  it('can switch from one editing skill to another', () => {
    const { result } = renderHook(() => useCvSkills());

    const firstSkill = {
      skillId: 'skill-1',
      name: 'React',
      mastery: 'Expert',
    } as never;

    const secondSkill = {
      skillId: 'skill-2',
      name: 'TypeScript',
      mastery: 'Proficient',
    } as never;

    act(() => {
      result.current.openEditDialog(firstSkill);
    });

    expect(result.current.editingSkill).toBe(firstSkill);

    act(() => {
      result.current.openEditDialog(secondSkill);
    });

    expect(result.current.editingSkill).toBe(secondSkill);
    expect(result.current.editDialogOpen).toBe(true);
  });

  it('preserves selected skills when opening add dialog', () => {
    const { result } = renderHook(() => useCvSkills());

    act(() => {
      result.current.toggleSkillSelection('React');
    });

    act(() => {
      result.current.openAddDialog();
    });

    expect(result.current.addDialogOpen).toBe(true);
    expect(result.current.selectedSkills).toEqual(new Set(['React']));
  });

  it('preserves selected skills when opening edit dialog', () => {
    const { result } = renderHook(() => useCvSkills());

    const skill = {
      skillId: 'skill-1',
      name: 'React',
      mastery: 'Expert',
    } as never;

    act(() => {
      result.current.toggleSkillSelection('TypeScript');
      result.current.openEditDialog(skill);
    });

    expect(result.current.editDialogOpen).toBe(true);
    expect(result.current.editingSkill).toBe(skill);
    expect(result.current.selectedSkills).toEqual(new Set(['TypeScript']));
  });

  it('does not exit delete mode when selecting or deselecting skills', () => {
    const { result } = renderHook(() => useCvSkills());

    act(() => {
      result.current.enterDeleteMode();
      result.current.toggleSkillSelection('React');
    });

    expect(result.current.deleteMode).toBe(true);

    act(() => {
      result.current.toggleSkillSelection('React');
    });

    expect(result.current.deleteMode).toBe(true);
  });
});
