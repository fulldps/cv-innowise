import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { toast } from 'sonner';

import { useAddCvProject } from '@/entities/project/api/use-add-cv-project';
import { useProjectsList } from '@/entities/project/api/use-projects-list';

import { AddProject } from './add-project';

const mockAddCvProject = jest.fn();

jest.mock('../../entities/project/api/use-add-cv-project', () => ({
  useAddCvProject: jest.fn(),
}));

jest.mock('../../entities/project/api/use-projects-list', () => ({
  useProjectsList: jest.fn(),
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
  }: {
    form: {
      register: (name: string) => Record<string, unknown>;
      control: unknown;
    };
    disabled?: boolean;
  }) => (
    <div>
      <select aria-label="Project" disabled={disabled} {...form.register('projectId')}>
        <option value="">Select project</option>
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

describe('AddProject', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    jest.mocked(useProjectsList).mockReturnValue({
      projects: [
        { id: 'project-1', name: 'HRM System' },
        { id: 'project-2', name: 'E-commerce' },
      ],
    } as never);

    jest.mocked(useAddCvProject).mockReturnValue([
      mockAddCvProject,
      {
        loading: false,
      },
    ] as never);
  });

  it('renders the add project dialog', () => {
    render(<AddProject cvId="cv-123" open onOpenChange={jest.fn()} />);

    expect(screen.getByText('Add project')).toBeInTheDocument();
    expect(screen.getByLabelText('Project')).toBeInTheDocument();
    expect(screen.getByLabelText('Start date')).toBeInTheDocument();
    expect(screen.getByLabelText('End date')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Roles (one per line)')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Responsibilities (one per line)')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /add/i })).toBeInTheDocument();
  });

  it('adds a project with form values', async () => {
    const user = userEvent.setup();

    mockAddCvProject.mockResolvedValue({
      data: {
        addCvProject: {
          id: 'cv-project-1',
        },
      },
    });

    const onOpenChange = jest.fn();

    render(<AddProject cvId="cv-123" open onOpenChange={onOpenChange} />);

    await user.selectOptions(screen.getByLabelText('Project'), 'project-1');
    await user.type(screen.getByLabelText('Start date'), '2026-01-01');
    await user.type(screen.getByLabelText('End date'), '2026-06-01');

    await user.type(
      screen.getByPlaceholderText('Roles (one per line)'),
      'Frontend developer\nReact developer',
    );

    await user.type(
      screen.getByPlaceholderText('Responsibilities (one per line)'),
      'Develop frontend\nFix bugs',
    );

    await user.click(screen.getByRole('button', { name: /add/i }));

    await waitFor(() => {
      expect(mockAddCvProject).toHaveBeenCalledWith({
        variables: {
          project: {
            cvId: 'cv-123',
            projectId: 'project-1',
            start_date: '2026-01-01',
            end_date: '2026-06-01',
            roles: ['Frontend developer', 'React developer'],
            responsibilities: ['Develop frontend', 'Fix bugs'],
          },
        },
      });
    });
  });

  it('converts empty end date to null', async () => {
    const user = userEvent.setup();

    mockAddCvProject.mockResolvedValue({
      data: {
        addCvProject: {
          id: 'cv-project-1',
        },
      },
    });

    render(<AddProject cvId="cv-123" open onOpenChange={jest.fn()} />);

    await user.selectOptions(screen.getByLabelText('Project'), 'project-1');
    await user.type(screen.getByLabelText('Start date'), '2026-01-01');

    await user.click(screen.getByRole('button', { name: /add/i }));

    await waitFor(() => {
      expect(mockAddCvProject).toHaveBeenCalledWith({
        variables: {
          project: {
            cvId: 'cv-123',
            projectId: 'project-1',
            start_date: '2026-01-01',
            end_date: null,
            roles: [],
            responsibilities: [],
          },
        },
      });
    });
  });

  it('shows success toast and closes the dialog after successful addition', async () => {
    const user = userEvent.setup();

    mockAddCvProject.mockResolvedValue({
      data: {
        addCvProject: {
          id: 'cv-project-1',
        },
      },
    });

    const onOpenChange = jest.fn();

    render(<AddProject cvId="cv-123" open onOpenChange={onOpenChange} />);

    await user.selectOptions(screen.getByLabelText('Project'), 'project-1');
    await user.type(screen.getByLabelText('Start date'), '2026-01-01');

    await user.click(screen.getByRole('button', { name: /add/i }));

    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith('Project added successfully');
    });

    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it('shows error toast when project addition fails', async () => {
    const user = userEvent.setup();

    mockAddCvProject.mockRejectedValue(new Error('Creation failed'));

    const onOpenChange = jest.fn();

    render(<AddProject cvId="cv-123" open onOpenChange={onOpenChange} />);

    await user.selectOptions(screen.getByLabelText('Project'), 'project-1');
    await user.type(screen.getByLabelText('Start date'), '2026-01-01');

    await user.click(screen.getByRole('button', { name: /add/i }));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('Failed to add project');
    });

    expect(onOpenChange).not.toHaveBeenCalledWith(false);
  });

  it('disables the form and shows loading text while project is being added', () => {
    jest.mocked(useAddCvProject).mockReturnValue([
      mockAddCvProject,
      {
        loading: true,
      },
    ] as never);

    render(<AddProject cvId="cv-123" open onOpenChange={jest.fn()} />);

    expect(screen.getByLabelText('Project')).toBeDisabled();
    expect(screen.getByLabelText('Start date')).toBeDisabled();
    expect(screen.getByLabelText('End date')).toBeDisabled();
    expect(screen.getByPlaceholderText('Roles (one per line)')).toBeDisabled();
    expect(screen.getByPlaceholderText('Responsibilities (one per line)')).toBeDisabled();

    expect(screen.getByRole('button', { name: 'Adding...' })).toBeDisabled();
  });

  it('closes the dialog when cancel is clicked', async () => {
    const user = userEvent.setup();
    const onOpenChange = jest.fn();

    render(<AddProject cvId="cv-123" open onOpenChange={onOpenChange} />);

    await user.click(screen.getByRole('button', { name: /cancel/i }));

    expect(onOpenChange).toHaveBeenCalledWith(false);
  });
});
