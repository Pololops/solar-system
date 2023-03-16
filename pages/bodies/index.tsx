// Description: all bodies in the solar system - /bodies

import type { GetStaticProps } from 'next/types';

import { useRouter } from 'next/router';

import { HeadDocument, MainDocument, FlexBox } from '@/layout';
import { Card, Paragraph } from '@/components';

import { loadBodies } from '@/lib/loadData';
import formatName from '@/lib/formatName';

interface PropsType {
  bodies: BodyType[] | string;
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
        <FlexBox>
          {typeof bodies === 'string' ? (
            <Paragraph>{bodies}</Paragraph>
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
        </FlexBox>
      </MainDocument>
    </>
  );
}

export const getStaticProps: GetStaticProps<PropsType> = async () => {
  const bodies = await loadBodies({
    filter: [['bodyType', 'cs', 'Planet']],
    order: ['sideralOrbit', 'asc'],
  });

  if (!bodies) return { notFound: true };

  return {
    props: { bodies },
    revalidate: 7 * 24 * 60 * 60, // refresh data every 7 days
  };
};