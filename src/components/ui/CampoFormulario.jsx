import Icono from "./Icono";

/**
 * Campo de formulario accesible: label visible + control + ayuda + error.
 * Conecta automáticamente aria-invalid y aria-describedby.
 *
 * Props principales:
 *  - id, etiqueta, error, ayuda, obligatorio, opcional
 *  - como: "input" | "textarea" | "select"
 *  - children: las <option> cuando como="select"
 *  - extra: contenido opcional debajo (p. ej. contador de caracteres)
 *  - el resto de props (value, onChange, onBlur, type...) se pasan al control
 */
export default function CampoFormulario({
  id,
  etiqueta,
  error,
  ayuda,
  obligatorio = false,
  opcional = false,
  como = "input",
  children,
  extra,
  ...props
}) {
  const idAyuda = ayuda ? `${id}-ayuda` : undefined;
  const idError = error ? `${id}-error` : undefined;
  const describedBy = [idError, idAyuda].filter(Boolean).join(" ") || undefined;

  const propsControl = {
    id,
    name: props.name ?? id,
    className: "campo",
    "aria-invalid": error ? "true" : undefined,
    "aria-describedby": describedBy,
    required: obligatorio || undefined,
    ...props,
  };

  let control;
  if (como === "textarea") control = <textarea {...propsControl} />;
  else if (como === "select") control = <select {...propsControl}>{children}</select>;
  else control = <input {...propsControl} />;

  return (
    <div>
      <label className="etiqueta" htmlFor={id}>
        {etiqueta}{" "}
        {obligatorio && (
          <span className="obligatorio" aria-hidden="true">
            *
          </span>
        )}
        {opcional && <span className="opcional">(opcional)</span>}
      </label>
      {control}
      {error && (
        <p id={idError} className="mensaje-error">
          <Icono nombre="alerta" tamano={18} />
          <span>{error}</span>
        </p>
      )}
      {(ayuda || extra) && (
        <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
          {ayuda && (
            <p id={idAyuda} className="ayuda">
              {ayuda}
            </p>
          )}
          {extra}
        </div>
      )}
    </div>
  );
}
