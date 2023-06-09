import Link from 'next/link';
import Image from 'next/image';

import styles from './styles.module.css';

export type Props = {
  cardURL: string;
  cardTitle: string;
  cardLegend: string;
  cardImage?: string;
  cardImageAlt?: string;
};

export default function Card({
  cardURL,
  cardTitle,
  cardLegend,
  cardImage,
  cardImageAlt,
}: Props) {
  return (
    <Link href={cardURL} className={styles.card}>
      <h2>
        {cardTitle} {!cardImage && <span>-&gt;</span>}
      </h2>
      {cardImage && (
        <Image src={cardImage} alt={cardImageAlt || ''} fill={true} />
      )}
      <p>{cardLegend}</p>
    </Link>
  );
}
