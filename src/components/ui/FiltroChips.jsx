import styles from "./FiltroChips.module.css";

/*
 Botones tipo "chip" para filtrar una lista.
 aria-pressed indica cuál está activo (no depende solo del color).
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
