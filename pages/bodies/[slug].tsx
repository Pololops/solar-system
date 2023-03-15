// Description: details of a body in the solar system - /bodies/:id

import Head from 'next/head';
import Image from 'next/image';
import styles from '@/styles/Home.module.css';

import { loadBodies, loadOneBody } from '@/lib/loadData';
import formatName from '@/lib/formatName';
import type { GetStaticPaths } from 'next/types';

type PropsType = {
  body: BodyType;
};

type ParamsType = {
  params: {
    slug: string;
  };
};

const Body = ({ body }: PropsType) => {
  const bodyName = formatName(body.name);

  const getMoons = body.moons
    ? body.moons.map(({ moon }) => moon).join(', ')
    : ' Aucun';

  const getDiscoveryDate = () => {
    const date = body.discoveryDate;
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
        <title>Le Système Solaire - {body.name}</title>
        <meta
          name="description"
          content={`${bodyName} : tous les détails de cet objet céleste situé dans notre système solaire`}
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.description}>
          <h1>{bodyName}</h1>
        </div>

        <div className={styles.description}>
          {body.bodyType && (
            <p className={styles.code}>Type : {body.bodyType}</p>
          )}
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
            <p className={styles.code}>Découvert par : {body.discoveredBy}</p>
          )}
        </div>

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

export const getStaticProps = async ({ params }: ParamsType) => {
  const body = await loadOneBody(params.slug);

  return {
    props: { body },
    revalidate: 7 * 24 * 60 * 60, // refresh data every 7 days
  };
};

export const getStaticPaths = async () => {
  const bodies = await loadBodies();
  const paths =
    bodies &&
    bodies.map((body: BodyType) => ({
      params: { slug: body.id },
    }));

  return {
    paths,
    fallback: false, // default value in case of unfound id in paths. false = 404
  };
};
