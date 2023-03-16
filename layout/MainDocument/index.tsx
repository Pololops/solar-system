import Image from 'next/image';
import styles from './styles.module.css';
import { DescriptionBox, CenterBox } from '@/layout';

type Props = {
  title: string;
  children: React.ReactNode;
};

export default function MainDocument({ title, children }: Props) {
  return (
    <main className={styles.main}>
      <DescriptionBox>
        <h1>{title}</h1>
      </DescriptionBox>

      {children}

      <CenterBox>
        <Image
          className={styles.background}
          src="/img/home.webp"
          alt="L'espace depuis la terre."
          fill={true}
          priority
        />
      </CenterBox>
    </main>
  );
}
