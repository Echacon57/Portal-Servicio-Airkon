import { Link } from "react-router-dom";
import Icono from "../ui/Icono";
import IlustracionEquipo from "./IlustracionEquipo";
import { capacidadTexto } from "../../data/equipos";
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
        <ul role="list" className={styles.datos}>
          <li>
            <Icono nombre="termometro" tamano={20} />
            Capacidad: <strong>{capacidadTexto(equipo)}</strong>
          </li>
          <li>
            <Icono nombre="escudo" tamano={20} />
            Marca: <strong>{equipo.marca}</strong>
          </li>
        </ul>
        <p className={styles.precio}>
          <span className={styles.desde}>Precio del equipo</span>
          <strong>{moneda(equipo.precio)}</strong>
          <span className={styles.nota}>
            {requiereCotizacion ? "Instalación con proyecto y cotización" : `+ IVA · instalación desde ${moneda(equipo.precioInstalacion)}`}
          </span>
        </p>
        <div className={styles.acciones}>
          {!requiereCotizacion && (
            <Link to={`/comprar/${equipo.id}`} className="btn btn-primario" aria-label={`Comprar ${equipo.nombre}`}>
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
