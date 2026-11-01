import { Link } from "react-router-dom";
import Icono from "./Icono";
import styles from "./Logo.module.css";

/**
 * Logotipo del portal. `variante="claro"` es para fondos oscuros (footer).
 * Si `enlace` es true, envuelve el logo en un Link al inicio.
 */
export default function Logo({ variante = "oscuro", enlace = true, subtitulo = true }) {
  const contenido = (
    <>
      <span className={`${styles.marca} ${styles[variante]}`}>
        <Icono nombre="copo" tamano={24} />
        <span className={styles.punto} />
      </span>
      <span className={styles.textos}>
        <span className={`${styles.nombre} ${styles[variante]}`}>AIRKON</span>
        {subtitulo && <span className={styles.sub}>Portal de Servicio</span>}
      </span>
    </>
  );

  if (!enlace) return <span className={styles.logo}>{contenido}</span>;

  return (
    <Link to="/" className={styles.logo} aria-label="Airkon, Portal de Servicio. Ir al inicio">
      {contenido}
    </Link>
  );
}
