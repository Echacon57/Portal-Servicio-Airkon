En la elaboración de este código se hizo uso de agentes de inteligencia artificial como
apoyo para cuestiones principalmente de diseño y dirección visual para el proyecto.
A continuación se presentará el uso de dichos agentes, prompts, evaluaciones, análisis
e implementaciones que se hicieron con cada agente que participó en la elaboración de este proyecto.

# Github Copilot
## Rediseño y redistribución de página "Catálogo"
- Prompt dado al agente: 
    "Lee COPILOT.md y propón un rediseño de la pantalla de Catálogo considerando jerarquía visual, distribución, contraste, interlineado, tipografía, botones y tarjetas, mobile-first. Implementa la propuesta y detalla los cambios que realizaste para rediseñarla y darle un nuevo aire a la pantalla."
- Cambios realizados por el agente:
    Cambios realizados
    En Catalogo.module.css, ordené los controles para móvil: búsqueda a lo ancho y filtros junto al selector de orden. La rejilla pasa de una a dos y tres columnas según el ancho de pantalla.
    En TarjetaEquipo.module.css, renové el área de ilustración, mejoré la legibilidad de atributos y precios y di más contraste al precio. Los botones mantienen objetivos táctiles de al menos 48 px y se adaptan al espacio disponible.
    En FiltrosEquipos.module.css, ajusté espaciado y jerarquía para integrar mejor el panel de filtros con las tarjetas.
    En TarjetaEquipo.jsx capacidad y marca ahora aparecen como una placa de datos en dos columnas: etiqueta pequeña arriba y valor en negrita debajo. La capacidad se muestra abreviada, por ejemplo, “1 TR · 12,000 BTU/h”.
    En TarjetaEquipo.module.css, añadí el borde entre celdas, fijé los botones en 1rem y reemplacé sus media queries por repeat(auto-fit, minmax(140px, 1fr)). “Comprar” destaca como acción principal con el acento amarillo.
    En Catalogo.jsx añadí chips para cada filtro activo, con botones accesibles como “Quitar filtro Minisplit” y la acción “Quitar todos”. El botón “Filtros” muestra la cantidad seleccionada.
    En FiltrosEquipos.jsx y FiltrosEquipos.module.css convertí el panel móvil en una hoja inferior modal: fondo oscuro, foco contenido, cierre con Esc o con X, y “Ver N resultados” anclado al pie. También devuelve el foco al botón que lo abrió.
    Desde 1024 px se conserva el panel lateral.
- Revisión e implementación de los cambios:
    Con el chat que se tuvo con el agente, nos dimos cuenta que hizo cambios mayormente estéticos para el área de la etiqueta de equipos, realizó cambios en la barra de filtros y agregó botones tipo chips para los filtros activos.

    En su mayoría fueron cambios de lógica y estéticos muy básicos y sencillos, por lo que su implementación no cambiaba mucho la lógica actual del proyecto, pero si mejoraba en algunos aspectos la página, lo que era el objetivo de la actividad, por lo que decidimos implementarlo para en un futuro usar los cambios.

    Personalmente nos gustó el estilo similar a unas "placas de datos" (cosa que nos llevó a hacer un rediseño más a fondo a futuro) y el cambio en los filtros.

    - Problemas encontrados y corregidos en la implementación:
        El agente usó display: flex sin flex-direction: column a la hora de modificar el texto de la barra lateral de filtros, lo que causaba que el Título de la barra quedará a un lado y desplazara los botones y el texto de los filtros, por lo que se corrigió para que se viera de la manera correcta, el titulo de filtros en la parte de arriba y las opciones debajo.

        Los cambios que implementó el agente levantaron un error en las pruebas de Axe, Copilot ponía role="dialog" sobre un <aside>, y esa combinación no está permitida, suponemos que lo intentó hacer así para no implementar mediaqueries.
        Solución: el panel es un <div role="dialog"> cuando está abierto en móvil y un <aside> normal cuando está cerrado o en escritorio.

# Claude Code
## Estética y dirección visual principal, diseño
- Prompt dado al agente:
    Aborda esto como el director de diseño de un estudio conocido por darle a cada cliente una identidad visual única que no se confunda con la de nadie más. Este cliente ya rechazó propuestas que parecían clichés o hechas con plantilla, y está pagando por un punto de vista distintivo: toma decisiones deliberadas y con criterio propio sobre la paleta de colores, la tipografía y la composición que sean específicas para este brief, y asume riesgos estéticos si están justificados.
    Usando eso, redacta una dirección visual distintiva para este proyecto:
    Portal de Servicio Airkon
    Página con el objetivo de conectar a clientes y personas con los distintos servicios que la empresa da para equipos de refrigeración HVAC, la página tiene las siguientes pantallas:
    - Inicio: Pantalla donde se muestre el objetivo de la página, con información directa para que el cliente sepa a lo que viene y que se le puede ofrecer.
    - Mis solicitudes: Pantalla en la que el cliente podrá revisar sus servicios y solicitudes anteriores, completas y en proceso, con un resumen de cada servicio y la opción de ver más detalles
    - Catálogo: Pantalla con un listado de equipos disponibles para la venta y posible instalación, se muestran datos principales de cada equipo, la opción de ver detalles y comprar equipo, además de una sección de filtros y busqueda.
    - Detalle de equipo: Pantalla con la información más importante y detallada de cada equipo, con el foco principal en el nombre, los datos mostrados en catálogo, el precio y su ilustración
    - Comprar: Pantalla en la que el cliente podrá continuar la compra de un equipo en específico, con un resumen de compra y formulario a llenar para completar la solicitud.
    - Solicitar: Pantalla para la solicitud de un servicio, dividida por pasos y formularios de información que el cliente debe llenar.
    - Solicitud enviada: Pantalla de confirmación para una solicitud recien enviada, tiene que dejarse en claro que la solicitud fue enviada exitosamente, que se podrá revisar y los pasos a por venir.
    - Mis solicitudes: Esta se divide en dos pantallas, la verificación, en la que el cliente debe verificar su identidad para poder visualizar sus solicitudes, después la otra pantalla.
    - Contacto: Pantalla en la que el cliente podrá escribir una queja, sugerencia o pedido más especifico con sus propias palabras, además de encontrar los datos de contacto de la empresa.
    - Página no encontrada(404): Pantalla de error en caso de no encontrar alguna pantalla requerida

