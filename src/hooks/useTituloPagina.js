import { useEffect } from "react";

export function useTituloPagina(titulo) {
  useEffect(() => {
    document.title = titulo ? `${titulo} · Portal de Servicio Airkon` : "Portal de Servicio Airkon";
  }, [titulo]);
}
