/*
 Servicio de días feriados (API externa Nager.Date).
 Documentación del servicio: docs/api-feriados.md
 La URL base y el país salen de variables de entorno (ver .env.example).
 Si no están definidas se usan los valores públicos por defecto.
 */
const API_URL = import.meta.env.VITE_FERIADOS_API_URL || "https://date.nager.at/api/v3";
const PAIS = import.meta.env.VITE_FERIADOS_PAIS || "MX";

const TIEMPO_MAXIMO_MS = 8000;
const CLAVE_CACHE = "airkon-feriados";

function leerCache(anio) {
  try {
    const guardado = sessionStorage.getItem(`${CLAVE_CACHE}-${PAIS}-${anio}`);
    return guardado ? JSON.parse(guardado) : null;
  } catch {
    return null;
  }
}

function guardarCache(anio, feriados) {
  try {
    sessionStorage.setItem(`${CLAVE_CACHE}-${PAIS}-${anio}`, JSON.stringify(feriados));
  } catch {
  }
}

/*
 Pide a la API los feriados oficiales de un año.
 Los feriados de un año no cambian, así que se guardan en sessionStorage
 para no repetir la petición en cada formulario.
 */
export async function obtenerFeriados(anio, senal) {
  const enCache = leerCache(anio);
  if (enCache) return enCache;

  // fetch no tiene tiempo límite: se cancela si la API tarda demasiado
  const control = new AbortController();
  const reloj = setTimeout(() => control.abort(), TIEMPO_MAXIMO_MS);
  if (senal?.aborted) control.abort();
  senal?.addEventListener("abort", () => control.abort(), { once: true });

  try {
    const respuesta = await fetch(`${API_URL}/PublicHolidays/${anio}/${PAIS}`, {
      signal: control.signal,
      headers: { Accept: "application/json" },
    });
    if (!respuesta.ok) throw new Error(`La API de feriados respondió ${respuesta.status}`);
    const datos = respuesta.status === 204 ? [] : await respuesta.json();
    if (!Array.isArray(datos)) throw new Error("La API de feriados regresó un formato inesperado");

    const feriados = datos
      // Solo descanso oficial; se descartan los que son solo bancarios o escolares
      .filter((d) => !d.types || d.types.includes("Public"))
      .map((d) => ({ fecha: d.date, nombre: d.localName || d.name }));

    guardarCache(anio, feriados);
    return feriados;
  } finally {
    clearTimeout(reloj);
  }
}
