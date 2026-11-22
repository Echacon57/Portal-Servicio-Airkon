import { buscarEquipo } from "../data/equipos";
import { buscarPorId, tiposEquipo, tiposServicio, horarios, ubicaciones } from "../data/servicios";
import { fechaCorta } from "./formato";
import { moneda } from "./precios";

/**
 Funciones para mostrar los registros (solicitudes de servicio y pedidos)
 sin repetir la lógica en cada componente.
 */

/* Texto corto del equipo de un registro. */
export function describirEquipo(registro) {
  if (registro.equipoId) {
    const equipo = buscarEquipo(registro.equipoId);
    if (equipo) return registro.tipo === "compra" && registro.cantidad > 1 ? `${equipo.nombre} × ${registro.cantidad}` : equipo.nombre;
  }
  const tipo = buscarPorId(tiposEquipo, registro.tipoEquipo);
  const nombreTipo = tipo && tipo.id !== "nose" ? tipo.nombre : "Equipo";
  const marca = registro.marca && !["No estoy seguro(a)", "Otra"].includes(registro.marca) ? registro.marca : "";
  return [nombreTipo, marca].filter(Boolean).join(" ") || "Equipo sin especificar";
}

export function describirTipo(registro) {
  if (registro.tipo === "compra") return "Compra de equipo";
  return buscarPorId(tiposServicio, registro.servicio)?.nombre ?? "Servicio";
}

export function textoHorario(id) {
  return buscarPorId(horarios, id)?.etiqueta.toLowerCase() ?? "";
}

const pasosHechos = { pendiente: 1, proceso: 2, completada: 3 };

/**
 Datos que muestra la etiqueta de servicio (EtiquetaServicio) para un registro real.
 */
export function datosEtiqueta(r) {
  const esCompra = r.tipo === "compra";
  const fecha = `${fechaCorta(r.fecha)}, ${textoHorario(r.horario).split(" (")[0]}`;
  const datos = esCompra
    ? [
        { dato: "Equipo", valor: describirEquipo(r) },
        { dato: "Tipo", valor: r.instalar ? "Compra con instalación" : "Compra, solo entrega" },
        { dato: "Entrega", valor: fecha },
        { dato: "Total", valor: `${moneda(r.total)} con IVA` },
      ]
    : [
        { dato: "Servicio", valor: describirTipo(r) },
        { dato: "Equipo", valor: describirEquipo(r) },
        { dato: "Ubicación", valor: buscarPorId(ubicaciones, r.ubicacion)?.nombre ?? "Por confirmar" },
        { dato: "Visita", valor: fecha },
      ];
  return {
    titulo: esCompra ? "Folio de pedido" : "Folio de servicio",
    folio: r.folio,
    datos,
    pasos: esCompra
      ? ["Pedido recibido", "Entrega confirmada por teléfono", r.instalar ? "Equipo instalado" : "Equipo entregado"]
      : ["Solicitud recibida", "Visita confirmada por teléfono", "Servicio realizado"],
    hechos: pasosHechos[r.estado],
    estado: r.estado,
  };
}
