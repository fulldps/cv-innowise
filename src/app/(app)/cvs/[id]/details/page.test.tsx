import { render, screen } from '@testing-library/react';

import { useParams } from 'next/navigation';

import { useCv } from '../../../../../entities/cv/api/use-cv';

import Page from './page';

jest.mock('next/navigation', () => ({
  useParams: jest.fn(),
}));

jest.mock('../../../../../entities/cv/api/use-cv', () => ({
  useCv: jest.fn(),
}));

jest.mock('../../../../../features/cv/update-cv', () => ({
  UpdateCv: ({ cv }: { cv: { id: string; name: string } }) => (
    <div data-testid="update-cv">
      <span>{cv.name}</span>
    </div>
  ),
}));

describe('CV details Page', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    jest.mocked(useParams).mockReturnValue({
      id: 'cv-123',
    });
  });

  it('renders loading state', () => {
    jest.mocked(useCv).mockReturnValue({
      cv: undefined,
      loading: true,
      error: undefined,
    } as never);

    render(<Page />);

    expect(screen.getByRole('status', { name: 'Loading' })).toBeInTheDocument();
  });

  it('renders error state', () => {
    jest.mocked(useCv).mockReturnValue({
      cv: undefined,
      loading: false,
      error: new Error('Failed to load CV'),
    } as never);

    render(<Page />);

    expect(screen.getByRole('heading', { name: 'Something went wrong' })).toBeInTheDocument();
  });

  it('renders nothing when CV is not found', () => {
    jest.mocked(useCv).mockReturnValue({
      cv: null,
      loading: false,
      error: undefined,
    } as never);

    const { container } = render(<Page />);

    expect(container).toBeEmptyDOMElement();
  });

  it('renders UpdateCv when CV is loaded', () => {
    const cv = {
      id: 'cv-123',
      name: 'My CV',
    };

    jest.mocked(useCv).mockReturnValue({
      cv,
      loading: false,
      error: undefined,
    } as never);

    render(<Page />);

    expect(screen.getByTestId('update-cv')).toBeInTheDocument();
    expect(screen.getByText('My CV')).toBeInTheDocument();
  });

  it('loads CV using the route parameter', () => {
    jest.mocked(useCv).mockReturnValue({
      cv: {
        id: 'cv-123',
        name: 'My CV',
      },
      loading: false,
      error: undefined,
    } as never);

    render(<Page />);

    expect(useCv).toHaveBeenCalledWith('cv-123');
  });
});
