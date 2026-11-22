import styles from "./FolioEtiqueta.module.css";

/*
 Folio en forma de mini etiqueta: amarilla si el registro sigue abierto
 (pendiente o en proceso) y gris si ya se completó.
 El estado también se escribe en texto junto al folio (EstadoBadge).
 */
export default function FolioEtiqueta({ folio, abierto }) {
  return <span className={`cifras ${styles.folio} ${abierto ? styles.abierto : styles.cerrado}`}>{folio}</span>;
}

export const estaAbierto = (registro) => registro.estado !== "completada";
