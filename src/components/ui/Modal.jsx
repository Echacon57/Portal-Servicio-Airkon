import { useEffect, useRef } from "react";
import Icono from "./Icono";
import styles from "./Modal.module.css";

/**
 Ventana modal accesible.
 Se cierra con la tecla Esc (onKeyDown), con el botón X o con clic en el fondo.
 Mueve el foco al abrir y lo regresa al elemento que la abrió al cerrar.
 */
export default function Modal({ abierto, titulo, onCerrar, children, acciones }) {
  const refDialogo = useRef(null);
  const refAnterior = useRef(null);

  useEffect(() => {
    if (!abierto) return;
    refAnterior.current = document.activeElement;
    refDialogo.current?.focus();
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
      refAnterior.current?.focus?.();
    };
  }, [abierto]);

  if (!abierto) return null;

  function manejarTecla(evento) {
    if (evento.key === "Escape") {
      onCerrar();
      return;
    }
    if (evento.key === "Tab") {
      const enfocables = refDialogo.current.querySelectorAll(
        'a[href], button:not([disabled]), select, input, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (enfocables.length === 0) return;
      const primero = enfocables[0];
      const ultimo = enfocables[enfocables.length - 1];
      if (evento.shiftKey && document.activeElement === primero) {
        evento.preventDefault();
        ultimo.focus();
      } else if (!evento.shiftKey && document.activeElement === ultimo) {
        evento.preventDefault();
        primero.focus();
      }
    }
  }

  function manejarClicFondo(evento) {
    if (evento.target === evento.currentTarget) onCerrar();
  }

  return (
    <div className={styles.fondo} onMouseDown={manejarClicFondo}>
      <div
        className={`tarjeta ${styles.dialogo}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-titulo"
        tabIndex={-1}
        ref={refDialogo}
        onKeyDown={manejarTecla}
      >
        <header className={styles.encabezado}>
          <h2 id="modal-titulo">{titulo}</h2>
          <button type="button" className={styles.cerrar} onClick={onCerrar} aria-label="Cerrar ventana">
            <Icono nombre="cerrar" />
          </button>
        </header>
        <div className={styles.cuerpo}>{children}</div>
        {acciones && <footer className={styles.acciones}>{acciones}</footer>}
      </div>
    </div>
  );
}
