import Icono from "./Icono";
import { estados } from "../../data/servicios";
import styles from "./EstadoBadge.module.css";

const iconoPorEstado = { pendiente: "reloj", proceso: "proceso", completada: "ok" };

/** Etiqueta de estado: siempre combina color + icono + texto (no depende solo del color). */
export default function EstadoBadge({ estado }) {
  return (
    <span className={`${styles.badge} ${styles[estado]}`}>
      <Icono nombre={iconoPorEstado[estado]} tamano={16} />
      {estados[estado]}
    </span>
  );
}
