# Contexto para GitHub Copilot

## ¿De qué trata la app?

Portal de Servicio Airkon: sitio web de una empresa de aire acondicionado (HVAC) en Monterrey. Permite que los clientes compren equipos con instalación, soliciten mantenimiento o reparación mediante un asistente de 5 pasos y consulten sus solicitudes verificando su correo electrónico.

El proyecto está desarrollado con React + Vite, React Router y CSS Modules, siguiendo un enfoque de diseño mobile-first.

## ¿Quién es el usuario?

Dueños de casas, comercios y oficinas en Monterrey que no necesariamente tienen conocimientos técnicos sobre aire acondicionado.

Son personas que identifican problemas como que su equipo no enfría, presenta fugas de agua o necesita mantenimiento, pero posiblemente desconocen características técnicas como la capacidad del equipo o el tipo de refrigerante.

La mayoría puede ingresar desde un dispositivo móvil y busca información clara, rápida y confiable para tomar una decisión.

## Personalidad del diseño

El diseño debe transmitir una combinación de confianza, profesionalismo y modernidad, sin perder cercanía con el cliente.

Se busca una apariencia corporativa, limpia y elegante, con elementos visuales que llamen la atención sin saturar la interfaz.

La identidad visual está inspirada en dos elementos propios del sector HVAC:
- La etiqueta amarilla de servicio que se coloca en los equipos.
- La placa técnica de datos que identifica las características de cada unidad.

El objetivo es que el catálogo se perciba como una selección técnica de equipos y no como una tienda en línea genérica.

El amarillo debe utilizarse principalmente para destacar las acciones más importantes, mientras que los tonos fríos aportan una sensación de refrigeración y limpieza.

## Paleta de colores

| Nombre | HEX | Uso |
|---|---|---|
| Marino | #0B2A4F | Títulos, encabezados, texto destacado y botones secundarios. |
| Etiqueta | #FFC72C | Acciones principales, como Comprar, y pequeños acentos visuales. |
| Azul hielo / Lámina | #E9EEF4 | Fondos de secciones, ilustraciones y superficies de las tarjetas. |
| Tinta | #17222F | Texto principal y contenido informativo. |

Se pueden utilizar variaciones de azul hielo y grises metálicos para bordes, divisiones y detalles secundarios, respetando las variables de estilos existentes.

## Pantalla a mejorar

Catálogo de equipos.

Archivos principales:
- `src/pages/Catalogo.jsx`
- `src/pages/Catalogo.module.css`
- `src/components/equipos/TarjetaEquipo.jsx`
- `src/components/equipos/TarjetaEquipo.module.css`
- `src/components/equipos/FiltrosEquipos.jsx`
- `src/components/equipos/FiltrosEquipos.module.css`

## Objetivo del rediseño

Mejorar la experiencia visual del catálogo para facilitar la exploración y comparación de equipos, utilizando una distribución moderna, limpia y profesional.

### Distribución

- Mantener el encabezado y la navegación existentes.
- Colocar la búsqueda y el ordenamiento en la parte superior.
- Organizar los filtros de categoría, marca y capacidad en una barra horizontal en escritorio.
- Mostrar los filtros verticalmente en dispositivos móviles.
- Colocar el conteo de resultados antes de la cuadrícula de productos.
- Utilizar una cuadrícula responsive de una columna en móvil, dos en tablet y tres en escritorio.

### Tarjetas de equipos

Las tarjetas deben tener un diseño minimalista y elegante, priorizando:
1. Ilustración grande del equipo.
2. Nombre del equipo.
3. Precio.
4. Capacidad y marca.
5. Botones Comprar y Ver detalle.

El precio debe tener una jerarquía visual clara, sin saturar la tarjeta con elementos promocionales.

Las ilustraciones deben destacar sobre fondos azul hielo, conservando los detalles técnicos y amarillos que identifican a Airkon.

### Criterios visuales

- Jerarquía visual clara.
- Distribución equilibrada de los elementos.
- Tipografía legible y consistente.
- Espaciado adecuado entre secciones.
- Sombras discretas y bordes sutiles.
- Estados hover y focus visibles.
- Botones con una jerarquía visual diferenciada.
- Diseño responsive y mobile-first.

## Reglas de implementación

- Conservar toda la funcionalidad existente.
- Reutilizar los componentes de React.
- Mantener las rutas y la navegación de React Router.
- No eliminar código existente que sea fundamental.
- Reutilizar las variables de `src/styles/variables.css`.
- No modificar los datos de los equipos.
- Mantener la búsqueda, filtros, ordenamiento, paginación y botones Comprar / Ver detalle.
- Mantener la condición actual de compra o cotización según los datos de cada equipo.
- Utilizar estilos mobile-first, con estilos base para 390 px y media queries únicamente con `min-width`.
- Respetar los criterios de accesibilidad WCAG AA.
- Mantener foco visible y objetivos táctiles de al menos 44 px.
- Respetar la preferencia de movimiento reducido.

Cualquier modificación visual debe conservar la identidad de Airkon y evitar convertir la interfaz en una tienda genérica.
