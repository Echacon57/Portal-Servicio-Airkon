import Icono from "./Icono";
import styles from "./BarraProgreso.module.css";

/**
 * Indicador de progreso de un formulario por pasos.
 
 * @param {{ pasos: {id:string, titulo:string}[], actual: number, onIrA: (indice:number) => void }} props
 */
export default function BarraProgreso({ pasos, actual, onIrA }) {
  const total = pasos.length;
  const porcentaje = Math.round((actual / total) * 100);

  return (
    <nav className={styles.progreso} aria-label="Progreso de la solicitud">
      <div className={styles.encabezado}>
        <p className={styles.pasoActual}>
          Paso {actual + 1} de {total}: <strong>{pasos[actual].titulo}</strong>
        </p>
        <p className={styles.porcentaje} aria-hidden="true">
          {porcentaje} % completado
        </p>
      </div>

      <div
        className={styles.barra}
        role="progressbar"
        aria-label="Avance de la solicitud"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={porcentaje}
        aria-valuetext={`${porcentaje} % completado, paso ${actual + 1} de ${total}`}
      >
        <span className={styles.relleno} style={{ width: `${porcentaje}%` }} />
      </div>

      <ol role="list" className={styles.pasos}>
        {pasos.map((paso, i) => {
          const completado = i < actual;
          const esActual = i === actual;
          const contenido = (
            <>
              <span className={styles.circulo} aria-hidden="true">
                {completado ? <Icono nombre="check" tamano={16} /> : i + 1}
              </span>
              <span className={styles.nombre}>{paso.titulo}</span>
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
