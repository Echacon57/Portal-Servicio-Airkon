/**
 * Ilustraciones SVG de los tipos de equipo (las mismas del bosquejo).
 */
export default function IlustracionEquipo({ forma, ancho = 200, descripcion }) {
  const accesibilidad = descripcion
    ? { role: "img", "aria-label": descripcion }
    : { "aria-hidden": "true" };

  return (
    <svg viewBox="0 0 200 130" width={ancho} style={{ width: ancho, height: "auto" }} {...accesibilidad}>
      {forma === "pared" && (
        <>
          <rect x="24" y="30" width="152" height="48" rx="12" fill="#fff" stroke="#0B2A4F" strokeWidth="3" />
          <path d="M42 62h116" stroke="#0B2A4F" strokeWidth="3" strokeLinecap="round" />
          <path d="M46 70h108" stroke="#FFC72C" strokeWidth="3" strokeLinecap="round" />
          <circle cx="158" cy="45" r="3.5" fill="#FFC72C" />
          <path d="M60 94c0 8 8 8 8 16M100 94c0 8 8 8 8 16M140 94c0 8 8 8 8 16" stroke="#7FA3CC" strokeWidth="3" fill="none" strokeLinecap="round" />
        </>
      )}
      {forma === "exterior" && (
        <>
          <rect x="44" y="16" width="112" height="96" rx="10" fill="#fff" stroke="#0B2A4F" strokeWidth="3" />
          <circle cx="100" cy="64" r="32" fill="none" stroke="#0B2A4F" strokeWidth="3" />
          <path d="M100 34v60M70 64h60M79 43l42 42M121 43L79 85" stroke="#7FA3CC" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="100" cy="64" r="6" fill="#FFC72C" stroke="#0B2A4F" strokeWidth="2" />
          <path d="M60 112v6M140 112v6" stroke="#0B2A4F" strokeWidth="3" strokeLinecap="round" />
        </>
      )}
      {forma === "paquete" && (
        <>
          <rect x="16" y="36" width="168" height="62" rx="8" fill="#fff" stroke="#0B2A4F" strokeWidth="3" />
          <path d="M16 50h168" stroke="#FFC72C" strokeWidth="4" />
          <circle cx="62" cy="76" r="17" fill="none" stroke="#0B2A4F" strokeWidth="3" />
          <circle cx="138" cy="76" r="17" fill="none" stroke="#0B2A4F" strokeWidth="3" />
          <path d="M62 62v28M48 76h28M138 62v28M124 76h28" stroke="#7FA3CC" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M32 98v10M168 98v10" stroke="#0B2A4F" strokeWidth="3" strokeLinecap="round" />
        </>
      )}
      {forma === "chiller" && (
        <>
          <rect x="12" y="30" width="176" height="10" rx="3" fill="#FFC72C" stroke="#0B2A4F" strokeWidth="3" />
          <rect x="12" y="40" width="176" height="60" rx="6" fill="#fff" stroke="#0B2A4F" strokeWidth="3" />
          <path d="M34 50v40M54 50v40M74 50v40M94 50v40M114 50v40M134 50v40M154 50v40M174 50v40" stroke="#7FA3CC" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M28 100v10M172 100v10" stroke="#0B2A4F" strokeWidth="3" strokeLinecap="round" />
        </>
      )}
    </svg>
  );
}
