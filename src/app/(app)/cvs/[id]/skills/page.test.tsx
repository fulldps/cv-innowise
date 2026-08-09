import { render, screen } from '@testing-library/react';

import { useParams } from 'next/navigation';

import Page from './page';

jest.mock('next/navigation', () => ({
  useParams: jest.fn(),
}));

jest.mock('../../../../../widgets/cv-skills', () => ({
  CvSkills: ({ cvId }: { cvId: string }) => <div data-testid="cv-skills">CV ID: {cvId}</div>,
}));

describe('CV skills Page', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    jest.mocked(useParams).mockReturnValue({
      id: 'cv-123',
    });
  });

  it('renders CV skills widget', () => {
    render(<Page />);

    expect(screen.getByTestId('cv-skills')).toBeInTheDocument();
  });

  it('passes route CV id to CvSkills', () => {
    render(<Page />);

    expect(screen.getByTestId('cv-skills')).toHaveTextContent('cv-123');
  });
});
