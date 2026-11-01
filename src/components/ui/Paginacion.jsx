import styles from "./Paginacion.module.css";

export default function Paginacion({ pagina, totalPaginas, onCambiar }) {
  if (totalPaginas <= 1) return null;
  const numeros = Array.from({ length: totalPaginas }, (_, i) => i + 1);

  return (
    <nav aria-label="Paginación" className={styles.paginacion}>
      <button type="button" className={styles.boton} disabled={pagina === 1} onClick={() => onCambiar(pagina - 1)}>
        Anterior
      </button>
      {numeros.map((n) => (
        <button
          key={n}
          type="button"
          className={styles.boton}
          aria-current={n === pagina ? "page" : undefined}
          aria-label={n === pagina ? `Página ${n}, actual` : `Ir a la página ${n}`}
          onClick={() => onCambiar(n)}
        >
          {n}
        </button>
      ))}
      <button
        type="button"
        className={styles.boton}
        disabled={pagina === totalPaginas}
        onClick={() => onCambiar(pagina + 1)}
      >
        Siguiente
      </button>
    </nav>
  );
}
