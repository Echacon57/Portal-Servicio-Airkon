import EstadoBadge from "../ui/EstadoBadge";
import { estaAbierto } from "../ui/FolioEtiqueta";
import { fechaCorta } from "../../utils/formato";
import { describirEquipo } from "../../utils/registros";
import { textoTipo } from "./TablaSolicitudes";
import styles from "./ListaSolicitudes.module.css";

export default function ListaSolicitudes({ solicitudes, onVerDetalle }) {
  const grupos = [
    { id: "abiertas", titulo: "Abiertas", registros: solicitudes.filter(estaAbierto) },
    { id: "completadas", titulo: "Completadas", registros: solicitudes.filter((s) => !estaAbierto(s)) },
  ].filter((g) => g.registros.length > 0);

  return (
    <div className={styles.lista}>
      {grupos.map((g) => (
        <section key={g.id} aria-labelledby={`grupo-${g.id}`}>
          <h2 id={`grupo-${g.id}`} className={styles.titulo}>
            {g.titulo} ({g.registros.length})
          </h2>
          <ul role="list" className={styles.registros}>
            {g.registros.map((s) => (
              <li key={s.folio} className={`${styles.etiqueta} ${estaAbierto(s) ? styles.abierta : styles.cerrada}`}>
                <span className={styles.ojillo} aria-hidden="true" />
                <div className={styles.cuerpo}>
                  <div className={styles.fila}>
                    <h3 className="expandido cifras">{s.folio}</h3>
                    <EstadoBadge estado={s.estado} />
                  </div>
                  <p>
                    {textoTipo(s)}, {describirEquipo(s)}
                  </p>
                  {estaAbierto(s) && (
                    <div className={styles.fila}>
                      <p className={styles.fecha}>
                        {s.tipo === "compra" ? "Entrega" : "Visita"}:{" "}
                        <time dateTime={s.fecha}>{fechaCorta(s.fecha)}</time>
                      </p>
                      <button
                        type="button"
                        className="enlace-texto"
                        onClick={() => onVerDetalle(s.folio)}
                        aria-label={`Ver detalle de ${s.folio}`}
                      >
                        Ver detalle
                      </button>
                    </div>
                  )}
                  {!estaAbierto(s) && (
                    <button
                      type="button"
                      className="enlace-texto"
                      onClick={() => onVerDetalle(s.folio)}
                      aria-label={`Ver detalle de ${s.folio}`}
                    >
                      Ver detalle
                    </button>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
