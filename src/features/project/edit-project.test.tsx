import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { toast } from 'sonner';

import { useProjectsList } from '@/entities/project/api/use-projects-list';
import { useUpdateCvProject } from '@/entities/project/api/use-update-cv-project';

import { EditProject } from './edit-project';

const mockUpdateCvProject = jest.fn();

jest.mock('../../entities/project/api/use-projects-list', () => ({
  useProjectsList: jest.fn(),
}));

jest.mock('../../entities/project/api/use-update-cv-project', () => ({
  useUpdateCvProject: jest.fn(),
}));

jest.mock('sonner', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

jest.mock('../../entities/project/ui/project-form', () => ({
  ProjectForm: ({
    form,
    disabled,
    projectLocked,
  }: {
    form: {
      register: (name: string) => Record<string, unknown>;
    };
    disabled?: boolean;
    projectLocked?: boolean;
  }) => (
    <div>
      <select
        aria-label="Project"
        disabled={disabled || projectLocked}
        {...form.register('projectId')}
      >
        <option value="project-1">HRM System</option>
        <option value="project-2">E-commerce</option>
      </select>

      <input
        aria-label="Start date"
        type="date"
        disabled={disabled}
        {...form.register('start_date')}
      />

      <input aria-label="End date" type="date" disabled={disabled} {...form.register('end_date')} />

      <textarea
        placeholder="Roles (one per line)"
        disabled={disabled}
        {...form.register('roles')}
      />

      <textarea
        placeholder="Responsibilities (one per line)"
        disabled={disabled}
        {...form.register('responsibilities')}
      />
    </div>
  ),
}));

jest.mock('../../shared/ui/entity-dialog', () => ({
  EntityDialog: ({
    children,
    title,
    submitText,
    loadingText,
    loading,
    submitDisabled,
    onSubmit,
    onCancel,
  }: {
    children: React.ReactNode;
    title: string;
    submitText: string;
    loadingText: string;
    loading?: boolean;
    submitDisabled?: boolean;
    onSubmit: () => void;
    onCancel: () => void;
  }) => (
    <div>
      <h2>{title}</h2>

      {children}

      <button type="button" disabled={submitDisabled} onClick={onSubmit}>
        {loading ? loadingText : submitText}
      </button>

      <button type="button" onClick={onCancel}>
        Cancel
      </button>
    </div>
  ),
}));

const project = {
  projectId: 'project-1',
  name: 'HRM System',
  start_date: '2026-01-01T00:00:00.000Z',
  end_date: '2026-06-01T00:00:00.000Z',
  roles: ['Frontend developer', 'React developer'],
  responsibilities: ['Develop frontend', 'Fix bugs'],
};

describe('EditProject', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    jest.mocked(useProjectsList).mockReturnValue({
      projects: [
        { id: 'project-1', name: 'HRM System' },
        { id: 'project-2', name: 'E-commerce' },
      ],
    } as never);

    jest.mocked(useUpdateCvProject).mockReturnValue([
      mockUpdateCvProject,
      {
        loading: false,
      },
    ] as never);
  });

  it('renders the edit project dialog with project values', () => {
    render(<EditProject cvId="cv-123" project={project} open onOpenChange={jest.fn()} />);

    expect(screen.getByText('Edit project')).toBeInTheDocument();

    expect(screen.getByLabelText('Project')).toHaveValue('project-1');
    expect(screen.getByLabelText('Project')).toBeDisabled();

    expect(screen.getByLabelText('Start date')).toHaveValue('2026-01-01');
    expect(screen.getByLabelText('End date')).toHaveValue('2026-06-01');

    expect(screen.getByPlaceholderText('Roles (one per line)')).toHaveValue(
      'Frontend developer\nReact developer',
    );

    expect(screen.getByPlaceholderText('Responsibilities (one per line)')).toHaveValue(
      'Develop frontend\nFix bugs',
    );

    expect(screen.getByRole('button', { name: /save/i })).toBeInTheDocument();
  });

  it('updates the CV project with form values', async () => {
    const user = userEvent.setup();

    mockUpdateCvProject.mockResolvedValue({
      data: {
        updateCvProject: {
          id: 'cv-project-1',
        },
      },
    });

    const onOpenChange = jest.fn();

    render(<EditProject cvId="cv-123" project={project} open onOpenChange={onOpenChange} />);

    const startDate = screen.getByLabelText('Start date');
    const endDate = screen.getByLabelText('End date');
    const roles = screen.getByPlaceholderText('Roles (one per line)');
    const responsibilities = screen.getByPlaceholderText('Responsibilities (one per line)');

    await user.clear(startDate);
    await user.type(startDate, '2026-02-01');

    await user.clear(endDate);
    await user.type(endDate, '2026-07-01');

    await user.clear(roles);
    await user.type(roles, 'Senior Frontend developer\nTeam Lead');

    await user.clear(responsibilities);
    await user.type(responsibilities, 'Develop frontend\nReview pull requests');

    await user.click(screen.getByRole('button', { name: /save/i }));

    await waitFor(() => {
      expect(mockUpdateCvProject).toHaveBeenCalledWith({
        variables: {
          project: {
            cvId: 'cv-123',
            projectId: 'project-1',
            start_date: '2026-02-01',
            end_date: '2026-07-01',
            roles: ['Senior Frontend developer', 'Team Lead'],
            responsibilities: ['Develop frontend', 'Review pull requests'],
          },
        },
      });
    });
  });

  it('converts empty end date to null', async () => {
    const user = userEvent.setup();

    mockUpdateCvProject.mockResolvedValue({
      data: {
        updateCvProject: {
          id: 'cv-project-1',
        },
      },
    });

    render(<EditProject cvId="cv-123" project={project} open onOpenChange={jest.fn()} />);

    const endDate = screen.getByLabelText('End date');

    await user.clear(endDate);

    await user.click(screen.getByRole('button', { name: /save/i }));

    await waitFor(() => {
      expect(mockUpdateCvProject).toHaveBeenCalledWith({
        variables: {
          project: {
            cvId: 'cv-123',
            projectId: 'project-1',
            start_date: '2026-01-01',
            end_date: null,
            roles: ['Frontend developer', 'React developer'],
            responsibilities: ['Develop frontend', 'Fix bugs'],
          },
        },
      });
    });
  });

  it('shows success toast and closes the dialog after successful update', async () => {
    const user = userEvent.setup();

    mockUpdateCvProject.mockResolvedValue({
      data: {
        updateCvProject: {
          id: 'cv-project-1',
        },
      },
    });

    const onOpenChange = jest.fn();

    render(<EditProject cvId="cv-123" project={project} open onOpenChange={onOpenChange} />);

    await user.click(screen.getByRole('button', { name: /save/i }));

    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith('Project updated successfully');
    });

    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it('shows error toast when project update fails', async () => {
    const user = userEvent.setup();

    mockUpdateCvProject.mockRejectedValue(new Error('Update failed'));

    const onOpenChange = jest.fn();

    render(<EditProject cvId="cv-123" project={project} open onOpenChange={onOpenChange} />);

    await user.click(screen.getByRole('button', { name: /save/i }));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('Failed to update project');
    });

    expect(onOpenChange).not.toHaveBeenCalledWith(false);
  });

  it('disables the form and shows loading text while project is being updated', () => {
    jest.mocked(useUpdateCvProject).mockReturnValue([
      mockUpdateCvProject,
      {
        loading: true,
      },
    ] as never);

    render(<EditProject cvId="cv-123" project={project} open onOpenChange={jest.fn()} />);

    expect(screen.getByLabelText('Project')).toBeDisabled();
    expect(screen.getByLabelText('Start date')).toBeDisabled();
    expect(screen.getByLabelText('End date')).toBeDisabled();

    expect(screen.getByPlaceholderText('Roles (one per line)')).toBeDisabled();

    expect(screen.getByPlaceholderText('Responsibilities (one per line)')).toBeDisabled();

    expect(screen.getByRole('button', { name: 'Saving...' })).toBeDisabled();
  });

  it('closes the dialog when cancel is clicked', async () => {
    const user = userEvent.setup();
    const onOpenChange = jest.fn();

    render(<EditProject cvId="cv-123" project={project} open onOpenChange={onOpenChange} />);

    await user.click(screen.getByRole('button', { name: /cancel/i }));

    expect(onOpenChange).toHaveBeenCalledWith(false);
  });
});
