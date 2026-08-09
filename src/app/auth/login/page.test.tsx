import { render, screen } from '@testing-library/react';

import LoginPage from './page';

jest.mock('../../../features/auth/login/ui/login-form', () => ({
  LoginForm: () => <form aria-label="Login form" />,
}));

jest.mock('../../../widgets/auth-tabs/ui/auth-tabs', () => ({
  AuthTabs: () => <nav aria-label="Auth tabs" />,
}));

describe('LoginPage', () => {
  it('renders the login page', () => {
    render(<LoginPage />);

    expect(screen.getByRole('heading', { name: 'Welcome back' })).toBeInTheDocument();
    expect(screen.getByText('Hello again! Login to continue')).toBeInTheDocument();
    expect(screen.getByRole('form', { name: 'Login form' })).toBeInTheDocument();
    expect(screen.getByRole('navigation', { name: 'Auth tabs' })).toBeInTheDocument();
  });
});
