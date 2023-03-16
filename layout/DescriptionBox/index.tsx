import styles from './styles.module.css';

type Props = {
  children: React.ReactNode;
};

export default function DescriptionBox({ children }: Props) {
  return <div className={styles.description}>{children}</div>;
}
