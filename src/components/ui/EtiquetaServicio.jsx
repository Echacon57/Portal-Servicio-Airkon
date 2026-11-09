import { Link } from "react-router-dom";
import { estados } from "../../data/servicios";
import styles from "./EtiquetaServicio.module.css";

/*
 Etiqueta de servicio: el folio en forma de la etiqueta amarilla que algunos equipos tienen
 */
export default function EtiquetaServicio({ titulo, folio, datos, pasos, hechos, estado, enlace, colgante = false }) {
  const etiqueta = (
    <div className={`claro ${styles.etiqueta}`}>
      <span className={styles.ojillo} aria-hidden="true">
        <span />
      </span>
      <div className={styles.cuerpo}>
        <div>
          <p className={styles.titulo}>{titulo}</p>
          <p className={`expandido cifras ${styles.folio}`}>{folio}</p>
        </div>
        <dl className={styles.datos}>
          {datos.map((d) => (
            <div key={d.dato}>
              <dt>{d.dato}</dt>
              <dd>{d.valor}</dd>
            </div>
          ))}
        </dl>
        <ul role="list" className={styles.pasos}>
          {pasos.map((paso, i) => {
            const hecho = i < hechos;
            return (
              <li key={paso}>
                <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true" focusable="false">
                  <rect x="1" y="1" width="18" height="18" fill={hecho ? "var(--azul-marino)" : "none"} stroke="var(--azul-marino)" strokeWidth="2" />
                  {hecho && (
                    <path d="M5 10.5l3 3 7-7" fill="none" stroke="var(--amarillo)" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                  )}
                </svg>
                {paso}
                <span className="solo-lector">{hecho ? " (hecho)" : " (pendiente)"}</span>
              </li>
            );
          })}
        </ul>
      </div>
      <div className={styles.talon}>
        <span>Estado: {estados[estado].toLowerCase()}</span>
        {enlace && <Link to={enlace}>Ver seguimiento</Link>}
      </div>
    </div>
  );

  if (!colgante) return etiqueta;

  return (
    <div className={styles.colgante}>
      <svg className={styles.cordon} width="40" height="120" viewBox="0 0 40 120" aria-hidden="true" focusable="false">
        <path d="M20 0 C 8 40, 32 70, 20 120" fill="none" stroke="#BFD6EE" strokeWidth="2" />
      </svg>
      {etiqueta}
    </div>
  );
}
