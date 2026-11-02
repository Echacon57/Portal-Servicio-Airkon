import Icono from "../../ui/Icono";
import { buscarPorId, tiposServicio, tiposEquipo, ubicaciones } from "../../../data/servicios";
import { fechaCorta, telefonoLegible } from "../../../utils/formato";
import { textoHorario } from "../../../utils/registros";
import styles from "../AsistenteSolicitud.module.css";

/**
 * Paso 5: resumen de todo lo capturado antes de enviar (prevención de errores).
 * Cada bloque tiene un botón "Editar" que regresa a ese paso.
 */
export default function PasoRevision({ form, foto, onEditar }) {
  const { valores, errores, manejarCambio } = form;
  const v = valores;
  const noIndicado = <span className={styles.vacio}>No indicado</span>;

  const datosTecnicos = [
    v.capacidad !== "No estoy seguro(a)" && v.capacidad,
    v.refrigerante !== "No estoy seguro(a)" && v.refrigerante,
    v.antiguedad !== "No estoy seguro(a)" && v.antiguedad,
    v.modelo && `Modelo ${v.modelo}`,
    foto && "con foto",
  ].filter(Boolean);

  const bloques = [
    {
      paso: 0,
      titulo: "Servicio",
      filas: [["Servicio", buscarPorId(tiposServicio, v.servicio)?.nombre]],
    },
    {
      paso: 1,
      titulo: "Tu equipo",
      filas: [
        ["Tipo", buscarPorId(tiposEquipo, v.tipoEquipo)?.nombre],
        ["Marca", v.marca],
        ["Ubicación", buscarPorId(ubicaciones, v.ubicacion)?.nombre],
        ["Datos técnicos", datosTecnicos.length ? datosTecnicos.join(" · ") : null],
      ],
    },
    {
      paso: 2,
      titulo: "Detalles",
      filas: [
        ["Síntomas", v.sintomas.length ? v.sintomas.join(", ") : null],
        ["Descripción", v.detalles.trim() || null],
      ],
    },
    {
      paso: 3,
      titulo: "Visita y contacto",
      filas: [
        ["Dirección", v.direccion],
        ["Fecha", v.fecha && `${fechaCorta(v.fecha)}, ${textoHorario(v.horario)}`],
        ["Contacto", `${v.nombre} · ${telefonoLegible(v.telefono)}`],
        ["Correo", v.correo],
      ],
    },
  ];

  return (
    <>
      <div className={styles.revision}>
        {bloques.map((b) => (
          <section key={b.titulo} className={styles.bloqueRevision} aria-labelledby={`rev-${b.paso}`}>
            <div className={styles.bloqueEncabezado}>
              <h3 id={`rev-${b.paso}`}>{b.titulo}</h3>
              <button
                type="button"
                className="btn btn-secundario btn-chico"
                onClick={() => onEditar(b.paso)}
                aria-label={`Editar ${b.titulo.toLowerCase()}`}
              >
                <Icono nombre="editar" tamano={18} />
                Editar
              </button>
            </div>
            <dl>
              {b.filas.map(([dato, valor]) => (
                <div key={dato}>
                  <dt>{dato}</dt>
                  <dd>{valor || noIndicado}</dd>
                </div>
              ))}
            </dl>
          </section>
        ))}
      </div>

      <div>
        <label className="casilla">
          <input
            type="checkbox"
            id="terminos"
            name="terminos"
            checked={v.terminos}
            onChange={manejarCambio}
            aria-invalid={errores.terminos ? "true" : undefined}
            aria-describedby={errores.terminos ? "terminos-error" : undefined}
          />
          <span>
            Acepto que Airkon use mis datos para atender esta solicitud.{" "}
            <span className="obligatorio" aria-hidden="true">*</span>
          </span>
        </label>
        {errores.terminos && (
          <p id="terminos-error" className="mensaje-error">
            <Icono nombre="alerta" tamano={18} />
            <span>{errores.terminos}</span>
          </p>
        )}
      </div>
    </>
  );
}
