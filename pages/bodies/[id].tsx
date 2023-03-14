// Description: details of a body in the solar system - /bodies/:id

import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Inter } from 'next/font/google';
import styles from '@/styles/Home.module.css';

import { loadBodies, loadBodyById } from '@/lib/loadData';
import type { BodyType } from '@/lib/loadData';
import type { GetStaticPaths } from 'next/types';

const inter = Inter({ subsets: ['latin'] });

type PropsType = {
  body: BodyType;
};

type ParamsType = {
  params: {
    id: string;
  };
};

const Body = ({ body }: PropsType) => {
  const router = useRouter();

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
  }

  if (router.isFallback) {
    return (
      <main className={styles.main}>
        <div className={styles.center}>...chargement...</div>
      </main>
    );
  }

  return (
    <>
      <Head>
        <title>{body.name}</title>
        <meta
          name="description"
          content="Tous les objets célestes qui composent notre système solaire"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.description}>
          <h1>{body.name}</h1>
        </div>

        <div className={styles.description}>
          {body.bodyType && (
            <p className={styles.code}>Type : {body.bodyType}</p>
          )}
          {body.isPlanet ? (
            <p className={styles.code}>Satellite(s) : {getMoons}</p>
          ) : (
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
      </main>
    </>
  );
};
export default Body;

export const getStaticPaths = async () => {
  const bodies = await loadBodies();
  const paths =
    bodies &&
    bodies.map((body: BodyType) => ({
      params: { id: body.id },
    }));

  return {
    paths,
    fallback: false, // default value in case of unfound id in paths. false = 404
  };
};

export async function getStaticProps({ params }: ParamsType) {
  const body = await loadBodyById(params.id);

  return {
    props: { body },
    revalidate: 7 * 24 * 60 * 60, // refresh data every 7 days
  };
}
