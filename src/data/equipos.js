
export const equipos = [
  {
    id: "minisplit-inverter-1tr",
    nombre: "Minisplit Inverter 1 TR",
    categoria: "Minisplit",
    marca: "LG",
    toneladas: 1,
    btu: "12,000 BTU/h",
    voltaje: "115 V, 1 fase, 60 Hz",
    refrigerante: "R-410A",
    aplicacion: "Recámaras y oficinas pequeñas",
    forma: "pared",
    descripcion:
      "Equipo de pared con compresor inverter, ideal para espacios de hasta 15 m². Bajo consumo y operación silenciosa.",
  },
  {
    id: "minisplit-inverter-2tr",
    nombre: "Minisplit Inverter 2 TR",
    categoria: "Minisplit",
    marca: "Mirage",
    toneladas: 2,
    btu: "24,000 BTU/h",
    voltaje: "220 V, 1 fase, 60 Hz",
    refrigerante: "R-410A",
    aplicacion: "Oficinas, locales y recámaras amplias",
    forma: "pared",
    descripcion:
      "El minisplit inverter ajusta la velocidad del compresor para mantener la temperatura con menor variación y menor ruido. Es una opción práctica para espacios medianos a amplios.",
  },
  {
    id: "minisplit-convencional-15tr",
    nombre: "Minisplit Convencional 1.5 TR",
    categoria: "Minisplit",
    marca: "Mirage",
    toneladas: 1.5,
    btu: "18,000 BTU/h",
    voltaje: "220 V, 1 fase, 60 Hz",
    refrigerante: "R-410A",
    aplicacion: "Salas y consultorios",
    forma: "pared",
    descripcion:
      "Equipo de velocidad fija con buena relación costo-beneficio para espacios de uso intermitente.",
  },
  {
    id: "multisplit-2x1",
    nombre: "Multisplit 2×1",
    categoria: "Multisplit",
    marca: "Carrier",
    toneladas: 3,
    btu: "36,000 BTU/h",
    voltaje: "220 V, 1 fase, 60 Hz",
    refrigerante: "R-410A",
    aplicacion: "Casas con dos espacios a climatizar",
    forma: "exterior",
    descripcion:
      "Una sola unidad exterior alimenta dos evaporadoras independientes. Ahorra espacio en azotea o fachada.",
  },
  {
    id: "multisplit-3x1",
    nombre: "Multisplit 3×1",
    categoria: "Multisplit",
    marca: "LG",
    toneladas: 4,
    btu: "48,000 BTU/h",
    voltaje: "220 V, 1 fase, 60 Hz",
    refrigerante: "R-32",
    aplicacion: "Departamentos y oficinas con varias áreas",
    forma: "exterior",
    descripcion:
      "Tres evaporadoras con control independiente conectadas a una condensadora inverter de alta eficiencia.",
  },
  {
    id: "paquete-5tr",
    nombre: "Paquete 5 TR",
    categoria: "Paquete",
    marca: "Trane",
    toneladas: 5,
    btu: "60,000 BTU/h",
    voltaje: "220 V, 3 fases, 60 Hz",
    refrigerante: "R-410A",
    aplicacion: "Locales comerciales y restaurantes",
    forma: "paquete",
    descripcion:
      "Unidad autocontenida para montaje en azotea con distribución por ductos. Fácil acceso para mantenimiento.",
  },
  {
    id: "paquete-75tr",
    nombre: "Paquete 7.5 TR",
    categoria: "Paquete",
    marca: "Carrier",
    toneladas: 7.5,
    btu: "90,000 BTU/h",
    voltaje: "220 V, 3 fases, 60 Hz",
    refrigerante: "R-410A",
    aplicacion: "Oficinas y tiendas medianas",
    forma: "paquete",
    descripcion:
      "Equipo paquete de dos etapas que ajusta su capacidad según la carga térmica del día.",
  },
  {
    id: "paquete-10tr",
    nombre: "Paquete 10 TR",
    categoria: "Paquete",
    marca: "Carrier",
    toneladas: 10,
    btu: "120,000 BTU/h",
    voltaje: "440 V, 3 fases, 60 Hz",
    refrigerante: "R-410A",
    aplicacion: "Naves ligeras y supermercados",
    forma: "paquete",
    descripcion:
      "Alta capacidad para espacios grandes con economizador opcional para aprovechar aire exterior.",
  },
  {
    id: "chiller-aire-20tr",
    nombre: "Chiller enfriado por aire 20 TR",
    categoria: "Chiller",
    marca: "Trane",
    toneladas: 20,
    btu: "240,000 BTU/h",
    voltaje: "440 V, 3 fases, 60 Hz",
    refrigerante: "R-410A",
    aplicacion: "Edificios de oficinas y hospitales",
    forma: "chiller",
    descripcion:
      "Genera agua helada que se distribuye a manejadoras y fan coils. Requiere proyecto de ingeniería.",
  },
  {
    id: "chiller-aire-40tr",
    nombre: "Chiller enfriado por aire 40 TR",
    categoria: "Chiller",
    marca: "Carrier",
    toneladas: 40,
    btu: "480,000 BTU/h",
    voltaje: "440 V, 3 fases, 60 Hz",
    refrigerante: "R-134a",
    aplicacion: "Industria y centros comerciales",
    forma: "chiller",
    descripcion:
      "Chiller con compresores scroll en tándem para operación escalonada y respaldo ante fallas.",
  },
  {
    id: "minisplit-piso-techo-3tr",
    nombre: "Piso-techo 3 TR",
    categoria: "Minisplit",
    marca: "Trane",
    toneladas: 3,
    btu: "36,000 BTU/h",
    voltaje: "220 V, 1 fase, 60 Hz",
    refrigerante: "R-410A",
    aplicacion: "Salones, aulas y comercios",
    forma: "pared",
    descripcion:
      "Evaporadora que se instala en plafón o en muro bajo, con gran alcance de aire para espacios abiertos.",
  },
  {
    id: "multisplit-4x1",
    nombre: "Multisplit 4×1",
    categoria: "Multisplit",
    marca: "Mirage",
    toneladas: 6,
    btu: "72,000 BTU/h",
    voltaje: "220 V, 1 fase, 60 Hz",
    refrigerante: "R-32",
    aplicacion: "Residencias con varias recámaras",
    forma: "exterior",
    descripcion:
      "Hasta cuatro evaporadoras de distintas capacidades en una sola condensadora inverter.",
  },
];

export const categorias = ["Minisplit", "Multisplit", "Paquete", "Chiller"];
export const marcas = ["Carrier", "LG", "Mirage", "Trane"];

export const rangosCapacidad = [
  { id: "hasta2", etiqueta: "Hasta 2 TR", min: 0, max: 2 },
  { id: "3a5", etiqueta: "3 a 5 TR", min: 2.01, max: 5 },
  { id: "6a10", etiqueta: "6 a 10 TR", min: 5.01, max: 10 },
  { id: "mas10", etiqueta: "Más de 10 TR", min: 10.01, max: Infinity },
];

export function buscarEquipo(id) {
  return equipos.find((e) => e.id === id);
}

export function capacidadTexto(equipo) {
  return `${equipo.toneladas} TR (${equipo.btu})`;
}
