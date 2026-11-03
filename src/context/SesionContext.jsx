import { createContext, useContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import {
  generarToken,
  normalizarCorreo,
  MINUTOS_ENLACE,
  MINUTOS_SESION,
  MAX_ENLACES_POR_HORA,
} from "../utils/seguridad";

/**
 SIMULACIÓN del acceso a "Mis solicitudes" con enlace por correo.
 Todo se guarda en sessionStorage (se borra al cerrar la pestaña).
 En el sistema real el token y la sesión vivirían en el servidor, y la sesión
 en una cookie HttpOnly que JavaScript no puede leer.
 */
const SesionContext = createContext(null);

const minutos = (n) => n * 60 * 1000;

export function SesionProvider({ children }) {
  const [sesion, setSesion] = useLocalStorage("airkon-sesion", null, "sesion");
  const [enlacePendiente, setEnlacePendiente] = useLocalStorage("airkon-enlace", null, "sesion");
  const [envios, setEnvios] = useLocalStorage("airkon-envios", [], "sesion");
  const [foliosRecientes, setFoliosRecientes] = useLocalStorage("airkon-recientes", [], "sesion");

  // La sesión vence sola después de MINUTOS_SESION
  const sesionVigente = sesion && sesion.expira > Date.now() ? sesion : null;

  /**
   * Genera un enlace de acceso para el correo.
   * @returns {{ ok: true, token: string } | { ok: false, motivo: string }}
   */
  function solicitarEnlace(correo) {
    const ahora = Date.now();
    const ultimaHora = envios.filter((t) => ahora - t < minutos(60));
    // Límite de envíos para que no se use para mandar correos masivos
    if (ultimaHora.length >= MAX_ENLACES_POR_HORA) {
      return { ok: false, motivo: "Solicitaste demasiados enlaces. Intenta de nuevo en una hora." };
    }
    const token = generarToken();
    // Un nuevo enlace reemplaza al anterior: solo el más reciente sirve
    setEnlacePendiente({ token, correo: normalizarCorreo(correo), expira: ahora + minutos(MINUTOS_ENLACE) });
    setEnvios([...ultimaHora, ahora]);
    return { ok: true, token };
  }

  /**
   * Valida el token del enlace. Es de un solo uso.
   * @returns {{ ok: true, correo: string } | { ok: false, motivo: string }}
   */
  function verificarToken(token) {
    const pendiente = enlacePendiente;
    if (!pendiente || !token || pendiente.token !== token) {
      return { ok: false, motivo: "El enlace no es válido o ya se usó." };
    }
    setEnlacePendiente(null); // un solo uso
    if (pendiente.expira < Date.now()) {
      return { ok: false, motivo: "El enlace venció. Pide uno nuevo." };
    }
    setSesion({ correo: pendiente.correo, expira: Date.now() + minutos(MINUTOS_SESION) });
    return { ok: true, correo: pendiente.correo };
  }

  function cerrarSesion() {
    setSesion(null);
  }

  /** Quien acaba de crear un registro puede ver su confirmación sin verificar. */
  function registrarFolioReciente(folio) {
    setFoliosRecientes((previos) => [...previos.slice(-9), folio]);
  }

  const valor = {
    correoVerificado: sesionVigente?.correo ?? null,
    sesionExpira: sesionVigente?.expira ?? null,
    solicitarEnlace,
    verificarToken,
    cerrarSesion,
    foliosRecientes,
    registrarFolioReciente,
  };
  return <SesionContext.Provider value={valor}>{children}</SesionContext.Provider>;
}

export function useSesion() {
  const contexto = useContext(SesionContext);
  if (!contexto) throw new Error("useSesion debe usarse dentro de <SesionProvider>");
  return contexto;
}
