/** Funciones de validación reutilizables. Cada una regresa un mensaje o "" si es válido. */

export const REGEX_CORREO = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function soloDigitos(texto) {
  return texto.replace(/\D/g, "");
}

export function requerido(valor, mensaje = "Este campo es obligatorio.") {
  return String(valor ?? "").trim() === "" ? mensaje : "";
}

export function validarNombre(valor) {
  if (requerido(valor)) return "Escribe tu nombre completo.";
  if (valor.trim().length < 3) return "El nombre debe tener al menos 3 letras.";
  return "";
}

export function validarTelefono(valor) {
  if (requerido(valor)) return "Escribe un teléfono de contacto.";
  if (soloDigitos(valor).length !== 10)
    return "Ingresa un teléfono de 10 dígitos, por ejemplo 81 1234 5678.";
  return "";
}

export function validarCorreo(valor) {
  if (requerido(valor)) return "Escribe tu correo electrónico.";
  if (!REGEX_CORREO.test(valor.trim())) return "Ingresa un correo válido, por ejemplo nombre@correo.com.";
  return "";
}

/** Fecha en formato AAAA-MM-DD de hoy (zona local). */
export function hoyISO(desfaseDias = 0) {
  const d = new Date();
  d.setDate(d.getDate() + desfaseDias);
  const mes = String(d.getMonth() + 1).padStart(2, "0");
  const dia = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${mes}-${dia}`;
}

/** Fecha de mañana: mínimo permitido en el calendario de visitas. */
export function mananaISO() {
  return hoyISO(1);
}

export function validarFechaFutura(valor) {
  if (requerido(valor)) return "Elige la fecha de la visita.";
  if (valor <= hoyISO()) return "Elige una fecha a partir de mañana.";
  const d = new Date(valor + "T12:00:00");
  if (d.getDay() === 0) return "No damos servicio los domingos. Elige otro día.";
  return "";
}

export function validarLongitud(valor, min, max, nombreCampo = "El texto") {
  const largo = String(valor ?? "").trim().length;
  if (largo < min) return `${nombreCampo} debe tener al menos ${min} caracteres.`;
  if (largo > max) return `${nombreCampo} no puede pasar de ${max} caracteres.`;
  return "";
}

/** Quita las entradas vacías de un objeto de errores. */
export function limpiarErrores(errores) {
  return Object.fromEntries(Object.entries(errores).filter(([, msg]) => msg));
}

/** Validaciones de los datos de contacto, compartidas por los formularios. */
export function validarContacto(v) {
  return {
    nombre: validarNombre(v.nombre),
    telefono: validarTelefono(v.telefono),
    correo: validarCorreo(v.correo),
  };
}

export function validarDireccion(valor) {
  if (requerido(valor)) return "Escribe la dirección: calle, número, colonia y municipio.";
  return validarLongitud(valor, 10, 150, "La dirección");
}
