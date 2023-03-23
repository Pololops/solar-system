import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import HeadDocument from './';

jest.mock('next/head', () => {
  return {
    __esModule: true,
    default: ({ children }: { children: Array<React.ReactElement> }) => {
      return <>{children}</>;
    },
  };
});

const getMeta = (metaName: string) => {
  const metas = document.getElementsByTagName('meta');

  if (metas.length === 0) return '';

  const result = [];
  for (let i = 0; i < metas.length; i += 1) {
    if (metas[i].getAttribute('name') === metaName) {
      result.push(metas[i].getAttribute('content'));
      break;
    }
  }

  return result[0];
};

beforeEach(() => {
  render(
    <HeadDocument titlePage="Test Title" descriptionPage="Test Description" />,
  );
});

describe('HeadDocument component index by robots', () => {
  it('should have a title tag', () => {
    expect(document.title).toBe('Test Title');
  });

  it('should have a description tag', () => {
    const description = getMeta('description');
    expect(description).toBe('Test Description');
  });

  it('shouldn\'t have a robots meta', () => {
    render(<HeadDocument titlePage={''} descriptionPage={''} />);
    const description = getMeta('robots');
    expect(description).not.toBeDefined();
  });

  it('should have a robots meta tag with noindex content', () => {
    render(<HeadDocument noIndexPage titlePage={''} descriptionPage={''} />);
    const description = getMeta('robots');
    expect(description).toBe('noindex');
  });
});
