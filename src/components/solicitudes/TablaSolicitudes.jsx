import EstadoBadge from "../ui/EstadoBadge";
import Icono from "../ui/Icono";
import { fechaCorta } from "../../utils/formato";
import { describirEquipo, describirTipo } from "../../utils/registros";
import styles from "./TablaSolicitudes.module.css";


export default function TablaSolicitudes({ solicitudes, onVerDetalle }) {
  return (
    <div className={styles.envoltura}>
      <table className={styles.tabla}>
        <caption className="solo-lector">Lista de solicitudes de servicio y pedidos</caption>
        <thead>
          <tr>
            <th scope="col">Folio</th>
            <th scope="col">Tipo</th>
            <th scope="col">Equipo</th>
            <th scope="col">Fecha</th>
            <th scope="col">Estado</th>
            <th scope="col"><span className="solo-lector">Acciones</span></th>
          </tr>
        </thead>
        <tbody>
          {solicitudes.map((s) => (
            <tr key={s.folio}>
              <th scope="row" data-etiqueta="Folio">{s.folio}</th>
              <td data-etiqueta="Tipo">
                <span className={styles.tipo}>
                  <Icono nombre={s.tipo === "compra" ? "carrito" : "herramienta"} tamano={18} />
                  {describirTipo(s)}
                </span>
              </td>
              <td data-etiqueta="Equipo">{describirEquipo(s)}</td>
              <td data-etiqueta="Fecha">
                <time dateTime={s.fecha}>{fechaCorta(s.fecha)}</time>
              </td>
              <td data-etiqueta="Estado"><EstadoBadge estado={s.estado} /></td>
              <td className={styles.acciones}>
                <button
                  type="button"
                  className="btn btn-secundario btn-chico"
                  onClick={() => onVerDetalle(s.folio)}
                  aria-label={`Ver detalle de ${s.folio}`}
                >
                  Ver detalle
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
