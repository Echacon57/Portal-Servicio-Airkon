# API externa: días feriados (Nager.Date)

## Para qué se usa

Los técnicos no trabajan en días feriados. Inicialmente, el formulario solo bloqueaba los
domingos, así que un cliente podía agendar una visita el 25 de diciembre. Ahora el
portal consulta los feriados oficiales de México y no deja elegir esas fechas.

Se usa en dos lugares, con el mismo código:

- **Solicitar servicio**, paso 4 (fecha de visita).
- **Comprar equipo** (fecha de entrega o instalación).

## El servicio

| Dato | Valor |
|---|---|
| Servicio | Nager.Date (https://date.nager.at) |
| Costo y llave | Gratuito, sin registro ni llave |
| CORS | Habilitado, se puede llamar desde el navegador |
| Endpoint | `GET /api/v3/PublicHolidays/{año}/{país}` |
| Ejemplo | `https://date.nager.at/api/v3/PublicHolidays/2026/MX` |

### Parámetros (van en la ruta)

| Parámetro | Ejemplo | Descripción |
|---|---|---|
| `año` | `2026` | Año del calendario |
| `país` | `MX` | Código ISO 3166-1 alpha-2 |

### Respuesta

Un arreglo JSON con un objeto por feriado:

```json
[
  {
    "date": "2026-01-01",
    "localName": "Año Nuevo",
    "name": "New Year's Day",
    "countryCode": "MX",
    "global": true,
    "counties": null,
    "types": ["Public"]
  }
]
```

Del objeto solo usamos `date`, `localName` (o `name` si falta) y `types`.

### Restricciones

- Solo trae feriados nacionales oficiales. No incluye días que la empresa decida no
  trabajar (por ejemplo, Jueves y Viernes Santo no son feriado oficial en México).
- Se consulta un año por petición.
- Es un servicio gratuito sin garantía de disponibilidad: el portal debe funcionar
  aunque no responda.

## Cómo está implementado

| Archivo | Responsabilidad |
|---|---|
| `src/servicios/feriados.js` | `obtenerFeriados(año)`: hace el `fetch` con `async/await`, revisa `respuesta.ok`, procesa el JSON y lo guarda en `sessionStorage` |
| `src/hooks/useFeriados.js` | Pide este año y el siguiente con `Promise.all` y expone `estado`, `feriados` y `reintentar` |
| `src/components/ui/EstadoFeriados.jsx` | Muestra los estados de carga, éxito y error |
| `src/utils/validaciones.js` | `validarFechaFutura(valor, feriados)`: la regla del feriado vive junto a la del domingo |

### Estados

| Estado | Qué ve el usuario |
|---|---|
| Cargando | "Consultando los días feriados..." |
| Éxito | Los próximos tres feriados; si elige uno, el campo marca error con el nombre del feriado |
| Error | Aviso de que no se pudo consultar, botón "Reintentar" y el formulario sigue funcionando con las reglas locales |

### Decisiones

- **Sin lógica duplicada:** los dos formularios usan el mismo hook, el mismo componente
  y la misma función de validación.
- **Tiempo límite de 8 segundos** con `AbortController`, porque `fetch` no tiene uno.
- **La petición se cancela** si el usuario sale de la página antes de que termine.
- **Caché por sesión:** los feriados de un año no cambian, así que solo se piden una vez
  por pestaña.
- **Dos años:** en noviembre y diciembre el cliente puede agendar para enero.

## Variables de entorno

| Variable | Valor por defecto | Uso |
|---|---|---|
| `VITE_FERIADOS_API_URL` | `https://date.nager.at/api/v3` | URL base de la API |
| `VITE_FERIADOS_PAIS` | `MX` | País de los feriados |