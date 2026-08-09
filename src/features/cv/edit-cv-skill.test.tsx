import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { toast } from 'sonner';

import { useUpdateCvSkill } from '../../entities/cv/api/use-cv-skill-mutations';

import { EditCvSkill } from './edit-cv-skill';

const mockUpdateCvSkill = jest.fn();
const mockUseUpdateCvSkill = jest.fn();

jest.mock('../../entities/cv/api/use-cv-skill-mutations', () => ({
  useUpdateCvSkill: jest.fn(),
}));

jest.mock('../../entities/skill', () => ({
  MASTERY_OPTIONS: [
    { id: 'Novice', name: 'Novice' },
    { id: 'Advanced', name: 'Advanced' },
    { id: 'Competent', name: 'Competent' },
    { id: 'Proficient', name: 'Proficient' },
    { id: 'Expert', name: 'Expert' },
  ],
}));

jest.mock('sonner', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

jest.mock('../../shared/ui/entity-dialog', () => ({
  EntityDialog: ({
    children,
    onSubmit,
    onCancel,
    submitDisabled,
    loading,
    title,
    submitText,
    loadingText,
  }: {
    children: React.ReactNode;
    onSubmit: () => void;
    onCancel: () => void;
    submitDisabled?: boolean;
    loading?: boolean;
    title: string;
    submitText: string;
    loadingText: string;
  }) => (
    <div>
      <h2>{title}</h2>

      {children}

      <button type="button" disabled={submitDisabled || loading} onClick={onSubmit}>
        {loading ? loadingText : submitText}
      </button>

      <button type="button" onClick={onCancel}>
        Cancel
      </button>
    </div>
  ),
}));

jest.mock('../../shared/ui/floating-select', () => ({
  FloatingSelect: ({
    label,
    value,
    onValueChange,
    options,
  }: {
    label: string;
    value: string;
    onValueChange: (value: string) => void;
    options: Array<{ id: string; name: string }>;
  }) => (
    <label>
      {label}

      <select
        aria-label={label}
        value={value}
        onChange={(event) => onValueChange(event.target.value)}
      >
        <option value="">Select {label}</option>

        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.name}
          </option>
        ))}
      </select>
    </label>
  ),
}));

const skill = {
  name: 'React',
  categoryId: 'frontend',
  mastery: 'Novice' as never,
};

describe('EditCvSkill', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    mockUseUpdateCvSkill.mockReturnValue({
      updateCvSkill: mockUpdateCvSkill,
      loading: false,
    });

    jest.mocked(useUpdateCvSkill).mockImplementation(mockUseUpdateCvSkill);
  });

  it('renders the edit skill dialog', () => {
    render(<EditCvSkill cvId="cv-1" skill={skill} open onOpenChange={jest.fn()} />);

    expect(screen.getByText('Edit React')).toBeInTheDocument();

    expect(screen.getByRole('combobox', { name: 'Mastery' })).toHaveValue('Novice');

    expect(screen.getByRole('button', { name: 'Update' })).toBeInTheDocument();

    expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument();
  });

  it('does not render when skill is null', () => {
    render(<EditCvSkill cvId="cv-1" skill={null} open onOpenChange={jest.fn()} />);

    expect(screen.queryByText(/edit/i)).not.toBeInTheDocument();

    expect(screen.queryByRole('button', { name: 'Update' })).not.toBeInTheDocument();
  });

  it('updates the CV skill with the correct values', async () => {
    const user = userEvent.setup();

    mockUpdateCvSkill.mockResolvedValue({
      data: {
        updateCvSkill: {
          id: 'cv-skill-1',
        },
      },
    });

    render(<EditCvSkill cvId="cv-1" skill={skill} open onOpenChange={jest.fn()} />);

    await user.selectOptions(screen.getByRole('combobox', { name: 'Mastery' }), 'Advanced');

    await user.click(screen.getByRole('button', { name: 'Update' }));

    await waitFor(() => {
      expect(mockUpdateCvSkill).toHaveBeenCalledWith({
        cvId: 'cv-1',
        name: 'React',
        categoryId: 'frontend',
        mastery: 'Advanced',
      });
    });
  });

  it('shows success toast and closes the dialog after successful update', async () => {
    const user = userEvent.setup();
    const onOpenChange = jest.fn();

    mockUpdateCvSkill.mockResolvedValue({
      data: {
        updateCvSkill: {
          id: 'cv-skill-1',
        },
      },
    });

    render(<EditCvSkill cvId="cv-1" skill={skill} open onOpenChange={onOpenChange} />);

    await user.selectOptions(screen.getByRole('combobox', { name: 'Mastery' }), 'Advanced');

    await user.click(screen.getByRole('button', { name: 'Update' }));

    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith('Skill updated successfully');
    });

    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it('shows error toast when updating a skill fails', async () => {
    const user = userEvent.setup();
    const onOpenChange = jest.fn();

    mockUpdateCvSkill.mockRejectedValue(new Error('Update failed'));

    render(<EditCvSkill cvId="cv-1" skill={skill} open onOpenChange={onOpenChange} />);

    await user.selectOptions(screen.getByRole('combobox', { name: 'Mastery' }), 'Advanced');

    await user.click(screen.getByRole('button', { name: 'Update' }));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('Failed to update skill');
    });

    expect(onOpenChange).not.toHaveBeenCalledWith(false);
  });

  it('closes the dialog when cancel is clicked', async () => {
    const user = userEvent.setup();
    const onOpenChange = jest.fn();

    render(<EditCvSkill cvId="cv-1" skill={skill} open onOpenChange={onOpenChange} />);

    await user.click(screen.getByRole('button', { name: /cancel/i }));

    expect(onOpenChange).toHaveBeenCalledWith(false);
  });
});
