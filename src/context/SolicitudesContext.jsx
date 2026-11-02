import { createContext, useContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { solicitudesIniciales } from "../data/solicitudesIniciales";

/**
 * Estado global de los registros del cliente:

 * Cualquier componente puede leerlos o modificarlos con useSolicitudes().
 */
const SolicitudesContext = createContext(null);

/** Prefijo del folio según el tipo: SV = servicio, PD = pedido. */
const prefijos = { servicio: "SV", compra: "PD" };

export function SolicitudesProvider({ children }) {
  const [solicitudes, setSolicitudes] = useLocalStorage("airkon-registros-v2", solicitudesIniciales);

  /** Genera el siguiente folio, p. ej. SV-2026-0132 o PD-2026-0028 */
  function siguienteFolio(tipo) {
    const prefijo = prefijos[tipo];
    const anio = new Date().getFullYear();
    const numeros = solicitudes
      .filter((s) => s.folio.startsWith(prefijo))
      .map((s) => Number(s.folio.split("-")[2]) || 0);
    const siguiente = Math.max(0, ...numeros) + 1;
    return `${prefijo}-${anio}-${String(siguiente).padStart(4, "0")}`;
  }

  /** Guarda un registro nuevo. `datos.tipo` debe ser "servicio" o "compra". */
  function agregarSolicitud(datos) {
    const nueva = {
      ...datos,
      folio: siguienteFolio(datos.tipo),
      estado: "pendiente",
      creada: new Date().toISOString(),
    };
    setSolicitudes((previas) => [nueva, ...previas]);
    return nueva;
  }

  function cambiarEstado(folio, estado) {
    setSolicitudes((previas) => previas.map((s) => (s.folio === folio ? { ...s, estado } : s)));
  }

  function eliminarSolicitud(folio) {
    setSolicitudes((previas) => previas.filter((s) => s.folio !== folio));
  }

  const valor = { solicitudes, agregarSolicitud, cambiarEstado, eliminarSolicitud };
  return <SolicitudesContext.Provider value={valor}>{children}</SolicitudesContext.Provider>;
}

export function useSolicitudes() {
  const contexto = useContext(SolicitudesContext);
  if (!contexto) throw new Error("useSolicitudes debe usarse dentro de <SolicitudesProvider>");
  return contexto;
}
