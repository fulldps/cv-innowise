import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { toast } from 'sonner';

import { useAddCvSkill } from '../../entities/cv/api/use-cv-skill-mutations';

import { AddCvSkill } from './add-cv-skill';

const mockAddCvSkill = jest.fn();
const mockUseAddCvSkill = jest.fn();

jest.mock('../../entities/cv/api/use-cv-skill-mutations', () => ({
  useAddCvSkill: jest.fn(),
}));

jest.mock('../../entities/skill', () => ({
  MASTERY_OPTIONS: [
    { id: 'BEGINNER', name: 'Beginner' },
    { id: 'INTERMEDIATE', name: 'Intermediate' },
    { id: 'ADVANCED', name: 'Advanced' },
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
      {' '}
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
        {' '}
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

const availableSkills = [
  {
    id: 'skill-1',
    name: 'React',
    category: {
      id: 'frontend',
      name: 'Frontend',
      order: 1,
    },
    created_at: '2021-01-01',
    category_parent_name: 'Frontend',
  },
  {
    id: 'skill-2',
    name: 'TypeScript',
    category: null,
    created_at: '2021-01-01',
    category_parent_name: null,
  },
];

describe('AddCvSkill', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    mockUseAddCvSkill.mockReturnValue({
      addCvSkill: mockAddCvSkill,
      loading: false,
    });

    jest.mocked(useAddCvSkill).mockImplementation(mockUseAddCvSkill);
  });

  it('renders the add skill dialog', () => {
    render(
      <AddCvSkill cvId="cv-1" availableSkills={availableSkills} open onOpenChange={jest.fn()} />,
    );

    expect(screen.getByText('Add skill')).toBeInTheDocument();

    expect(screen.getByRole('combobox', { name: 'Skill' })).toBeInTheDocument();

    expect(screen.getByRole('combobox', { name: 'Mastery' })).toBeInTheDocument();

    expect(screen.getByRole('button', { name: 'Add' })).toBeInTheDocument();
  });

  it('disables Add button until skill and mastery are selected', () => {
    render(
      <AddCvSkill cvId="cv-1" availableSkills={availableSkills} open onOpenChange={jest.fn()} />,
    );

    expect(screen.getByRole('button', { name: 'Add' })).toBeDisabled();
  });

  it('adds a skill with the selected values', async () => {
    const user = userEvent.setup();
    const onOpenChange = jest.fn();

    mockAddCvSkill.mockResolvedValue({
      data: {
        addCvSkill: {
          id: 'cv-skill-1',
        },
      },
    });

    render(
      <AddCvSkill cvId="cv-1" availableSkills={availableSkills} open onOpenChange={onOpenChange} />,
    );

    await user.selectOptions(screen.getByRole('combobox', { name: 'Skill' }), 'skill-1');

    await user.selectOptions(screen.getByRole('combobox', { name: 'Mastery' }), 'INTERMEDIATE');

    await user.click(screen.getByRole('button', { name: 'Add' }));

    await waitFor(() => {
      expect(mockAddCvSkill).toHaveBeenCalledWith({
        cvId: 'cv-1',
        name: 'React',
        categoryId: 'frontend',
        mastery: 'INTERMEDIATE',
      });
    });
  });

  it('shows success toast and closes the dialog after successful addition', async () => {
    const user = userEvent.setup();
    const onOpenChange = jest.fn();

    mockAddCvSkill.mockResolvedValue({
      data: {
        addCvSkill: {
          id: 'cv-skill-1',
        },
      },
    });

    render(
      <AddCvSkill cvId="cv-1" availableSkills={availableSkills} open onOpenChange={onOpenChange} />,
    );

    await user.selectOptions(screen.getByRole('combobox', { name: 'Skill' }), 'skill-1');

    await user.selectOptions(screen.getByRole('combobox', { name: 'Mastery' }), 'INTERMEDIATE');

    await user.click(screen.getByRole('button', { name: 'Add' }));

    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith('Skill added successfully');
    });

    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it('uses null categoryId when the selected skill has no category', async () => {
    const user = userEvent.setup();
    const onOpenChange = jest.fn();

    mockAddCvSkill.mockResolvedValue({
      data: {
        addCvSkill: {
          id: 'cv-skill-2',
        },
      },
    });

    render(
      <AddCvSkill cvId="cv-1" availableSkills={availableSkills} open onOpenChange={onOpenChange} />,
    );

    await user.selectOptions(screen.getByRole('combobox', { name: 'Skill' }), 'skill-2');

    await user.selectOptions(screen.getByRole('combobox', { name: 'Mastery' }), 'ADVANCED');

    await user.click(screen.getByRole('button', { name: 'Add' }));

    await waitFor(() => {
      expect(mockAddCvSkill).toHaveBeenCalledWith({
        cvId: 'cv-1',
        name: 'TypeScript',
        categoryId: null,
        mastery: 'ADVANCED',
      });
    });
  });

  it('shows error toast when adding a skill fails', async () => {
    const user = userEvent.setup();
    const onOpenChange = jest.fn();

    mockAddCvSkill.mockRejectedValue(new Error('Failed to add skill'));

    render(
      <AddCvSkill cvId="cv-1" availableSkills={availableSkills} open onOpenChange={onOpenChange} />,
    );

    await user.selectOptions(screen.getByRole('combobox', { name: 'Skill' }), 'skill-1');

    await user.selectOptions(screen.getByRole('combobox', { name: 'Mastery' }), 'BEGINNER');

    await user.click(screen.getByRole('button', { name: 'Add' }));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('Failed to add skill');
    });

    expect(onOpenChange).not.toHaveBeenCalledWith(false);
  });

  it('closes the dialog when cancel is clicked', async () => {
    const user = userEvent.setup();
    const onOpenChange = jest.fn();

    render(
      <AddCvSkill cvId="cv-1" availableSkills={availableSkills} open onOpenChange={onOpenChange} />,
    );

    await user.click(screen.getByRole('button', { name: /cancel/i }));

    expect(onOpenChange).toHaveBeenCalledWith(false);
  });
});
