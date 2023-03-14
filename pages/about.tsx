// Description: About page - /about

import Head from 'next/head';
import Image from 'next/image';
import { Inter } from 'next/font/google';
import styles from '@/styles/Home.module.css';

const inter = Inter({ subsets: ['latin'] });

export default function About() {
  return (
    <>
      <Head>
        <title>A propos de notre système solaire</title>
        <meta
          name="description"
          content="Quels sont les différents objets célestes qui composent notre système solaire - A propos de ce site"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.description}>
          <h1>A propos de notre système solaire</h1>
        </div>

        <div className={styles.description}>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Est
            molestiae veniam cum facere? Aut excepturi maiores ipsa suscipit
            placeat similique esse alias corporis dolor ab natus harum ratione,
            unde quos. Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            Quam esse iure fugit quasi praesentium doloremque quod nostrum illum
            rerum dolorum laborum, eum amet consectetur culpa dolore accusamus
            consequuntur iste tempore.
          </p>
        </div>
      </main>
    </>
  );
}
