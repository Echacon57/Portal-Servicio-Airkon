# Contexto para GitHub Copilot

## ¿De qué trata la app?
Portal de Servicio Airkon: sitio de una empresa de aire acondicionado (HVAC) en
Monterrey. El cliente compra equipos con instalación, solicita mantenimiento o
reparación con un asistente de 5 pasos y consulta sus solicitudes verificando su
correo. Hecho con React + Vite, React Router y CSS Modules (mobile-first).

## ¿Quién es el usuario?
Dueños de casas, comercios y oficinas en Monterrey que no son técnicos: saben que
su equipo "no enfría" o "gotea", o cosas simples pero no siempre detalles técnicos como su capacidad ni su refrigerante. Entran
desde el celular, muchas veces con calor y prisa.

## Personalidad del diseño
Confiable, técnica y directa, sin verse fría. Pero siendo lo más llamativa para un cliente no profesional. Inspirada en dos objetos
técnico conoce: la etiqueta amarilla de servicio que se cuelga en el equipo y la
placa de datos atornillada a cada unidad. El amarillo solo se usa en la acción
principal de cada pantalla.

## Paleta principal
| Nombre   | HEX       | Uso                                           
| Marino   | #0B2A4F | Títulos, encabezados y botones principales     
| Etiqueta | #FFC72C | Una sola acción principal por pantalla y folios 
| Lámina   | #E9EEF4 | Fondos de sección y fichas de equipo           
| Tinta    | #17222F | Texto de cuerpo (15.8:1 sobre blanco)         
Puedes explorar mayor abánico de colores, que hagan referencia a equipos de refrigeración o colores similares a la paleta principal

## Pantalla a mejorar
Catálogo (`src/pages/Catalogo.jsx`, `TarjetaEquipo`, `FiltrosEquipos`).

## Reglas
- Conservar la funcionalidad: búsqueda, filtros, orden, paginación y botones
  Comprar / Ver detalle.
- Reutilizar los componentes existentes y las variables de `src/styles/variables.css`.
- Mobile-first: estilos base para 390 px y solo media queries `min-width`.
- Contraste WCAG AA, foco visible y objetivos táctiles de al menos 44 px.