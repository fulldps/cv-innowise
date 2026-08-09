import { renderHook } from '@testing-library/react';
import { useMutation } from '@apollo/client/react';

import { useAddCvSkill, useDeleteCvSkill, useUpdateCvSkill } from './use-cv-skill-mutations';
import { Mastery } from '@/shared/api/graphql/graphql';

jest.mock('@apollo/client/react', () => ({
  useMutation: jest.fn(),
}));

describe('CV skill mutations', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    jest.mocked(useMutation).mockReturnValue([jest.fn(), { loading: false }] as never);
  });

  it('adds a CV skill with provided variables', () => {
    const mockMutation = jest.fn();

    jest.mocked(useMutation).mockReturnValue([mockMutation, { loading: false }] as never);

    const { result } = renderHook(() => useAddCvSkill());

    const skill = {
      cvId: 'cv-1',
      name: 'Skill 1',
      skillId: 'skill-1',
      mastery: 'Advanced' as Mastery,
    };

    result.current.addCvSkill(skill);

    expect(mockMutation).toHaveBeenCalledWith({
      variables: {
        skill,
      },
    });
  });

  it('updates a CV skill with provided variables', () => {
    const mockMutation = jest.fn();

    jest.mocked(useMutation).mockReturnValue([mockMutation, { loading: false }] as never);

    const { result } = renderHook(() => useUpdateCvSkill());

    const skill = {
      cvId: 'cv-1',
      name: 'Skill 1',
      skillId: 'skill-1',
      mastery: 'Expert' as Mastery,
    };

    result.current.updateCvSkill(skill);

    expect(mockMutation).toHaveBeenCalledWith({
      variables: {
        skill,
      },
    });
  });

  it('deletes a CV skill with provided variables', () => {
    const mockMutation = jest.fn();

    jest.mocked(useMutation).mockReturnValue([mockMutation, { loading: false }] as never);

    const { result } = renderHook(() => useDeleteCvSkill());

    const skill = {
      cvId: 'cv-1',
      name: ['Skill 1'],
      skillId: 'skill-1',
    };

    result.current.deleteCvSkill(skill);

    expect(mockMutation).toHaveBeenCalledWith({
      variables: {
        skill,
      },
    });
  });

  it('returns loading state', () => {
    jest.mocked(useMutation).mockReturnValue([jest.fn(), { loading: true }] as never);

    const { result } = renderHook(() => useAddCvSkill());

    expect(result.current.loading).toBe(true);
  });
});
