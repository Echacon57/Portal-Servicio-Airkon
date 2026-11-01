import { useEffect } from "react";

/** Cambia el <title> del documento en cada página (ayuda a lectores de pantalla y SEO). */
export function useTituloPagina(titulo) {
  useEffect(() => {
    document.title = titulo ? `${titulo} · Portal de Servicio Airkon` : "Portal de Servicio Airkon";
  }, [titulo]);
}
