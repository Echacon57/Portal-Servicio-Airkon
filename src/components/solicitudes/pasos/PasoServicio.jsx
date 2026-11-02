import GrupoOpciones from "../../ui/GrupoOpciones";
import { tiposServicio } from "../../../data/servicios";

/** Paso 1: qué servicio necesita el cliente. */
export default function PasoServicio({ form }) {
  return (
    <GrupoOpciones
      nombre="servicio"
      leyenda="Tipo de servicio"
      leyendaOculta
      opciones={tiposServicio.map((s) => ({
        valor: s.id,
        titulo: s.nombre,
        descripcion: s.descripcion,
        icono: s.icono,
      }))}
      valor={form.valores.servicio}
      onChange={form.manejarCambio}
      onBlur={form.manejarBlur}
      error={form.errores.servicio}
    />
  );
}
