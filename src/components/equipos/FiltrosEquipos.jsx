import { categorias, marcas, rangosCapacidad } from "../../data/equipos";
import Icono from "../ui/Icono";
import styles from "./FiltrosEquipos.module.css";

/**
 * Panel de filtros del catálogo (<aside>). Es un componente controlado:
 * el estado vive en la página Catálogo y llega por props.
 *
 * @param {{ filtros: {categorias:string[], marcas:string[], capacidades:string[]},
 *           onCambiar: (grupo:string, valor:string) => void,
 *           onLimpiar: () => void,
 *           abierto: boolean, onCerrar: () => void, totalResultados: number }} props
 */
export default function FiltrosEquipos({ filtros, onCambiar, onLimpiar, abierto, onCerrar, totalResultados }) {
  const grupos = [
    { id: "categorias", titulo: "Categoría", opciones: categorias.map((c) => ({ valor: c, texto: c })) },
    { id: "marcas", titulo: "Marca", opciones: marcas.map((m) => ({ valor: m, texto: m })) },
    {
      id: "capacidades",
      titulo: "Capacidad (toneladas)",
      opciones: rangosCapacidad.map((r) => ({ valor: r.id, texto: r.etiqueta })),
    },
  ];

  return (
    <aside
      id="panel-filtros"
      aria-label="Filtros del catálogo"
      className={`tarjeta ${styles.panel} ${abierto ? styles.abierto : ""}`}
    >
      <div className={styles.encabezado}>
        <h2>
          <Icono nombre="filtros" tamano={20} />
          Filtros
        </h2>
        <button type="button" className={styles.limpiar} onClick={onLimpiar}>
          Limpiar
        </button>
      </div>

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

      {/* Solo en móvil: cierra el panel y muestra los resultados */}
      <button type="button" className={`btn btn-primario btn-bloque ${styles.verResultados}`} onClick={onCerrar}>
        Ver {totalResultados} {totalResultados === 1 ? "resultado" : "resultados"}
      </button>
    </aside>
  );
}
