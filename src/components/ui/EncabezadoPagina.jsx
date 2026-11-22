import MigasDePan from "./MigasDePan";
import styles from "./EncabezadoPagina.module.css";


export default function EncabezadoPagina({ titulo, descripcion, migas, descripcionAlLado = false, accion, children }) {
  return (
    <section className={styles.banda} aria-labelledby="titulo-pagina">
      <div className={`contenedor ${styles.interior}`}>
        {migas && <MigasDePan elementos={migas} />}
        <div className={`${styles.fila} ${descripcionAlLado ? styles.alLado : ""}`}>
          <div className={styles.textos}>
            <h1 id="titulo-pagina">{titulo}</h1>
            {descripcion && !descripcionAlLado && <p>{descripcion}</p>}
          </div>
          {descripcion && descripcionAlLado && <p className={styles.lateral}>{descripcion}</p>}
          {accion && <div className={styles.accion}>{accion}</div>}
        </div>
        {children}
      </div>
    </section>
  );
}
