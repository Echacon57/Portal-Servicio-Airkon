import { buscarEquipo } from "../data/equipos";
import { buscarPorId, tiposEquipo, tiposServicio, horarios } from "../data/servicios";

/**
 * Funciones para mostrar los registros (solicitudes de servicio y pedidos)
 * sin repetir la lógica en cada componente.
 */

/** Texto corto del equipo de un registro. */
export function describirEquipo(registro) {
  if (registro.equipoId) {
    const equipo = buscarEquipo(registro.equipoId);
    if (equipo) return registro.tipo === "compra" && registro.cantidad > 1 ? `${equipo.nombre} × ${registro.cantidad}` : equipo.nombre;
  }
  const tipo = buscarPorId(tiposEquipo, registro.tipoEquipo);
  const nombreTipo = tipo && tipo.id !== "nose" ? tipo.nombre : "Equipo";
  const marca = registro.marca && !["No sé", "Otra"].includes(registro.marca) ? registro.marca : "";
  return [nombreTipo, marca].filter(Boolean).join(" ") || "Equipo sin especificar";
}

/** "Reparación", "Mantenimiento preventivo"... o "Compra de equipo". */
export function describirTipo(registro) {
  if (registro.tipo === "compra") return "Compra de equipo";
  return buscarPorId(tiposServicio, registro.servicio)?.nombre ?? "Servicio";
}

export function textoHorario(id) {
  return buscarPorId(horarios, id)?.etiqueta.toLowerCase() ?? "";
}
