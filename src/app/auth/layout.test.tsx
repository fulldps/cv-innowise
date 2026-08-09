import { render, screen } from '@testing-library/react';

import AuthLayout from './layout';

describe('AuthLayout', () => {
  it('renders children', () => {
    render(
      <AuthLayout>
        <div>Auth content</div>
      </AuthLayout>,
    );

    expect(screen.getByText('Auth content')).toBeInTheDocument();
  });
});
