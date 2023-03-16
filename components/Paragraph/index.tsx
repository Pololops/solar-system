import styles from './styles.module.css';

type Props = {
  children: React.ReactNode;
};

export const Paragraph = ({ children }: Props) => {
  return <p className={styles.code}>{children}</p>;
};
