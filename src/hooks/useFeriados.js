import { useEffect, useState } from "react";
import { obtenerFeriados } from "../servicios/feriados";

/*
 Carga los días feriados de este año y del siguiente

 estado: "cargando" | "exito" | "error"
 Si la API falla, feriados queda vacío y el formulario sigue funcionando
 con las validaciones locales (fecha futura y sin domingos).
 */
export function useFeriados() {
  const [estado, setEstado] = useState("cargando");
  const [feriados, setFeriados] = useState([]);
  const [intento, setIntento] = useState(0);

  useEffect(() => {
    const control = new AbortController();

    async function cargar() {
      try {
        const anio = new Date().getFullYear();
        const [esteAnio, siguiente] = await Promise.all([
          obtenerFeriados(anio, control.signal),
          obtenerFeriados(anio + 1, control.signal),
        ]);
        setFeriados([...esteAnio, ...siguiente]);
        setEstado("exito");
      } catch {
        // Si se canceló porque el componente se desmontó, no hay nada que mostrar
        if (control.signal.aborted) return;
        setFeriados([]);
        setEstado("error");
      }
    }

    cargar();
    return () => control.abort();
  }, [intento]);

  function reintentar() {
    setEstado("cargando");
    setIntento((n) => n + 1);
  }

  return { estado, feriados, reintentar };
}
