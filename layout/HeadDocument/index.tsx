import Head from 'next/head';

interface Props {
  titlePage: string;
  descriptionPage: string;
  noIndexPage?: true;
}

export default function HeadDocument({ titlePage, descriptionPage, noIndexPage }: Props) {
  return (
    <Head>
      <title>{titlePage}</title>
      <meta
        name="description"
        content={descriptionPage}
      />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />
      {noIndexPage && <meta name="robots" content="noindex" />}
    </Head>
  );
}
