import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { LoginForm } from './login-form';

const mockPush = jest.fn();
const mockRefresh = jest.fn();

jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: mockPush, refresh: mockRefresh }),
}));

describe('LoginForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('shows validation errors on empty submit', async () => {
    render(<LoginForm />);

    await userEvent.click(screen.getByRole('button', { name: /log in/i }));

    expect(await screen.findByText('Invalid email address')).toBeInTheDocument();
    expect(await screen.findByText('Password is required')).toBeInTheDocument();
  });

  it('shows the backend error on invalid credentials', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      json: async () => ({ error: 'Invalid credentials' }),
    }) as jest.Mock;

    render(<LoginForm />);

    await userEvent.type(screen.getByPlaceholderText('Email'), 'test@test.com');
    await userEvent.type(screen.getByPlaceholderText('Password'), 'wrongpass');
    await userEvent.click(screen.getByRole('button', { name: /log in/i }));

    expect(await screen.findByText('Invalid credentials')).toBeInTheDocument();
    expect(mockPush).not.toHaveBeenCalled();
  });

  it('redirects home on successful login', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ user: { id: '1', email: 'test@test.com' } }),
    }) as jest.Mock;

    render(<LoginForm />);

    await userEvent.type(screen.getByPlaceholderText('Email'), 'test@test.com');
    await userEvent.type(screen.getByPlaceholderText('Password'), 'password123');
    await userEvent.click(screen.getByRole('button', { name: /log in/i }));

    await waitFor(() => expect(mockPush).toHaveBeenCalledWith('/'));
  });
});
