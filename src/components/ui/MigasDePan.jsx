import { Link } from "react-router-dom";
import Icono from "./Icono";
import styles from "./MigasDePan.module.css";

/**
 * Migas de pan. Recibe una lista [{ texto, ruta }].
 * El último elemento es la página actual y no lleva enlace.
 */
export default function MigasDePan({ elementos }) {
  return (
    <nav aria-label="Migas de pan" className={styles.migas}>
      <ol role="list">
        {elementos.map((el, i) => {
          const esUltimo = i === elementos.length - 1;
          return (
            <li key={el.texto}>
              {esUltimo ? (
                <span aria-current="page">{el.texto}</span>
              ) : (
                <>
                  <Link to={el.ruta}>{el.texto}</Link>
                  <Icono nombre="chevron" tamano={18} />
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
