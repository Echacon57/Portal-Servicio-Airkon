import styles from "./EncabezadoPagina.module.css";

/** Banda gris con el h1 de cada página interior. `children` va a la derecha (p. ej. un botón). */
export default function EncabezadoPagina({ titulo, descripcion, children }) {
  return (
    <section className={styles.banda} aria-labelledby="titulo-pagina">
      <div className={`contenedor ${styles.interior}`}>
        <div className={styles.textos}>
          <h1 id="titulo-pagina">{titulo}</h1>
          {descripcion && <p>{descripcion}</p>}
        </div>
        {children}
      </div>
    </section>
  );
}
