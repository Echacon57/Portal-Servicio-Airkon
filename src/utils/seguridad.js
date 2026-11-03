/**
 Utilidades para la simulación del acceso por correo.
 En un sistema real, generar y validar tokens se hace en el servidor.
 */


export function generarToken() {
  const bytes = new Uint8Array(32);
  crypto.getRandomValues(bytes);
  return Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("");
}

export function normalizarCorreo(correo) {
  return String(correo ?? "").trim().toLowerCase();
}

/** Para mostrar el correo sin exponerlo completo. */
export function enmascararCorreo(correo) {
  const [usuario, dominio] = normalizarCorreo(correo).split("@");
  if (!dominio) return correo;
  if (usuario.length <= 2) return `${usuario[0]}•••@${dominio}`;
  return `${usuario[0]}•••${usuario[usuario.length - 1]}@${dominio}`;
}

export const MINUTOS_ENLACE = 15;
export const MINUTOS_SESION = 30;
export const SEGUNDOS_REENVIO = 30;
export const MAX_ENLACES_POR_HORA = 5;
