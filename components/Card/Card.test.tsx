import { screen, render } from '@testing-library/react';
import '@testing-library/jest-dom';

import Card from './';
import type { Props } from './';

// mock next/image component to test src and alt with Card's props
jest.mock('next/image', () => {
  return (props: any) => {
    return <img {...props} fill={true} />;
  };
});

const props: Props = {
  cardURL: '/test-link',
  cardTitle: 'Test Title',
  cardLegend: 'Test Legend',
  cardImage: undefined as string | undefined,
  cardImageAlt: undefined as string | undefined,
};

// mock next/link component to test href with Card's props
jest.mock('next/link', () => {
  return (props: { href: string }) => {
    return <a {...props} />;
  };
});

describe('Card component', () => {
  beforeEach(() => {
    render(<Card {...props} />);
  });

  it('should render a card h2 title', () => {
    const title = screen.getByRole('heading', { name: /Test Title/, level: 2 });
    expect(title).toBeInTheDocument();
  });

  it('should render a card legend', () => {
    const legend = screen.getByText(/Test Legend/);
    expect(legend).toBeInTheDocument();
  });

  it('should render a link with href text', () => {
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/test-link');
  });
});

describe('Image in Card component', () => {
  it('should not render an image', () => {
    const { queryByRole } = render(<Card {...props} />);
    const image = queryByRole('img');

    expect(image).toBe(null);
  });

  it('should render an image with src and alt', () => {
    props.cardImage = '/test-image.png';
    const { getByRole } = render(<Card {...props} />);
    const image = getByRole('img');

    expect(image).toHaveAttribute('src', props.cardImage);
    expect(image).toHaveAttribute('alt', '');
  });

  it('should render an image with empty alt text', () => {
    props.cardImage = '/test-image.png';
    props.cardImageAlt = 'Test Image Alt Text';
    const { getByRole } = render(<Card {...props} />);
    const image = getByRole('img');

    console.log(image);
    expect(image).toHaveAttribute('src', props.cardImage);
    expect(image).toHaveAttribute('alt', props.cardImageAlt);
  });
});
