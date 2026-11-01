import { Link } from "react-router-dom";
import Logo from "../ui/Logo";
import Icono from "../ui/Icono";
import { enlacesMenu } from "./Navbar";
import { servicios } from "../../data/servicios";
import styles from "./Footer.module.css";

function DatosContacto() {
  return (
    <ul role="list" className={styles.contacto}>
      <li>
        <Icono nombre="telefono" tamano={20} />
        <a href="tel:+528110454881">(81) 1045 4881</a>
      </li>
      <li>
        <Icono nombre="correo" tamano={20} />
        <a href="mailto:info@airkon.com.mx">info@airkon.com.mx</a>
      </li>
      <li>
        <Icono nombre="ubicacion" tamano={20} />
        <address>Monterrey, Nuevo León</address>
      </li>
    </ul>
  );
}


export default function Footer({ completo = false }) {
  const anio = new Date().getFullYear();

  return (
    <footer className={`oscuro ${styles.footer}`}>
      {completo ? (
        <div className={`contenedor ${styles.columnas}`}>
          <div className={styles.marca}>
            <Logo variante="claro" subtitulo={false} />
            <p>Proyectos y servicios HVAC. Soluciones integrales en climatización.</p>
            <ul role="list" className={styles.redes}>
              <li><a href="https://www.facebook.com" aria-label="Facebook"><Icono nombre="facebook" tamano={20} /></a></li>
              <li><a href="https://www.instagram.com" aria-label="Instagram"><Icono nombre="instagram" tamano={20} /></a></li>
              <li><a href="https://www.linkedin.com" aria-label="LinkedIn"><Icono nombre="linkedin" tamano={20} /></a></li>
            </ul>
          </div>
          <nav aria-label="Pie de página">
            <h2 className={styles.titulo}>Portal</h2>
            <ul role="list" className={styles.lista}>
              {enlacesMenu.map((e) => (
                <li key={e.ruta}><Link to={e.ruta}>{e.texto}</Link></li>
              ))}
            </ul>
          </nav>
          <div>
            <h2 className={styles.titulo}>Servicios</h2>
            <ul role="list" className={styles.lista}>
              {servicios.map((s) => <li key={s.id}>{s.nombre}</li>)}
            </ul>
          </div>
          <div>
            <h2 className={styles.titulo}>Contacto</h2>
            <DatosContacto />
          </div>
        </div>
      ) : (
        <div className={`contenedor ${styles.compacto}`}>
          <Logo variante="claro" subtitulo={false} />
          <DatosContacto />
        </div>
      )}
      <div className={styles.legal}>
        <div className="contenedor">
          <p>© {anio} Airkon Proyectos y Servicios HVAC.</p>
        </div>
      </div>
    </footer>
  );
}
