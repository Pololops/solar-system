// Description: all bodies in the solar system - /bodies

import Head from 'next/head';
import styles from '@/styles/Home.module.css';

import { loadBodies } from '@/lib/loadData';

import CardBody from '@/components/CardBody';

type PropsType = {
  bodies: BodyType[];
};

export default ({ bodies }: PropsType) => {
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
          {bodies.map((body) => (
            <CardBody
              key={body.id}
              title={body.name}
              link={`/body/${body.id}`}
              image="/favicon.ico"
              alt={body.name}
              description={body.englishName}
            />
          ))}
        </div>
      </main>
    </>
  );
};

export async function getStaticProps() {
  const bodies = await loadBodies({
    filter: [
      ['bodyType', 'cs', 'Planet'],
    ],
    order: ['sideralOrbit', 'asc'],
  });

  return {
    props: { bodies },
    revalidate: 7 * 24 * 60 * 60, // refresh data every 7 days
  };
}
