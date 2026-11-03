import { createContext, useContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useSesion } from "./SesionContext";
import { solicitudesIniciales } from "../data/solicitudesIniciales";
import { normalizarCorreo } from "../utils/seguridad";

/*
  Estado global de los registros: solicitudes de servicio (tipo "servicio")
  y pedidos de equipo (tipo "compra").
 */
const SolicitudesContext = createContext(null);

/** Prefijo del folio según el tipo: SV = servicio, PD = pedido. */
const prefijos = { servicio: "SV", compra: "PD" };

export function SolicitudesProvider({ children }) {
  const [solicitudes, setSolicitudes] = useLocalStorage("airkon-registros-v2", solicitudesIniciales);
  const { correoVerificado, foliosRecientes, registrarFolioReciente } = useSesion();

  const esDelCliente = (registro) =>
    Boolean(correoVerificado) && normalizarCorreo(registro.correo) === correoVerificado;

  /** Solo los registros del cliente con sesión verificada. */
  const misSolicitudes = solicitudes.filter(esDelCliente);

  /** Un registro por folio, solo si el cliente tiene permiso de verlo. */
  function buscarPermitido(folio) {
    const registro = solicitudes.find((s) => s.folio === folio);
    if (!registro) return null;
    return esDelCliente(registro) || foliosRecientes.includes(folio) ? registro : null;
  }

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
      correo: normalizarCorreo(datos.correo),
      folio: siguienteFolio(datos.tipo),
      estado: "pendiente",
      creada: new Date().toISOString(),
    };
    setSolicitudes((previas) => [nueva, ...previas]);
    // Quien lo creó puede ver la confirmación sin verificar su correo
    registrarFolioReciente(nueva.folio);
    return nueva;
  }

  /** Aplica un cambio solo si el registro pertenece al cliente verificado. */
  function modificarPropio(folio, cambio) {
    setSolicitudes((previas) =>
      previas.flatMap((s) => {
        if (s.folio !== folio || !esDelCliente(s)) return [s];
        return cambio(s);
      })
    );
  }

  function cambiarEstado(folio, estado) {
    modificarPropio(folio, (s) => [{ ...s, estado }]);
  }

  function eliminarSolicitud(folio) {
    modificarPropio(folio, () => []);
  }

  const valor = { misSolicitudes, buscarPermitido, agregarSolicitud, cambiarEstado, eliminarSolicitud };
  return <SolicitudesContext.Provider value={valor}>{children}</SolicitudesContext.Provider>;
}

export function useSolicitudes() {
  const contexto = useContext(SolicitudesContext);
  if (!contexto) throw new Error("useSolicitudes debe usarse dentro de <SolicitudesProvider>");
  return contexto;
}
