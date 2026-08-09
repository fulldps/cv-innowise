import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { toast } from 'sonner';

import { useUpdateCv } from '../../entities/cv/api/use-update-cv';
import { useCurrentUser, USER_ROLE } from '../../entities/user';

import { UpdateCv } from './update-cv';

const mockUpdateCv = jest.fn();

jest.mock('../../entities/cv/api/use-update-cv', () => ({
  useUpdateCv: jest.fn(),
}));

jest.mock('../../entities/user', () => ({
  useCurrentUser: jest.fn(),
  USER_ROLE: {
    Admin: 'Admin',
  },
}));

jest.mock('sonner', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

describe('UpdateCv', () => {
  const cv = {
    id: 'cv-1',
    name: 'My CV',
    description: 'Frontend developer',
    education: 'BSUIR',
    user: {
      id: 'user-123',
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();

    jest.mocked(useUpdateCv).mockReturnValue([
      mockUpdateCv,
      {
        loading: false,
      },
    ] as never);

    jest.mocked(useCurrentUser).mockReturnValue({
      id: 'user-123',
      role: 'User',
    } as never);
  });

  it('renders the update form for the CV owner', () => {
    render(<UpdateCv cv={cv} />);

    expect(screen.getByLabelText('Name')).toHaveValue('My CV');
    expect(screen.getByLabelText('Education')).toHaveValue('BSUIR');
    expect(screen.getByLabelText('Description')).toHaveValue('Frontend developer');

    expect(screen.getByRole('button', { name: /update/i })).toBeInTheDocument();
  });

  it('does not render for a user who cannot manage the CV', () => {
    jest.mocked(useCurrentUser).mockReturnValue({
      id: 'another-user',
      role: 'User',
    } as never);

    render(<UpdateCv cv={cv} />);

    expect(screen.queryByRole('button', { name: /update/i })).not.toBeInTheDocument();
  });

  it('renders for an admin user', () => {
    jest.mocked(useCurrentUser).mockReturnValue({
      id: 'another-user',
      role: USER_ROLE.Admin,
    } as never);

    render(<UpdateCv cv={cv} />);

    expect(screen.getByRole('button', { name: /update/i })).toBeInTheDocument();
  });

  it('updates the CV with the correct id and form values', async () => {
    mockUpdateCv.mockResolvedValue({
      data: {
        updateCv: {
          id: 'cv-1',
          name: 'Updated CV',
          description: 'Updated description',
          education: 'Updated education',
        },
      },
    });

    const user = userEvent.setup();

    render(<UpdateCv cv={cv} />);

    const nameInput = screen.getByLabelText('Name');
    const educationInput = screen.getByLabelText('Education');
    const descriptionInput = screen.getByLabelText('Description');

    await user.clear(nameInput);
    await user.type(nameInput, 'Updated CV');

    await user.clear(educationInput);
    await user.type(educationInput, 'Updated education');

    await user.clear(descriptionInput);
    await user.type(descriptionInput, 'Updated description');

    await user.click(screen.getByRole('button', { name: /update/i }));

    await waitFor(() => {
      expect(mockUpdateCv).toHaveBeenCalledWith({
        variables: {
          cv: {
            cvId: 'cv-1',
            name: 'Updated CV',
            description: 'Updated description',
            education: 'Updated education',
          },
        },
      });
    });
  });

  it('shows success toast after successful update', async () => {
    mockUpdateCv.mockResolvedValue({
      data: {
        updateCv: {
          id: 'cv-1',
        },
      },
    });

    const user = userEvent.setup();

    render(<UpdateCv cv={cv} />);

    await user.click(screen.getByRole('button', { name: /update/i }));

    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith('CV updated successfully');
    });
  });

  it('shows error toast when update fails', async () => {
    mockUpdateCv.mockRejectedValue(new Error('Update failed'));

    const user = userEvent.setup();

    render(<UpdateCv cv={cv} />);

    await user.click(screen.getByRole('button', { name: /update/i }));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('Failed to update CV');
    });
  });
});
