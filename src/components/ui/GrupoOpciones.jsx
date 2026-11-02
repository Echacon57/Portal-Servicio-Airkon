import Icono from "./Icono";
import IlustracionEquipo from "../equipos/IlustracionEquipo";
import styles from "./GrupoOpciones.module.css";

/**
 * Grupo de opciones grandes (tarjetas) con radio o checkbox nativos.
 * Al usar inputs reales funciona con teclado (flechas en radios, espacio
 * en checkbox) y con lectores de pantalla sin trabajo extra.
 *
 * @param {object} props
 * @param {string} props.nombre        name de los inputs (= nombre del campo)
 * @param {string} props.leyenda       texto del <legend>
 * @param {{valor:string, titulo:string, descripcion?:string, icono?:string, forma?:string, extra?:string}[]} props.opciones
 * @param {string|string[]} props.valor  valor actual (arreglo si tipo="checkbox")
 * @param {"radio"|"checkbox"} [props.tipo]
 * @param {"lista"|"rejilla"|"compacta"} [props.diseno]
 */
export default function GrupoOpciones({
  nombre,
  leyenda,
  opciones,
  valor,
  onChange,
  onBlur,
  error,
  ayuda,
  tipo = "radio",
  diseno = "lista",
  obligatorio = false,
  leyendaOculta = false,
}) {
  const idError = error ? `${nombre}-error` : undefined;
  const idAyuda = ayuda ? `${nombre}-ayuda` : undefined;
  const describedBy = [idError, idAyuda].filter(Boolean).join(" ") || undefined;
  const marcado = (v) => (tipo === "checkbox" ? valor.includes(v) : valor === v);

  return (
    <fieldset className={styles.grupo} aria-describedby={describedBy} aria-invalid={error ? "true" : undefined}>
      <legend className={leyendaOculta ? "solo-lector" : `etiqueta ${styles.leyenda}`}>
        {leyenda}
        {obligatorio && (
          <>
            {" "}
            <span className="obligatorio" aria-hidden="true">*</span>
            <span className="solo-lector">(obligatorio)</span>
          </>
        )}
      </legend>
      {ayuda && (
        <p id={idAyuda} className={`ayuda ${styles.ayuda}`}>
          {ayuda}
        </p>
      )}
      <div className={`${styles.opciones} ${styles[diseno]}`}>
        {opciones.map((op, i) => (
          <label key={op.valor} className={styles.opcion}>
            <input
              type={tipo}
              // El primer input lleva id = nombre para que el resumen de errores pueda enfocarlo
              id={i === 0 ? nombre : undefined}
              name={nombre}
              value={op.valor}
              checked={marcado(op.valor)}
              onChange={onChange}
              onBlur={onBlur}
            />
            {op.forma && (
              <span className={styles.ilustracion}>
                <IlustracionEquipo forma={op.forma} ancho={84} />
              </span>
            )}
            {op.icono && (
              <span className={styles.icono}>
                <Icono nombre={op.icono} tamano={24} />
              </span>
            )}
            <span className={styles.textos}>
              <span className={styles.titulo}>{op.titulo}</span>
              {op.descripcion && <span className={styles.descripcion}>{op.descripcion}</span>}
              {op.extra && <span className={styles.extra}>{op.extra}</span>}
            </span>
            <span className={styles.marca} aria-hidden="true">
              <Icono nombre="check" tamano={16} />
            </span>
          </label>
        ))}
      </div>
      {error && (
        <p id={idError} className="mensaje-error">
          <Icono nombre="alerta" tamano={18} />
          <span>{error}</span>
        </p>
      )}
    </fieldset>
  );
}
