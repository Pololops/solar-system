// Description: details of a body in the solar system - /bodies/:id

import type { GetStaticPaths, GetStaticProps } from 'next/types';
import { HeadDocument, MainDocument } from '@/layout';
import { loadBodies, loadOneBody } from '@/lib/loadDataFromRestAPI';

import formatName from '@/lib/formatName';
import Details from '@/components/Details';

interface PropsType {
  body: SolarSystemObjectRestApi | string;
}

export default function Body({ body }: PropsType) {
  const bodyName = typeof body !== 'string' && formatName(body.name);

  return (
    <>
      <HeadDocument
        titlePage={`Le Système Solaire - ${bodyName}`}
        descriptionPage={`${bodyName} : tous les détails de cet objet céleste situé dans notre système solaire`}
      />

      <MainDocument title={bodyName || 'Erreur interne'}>
        {typeof body === 'string' ? (
          <p>{body}</p>
        ) : (
          <div className="description">
            <Details body={body} />
          </div>
        )}
      </MainDocument>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const bodies = await loadBodies();

  if (!bodies || typeof bodies === 'string')
    return { paths: [], fallback: false };

  const paths = bodies.map((body) => ({
    params: { id: body.id },
  }));

  return {
    paths,
    fallback: false, // default value in case of unfound id in paths. false = 404
  };
};

export const getStaticProps: GetStaticProps<PropsType> = async ({ params }) => {
  const body = await loadOneBody(params?.id as string);

  if (!body) {
    return {
      notFound: true,
    };
  }

  return {
    props: { body },
    revalidate: 7 * 24 * 60 * 60, // refresh data every 7 days
  };
};
