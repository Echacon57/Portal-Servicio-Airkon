import styles from "./FiltroChips.module.css";

/**
 * Botones para filtrar una lista.
 * @param {{ etiqueta: string, opciones: {id:string, texto:string}[], activo: string,
 *           conteos: Record<string, number>, onCambiar: (id: string) => void }} props
 */
export default function FiltroChips({ etiqueta, opciones, activo, conteos, onCambiar }) {
  return (
    <div role="group" aria-label={etiqueta} className={styles.grupo}>
      {opciones.map((op) => (
        <button
          key={op.id}
          type="button"
          className={styles.chip}
          aria-pressed={activo === op.id}
          onClick={() => onCambiar(op.id)}
        >
          {op.texto} <span className={styles.numero}>{conteos[op.id] ?? 0}</span>
        </button>
      ))}
    </div>
  );
}
