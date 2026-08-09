import { render, screen } from '@testing-library/react';

import SignupPage from './page';

jest.mock('../../../features/auth/signup/ui/signup-form', () => ({
  SignupForm: () => <form aria-label="Signup form" />,
}));

jest.mock('../../../widgets/auth-tabs/ui/auth-tabs', () => ({
  AuthTabs: () => <nav aria-label="Auth tabs" />,
}));

describe('SignupPage', () => {
  it('renders the signup page', () => {
    render(<SignupPage />);

    expect(screen.getByRole('heading', { name: 'Register now' })).toBeInTheDocument();
    expect(screen.getByText('Welcome! Sign up to continue')).toBeInTheDocument();
    expect(screen.getByRole('form', { name: 'Signup form' })).toBeInTheDocument();
    expect(screen.getByRole('navigation', { name: 'Auth tabs' })).toBeInTheDocument();
  });
});
