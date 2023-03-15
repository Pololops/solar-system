// Description: Homepage - /

import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { Inter } from 'next/font/google';
import styles from '@/styles/Home.module.css';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <>
      <Head>
        <title>Le Système Solaire</title>
        <meta
          name="description"
          content="Quels sont les différents objets célestes qui composent notre système solaire"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.description}>
          <h1>Notre Système Solaire</h1>
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

        <div className={styles.flex}>
          <Link href="/about" className={styles.card}>
            <h2 className={inter.className}>
              A propos <span>-&gt;</span>
            </h2>
            <p className={inter.className}>
              A propos de notre système solaire.
            </p>
          </Link>

          <Link href="/bodies" className={styles.card}>
            <h2 className={inter.className}>
              Les objets <span>-&gt;</span>
            </h2>
            <p className={inter.className}>
              Les objets de notre système solaire.
            </p>
          </Link>
        </div>
      </main>
    </>
  );
}
