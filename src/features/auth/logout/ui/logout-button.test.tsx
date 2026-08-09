import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { LogoutButton } from './logout-button';

const mockPush = jest.fn();
const mockRefresh = jest.fn();

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
    refresh: mockRefresh,
  }),
}));

describe('LogoutButton', () => {
  const originalFetch = global.fetch;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    global.fetch = originalFetch;
  });

  it('logs out and redirects to login', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
    }) as jest.Mock;

    const user = userEvent.setup();

    render(<LogoutButton />);

    await user.click(screen.getByRole('button', { name: /log out/i }));

    expect(global.fetch).toHaveBeenCalledWith('/api/auth/logout', {
      method: 'POST',
    });

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith('/auth/login');
      expect(mockRefresh).toHaveBeenCalled();
    });
  });
});
