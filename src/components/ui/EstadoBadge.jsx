import Icono from "./Icono";
import { estados } from "../../data/servicios";
import styles from "./EstadoBadge.module.css";

const iconoPorEstado = { pendiente: "reloj", proceso: "proceso", completada: "ok" };

export default function EstadoBadge({ estado }) {
  return (
    <span className={`${styles.badge} ${styles[estado]}`}>
      <Icono nombre={iconoPorEstado[estado]} tamano={16} />
      {estados[estado]}
    </span>
  );
}
