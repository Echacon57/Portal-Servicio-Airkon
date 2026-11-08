import { Link } from "react-router-dom";
import styles from "./Logo.module.css";

function MarcaEtiqueta({ tamano = 30 }) {
  return (
    <svg
      className={styles.marca}
      width={(tamano * 22) / 30}
      height={tamano}
      viewBox="0 0 22 30"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M5 0h12l5 5v25H0V5z" fill="var(--amarillo)" />
      <circle cx="11" cy="6" r="2.6" fill="var(--azul-marino)" />
    </svg>
  );
}


export default function Logo({ variante = "claro", enlace = true, tamano = "normal" }) {
  const contenido = (
    <>
      <MarcaEtiqueta tamano={tamano === "chico" ? 24 : 30} />
      <span className={`${styles.nombre} ${styles[variante]} ${styles[tamano]}`}>AIRKON</span>
    </>
  );

  if (!enlace) return <span className={styles.logo}>{contenido}</span>;

  return (
    <Link to="/" className={styles.logo} aria-label="Airkon, Portal de Servicio. Ir al inicio">
      {contenido}
    </Link>
  );
}
