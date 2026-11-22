import styles from "./EtiquetaContorno.module.css";

/**
 Etiqueta de servicio en blanco: mismo contorno que la etiqueta amarilla
 pero blanca con borde marino.  Se usa para resúmenes que todavía
 no son un folio real (resumen del pedido, "Tu solicitud" del asistente).
*/
export default function EtiquetaContorno({ as: Elemento = "div", etiquetadoPor, children, className = "" }) {
  return (
    <Elemento className={`${styles.contorno} ${className}`} aria-labelledby={etiquetadoPor}>
      <div className={styles.cuerpo}>
        <span className={styles.ojillo} aria-hidden="true" />
        {children}
      </div>
    </Elemento>
  );
}
