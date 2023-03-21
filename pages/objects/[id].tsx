// Description: details of a body in the solar system - /bodies/:id

import type { GetStaticPaths, GetStaticProps } from 'next/types';
import { HeadDocument, MainDocument } from '@/layout';
import formatName from '@/lib/formatName';
import Details from '@/components/DetailsQL';

interface PropsType {
  body: SolarSystemObject | string;
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
  const bodies: SolarSystemObject[] = await fetch(
    'http://localhost:3000/api/',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: `
        query SolarSystemObjectIds {
          objects {
            id
          }
        }
      `,
      }),
    },
  )
    .then((res) => res.json())
    .then((res) => res.data.objects);

  const paths = bodies.map(({ id }) => ({
    params: { id },
  }));

  return {
    paths,
    fallback: false, // default value in case of unfound id in paths. false = 404
  };
};

export const getStaticProps: GetStaticProps<PropsType> = async ({ params }) => {
  const body: SolarSystemObject = await fetch('http://localhost:3001/api/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: `
        query SolarSystemObject($objectId: String!) {
          object(id: $objectId) {
            id
            name
            isPlanet
            bodyType
            dimension
            density
            gravity
            discoveryDate
            discoveredBy
            englishName
            aroundPlanet {
              id
              name
            }
            moons {
              id
              name
            }
          }
        }
      `,
      variables: {
        objectId: params?.id,
      },
    }),
  })
    .then((res) => res.json())
    .then((res) => res.data.object);

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
