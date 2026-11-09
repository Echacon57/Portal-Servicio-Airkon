import styles from "./PlacaDatos.module.css";

/*
 Placa de datos: Simulando la placa o etiqueta de un equipo, con marco y remaches.
 */
export default function PlacaDatos({ titulo, subtitulo, datos, nivelTitulo = "h3", children }) {
  const Titulo = nivelTitulo;
  return (
    <article className={styles.placa}>
      {["arribaIzq", "arribaDer", "abajoIzq", "abajoDer"].map((r) => (
        <span key={r} className={`${styles.remache} ${styles[r]}`} aria-hidden="true" />
      ))}
      <div className={styles.marco}>
        <header className={styles.encabezado}>
          <Titulo>{titulo}</Titulo>
          {subtitulo && <span className={styles.subtitulo}>{subtitulo}</span>}
        </header>
        <dl className={styles.datos}>
          {datos.map((d) => (
            <div key={d.dato}>
              <dt>{d.dato}</dt>
              <dd>{d.valor}</dd>
            </div>
          ))}
        </dl>
        {children}
      </div>
    </article>
  );
}
