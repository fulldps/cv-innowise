import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { DeleteCv } from './delete-cv';
import { toast } from 'sonner';

const mockDeleteCv = jest.fn();
const mockUseCurrentUser = jest.fn();

jest.mock('../../entities/cv/api/use-delete-cv', () => ({
  useDeleteCv: () => [
    mockDeleteCv,
    {
      loading: false,
    },
  ],
}));

jest.mock('../../entities/user', () => ({
  USER_ROLE: {
    Admin: 'Admin',
  },
  useCurrentUser: () => mockUseCurrentUser(),
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
      {children}{' '}
    </button>
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
        // Error is already handled inside DeleteCv.
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

const ownerCv = {
  id: 'cv-1',
  name: 'My CV',
  user: {
    id: 'user-123',
  },
};

describe('DeleteCv', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    mockUseCurrentUser.mockReturnValue({
      id: 'user-123',
      role: 'User',
    });

    mockDeleteCv.mockResolvedValue({
      data: {
        deleteCv: {
          affected: 1,
        },
      },
    });
  });

  it('renders delete action for the CV owner', () => {
    render(<DeleteCv cv={ownerCv} />);

    expect(screen.getByRole('button', { name: /delete cv/i })).toBeInTheDocument();
  });

  it('renders delete action for an admin', () => {
    mockUseCurrentUser.mockReturnValue({
      id: 'another-user',
      role: 'Admin',
    });

    render(<DeleteCv cv={ownerCv} />);

    expect(screen.getByRole('button', { name: /delete cv/i })).toBeInTheDocument();
  });

  it('does not render delete action for another user', () => {
    mockUseCurrentUser.mockReturnValue({
      id: 'another-user',
      role: 'User',
    });

    render(<DeleteCv cv={ownerCv} />);

    expect(screen.queryByRole('button', { name: /delete cv/i })).not.toBeInTheDocument();
  });

  it('opens confirmation dialog when delete action is clicked', async () => {
    const user = userEvent.setup();

    render(<DeleteCv cv={ownerCv} />);

    await user.click(screen.getByRole('button', { name: /delete cv/i }));

    expect(screen.getByText(/are you sure you want to delete cv my cv/i)).toBeInTheDocument();

    expect(screen.getByRole('button', { name: /confirm/i })).toBeInTheDocument();
  });

  it('deletes CV and shows success toast after confirmation', async () => {
    const user = userEvent.setup();

    render(<DeleteCv cv={ownerCv} />);

    await user.click(screen.getByRole('button', { name: /delete cv/i }));

    await user.click(screen.getByRole('button', { name: /confirm/i }));

    await waitFor(() => {
      expect(mockDeleteCv).toHaveBeenCalledWith({
        variables: {
          cv: {
            cvId: 'cv-1',
          },
        },
      });
    });

    expect(toast.success).toHaveBeenCalledWith('CV deleted successfully');
  });

  it('shows error toast when deletion fails', async () => {
    const user = userEvent.setup();

    mockDeleteCv.mockRejectedValue(new Error('Deletion failed'));

    render(<DeleteCv cv={ownerCv} />);

    await user.click(screen.getByRole('button', { name: /delete cv/i }));

    await user.click(screen.getByRole('button', { name: /confirm/i }));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('Failed to delete CV');
    });
  });
});