Además del prompt, se le adjuntaron capturas del proyecto en su estado anterior, para que el agente tuviera una idea mayor de la estructura anterior de cada pantalla.

- Resultado dado por el agente:
    Nos entregó "DirecciónVisual - Rediseño" (revisar \docs\bosquejos\DirecciónVisual-Rediseño.html)
    
    "He redactado una nueva propuesta visual para el portal llamada “Etiqueta y placa” en un lienzo de diseño con tres mesas de trabajo (artboards): la página de inicio para escritorio, una hoja con los colores, la tipografía y los componentes, y la vista “Mis solicitudes” en móvil. Mantiene tu azul marino y amarillo, pero toma su inspiración de dos elementos que todo técnico de aire acondicionado (HVAC) utiliza: la etiqueta amarilla de servicio que se cuelga en la unidad y la placa metálica de especificaciones que lleva cada condensador.

    Qué ha cambiado respecto a la v3

    La etiqueta de servicio es el único elemento llamativo. En la sección principal (hero), una etiqueta amarilla cuelga de un cordón, con esquinas recortadas, un ojal reforzado, una lista de verificación y una tira desprendible en la parte inferior. Muestra cómo luce realmente un folio y se balancea una vez al cargar la página (este movimiento se desactiva si el visitante tiene configurada la reducción de movimiento). En el celular, los folios abiertos son etiquetas amarillas y los completados toman el color gris de las placas.

    El amarillo ahora tiene una regla: solo se usa para marcar un folio o la única acción principal de cada pantalla.

    Tipografía: Archivo en todo el sitio, en dos anchos distintos. Los titulares usan el ancho expandido (expanded), que se asemeja a las letras troqueladas de una placa metálica. Reemplaza a la combinación de Montserrat + Inter.

    Ajustes a la paleta 
    Escarcha 
    #E3EEFA con borde marino de 3 px: es el color de la opción elegida en los formularios. Así el amarillo se queda solo para los folios y la acción principal.
    Alarma 
    #B42318: para errores, campos obligatorios y cancelar.
    Texto secundario 
    #3F4B5A: es más oscuro que el 
    #4B5563 anterior, para que se lea mejor sobre el gris de fondo.
    Botón amarillo de la barra: cuando la página ya tiene su propia acción amarilla, el botón “Solicitar servicio” pasa a contorno, para no tener dos botones amarillos que compitan."

- Revisión e implementación de los cambios:
    Esto fue lo más grande en cuanto a cambios, revisamos principalmente que los diseños y la nueva identidad visual se ajustara a la accesibilidad requerida para el proyecto, pero a primera vista nos maravilló el cambio que dió a la página, cumpliendo el objetivo del prompt y de la idea que teníamos, darle una identidad al portal y que destacara por algo en específico.

    Como tal el agente nos entregó la parte visual, usamos lo que nos dió, el acomodo de las secciones, el dibujado de las etiquetas y placas de datos, más que nada lo básico para comenzar a hacer pruebas y cambios necesarios, además de implementar la estética en partes que el agente no modificó.

- Correcciones y errores modificados:
    Uno muy graves era que, al implementar el "Ver detalle" en la sección de Mis solicitudes, se mostraba una etiqueta amarilla abarcando el 90% de la página, con los colores actuales de la paleta de colores, un color así de saturado lastimaba la vista con la exposición continua, por lo que buscamos otro color menos saturado que siguiera con la temática para así continuar cuidando la accesibilidad del sitio web.
    El otro era muy similar, usaba el color rojo muy seguido por encima del color amarillo saturado que se tenia inicialmente, lo cual de nuevo, cansaba la vista a la larga, además de que daba 4.2:1 de contraste, menor al 4.5:1 de WCAG AA (pruebas en axe y lighthouse), por lo que se hizo una modificación a todos los casos en los que el color rojo y el amarillo saturado estuvieran solapados o sobrepuestos uno sobre otro.
    También quisimos romper un poco con la regla del amarillo siendo usado en 1 sola cosa, con la excepción del catalágo, al no mostrar muchos equipos al mismo tiempo (y en movil solo se pueden ver 2 o 3 a lo mucho constantemente), decidimos remarcar el botón de "Comprar" con amarillo, para denotar que es el botón más importante y redirigir al usuario a que compre en vez de solo ver la información de los equipos.