import { render, screen } from '@testing-library/react';

import ForgotPasswordPage from './page';

jest.mock('../../../features/auth/forgot-password/ui/forgot-password-form', () => ({
  ForgotPasswordForm: () => <form aria-label="Forgot password form" />,
}));

describe('ForgotPasswordPage', () => {
  it('renders the forgot password page', () => {
    render(<ForgotPasswordPage />);

    expect(screen.getByRole('heading', { name: 'Forgot password' })).toBeInTheDocument();
    expect(
      screen.getByText('We will send you an email with further instructions'),
    ).toBeInTheDocument();
    expect(screen.getByRole('form', { name: 'Forgot password form' })).toBeInTheDocument();
  });
});
