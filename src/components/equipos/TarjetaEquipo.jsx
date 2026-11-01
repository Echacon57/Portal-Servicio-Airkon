import { Link } from "react-router-dom";
import Icono from "../ui/Icono";
import IlustracionEquipo from "./IlustracionEquipo";
import { capacidadTexto } from "../../data/equipos";
import styles from "./TarjetaEquipo.module.css";

export default function TarjetaEquipo({ equipo }) {
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
        <Link
          to={`/catalogo/${equipo.id}`}
          className="btn btn-secundario btn-bloque"
          aria-label={`Ver detalle de ${equipo.nombre}`}
        >
          Ver detalle
        </Link>
      </div>
    </article>
  );
}
