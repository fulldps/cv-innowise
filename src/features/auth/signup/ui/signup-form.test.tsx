import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { SignupForm } from './signup-form';

const mockPush = jest.fn();
const mockRefresh = jest.fn();

jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: mockPush, refresh: mockRefresh }),
}));

describe('SignupForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('shows validation errors on empty submit', async () => {
    render(<SignupForm />);

    await userEvent.click(screen.getByRole('button', { name: /sign up/i }));

    expect(await screen.findByText('Invalid email address')).toBeInTheDocument();
    expect(await screen.findByText('Password must be at least 8 characters')).toBeInTheDocument();
  });

  it('shows the backend error when signup fails', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      json: async () => ({ error: 'Email already exists' }),
    }) as jest.Mock;

    render(<SignupForm />);

    await userEvent.type(screen.getByPlaceholderText('Email'), 'test@test.com');
    await userEvent.type(screen.getByPlaceholderText('Password'), 'password123');
    await userEvent.click(screen.getByRole('button', { name: /sign up/i }));

    expect(await screen.findByText('Email already exists')).toBeInTheDocument();
    expect(mockPush).not.toHaveBeenCalled();
  });

  it('redirects home on successful signup', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ user: { id: '2', email: 'new@test.com' } }),
    }) as jest.Mock;

    render(<SignupForm />);

    await userEvent.type(screen.getByPlaceholderText('Email'), 'new@test.com');
    await userEvent.type(screen.getByPlaceholderText('Password'), 'password123');
    await userEvent.click(screen.getByRole('button', { name: /sign up/i }));

    await waitFor(() => expect(mockPush).toHaveBeenCalledWith('/'));
  });
});
