/**
 * Registros de ejemplo para que "Mis solicitudes" no aparezca vacía
 * la primera vez. Hay dos tipos:
 *  - tipo "servicio": solicitud hecha con el asistente por pasos
 *  - tipo "compra":   pedido de un equipo del catálogo
 * Se guardan en localStorage y el usuario puede cancelarlos.
 */
const contacto = {
  nombre: "María Fernanda López",
  telefono: "8112345678",
  correo: "maria@correo.com",
  empresa: "",
};

export const solicitudesIniciales = [
  {
    ...contacto,
    tipo: "compra",
    folio: "PD-2026-0027",
    equipoId: "minisplit-inverter-2tr",
    cantidad: 1,
    instalar: true,
    ubicacion: "altura",
    retiro: true,
    metodoPago: "transferencia",
    total: 20752,
    direccion: "Av. Constitución 100, Centro, Monterrey",
    fecha: "2026-10-27",
    horario: "manana",
    estado: "proceso",
    creada: "2026-10-20T10:00:00.000Z",
  },
  {
    ...contacto,
    tipo: "servicio",
    folio: "SV-2026-0131",
    servicio: "preventivo",
    tipoEquipo: "paquete",
    marca: "Trane",
    ubicacion: "azotea",
    sintomas: [],
    detalles: "Revisión semestral programada del equipo de la tienda.",
    capacidad: "5 TR o más",
    refrigerante: "No sé",
    modelo: "",
    antiguedad: "2 a 5 años",
    direccion: "Calle Hidalgo 250, Obispado, Monterrey",
    fecha: "2026-10-19",
    horario: "manana",
    estado: "completada",
    creada: "2026-10-12T10:00:00.000Z",
  },
  {
    ...contacto,
    tipo: "servicio",
    folio: "SV-2026-0118",
    servicio: "correctivo",
    tipoEquipo: "minisplit",
    marca: "No sé",
    ubicacion: "piso",
    sintomas: ["Gotea agua", "Enfría poco"],
    detalles: "Gotea por la unidad de adentro desde hace una semana.",
    capacidad: "No sé",
    refrigerante: "No sé",
    modelo: "",
    antiguedad: "No sé",
    direccion: "Calle Hidalgo 250, Obispado, Monterrey",
    fecha: "2026-10-08",
    horario: "tarde",
    estado: "completada",
    creada: "2026-10-01T16:30:00.000Z",
  },
];
