import { useEffect, useRef } from "react";
import { categorias, marcas, rangosCapacidad } from "../../data/equipos";
import Icono from "../ui/Icono";
import styles from "./FiltrosEquipos.module.css";


export default function FiltrosEquipos({ filtros, onCambiar, onLimpiar, abierto, onCerrar, totalResultados }) {
  const refPanel = useRef(null);
  const refElementoAnterior = useRef(null);

  const grupos = [
    { id: "categorias", titulo: "Categoría", opciones: categorias.map((c) => ({ valor: c, texto: c })) },
    { id: "marcas", titulo: "Marca", opciones: marcas.map((m) => ({ valor: m, texto: m })) },
    {
      id: "capacidades",
      titulo: "Capacidad (toneladas)",
      opciones: rangosCapacidad.map((r) => ({ valor: r.id, texto: r.etiqueta })),
    },
  ];

  useEffect(() => {
    if (!abierto) return undefined;

    const escritorio = window.matchMedia("(min-width: 1024px)");
    if (escritorio.matches) return undefined;

    refElementoAnterior.current = document.activeElement;
    const overflowAnterior = document.body.style.overflow;
    refPanel.current?.focus();
    document.body.style.overflow = "hidden";

    function cerrarEnEscritorio(evento) {
      if (evento.matches) onCerrar();
    }
    escritorio.addEventListener("change", cerrarEnEscritorio);

    return () => {
      escritorio.removeEventListener("change", cerrarEnEscritorio);
      document.body.style.overflow = overflowAnterior;
      refElementoAnterior.current?.focus?.();
    };
  }, [abierto]);

  function manejarTecla(evento) {
    if (evento.key === "Escape") {
      evento.preventDefault();
      onCerrar();
      return;
    }

    if (evento.key !== "Tab") return;
    const enfocables = refPanel.current?.querySelectorAll(
      'button:not([disabled]), input:not([disabled]), select:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])'
    );
    if (!enfocables?.length) return;

    const primero = enfocables[0];
    const ultimo = enfocables[enfocables.length - 1];
    const focoFueraDelPanel = !refPanel.current.contains(document.activeElement);
    if (focoFueraDelPanel) {
      evento.preventDefault();
      (evento.shiftKey ? ultimo : primero).focus();
    } else if (evento.shiftKey && (document.activeElement === primero || document.activeElement === refPanel.current)) {
      evento.preventDefault();
      ultimo.focus();
    } else if (!evento.shiftKey && (document.activeElement === ultimo || document.activeElement === refPanel.current)) {
      evento.preventDefault();
      primero.focus();
    }
  }


  const Contenedor = abierto ? "div" : "aside";

  return (
    <>
      {abierto && <div className={styles.fondo} aria-hidden="true" onMouseDown={onCerrar} />}
      <Contenedor
        id="panel-filtros"
        aria-labelledby="titulo-panel-filtros"
        role={abierto ? "dialog" : undefined}
        aria-modal={abierto ? "true" : undefined}
        className={`tarjeta ${styles.panel} ${abierto ? styles.abierto : ""}`}
        tabIndex={abierto ? -1 : undefined}
        ref={refPanel}
        onKeyDown={manejarTecla}
      >
        <div className={styles.encabezado}>
          <h2 id="titulo-panel-filtros">
            <Icono nombre="filtros" tamano={20} />
            Filtros
          </h2>
          <div className={styles.accionesEncabezado}>
            <button type="button" className={styles.limpiar} onClick={onLimpiar}>
              Limpiar
            </button>
            <button type="button" className={styles.cerrar} onClick={onCerrar} aria-label="Cerrar filtros">
              <Icono nombre="cerrar" tamano={20} />
            </button>
          </div>
        </div>

        <div className={styles.opciones}>
          {grupos.map((grupo) => (
            <fieldset key={grupo.id} className={styles.grupo}>
              <legend>{grupo.titulo}</legend>
              {grupo.opciones.map((op) => (
                <label key={op.valor} className="casilla">
                  <input
                    type="checkbox"
                    name={grupo.id}
                    value={op.valor}
                    checked={filtros[grupo.id].includes(op.valor)}
                    onChange={() => onCambiar(grupo.id, op.valor)}
                  />
                  {op.texto}
                </label>
              ))}
            </fieldset>
          ))}
        </div>

        <div className={styles.pie}>
          <button type="button" className={`btn btn-primario btn-bloque ${styles.verResultados}`} onClick={onCerrar}>
            Ver {totalResultados} {totalResultados === 1 ? "resultado" : "resultados"}
          </button>
        </div>
      </Contenedor>
    </>
  );
}
