/**
  Listas que usan los formularios y las páginas.
 */

/** Servicios que se muestran en Inicio. `icono` corresponde a un nombre de Icono.jsx */
export const servicios = [
  {
    id: "instalacion",
    nombre: "Instalación",
    icono: "aire",
    descripcion:
      "Instalación de equipos minisplit, multisplit y paquete, con puesta en marcha y pruebas de operación.",
  },
  {
    id: "preventivo",
    nombre: "Mantenimiento preventivo",
    icono: "copo",
    descripcion: "Limpieza, revisión y ajuste periódico para que tu equipo rinda mejor y dure más.",
  },
  {
    id: "correctivo",
    nombre: "Reparación",
    icono: "herramienta",
    descripcion: "Diagnóstico y reparación de fallas para recuperar el confort lo antes posible.",
  },
  {
    id: "proyecto",
    nombre: "Proyectos",
    icono: "edificio",
    descripcion: "Diseño y ejecución de sistemas de climatización para comercios, oficinas e industria.",
  },
];

/** Paso 1 del asistente: qué necesita el cliente. */
export const tiposServicio = [
  {
    id: "instalacion",
    nombre: "Instalación",
    descripcion: "Ya tengo un equipo y necesito que lo instalen.",
    icono: "aire",
  },
  {
    id: "preventivo",
    nombre: "Mantenimiento preventivo",
    descripcion: "Limpieza y revisión de rutina para que funcione bien.",
    icono: "copo",
  },
  {
    id: "correctivo",
    nombre: "Reparación",
    descripcion: "Mi equipo tiene una falla y quiero que lo reparen.",
    icono: "herramienta",
  },
  {
    id: "revision",
    nombre: "Revisión o diagnóstico",
    descripcion: "No sé qué tiene; quiero que un técnico lo revise.",
    icono: "buscar",
  },
];

/** Tipos de equipo, pensados para que el cliente los reconozca por su forma. */
export const tiposEquipo = [
  { id: "minisplit", nombre: "Minisplit de pared", forma: "pared" },
  { id: "ventana", nombre: "De ventana", forma: "ventana" },
  { id: "piso-techo", nombre: "Piso-techo", forma: "pared" },
  { id: "multisplit", nombre: "Multisplit", forma: "exterior" },
  { id: "paquete", nombre: "Paquete o de azotea", forma: "paquete" },
  { id: "chiller", nombre: "Chiller o sistema central", forma: "chiller" },
  { id: "nose", nombre: "No sé", forma: "nose" },
];

export const marcasComunes = ["Carrier", "Daikin", "LG", "Midea", "Mirage", "Samsung", "Trane", "York", "Otra", "No sé"];

/**
 * Dónde está el equipo. `extra` es el cargo adicional aproximado por equipo
 * (en servicio se muestra como aviso; en compra se suma a la instalación).
 */
export const ubicaciones = [
  {
    id: "piso",
    nombre: "A nivel de piso o fácil de alcanzar",
    descripcion: "Se alcanza con una escalera pequeña.",
    extra: 0,
  },
  {
    id: "altura",
    nombre: "En altura",
    descripcion: "A más de 3 metros; se necesita escalera grande.",
    extra: 300,
  },
  {
    id: "azotea",
    nombre: "En azotea o techo",
    descripcion: "Hay acceso por escalera fija o escotilla.",
    extra: 400,
  },
  {
    id: "fachada",
    nombre: "Fachada exterior en altura",
    descripcion: "Se necesita andamio o equipo de seguridad.",
    extra: 800,
  },
];

export const sintomas = [
  "No enfría",
  "Enfría poco",
  "Gotea agua",
  "Hace ruido",
  "No enciende",
  "Se apaga solo",
  "Huele mal",
  "Muestra un código de error",
];

export const capacidades = ["No sé", "1 TR", "1.5 TR", "2 TR", "3 TR", "4 TR", "5 TR o más"];
export const refrigerantes = ["No sé", "R-410A", "R-32", "R-22", "R-134a"];
export const antiguedades = ["No sé", "Menos de 2 años", "2 a 5 años", "5 a 10 años", "Más de 10 años"];

export const horarios = [
  { id: "manana", etiqueta: "Mañana (8:00 a 12:00)" },
  { id: "tarde", etiqueta: "Tarde (12:00 a 18:00)" },
];

export const metodosPago = [
  { id: "transferencia", nombre: "Transferencia bancaria", descripcion: "Te enviamos los datos al confirmar el pedido." },
  { id: "terminal", nombre: "Tarjeta en terminal", descripcion: "Pagas con tarjeta cuando entregamos el equipo." },
  { id: "efectivo", nombre: "Efectivo al entregar", descripcion: "Pagas al recibir el equipo." },
];

export const CARGO_RETIRO = 650; // retirar y desechar el equipo anterior
export const IVA = 0.16;

export const estados = {
  pendiente: "Pendiente",
  proceso: "En proceso",
  completada: "Completada",
};

export function buscarPorId(lista, id) {
  return lista.find((item) => item.id === id);
}
