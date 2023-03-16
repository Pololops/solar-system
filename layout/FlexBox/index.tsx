import styles from './styles.module.css';

type Props = {
  children: React.ReactNode;
};

export default function FlexBox({ children }: Props) {
  return <div className={styles.flex}>{children}</div>;
}
