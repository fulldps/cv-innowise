import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { toast } from 'sonner';

import { ForgotPasswordForm } from './forgot-password-form';

jest.mock('sonner', () => ({
  toast: {
    success: jest.fn(),
  },
}));

describe('ForgotPasswordForm', () => {
  const originalFetch = global.fetch;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    global.fetch = originalFetch;
  });

  it('shows validation error on empty submit', async () => {
    render(<ForgotPasswordForm />);

    await userEvent.click(screen.getByRole('button', { name: /reset password/i }));

    expect(await screen.findByText('Invalid email')).toBeInTheDocument();
  });

  it('shows the backend error when password reset fails', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      json: async () => ({ error: 'User not found' }),
    }) as jest.Mock;

    render(<ForgotPasswordForm />);

    await userEvent.type(screen.getByLabelText('Email'), 'test@test.com');

    await userEvent.click(screen.getByRole('button', { name: /reset password/i }));

    expect(await screen.findByText('User not found')).toBeInTheDocument();
    expect(toast.success).not.toHaveBeenCalled();
  });

  it('shows success toast when password reset request succeeds', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
    }) as jest.Mock;

    render(<ForgotPasswordForm />);

    await userEvent.type(screen.getByLabelText('Email'), 'test@test.com');

    await userEvent.click(screen.getByRole('button', { name: /reset password/i }));

    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith('Check your email for reset instructions');
    });
  });
});
