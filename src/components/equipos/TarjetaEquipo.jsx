import { Link } from "react-router-dom";
import IlustracionEquipo from "./IlustracionEquipo";
import { capacidadTexto } from "../../data/equipos";
import { moneda } from "../../utils/precios";
import styles from "./TarjetaEquipo.module.css";


export default function TarjetaEquipo({ equipo }) {
  const requiereCotizacion = equipo.precioInstalacion === null;

  return (
    <article className={styles.placa} aria-labelledby={`equipo-${equipo.id}`}>
      {["arribaIzq", "arribaDer", "abajoIzq", "abajoDer"].map((r) => (
        <span key={r} className={`${styles.remache} ${styles[r]}`} aria-hidden="true" />
      ))}
      <div className={styles.marco}>
        <div className={styles.imagen}>
          <IlustracionEquipo forma={equipo.forma} ancho={150} />
        </div>
        <header className={styles.encabezado}>
          <h3 id={`equipo-${equipo.id}`}>{equipo.nombre}</h3>
          <span className={styles.marca}>{equipo.marca}</span>
        </header>
        <dl className={styles.datos}>
          <div>
            <dt>Capacidad</dt>
            <dd>{capacidadTexto(equipo)}</dd>
          </div>
          <div>
            <dt>Alimentación</dt>
            <dd>{equipo.voltaje.split(", 60")[0]}</dd>
          </div>
        </dl>
        <div className={styles.pie}>
          <p className={styles.precio}>
            <span className="expandido cifras">{moneda(equipo.precio)}</span>
            <span className={styles.nota}>
              {requiereCotizacion ? "Instalación con proyecto" : `Instalación desde ${moneda(equipo.precioInstalacion)}`}
            </span>
          </p>
          <div className={styles.acciones}>
            <Link to={`/catalogo/${equipo.id}`} className="enlace-texto" aria-label={`Ver ficha de ${equipo.nombre}`}>
              Ver ficha
            </Link>
            {requiereCotizacion ? (
              <Link to="/contacto" className="btn btn-secundario btn-chico" aria-label={`Cotizar ${equipo.nombre}`}>
                Cotizar
              </Link>
            ) : (
              <Link to={`/comprar/${equipo.id}`} className="btn btn-acento btn-chico" aria-label={`Comprar ${equipo.nombre}`}>
                Comprar
              </Link>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
