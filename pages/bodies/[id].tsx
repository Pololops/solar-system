// Description: details of a body in the solar system - /bodies/:id

import type { ParsedUrlQuery } from 'querystring';
import type { GetStaticPaths, GetStaticProps } from 'next/types';

import Head from 'next/head';
import Image from 'next/image';
import styles from '@/styles/Home.module.css';

import { loadBodies, loadOneBody } from '@/lib/loadData';
import formatName from '@/lib/formatName';

interface PropsType {
  body: BodyType | string;
}

interface ParamsType extends ParsedUrlQuery {
  id: string;
}

const Body = ({ body }: PropsType) => {
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

  const getMoons = typeof body !== 'string' && body.moons
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
      <Head>
        <title>Le Système Solaire - {bodyName}</title>
        <meta
          name="description"
          content={`${bodyName} : tous les détails de cet objet céleste situé dans notre système solaire`}
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.description}>
          <h1>{bodyName || 'Internal Erreur'}</h1>
        </div>

        {typeof body === 'string' ? (
          <p className={styles.code}>{body}</p>
        ) : (
          <>
            <div className={styles.description}>
              {body.bodyType && <p className={styles.code}>Type : {getType()}</p>}
              {body.isPlanet && (
                <p className={styles.code}>Satellite(s) : {getMoons}</p>
              )}
              {body.bodyType === 'Moon' && (
                <p className={styles.code}>
                  Planète proche : {body.aroundPlanet.planet}
                </p>
              )}
              {body.density && (
                <p className={styles.code}>{`Densité : ${body.density}`}</p>
              )}
              {body.gravity && (
                <p className={styles.code}>{`Gravité : ${body.gravity}`}</p>
              )}
              {body.dimension !== '' && (
                <p className={styles.code}>{`Dimension : ${body.dimension}`}</p>
              )}
              {getDiscoveryDate !== null && (
                <p
                  className={styles.code}
                >{`Découvert le : ${getDiscoveryDate()}`}</p>
              )}
              {body.discoveredBy && (
                <p className={styles.code}>
                  Découvert par : {body.discoveredBy}
                </p>
              )}
            </div>
          </>
        )}

        <div className={styles.center}>
          <Image
            className={styles.background}
            src="/img/home.webp"
            alt="L'espace depuis la terre."
            fill={true}
            priority
          />
        </div>
      </main>
    </>
  );
};
export default Body;

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
