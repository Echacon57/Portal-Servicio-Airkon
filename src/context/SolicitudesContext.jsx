import { createContext, useContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { solicitudesIniciales } from "../data/solicitudesIniciales";

const SolicitudesContext = createContext(null);

export function SolicitudesProvider({ children }) {
  const [solicitudes, setSolicitudes] = useLocalStorage("airkon-solicitudes", solicitudesIniciales);

  /** Genera el siguiente folio con el formato AK-AAAA-0000 */
  function siguienteFolio() {
    const anio = new Date().getFullYear();
    const numeros = solicitudes.map((s) => Number(s.folio.split("-")[2]) || 0);
    const siguiente = Math.max(140, ...numeros) + 1;
    return `AK-${anio}-${String(siguiente).padStart(4, "0")}`;
  }

  function agregarSolicitud(datos) {
    const nueva = {
      ...datos,
      folio: siguienteFolio(),
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
