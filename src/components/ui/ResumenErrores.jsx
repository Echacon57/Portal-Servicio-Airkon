import { useEffect, useRef } from "react";
import Icono from "./Icono";
import styles from "./ResumenErrores.module.css";

/*
 Caja que lista los errores del formulario al intentar enviarlo.
 Recibe el foco para que lectores de pantalla lo anuncien, y cada error
 es un enlace que lleva al campo correspondiente.
 */
export default function ResumenErrores({ errores, etiquetas, intento }) {
  const ref = useRef(null);
  const lista = Object.entries(errores);

  useEffect(() => {
    if (lista.length > 0) ref.current?.focus();
  }, [intento]);

  if (lista.length === 0) return null;

  function irAlCampo(evento, campo) {
    evento.preventDefault();
    const elemento = document.getElementById(campo) || document.querySelector(`[name="${campo}"]`);
    elemento?.focus();
  }

  return (
    <div className={styles.resumen} role="alert" tabIndex={-1} ref={ref}>
      <Icono nombre="alerta" />
      <div className={styles.cuerpo}>
        <strong>
          Revisa {lista.length} {lista.length === 1 ? "campo" : "campos"} antes de enviar
        </strong>
        <ul role="list">
          {lista.map(([campo, mensaje]) => (
            <li key={campo}>
              <a href={`#${campo}`} onClick={(e) => irAlCampo(e, campo)}>
                {etiquetas[campo] ?? campo}: {mensaje}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
