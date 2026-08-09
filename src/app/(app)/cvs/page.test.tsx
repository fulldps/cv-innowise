import { render, screen } from '@testing-library/react';

import { useCvsList } from '../../../entities/cv/api/use-cvs-list';
import CvsPage from './page';

jest.mock('../../../entities/cv/api/use-cvs-list', () => ({
  useCvsList: jest.fn(),
}));

jest.mock('../../../widgets/cvs-table/ui/cvs-table', () => ({
  CvsTable: ({ cvs }: { cvs: unknown[] }) => (
    <div data-testid="cvs-table">{JSON.stringify(cvs)}</div>
  ),
}));

describe('CvsPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders loading state', () => {
    jest.mocked(useCvsList).mockReturnValue({
      cvs: [],
      loading: true,
      error: undefined,
    } as never);

    render(<CvsPage />);

    expect(screen.getByRole('status', { name: 'Loading' })).toBeInTheDocument();
  });

  it('renders error message when loading fails', () => {
    const error = new Error('Failed to load CVs');

    jest.mocked(useCvsList).mockReturnValue({
      cvs: [],
      loading: false,
      error,
    } as never);

    render(<CvsPage />);

    expect(screen.getByRole('heading', { name: 'Something went wrong' })).toBeInTheDocument();
  });

  it('renders CVs table when data is loaded', () => {
    const cvs = [
      {
        id: 'cv-1',
        name: 'My CV',
      },
      {
        id: 'cv-2',
        name: 'Frontend CV',
      },
    ];

    jest.mocked(useCvsList).mockReturnValue({
      cvs,
      loading: false,
      error: undefined,
    } as never);

    render(<CvsPage />);

    expect(screen.getByTestId('cvs-table')).toHaveTextContent('My CV');
    expect(screen.getByTestId('cvs-table')).toHaveTextContent('Frontend CV');
  });
});
