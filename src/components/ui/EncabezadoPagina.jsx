import styles from "./EncabezadoPagina.module.css";

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
