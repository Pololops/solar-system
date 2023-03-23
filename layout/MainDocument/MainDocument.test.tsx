import { screen, render } from '@testing-library/react';
import '@testing-library/jest-dom';

import MainDocument from './';

beforeEach(() => {
  render(<MainDocument title="Test Title">Test children</MainDocument>);
});

describe('MainDocument component', () => {
  it('should render a main tag', () => {
    const main = screen.getByRole('main');
    expect(main).toBeInTheDocument();
  });

  it('should render a main h1 title', () => {
    const title = screen.getByRole('heading', { name: /Test Title/, level: 1 });
    expect(title).toBeInTheDocument();
  });

  it('should render children', () => {
    const children = screen.getByText(/Test children/);
    expect(children).toBeInTheDocument();
  });

  it('should render an image with a specific alt text', () => {
    const imageAltText = screen.getByAltText(/L'espace depuis la terre./);
    expect(imageAltText).toBeInTheDocument();
  });
});
