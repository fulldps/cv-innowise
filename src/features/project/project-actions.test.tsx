import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { toast } from 'sonner';

import { useRemoveCvProject } from '@/entities/project/api/use-remove-cv-project';

import { ProjectActions } from './project-actions';

const mockRemoveCvProject = jest.fn();

jest.mock('../../entities/project/api/use-remove-cv-project', () => ({
  useRemoveCvProject: jest.fn(),
}));

jest.mock('sonner', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

jest.mock('lucide-react', () => ({
  EllipsisVertical: () => <span data-testid="ellipsis-icon" />,
}));

jest.mock('../../shared/ui/button', () => ({
  Button: ({ children, ...props }: { children: React.ReactNode; [key: string]: unknown }) => (
    <button {...props}>{children}</button>
  ),
}));

jest.mock('../../shared/ui/dropdown-menu', () => ({
  DropdownMenu: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,

  DropdownMenuTrigger: ({ render }: { render: React.ReactElement }) => render,

  DropdownMenuContent: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,

  DropdownMenuItem: ({
    children,
    onClick,
  }: {
    children: React.ReactNode;
    onClick?: () => void;
  }) => (
    <button type="button" onClick={onClick}>
      {children}
    </button>
  ),
}));

jest.mock('./edit-project', () => ({
  EditProject: ({
    cvId,
    project,
    open,
    onOpenChange,
  }: {
    cvId: string;
    project: {
      projectId: string;
      name: string;
    };
    open: boolean;
    onOpenChange: (open: boolean) => void;
  }) => (
    <div data-testid="edit-project">
      {open && (
        <>
          <span>
            Editing {project.name} for {cvId}
          </span>

          <button type="button" onClick={() => onOpenChange(false)}>
            Close edit
          </button>
        </>
      )}
    </div>
  ),
}));

jest.mock('../../shared/ui/confirm-delete-dialog', () => ({
  ConfirmDeleteDialog: ({
    entityLabel,
    entityName,
    open,
    onDelete,
    loading,
  }: {
    entityLabel: string;
    entityName: string;
    open: boolean;
    onDelete: () => Promise<void>;
    loading?: boolean;
  }) => {
    if (!open) {
      return null;
    }

    const handleConfirm = async () => {
      try {
        await onDelete();
      } catch {
        // Error is already handled inside ProjectActions.
      }
    };

    return (
      <div>
        <p>
          Are you sure you want to delete {entityLabel} {entityName}?
        </p>

        <button type="button" disabled={loading}>
          Cancel
        </button>

        <button type="button" disabled={loading} onClick={handleConfirm}>
          Confirm
        </button>
      </div>
    );
  },
}));

const project = {
  projectId: 'project-1',
  name: 'HRM System',
  start_date: '2026-01-01',
  end_date: '2026-06-01',
  roles: ['Frontend developer'],
  responsibilities: ['Develop frontend'],
};

describe('ProjectActions', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    jest.mocked(useRemoveCvProject).mockReturnValue([
      mockRemoveCvProject,
      {
        loading: false,
      },
    ] as never);

    mockRemoveCvProject.mockResolvedValue({
      data: {
        removeCvProject: {
          id: 'cv-1',
        },
      },
    });
  });

  it('renders project actions menu', () => {
    render(<ProjectActions cvId="cv-123" project={project} />);

    expect(screen.getByTestId('ellipsis-icon')).toBeInTheDocument();

    expect(screen.getByRole('button', { name: /edit project/i })).toBeInTheDocument();

    expect(screen.getByRole('button', { name: /remove project/i })).toBeInTheDocument();
  });

  it('opens edit project when edit action is clicked', async () => {
    const user = userEvent.setup();

    render(<ProjectActions cvId="cv-123" project={project} />);

    await user.click(screen.getByRole('button', { name: /edit project/i }));

    expect(screen.getByText('Editing HRM System for cv-123')).toBeInTheDocument();
  });

  it('closes edit project when onOpenChange is called', async () => {
    const user = userEvent.setup();

    render(<ProjectActions cvId="cv-123" project={project} />);

    await user.click(screen.getByRole('button', { name: /edit project/i }));

    expect(screen.getByText('Editing HRM System for cv-123')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /close edit/i }));

    expect(screen.queryByText('Editing HRM System for cv-123')).not.toBeInTheDocument();
  });

  it('opens confirmation dialog when remove action is clicked', async () => {
    const user = userEvent.setup();

    render(<ProjectActions cvId="cv-123" project={project} />);

    await user.click(screen.getByRole('button', { name: /remove project/i }));

    expect(
      screen.getByText(/are you sure you want to delete project hrm system/i),
    ).toBeInTheDocument();

    expect(screen.getByRole('button', { name: /confirm/i })).toBeInTheDocument();
  });

  it('removes project and shows success toast after confirmation', async () => {
    const user = userEvent.setup();

    render(<ProjectActions cvId="cv-123" project={project} />);

    await user.click(screen.getByRole('button', { name: /remove project/i }));

    await user.click(screen.getByRole('button', { name: /confirm/i }));

    await waitFor(() => {
      expect(mockRemoveCvProject).toHaveBeenCalledWith({
        variables: {
          project: {
            cvId: 'cv-123',
            projectId: 'project-1',
          },
        },
      });
    });

    expect(toast.success).toHaveBeenCalledWith('Project removed successfully');
  });

  it('shows error toast when project removal fails', async () => {
    const user = userEvent.setup();

    mockRemoveCvProject.mockRejectedValue(new Error('Removal failed'));

    render(<ProjectActions cvId="cv-123" project={project} />);

    await user.click(screen.getByRole('button', { name: /remove project/i }));

    await user.click(screen.getByRole('button', { name: /confirm/i }));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('Failed to remove project');
    });
  });

  it('disables confirmation dialog while project is being removed', async () => {
    const user = userEvent.setup();

    jest.mocked(useRemoveCvProject).mockReturnValue([
      mockRemoveCvProject,
      {
        loading: true,
      },
    ] as never);

    render(<ProjectActions cvId="cv-123" project={project} />);

    await user.click(screen.getByRole('button', { name: /remove project/i }));

    expect(screen.getByRole('button', { name: /confirm/i })).toBeDisabled();

    expect(screen.getByRole('button', { name: /cancel/i })).toBeDisabled();
  });
});
