import { Link } from "react-router-dom";
import Icono from "../components/ui/Icono";
import { useTituloPagina } from "../hooks/useTituloPagina";
import styles from "./Mensaje.module.css";

/** Página 404. También se reutiliza cuando un equipo o folio no existe. */
export default function NoEncontrado({ mensaje = "La página que buscas no existe o cambió de dirección." }) {
  useTituloPagina("Página no encontrada");
  return (
    <section className={`contenedor ${styles.envoltura}`} aria-labelledby="titulo-404">
      <div className={`tarjeta ${styles.tarjeta}`}>
        <span className={`${styles.icono} ${styles.neutro}`}>
          <Icono nombre="alerta" tamano={32} />
        </span>
        <p className="sobretitulo">Error 404</p>
        <h1 id="titulo-404">No encontramos lo que buscas</h1>
        <p className={styles.texto}>{mensaje}</p>
        <div className={styles.botones}>
          <Link to="/" className="btn btn-primario">Ir al inicio</Link>
          <Link to="/catalogo" className="btn btn-secundario">Ver catálogo</Link>
        </div>
      </div>
    </section>
  );
}
