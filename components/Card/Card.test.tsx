import { screen, render } from '@testing-library/react';
import '@testing-library/jest-dom';

import Card from './';

const props = {
  cardURL: '/test-link',
  cardTitle: 'Test Title',
  cardLegend: 'Test Legend',
  cardImage: '/test-image.png',
  CardImageAlt: 'Test Image Alt Text',
};

// mock next/image component to test src and alt with Card's props
jest.mock('next/image', () => {
  return (props: any) => {
    return <img {...props} fill="true" />;
  };
});

// mock next/link component to test href with Card's props
jest.mock('next/link', () => {
  return (props: any) => {
    return <a {...props} />;
  };
});


beforeEach(() => {
  render(<Card {...props} />);
});

describe('Card component', () => {
  it('should render a card h2 title', () => {
    const title = screen.getByRole('heading', { name: /Test Title/, level: 2 });
    expect(title).toBeInTheDocument();
  });

  it('should render a card legend', () => {
    const legend = screen.getByText(/Test Legend/);
    expect(legend).toBeInTheDocument();
  });

  // test the render of the mock next/image component with Card props
  it('should render an image with src and alt', () => {
    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('src', '/test-image.png');
    expect(image).toHaveAttribute('alt', 'Test Image Alt Text');
  });

  it('should render a link with href text', () => {
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/test-link');
  });
});
