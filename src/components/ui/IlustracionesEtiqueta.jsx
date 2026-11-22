/*
 Ilustraciones decorativas basadas en la etiqueta de servicio.
 Todas son aria-hidden: el texto de la pantalla explica lo que pasa.
 */

/* 404: el cordón con el agujero, pero sin etiqueta. */
export function EtiquetaPerdida() {
  return (
    <svg viewBox="0 0 120 260" width="120" height="260" aria-hidden="true" focusable="false">
      <path d="M60 0 C 52 60, 68 120, 60 205" fill="none" stroke="#BFD6EE" strokeWidth="2" />
      <circle cx="60" cy="222" r="15" fill="none" stroke="var(--amarillo)" strokeWidth="6" />
    </svg>
  );
}

/* Enlace vencido: una etiqueta gris con el borde inferior roto. */
export function EtiquetaVencida() {
  return (
    <svg viewBox="0 0 200 200" width="200" height="200" aria-hidden="true" focusable="false">
      <g transform="rotate(-8 100 100)">
        <path
          d="M40 40 L70 22 H130 L160 40 V150 L148 136 L134 158 L118 138 L100 162 L84 140 L66 160 L52 140 L40 152 Z"
          fill="var(--remache)"
        />
        <circle cx="100" cy="44" r="9" fill="var(--gris-claro)" />
        <text
          x="100"
          y="98"
          textAnchor="middle"
          fontFamily="Archivo Variable, sans-serif"
          fontWeight="800"
          fontSize="15"
          fill="var(--azul-marino)"
          style={{ fontStretch: "125%" }}
        >
          Enlace vencido
        </text>
      </g>
    </svg>
  );
}

/* Acceso sin confirmar a Mis solicitudes: tres etiquetas grises, la del centro con candado. */
export function EtiquetasBloqueadas() {
  const etiqueta = (x, rot, tono) => (
    <g transform={`translate(${x} 0) rotate(${rot} 50 60)`}>
      <path d="M8 18 L28 4 H72 L92 18 V150 H8 Z" fill={tono} />
      <circle cx="50" cy="22" r="7" fill="var(--gris-claro)" />
    </g>
  );
  return (
    <svg viewBox="0 0 300 170" width="300" height="170" aria-hidden="true" focusable="false">
      {etiqueta(0, -6, "#C4D0DD")}
      {etiqueta(200, 6, "#C4D0DD")}
      {etiqueta(100, 0, "var(--remache)")}
      <g transform="translate(150 92)" fill="var(--azul-marino)">
        <rect x="-11" y="-2" width="22" height="18" rx="2" />
        <path d="M-7 -2 V-8 a7 7 0 0 1 14 0 V-2" fill="none" stroke="var(--azul-marino)" strokeWidth="3" />
        <circle cx="0" cy="7" r="2.5" fill="var(--remache)" />
      </g>
    </svg>
  );
}
