import styles from "./BarraProgreso.module.css";

/*
 Progreso de un formulario por pasos, en segmentos.
 - Barra de progreso con porcentaje y paso actual.
 - Lista de pasos con título y estado (completado, actual, pendiente).
 - Botón para ir a un paso completado.
 */
export default function BarraProgreso({ pasos, actual, onIrA }) {
  const total = pasos.length;
  const porcentaje = Math.round((actual / total) * 100);

  return (
    <nav className={styles.progreso} aria-label="Progreso de la solicitud">
      <p className={styles.texto}>
        <strong>
          Paso {actual + 1} de {total}
        </strong>
        <span className={styles.nombreActual}>: {pasos[actual].titulo}</span>
        <span className={styles.porcentaje} aria-hidden="true">
          {" "}
          · {porcentaje} % completado
        </span>
      </p>

      <div
        className="solo-lector"
        role="progressbar"
        aria-label="Avance de la solicitud"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={porcentaje}
        aria-valuetext={`${porcentaje} % completado, paso ${actual + 1} de ${total}`}
      />

      <ol role="list" className={styles.pasos}>
        {pasos.map((paso, i) => {
          const completado = i < actual;
          const esActual = i === actual;
          const contenido = (
            <>
              <span className={styles.barra} aria-hidden="true" />
              <span className={styles.nombre}>
                {completado && (
                  <span className={styles.check} aria-hidden="true">
                    ✓{" "}
                  </span>
                )}
                {paso.titulo}
              </span>
              <span className="solo-lector">
                {completado ? " (completado)" : esActual ? " (paso actual)" : " (pendiente)"}
              </span>
            </>
          );
          return (
            <li
              key={paso.id}
              className={`${styles.paso} ${completado ? styles.completado : ""} ${esActual ? styles.actual : ""}`}
              aria-current={esActual ? "step" : undefined}
            >
              {completado ? (
                <button type="button" className={styles.boton} onClick={() => onIrA(i)}>
                  {contenido}
                </button>
              ) : (
                <span className={styles.boton}>{contenido}</span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
