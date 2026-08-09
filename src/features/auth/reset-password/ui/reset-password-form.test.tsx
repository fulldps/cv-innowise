import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { toast } from 'sonner';

import { ResetPasswordForm } from './reset-password-form';

const mockPush = jest.fn();

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
    refresh: jest.fn(),
  }),
}));

jest.mock('sonner', () => ({
  toast: {
    success: jest.fn(),
  },
}));

describe('ResetPasswordForm', () => {
  const originalFetch = global.fetch;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    global.fetch = originalFetch;
  });

  it('shows validation error when password is too short', async () => {
    const user = userEvent.setup();

    render(<ResetPasswordForm token="reset-token" />);

    await user.type(screen.getByLabelText('New password'), 'short');

    await user.click(screen.getByRole('button', { name: /reset password/i }));

    expect(await screen.findByText('Password must be at least 8 characters')).toBeInTheDocument();
  });

  it('shows the backend error when password reset fails', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      json: async () => ({
        error: 'Invalid or expired token',
      }),
    }) as jest.Mock;

    const user = userEvent.setup();

    render(<ResetPasswordForm token="reset-token" />);

    await user.type(screen.getByLabelText('New password'), 'password123');

    await user.click(screen.getByRole('button', { name: /reset password/i }));

    expect(await screen.findByText('Invalid or expired token')).toBeInTheDocument();

    expect(mockPush).not.toHaveBeenCalled();
    expect(toast.success).not.toHaveBeenCalled();
  });

  it('resets the password and redirects to login on success', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
    }) as jest.Mock;

    const user = userEvent.setup();

    render(<ResetPasswordForm token="reset-token" />);

    await user.type(screen.getByLabelText('New password'), 'newpassword123');

    await user.click(screen.getByRole('button', { name: /reset password/i }));

    expect(global.fetch).toHaveBeenCalledWith('/api/auth/reset', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token: 'reset-token',
        newPassword: 'newpassword123',
      }),
    });

    expect(toast.success).toHaveBeenCalledWith('Password reset. You can log in now.');

    expect(mockPush).toHaveBeenCalledWith('/auth/login');
  });
});
