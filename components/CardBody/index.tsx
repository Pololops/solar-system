import Link from 'next/link';
import Image from 'next/image';
import styles from '@/styles/Home.module.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

type PropsType = {
  title: string;
  link: string;
  image: string;
  alt: string;
  description: string;
};

export default ({ title, link, image, alt, description }: PropsType) => {
  return (
    <Link href={link} className={styles.card}>
      <h2 className={inter.className}>{title}</h2>
      <Image src={image} alt={alt} fill={true} />
      <p className={inter.className}>{description}</p>
    </Link>
  );
};
