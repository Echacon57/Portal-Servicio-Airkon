import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import Logo from "../ui/Logo";
import Icono from "../ui/Icono";
import styles from "./Navbar.module.css";

export const enlacesMenu = [
  { ruta: "/", texto: "Inicio" },
  { ruta: "/catalogo", texto: "Catálogo" },
  { ruta: "/mis-solicitudes", texto: "Mis solicitudes" },
  { ruta: "/contacto", texto: "Contacto" },
];

/**
 Barra de navegación sobre el campo azul marino.
 */
export default function Navbar() {
  const [abierto, setAbierto] = useState(false);
  const { pathname } = useLocation();

  // Cerrar el menú cada vez que cambia la ruta
  useEffect(() => {
    setAbierto(false);
  }, [pathname]);

  // Cerrar con la tecla Escape
  useEffect(() => {
    if (!abierto) return;
    function alPresionar(evento) {
      if (evento.key === "Escape") setAbierto(false);
    }
    window.addEventListener("keydown", alPresionar);
    return () => window.removeEventListener("keydown", alPresionar);
  }, [abierto]);

  return (
    <header className={`oscuro ${styles.header}`}>
      <div className={`contenedor ${styles.barra}`}>
        <Logo />
        <button
          type="button"
          className={styles.menu}
          aria-expanded={abierto}
          aria-controls="menu-principal"
          onClick={() => setAbierto((valor) => !valor)}
        >
          <Icono nombre={abierto ? "cerrar" : "menu"} tamano={20} />
          {abierto ? "Cerrar" : "Menú"}
        </button>
        <nav
          id="menu-principal"
          aria-label="Principal"
          className={`${styles.nav} ${abierto ? styles.abierto : ""}`}
        >
          <ul role="list" className={styles.lista}>
            {enlacesMenu.map((enlace) => (
              <li key={enlace.ruta}>
                <NavLink to={enlace.ruta} end={enlace.ruta === "/"} className={styles.enlace}>
                  {enlace.texto}
                </NavLink>
              </li>
            ))}
          </ul>
          <NavLink to="/solicitar" className={`btn btn-acento ${styles.accion}`}>
            Solicitar servicio
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
