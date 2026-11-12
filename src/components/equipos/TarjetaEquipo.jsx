import { Link } from "react-router-dom";
import Icono from "../ui/Icono";
import IlustracionEquipo from "./IlustracionEquipo";
import { moneda } from "../../utils/precios";
import styles from "./TarjetaEquipo.module.css";

export default function TarjetaEquipo({ equipo }) {
  const requiereCotizacion = equipo.precioInstalacion === null;

  return (
    <article className={`tarjeta ${styles.tarjeta}`}>
      <div className={styles.imagen}>
        <IlustracionEquipo forma={equipo.forma} ancho={180} />
      </div>
      <div className={styles.cuerpo}>
        <span className="etiqueta-tipo">{equipo.categoria}</span>
        <h3>{equipo.nombre}</h3>
        <dl className={styles.datos}>
          <div className={styles.dato}>
            <dt>Capacidad</dt>
            <dd>{equipo.toneladas} TR · {equipo.btu}</dd>
          </div>
          <div className={styles.dato}>
            <dt>Marca</dt>
            <dd>{equipo.marca}</dd>
          </div>
        </dl>
        <p className={styles.precio}>
          <span className={styles.desde}>Precio del equipo</span>
          <strong>{moneda(equipo.precio)}</strong>
          <span className={styles.nota}>
            {requiereCotizacion ? "Instalación con proyecto y cotización" : `+ IVA · instalación desde ${moneda(equipo.precioInstalacion)}`}
          </span>
        </p>
        <div className={styles.acciones}>
          {!requiereCotizacion && (
            <Link to={`/comprar/${equipo.id}`} className="btn btn-acento" aria-label={`Comprar ${equipo.nombre}`}>
              <Icono nombre="carrito" tamano={20} />
              Comprar
            </Link>
          )}
          <Link
            to={`/catalogo/${equipo.id}`}
            className="btn btn-secundario"
            aria-label={`Ver detalle de ${equipo.nombre}`}
          >
            Ver detalle
          </Link>
        </div>
      </div>
    </article>
  );
}
