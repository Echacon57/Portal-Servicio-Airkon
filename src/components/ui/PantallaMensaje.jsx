import styles from "./PantallaMensaje.module.css";

/* Pantalla de mensaje a todo el ancho (404, enlace vencido, folio protegido). */
export default function PantallaMensaje({ oscuro = false, antetitulo, titulo, texto, ilustracion, pie, children }) {
  return (
    <section
      className={`${styles.pantalla} ${oscuro ? `oscuro ${styles.oscuro}` : ""}`}
      aria-labelledby="titulo-mensaje"
    >
      <div className={`contenedor ${styles.rejilla}`}>
        <div className={styles.textos}>
          {antetitulo && <p className={styles.antetitulo}>{antetitulo}</p>}
          <h1 id="titulo-mensaje">{titulo}</h1>
          <div className={styles.texto}>{texto}</div>
          {children && <div className={styles.botones}>{children}</div>}
        </div>
        {ilustracion && (
          <figure className={styles.figura}>
            {ilustracion}
            {pie && <figcaption>{pie}</figcaption>}
          </figure>
        )}
      </div>
    </section>
  );
}
