import styles from "./PlacaDatos.module.css";

/**
 Placa de datos: como la placa metálica atornillada a cada equipo.
 Marco con 4 remaches, título y datos técnicos en rejilla.
 */
export default function PlacaDatos({
  titulo,
  subtitulo,
  datos,
  nivelTitulo = "h3",
  encabezadoOscuro = false,
  unaColumna = false,
  children,
}) {
  const Titulo = nivelTitulo;
  return (
    <article className={styles.placa}>
      {["arribaIzq", "arribaDer", "abajoIzq", "abajoDer"].map((r) => (
        <span key={r} className={`${styles.remache} ${styles[r]}`} aria-hidden="true" />
      ))}
      <div className={styles.marco}>
        <header className={`${styles.encabezado} ${encabezadoOscuro ? `oscuro ${styles.oscuro}` : ""}`}>
          <Titulo>{titulo}</Titulo>
          {subtitulo && <span className={styles.subtitulo}>{subtitulo}</span>}
        </header>
        <dl className={`${styles.datos} ${unaColumna ? styles.unaColumna : ""}`}>
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
