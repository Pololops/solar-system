// Description: details of a body in the solar system - /bodies/:id

import type { ParsedUrlQuery } from 'querystring';
import type { GetStaticPaths, GetStaticProps } from 'next/types';

import { HeadDocument, MainDocument, DescriptionBox } from '@/layout';
import { Paragraph } from '@/components';

import { loadBodies, loadOneBody } from '@/lib/loadData';
import formatName from '@/lib/formatName';

interface PropsType {
  body: BodyType | string;
}

interface ParamsType extends ParsedUrlQuery {
  id: string;
}

export default function Body({ body }: PropsType) {
  const bodyName = typeof body !== 'string' && formatName(body.name);

  const getType = () => {
    if (typeof body === 'string') return null;
    switch (body.bodyType) {
      case 'Planet':
        return 'Planète';
      case 'Moon':
        return 'Satellite';
      case 'Dwarf Planet':
        return 'Planète naine';
      case 'Star':
        return 'Étoile';
      case 'Asteroid':
        return 'Astéroïde';
      case 'Comet':
        return 'Comète';
      default:
        return null;
    }
  };

  const getMoons =
    typeof body !== 'string' && body.moons
      ? body.moons.map(({ moon }) => moon).join(', ')
      : ' Aucun';

  const getDiscoveryDate = () => {
    const date = typeof body !== 'string' && body.discoveryDate;
    if (!date || typeof date !== 'string') return null;
    const formatDate = new Date(date);
    return formatDate
      .toLocaleDateString('fr-FR', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
      .replace(' 1 ', ' 1er ');
  };

  return (
    <>
      <HeadDocument
        titlePage={`Le Système Solaire - ${bodyName}`}
        descriptionPage={`${bodyName} : tous les détails de cet objet céleste situé dans notre système solaire`}
      />

      <MainDocument title={bodyName || 'Erreur interne'}>
        {typeof body === 'string' ? (
          <Paragraph>{body}</Paragraph>
        ) : (
          <DescriptionBox>
            {body.bodyType && <Paragraph>Type : {getType()}</Paragraph>}
            {body.isPlanet && <Paragraph>Satellite(s) : {getMoons}</Paragraph>}
            {body.bodyType === 'Moon' && (
              <Paragraph>Planète proche : {body.aroundPlanet.planet}</Paragraph>
            )}
            {body.density && (
              <Paragraph>{`Densité : ${body.density}`}</Paragraph>
            )}
            {body.gravity && (
              <Paragraph>{`Gravité : ${body.gravity}`}</Paragraph>
            )}
            {body.dimension !== '' && (
              <Paragraph>{`Dimension : ${body.dimension}`}</Paragraph>
            )}
            {getDiscoveryDate !== null && (
              <Paragraph>{`Découvert le : ${getDiscoveryDate()}`}</Paragraph>
            )}
            {body.discoveredBy && (
              <Paragraph>Découvert par : {body.discoveredBy}</Paragraph>
            )}
          </DescriptionBox>
        )}
      </MainDocument>
    </>
  );
}

export const getStaticPaths: GetStaticPaths<ParamsType> = async () => {
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

export const getStaticProps: GetStaticProps<PropsType, ParamsType> = async ({
  params,
}) => {
  const body = await loadOneBody(params?.id as string);

  if (!body) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      body,
    },
  };
};
