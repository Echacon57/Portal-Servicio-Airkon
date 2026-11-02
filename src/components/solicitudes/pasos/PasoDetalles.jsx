import { useState } from "react";
import GrupoOpciones from "../../ui/GrupoOpciones";
import CampoFormulario from "../../ui/CampoFormulario";
import { sintomas } from "../../../data/servicios";

export const MAX_DETALLES = 500;

/** Servicios en los que se preguntan síntomas (hay una falla). */
export const conFalla = (servicio) => ["correctivo", "revision"].includes(servicio);

/** Paso 3: síntomas (si hay falla) y detalles libres. */
export default function PasoDetalles({ form }) {
  const { valores, errores, manejarCambio, manejarBlur } = form;
  const [largo, setLargo] = useState(valores.detalles.length);
  const falla = conFalla(valores.servicio);

  const textos = {
    instalacion: {
      etiqueta: "Detalles de la instalación",
      ejemplo: "Ej. El equipo ya está en el lugar; se instalaría en la recámara del segundo piso.",
    },
    preventivo: {
      etiqueta: "¿Algo que debamos saber?",
      ejemplo: "Ej. Hace un año que no se le da mantenimiento.",
    },
    correctivo: {
      etiqueta: "Describe el problema con tus palabras",
      ejemplo: "Ej. Desde ayer enciende pero no enfría y gotea por la unidad de adentro.",
    },
    revision: {
      etiqueta: "Describe lo que notas",
      ejemplo: "Ej. Hace un ruido extraño al arrancar.",
    },
  }[valores.servicio] ?? { etiqueta: "Detalles", ejemplo: "" };

  return (
    <>
      {falla && (
        <GrupoOpciones
          nombre="sintomas"
          tipo="checkbox"
          diseno="compacta"
          leyenda="¿Qué le pasa al equipo?"
          ayuda="Marca todo lo que aplique."
          opciones={sintomas.map((s) => ({ valor: s, titulo: s }))}
          valor={valores.sintomas}
          onChange={manejarCambio}
          onBlur={manejarBlur}
          error={errores.sintomas}
        />
      )}
      <CampoFormulario
        id="detalles"
        como="textarea"
        etiqueta={textos.etiqueta}
        opcional={!falla}
        maxLength={MAX_DETALLES}
        placeholder={textos.ejemplo}
        value={valores.detalles}
        onChange={manejarCambio}
        onInput={(e) => setLargo(e.target.value.length)}
        onBlur={manejarBlur}
        error={errores.detalles}
        ayuda={falla ? "Si no marcaste ningún síntoma, cuéntanos aquí qué pasa." : "Incluye lo que nos ayude a preparar la visita."}
        extra={
          <p className="ayuda" style={{ whiteSpace: "nowrap" }}>
            {largo} / {MAX_DETALLES}
          </p>
        }
      />
    </>
  );
}
