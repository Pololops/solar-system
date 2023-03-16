import Image from 'next/image';
import styles from './styles.module.css';

type Props = {
  title: string;
  children: React.ReactNode;
};

export default function MainDocument({ title, children }: Props) {
  return (
    <main className={styles.main}>
      <div className="description">
        <h1>{title}</h1>
      </div>

      {children}

      <div className="center">
        <Image
          className={styles.background}
          src="/img/home.webp"
          alt="L'espace depuis la terre."
          fill={true}
          priority
        />
      </div>
    </main>
  );
}
