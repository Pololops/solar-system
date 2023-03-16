// Description: all bodies in the solar system - /bodies

import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import styles from '@/styles/Home.module.css';

import { loadBodies } from '@/lib/loadData';
import formatName from '@/lib/formatName';

import CardBody from '@/components/CardBody';
import type { GetStaticProps } from 'next/types';

interface PropsType {
  bodies: BodyType[] | string;
};

export default ({ bodies }: PropsType) => {
  const { asPath } = useRouter();

  return (
    <>
      <Head>
        <title>Le Système Solaire - les objects</title>
        <meta
          name="description"
          content="Tous les objets célestes qui composent notre système solaire"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.description}>
          <h1>Les objets célestes de notre système solaire</h1>
        </div>

        <div className={styles.flex}>
          {typeof bodies === 'string'
            ? <p className={styles.code}>{bodies}</p>
            : bodies.map((body) => (
                <CardBody
                  key={body.id}
                  title={formatName(body.name)}
                  link={`${asPath}/${body.id}`}
                  image="/favicon.ico"
                  alt={body.name}
                  description={body.englishName}
                />
              ))}
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
