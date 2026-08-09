import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { toast } from 'sonner';

import { useCreateCv } from '../../entities/cv/api/use-create-cv';
import { useCurrentUser } from '../../entities/user';

import { CreateCv } from './create-cv';

const mockCreateCv = jest.fn();

jest.mock('../../entities/cv/api/use-create-cv', () => ({
  useCreateCv: jest.fn(),
}));

jest.mock('../../entities/user', () => ({
  useCurrentUser: jest.fn(),
}));

jest.mock('sonner', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

jest.mock('../../entities/cv/ui/cv-form', () => ({
  CvForm: ({
    form,
    disabled,
  }: {
    form: {
      register: (name: string) => Record<string, unknown>;
    };
    disabled?: boolean;
  }) => (
    <div>
      <input placeholder="Name" disabled={disabled} {...form.register('name')} />
      <input placeholder="Education" disabled={disabled} {...form.register('education')} />
      <textarea placeholder="Description" disabled={disabled} {...form.register('description')} />
    </div>
  ),
}));

jest.mock('../../shared/ui/entity-dialog', () => ({
  EntityDialog: ({
    children,
    onSubmit,
    onCancel,
    submitDisabled,
  }: {
    children: React.ReactNode;
    onSubmit: () => void;
    onCancel: () => void;
    submitDisabled?: boolean;
  }) => (
    <div>
      <h2>Create CV</h2>

      {children}

      <button type="button" disabled={submitDisabled} onClick={onSubmit}>
        Create
      </button>

      <button type="button" onClick={onCancel}>
        Cancel
      </button>
    </div>
  ),
}));

describe('CreateCv', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    jest.mocked(useCreateCv).mockReturnValue([
      mockCreateCv,
      {
        loading: false,
      },
    ] as never);

    jest.mocked(useCurrentUser).mockReturnValue({
      id: 'user-123',
    } as never);
  });

  it('renders the create CV dialog', () => {
    render(<CreateCv open onOpenChange={jest.fn()} />);

    expect(screen.getByText('Create CV')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Education')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Description')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /create/i })).toBeInTheDocument();
  });

  it('creates a CV with form values and current user id', async () => {
    mockCreateCv.mockResolvedValue({
      data: {
        createCv: {
          id: 'cv-1',
          name: 'My CV',
          description: 'Frontend developer',
        },
      },
    });

    const user = userEvent.setup();
    const onOpenChange = jest.fn();

    render(<CreateCv open onOpenChange={onOpenChange} />);

    await user.type(screen.getByPlaceholderText('Name'), 'My CV');
    await user.type(screen.getByPlaceholderText('Education'), 'BSUIR');
    await user.type(screen.getByPlaceholderText('Description'), 'Frontend developer');

    await user.click(screen.getByRole('button', { name: /create/i }));

    await waitFor(() => {
      expect(mockCreateCv).toHaveBeenCalledWith({
        variables: {
          cv: {
            name: 'My CV',
            description: 'Frontend developer',
            education: 'BSUIR',
            userId: 'user-123',
          },
        },
      });
    });
  });

  it('shows success toast and closes the dialog after successful creation', async () => {
    mockCreateCv.mockResolvedValue({
      data: {
        createCv: {
          id: 'cv-1',
          name: 'My CV',
          description: 'Frontend developer',
        },
      },
    });

    const user = userEvent.setup();
    const onOpenChange = jest.fn();

    render(<CreateCv open onOpenChange={onOpenChange} />);

    await user.type(screen.getByPlaceholderText('Name'), 'My CV');
    await user.type(screen.getByPlaceholderText('Description'), 'Frontend developer');

    await user.click(screen.getByRole('button', { name: /create/i }));

    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith('CV created successfully');
    });

    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it('shows error toast when CV creation fails', async () => {
    mockCreateCv.mockRejectedValue(new Error('Creation failed'));

    const user = userEvent.setup();
    const onOpenChange = jest.fn();

    render(<CreateCv open onOpenChange={onOpenChange} />);

    await user.type(screen.getByPlaceholderText('Name'), 'My CV');
    await user.type(screen.getByPlaceholderText('Description'), 'Frontend developer');

    await user.click(screen.getByRole('button', { name: /create/i }));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('Failed to create CV');
    });

    expect(onOpenChange).not.toHaveBeenCalledWith(false);
  });

  it('closes the dialog when cancel is clicked', async () => {
    const user = userEvent.setup();
    const onOpenChange = jest.fn();

    render(<CreateCv open onOpenChange={onOpenChange} />);

    await user.click(screen.getByRole('button', { name: /cancel/i }));

    expect(onOpenChange).toHaveBeenCalledWith(false);
  });
});
