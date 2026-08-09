import { render, screen } from '@testing-library/react';

import { useParams } from 'next/navigation';

import { useCv } from '../../../../../entities/cv/api/use-cv';
import { useSkillCategories } from '../../../../../entities/skill-category';
import { toPreviewCv } from '../../../../../widgets/cv-preview';

import Page from './page';

jest.mock('next/navigation', () => ({
  useParams: jest.fn(),
}));

jest.mock('../../../../../entities/cv/api/use-cv', () => ({
  useCv: jest.fn(),
}));

jest.mock('../../../../../entities/skill-category', () => ({
  useSkillCategories: jest.fn(),
}));

jest.mock('../../../../../widgets/cv-preview', () => ({
  CvPreview: ({ cv }: { cv: unknown }) => <div data-testid="cv-preview">{JSON.stringify(cv)}</div>,
  toPreviewCv: jest.fn(),
}));

describe('CV preview Page', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    jest.mocked(useParams).mockReturnValue({
      id: 'cv-123',
    });
  });

  it('renders loading state while CV is loading', () => {
    jest.mocked(useCv).mockReturnValue({
      cv: undefined,
      loading: true,
      error: undefined,
    } as never);

    jest.mocked(useSkillCategories).mockReturnValue({
      data: {
        skillCategories: [],
      },
      loading: false,
    } as never);

    render(<Page />);

    expect(screen.getByRole('status', { name: 'Loading' })).toBeInTheDocument();
  });

  it('renders loading state while skill categories are loading', () => {
    jest.mocked(useCv).mockReturnValue({
      cv: undefined,
      loading: false,
      error: undefined,
    } as never);

    jest.mocked(useSkillCategories).mockReturnValue({
      data: undefined,
      loading: true,
    } as never);

    render(<Page />);

    expect(screen.getByRole('status', { name: 'Loading' })).toBeInTheDocument();
  });

  it('renders error state when CV loading fails', () => {
    jest.mocked(useCv).mockReturnValue({
      cv: undefined,
      loading: false,
      error: new Error('Failed to load CV'),
    } as never);

    jest.mocked(useSkillCategories).mockReturnValue({
      data: {
        skillCategories: [],
      },
      loading: false,
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

    jest.mocked(useSkillCategories).mockReturnValue({
      data: {
        skillCategories: [],
      },
      loading: false,
    } as never);

    const { container } = render(<Page />);

    expect(container).toBeEmptyDOMElement();
  });

  it('renders nothing when skill categories are missing', () => {
    const cv = {
      id: 'cv-123',
      name: 'My CV',
    };

    jest.mocked(useCv).mockReturnValue({
      cv,
      loading: false,
      error: undefined,
    } as never);

    jest.mocked(useSkillCategories).mockReturnValue({
      data: undefined,
      loading: false,
    } as never);

    const { container } = render(<Page />);

    expect(container).toBeEmptyDOMElement();
  });

  it('passes converted CV to CvPreview', () => {
    const cv = {
      id: 'cv-123',
      name: 'My CV',
    };

    const categories = [
      {
        id: 'category-1',
        name: 'Frontend',
      },
    ];

    const previewCv = {
      id: 'cv-123',
      name: 'My CV',
      skills: [],
    };

    jest.mocked(useCv).mockReturnValue({
      cv,
      loading: false,
      error: undefined,
    } as never);

    jest.mocked(useSkillCategories).mockReturnValue({
      data: {
        skillCategories: categories,
      },
      loading: false,
    } as never);

    jest.mocked(toPreviewCv).mockReturnValue(previewCv as never);

    render(<Page />);

    expect(toPreviewCv).toHaveBeenCalledWith(cv, categories);
    expect(screen.getByTestId('cv-preview')).toHaveTextContent('My CV');
  });
});
