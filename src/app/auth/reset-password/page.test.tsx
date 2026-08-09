import { render, screen } from '@testing-library/react';

import ResetPasswordPage from './page';

const mockRedirect = jest.fn();

jest.mock('next/navigation', () => ({
  redirect: (path: string) => mockRedirect(path),
}));

jest.mock('../../../features/auth/reset-password/ui/reset-password-form', () => ({
  ResetPasswordForm: ({ token }: { token: string }) => (
    <form aria-label="Reset password form">
      <span>{token}</span>
    </form>
  ),
}));

describe('ResetPasswordPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('redirects to login when token is missing', async () => {
    await ResetPasswordPage({
      searchParams: Promise.resolve({}),
    });

    expect(mockRedirect).toHaveBeenCalledWith('/auth/login');
  });

  it('renders reset password page with token', async () => {
    render(
      await ResetPasswordPage({
        searchParams: Promise.resolve({ token: 'reset-token' }),
      }),
    );

    expect(screen.getByRole('heading', { name: 'Reset password' })).toBeInTheDocument();
    expect(screen.getByText('Enter your new password')).toBeInTheDocument();
    expect(screen.getByRole('form', { name: 'Reset password form' })).toBeInTheDocument();
    expect(screen.getByText('reset-token')).toBeInTheDocument();

    expect(mockRedirect).not.toHaveBeenCalled();
  });
});
