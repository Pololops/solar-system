// Description: all bodies in the solar system - /bodies

import type { GetStaticProps } from 'next/types';

import { useRouter } from 'next/router';

import { HeadDocument, MainDocument } from '@/layout';
import { Card } from '@/components';

import { loadBodies } from '@/lib/loadDataFromRestAPI';
import formatName from '@/lib/formatName';

interface PropsType {
  bodies: SolarSystemObjectRestApi[] | string;
}

export default function Bodies({ bodies }: PropsType) {
  const { asPath } = useRouter();

  return (
    <>
      <HeadDocument
        titlePage="Les objets du Système Solaire"
        descriptionPage="Tous les objets célestes qui composent notre système solaire"
      />

      <MainDocument title="Les objets célestes de notre système solaire">
        <div className="flex">
          {typeof bodies === 'string' ? (
            <p>{bodies}</p>
          ) : (
            bodies.map((body) => (
              <Card
                key={body.id}
                cardURL={`${asPath}/${body.id}`}
                cardTitle={formatName(body.name)}
                cardLegend={body.englishName}
                cardImage="/favicon.ico"
                CardImageAlt={body.name}
              />
            ))
          )}
        </div>
      </MainDocument>
    </>
  );
}

export const getStaticProps: GetStaticProps<PropsType> = async () => {
  const bodies = await loadBodies({
    filter: [['bodyType', 'cs', 'Planet']],
    order: ['sideralOrbit', 'asc'],
  });

  return {
    props: { bodies },
    revalidate: 7 * 24 * 60 * 60, // refresh data every 7 days
  };
};
