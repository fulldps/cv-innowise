import { redirect } from 'next/navigation';

import CvPage from './page';

jest.mock('next/navigation', () => ({
  redirect: jest.fn(),
}));

describe('CvPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('redirects to the CV details page', async () => {
    await CvPage({
      params: Promise.resolve({
        id: 'cv-123',
      }),
    });

    expect(redirect).toHaveBeenCalledWith('/cvs/cv-123/details');
  });
});
