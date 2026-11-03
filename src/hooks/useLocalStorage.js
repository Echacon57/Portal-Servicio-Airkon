import { useState, useEffect } from "react";

/**
 * Igual que useState, pero guarda el valor en el almacenamiento del navegador
 * para que se conserve al recargar la página.
 * - tipo "local" (por defecto): localStorage, se conserva aunque se cierre el navegador
 * - tipo "sesion": sessionStorage, se borra al cerrar la pestaña
 * Si el navegador bloquea el almacenamiento, funciona solo en memoria.
 */
export function useLocalStorage(clave, valorInicial, tipo = "local") {
  const almacen = () => (tipo === "sesion" ? sessionStorage : localStorage);

  const [valor, setValor] = useState(() => {
    try {
      const guardado = almacen().getItem(clave);
      return guardado ? JSON.parse(guardado) : valorInicial;
    } catch {
      return valorInicial;
    }
  });

  useEffect(() => {
    try {
      almacen().setItem(clave, JSON.stringify(valor));
    } catch {
      /* almacenamiento no disponible: se ignora */
    }
  }, [clave, valor]);

  return [valor, setValor];
}
