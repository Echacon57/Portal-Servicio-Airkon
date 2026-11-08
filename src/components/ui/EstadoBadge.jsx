import { estados } from "../../data/servicios";
import styles from "./EstadoBadge.module.css";

export default function EstadoBadge({ estado }) {
  return (
    <span className={`${styles.badge} ${styles[estado]}`}>
      <span className={styles.ojillo} aria-hidden="true" />
      {estados[estado]}
    </span>
  );
}
