import { Link } from "react-router-dom";
import Logo from "../ui/Logo";
import { enlacesMenu } from "./Navbar";
import { servicios } from "../../data/servicios";
import styles from "./Footer.module.css";

/**
 Pie de página sobre azul marino.
 `completo` (solo en Inicio) agrega el cierre con la llamada a la acción
 y las columnas de enlaces; en las demás páginas se muestra la versión compacta.
 */
export default function Footer({ completo = false }) {
  const anio = new Date().getFullYear();

  return (
    <footer className={`oscuro ${styles.footer}`}>
      <div className="contenedor">
        {completo && (
          <div className={styles.cierre}>
            <div className={styles.cierreTexto}>
              <h2>¿Tu equipo falla o necesitas una cotización?</h2>
              <p>Llena la solicitud en unos minutos y te llamamos para agendar.</p>
            </div>
            <Link to="/solicitar" className={`btn btn-acento ${styles.cierreBoton}`}>
              Solicitar servicio
            </Link>
          </div>
        )}

        {completo ? (
          <>
            <div className={styles.columnas}>
              <div className={styles.marca}>
                <Logo tamano="chico" />
                <p>Proyectos y servicios de climatización en Monterrey, Nuevo León.</p>
              </div>
              <nav aria-label="Portal" className={styles.columna}>
                <h2 className={styles.titulo}>Portal</h2>
                <ul role="list">
                  {[...enlacesMenu, { ruta: "/solicitar", texto: "Solicitar servicio" }].map((e) => (
                    <li key={e.ruta}>
                      <Link to={e.ruta}>{e.texto}</Link>
                    </li>
                  ))}
                </ul>
              </nav>
              <nav aria-label="Servicios" className={styles.columna}>
                <h2 className={styles.titulo}>Servicios</h2>
                <ul role="list">
                  {servicios.map((s) => (
                    <li key={s.id}>
                      <Link to={s.ruta}>{s.nombre}</Link>
                    </li>
                  ))}
                </ul>
              </nav>
              <div className={styles.columna}>
                <h2 className={styles.titulo}>Contacto</h2>
                <ul role="list">
                  <li>
                    <a href="tel:+528100000000" className={styles.telefono}>(81) 0000 0000</a>
                  </li>
                  <li>
                    <a href="mailto:contacto@airkon.example" className={styles.subrayado}>contacto@airkon.example</a>
                  </li>
                  <li>
                    <address>Monterrey, Nuevo León</address>
                  </li>
                </ul>
              </div>
            </div>
            <p className={styles.legal}>
              © {anio} Airkon Proyectos y Servicios HVAC. Proyecto académico de Programación Web, FCFM UANL.
            </p>
          </>
        ) : (
          /* Versión compacta: una sola fila */
          <div className={styles.compacto}>
            <Logo tamano="chico" />
            <p>
              Monterrey, Nuevo León. <a href="tel:+528100000000">(81) 0000 0000</a>
            </p>
            <p className={styles.legalCompacto}>© {anio} Airkon. Proyecto académico, FCFM UANL.</p>
          </div>
        )}
      </div>
    </footer>
  );
}
