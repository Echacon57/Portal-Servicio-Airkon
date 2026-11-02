import { Link } from "react-router-dom";
import Icono from "../components/ui/Icono";
import { useTituloPagina } from "../hooks/useTituloPagina";
import styles from "./Mensaje.module.css";

export default function NoEncontrado({
  titulo = "No encontramos lo que buscas",
  mensaje = "La página que buscas no existe o cambió de dirección.",
}) {
  useTituloPagina(titulo);
  return (
    <section className={`contenedor ${styles.envoltura}`} aria-labelledby="titulo-404">
      <div className={`tarjeta ${styles.tarjeta}`}>
        <span className={`${styles.icono} ${styles.neutro}`}>
          <Icono nombre="alerta" tamano={32} />
        </span>
        <h1 id="titulo-404">{titulo}</h1>
        <p className={styles.texto}>{mensaje}</p>
        <div className={styles.botones}>
          <Link to="/" className="btn btn-primario">Ir al inicio</Link>
          <Link to="/catalogo" className="btn btn-secundario">Ver catálogo</Link>
        </div>
      </div>
    </section>
  );
}
