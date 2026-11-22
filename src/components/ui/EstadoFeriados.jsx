import Icono from "./Icono";
import { fechaCorta } from "../../utils/formato";
import { hoyISO } from "../../utils/validaciones";
import f from "../../styles/formulario.module.css";

const MAX_PROXIMOS = 3;

/**
 Muestra el estado de la consulta de días feriados debajo del campo de fecha:
 cargando, error (con botón para reintentar) o los próximos feriados.
 Recibe lo que regresa el hook useFeriados.
 */
export default function EstadoFeriados({ estado, feriados, reintentar }) {
  const proximos = feriados.filter((d) => d.fecha > hoyISO()).slice(0, MAX_PROXIMOS);

  return (
    <div aria-live="polite">
      {estado === "cargando" && (
        <p className={f.info}>
          <Icono nombre="reloj" tamano={18} />
          <span>Consultando los días feriados...</span>
        </p>
      )}

      {estado === "error" && (
        <div className={f.aviso}>
          <Icono nombre="alerta" tamano={18} />
          <div>
            <p>No pudimos consultar los días feriados. Puedes continuar: confirmamos la fecha por teléfono.</p>
            <button type="button" className="enlace-texto" onClick={reintentar}>
              Reintentar
            </button>
          </div>
        </div>
      )}

      {estado === "exito" && proximos.length > 0 && (
        <p className={f.info}>
          <Icono nombre="ayuda" tamano={18} />
          <span>
            Próximos días feriados sin servicio:{" "}
            {proximos.map((d) => `${fechaCorta(d.fecha)} (${d.nombre})`).join(", ")}.
          </span>
        </p>
      )}
    </div>
  );
}
