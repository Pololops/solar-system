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
        <title>Erreur 404</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.description}>
          <h1>Erreur 404</h1>
          <p>Le système solaire est vaste et on s'y perd facilement. Mais pas de panique voici le chemin :</p>
        </div>

        <div className={styles.flex}>
          <Link href="/" className={styles.card}>
            <h2 className={inter.className}>
              Vers la Terre <span>-&gt;</span>
            </h2>
            <p className={inter.className}>
              Emprunter ce raccourci dans l'espace temps pour retrouvez votre chemin.
            </p>
          </Link>
        </div>
      </main>
    </>
  );
}
