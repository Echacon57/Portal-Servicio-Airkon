import CampoFormulario from "../../ui/CampoFormulario";
import GrupoOpciones from "../../ui/GrupoOpciones";
import { horarios } from "../../../data/servicios";
import { mananaISO } from "../../../utils/validaciones";
import f from "../../../styles/formulario.module.css";
import styles from "../AsistenteSolicitud.module.css";

/** Paso 4: dirección, fecha y datos de contacto (dos grupos lógicos). */
export default function PasoVisita({ form }) {
  const { valores, errores, manejarCambio, manejarBlur } = form;
  const props = (id) => ({ id, value: valores[id], onChange: manejarCambio, onBlur: manejarBlur, error: errores[id] });

  return (
    <>
      <fieldset className={styles.subgrupo}>
        <legend>Dirección y fecha</legend>
        <CampoFormulario
          {...props("direccion")}
          etiqueta="Dirección del servicio"
          obligatorio
          autoComplete="street-address"
          placeholder="Calle, número, colonia y municipio"
        />
        <div className={f.rejilla}>
          <CampoFormulario
            {...props("fecha")}
            type="date"
            etiqueta="Fecha de visita"
            obligatorio
            min={mananaISO()}
            ayuda="De lunes a sábado. La confirmamos por teléfono."
          />
          <GrupoOpciones
            nombre="horario"
            leyenda="Horario preferido"
            diseno="columna"
            obligatorio
            opciones={horarios.map((h) => ({ valor: h.id, titulo: h.etiqueta }))}
            valor={valores.horario}
            onChange={manejarCambio}
            onBlur={manejarBlur}
            error={errores.horario}
          />
        </div>
      </fieldset>

      <fieldset className={styles.subgrupo}>
        <legend>Datos de contacto</legend>
        <div className={f.rejilla}>
          <CampoFormulario {...props("nombre")} etiqueta="Nombre completo" obligatorio autoComplete="name" />
          <CampoFormulario
            {...props("telefono")}
            etiqueta="Teléfono"
            type="tel"
            inputMode="tel"
            obligatorio
            autoComplete="tel"
            placeholder="81 1234 5678"
          />
          <CampoFormulario
            {...props("correo")}
            etiqueta="Correo electrónico"
            type="email"
            obligatorio
            autoComplete="email"
            placeholder="nombre@correo.com"
            ayuda={!errores.correo ? "Te enviaremos el folio a este correo." : undefined}
          />
          <CampoFormulario
            id="empresa"
            etiqueta="Empresa"
            opcional
            autoComplete="organization"
            value={valores.empresa}
            onChange={manejarCambio}
          />
        </div>
      </fieldset>
    </>
  );
}
