// Description: details of a body in the solar system - /bodies/:id

import type { ParsedUrlQuery } from 'querystring';
import type { GetStaticPaths, GetStaticProps } from 'next/types';

import { HeadDocument, MainDocument } from '@/layout';

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
          <p>{body}</p>
        ) : (
          <div className="description">
            {body.bodyType && <p>Type : {getType()}</p>}
            {body.isPlanet && <p>Satellite(s) : {getMoons}</p>}
            {body.bodyType === 'Moon' && (
              <p>Planète proche : {body.aroundPlanet.planet}</p>
            )}
            {body.density && <p>{`Densité : ${body.density}`}</p>}
            {body.gravity && <p>{`Gravité : ${body.gravity}`}</p>}
            {body.dimension !== '' && <p>{`Dimension : ${body.dimension}`}</p>}
            {getDiscoveryDate !== null && (
              <p>{`Découvert le : ${getDiscoveryDate()}`}</p>
            )}
            {body.discoveredBy && <p>Découvert par : {body.discoveredBy}</p>}
          </div>
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
