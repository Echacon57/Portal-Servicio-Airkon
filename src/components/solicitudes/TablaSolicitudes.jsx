import EstadoBadge from "../ui/EstadoBadge";
import FolioEtiqueta, { estaAbierto } from "../ui/FolioEtiqueta";
import { fechaCorta } from "../../utils/formato";
import { describirEquipo, describirTipo } from "../../utils/registros";
import styles from "./TablaSolicitudes.module.css";

/** Texto del tipo para la tabla y la lista. */
export function textoTipo(r) {
  if (r.tipo === "compra") return r.instalar ? "Pedido con instalación" : "Pedido, solo entrega";
  return describirTipo(r);
}

/**
 * Tabla de solicitudes de servicio y pedidos (escritorio y tableta).
 * En móvil se usa ListaSolicitudes en su lugar.
 */
export default function TablaSolicitudes({ solicitudes, onVerDetalle }) {
  return (
    <div className={styles.envoltura}>
      <table className={styles.tabla}>
        <caption className="solo-lector">Tus solicitudes de servicio y pedidos</caption>
        <thead>
          <tr>
            <th scope="col">Folio</th>
            <th scope="col">Tipo</th>
            <th scope="col">Equipo</th>
            <th scope="col">Fecha</th>
            <th scope="col">Estado</th>
            <th scope="col">
              <span className="solo-lector">Acciones</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {solicitudes.map((s) => (
            <tr key={s.folio}>
              <th scope="row">
                <FolioEtiqueta folio={s.folio} abierto={estaAbierto(s)} />
              </th>
              <td>{textoTipo(s)}</td>
              <td>{describirEquipo(s)}</td>
              <td>
                <time dateTime={s.fecha}>{fechaCorta(s.fecha)}</time>
              </td>
              <td>
                <EstadoBadge estado={s.estado} />
              </td>
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
