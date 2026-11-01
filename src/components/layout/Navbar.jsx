import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import Logo from "../ui/Logo";
import Icono from "../ui/Icono";
import styles from "./Navbar.module.css";

export const enlacesMenu = [
  { ruta: "/", texto: "Inicio" },
  { ruta: "/catalogo", texto: "Catálogo" },
  { ruta: "/solicitar", texto: "Solicitar servicio" },
  { ruta: "/mis-solicitudes", texto: "Mis solicitudes" },
  { ruta: "/contacto", texto: "Contacto" },
];

/**
  Barra de navegación. 
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
    <header className={styles.header}>
      <div className={`contenedor ${styles.barra}`}>
        <Logo />
        <button
          type="button"
          className={styles.hamburguesa}
          aria-expanded={abierto}
          aria-controls="menu-principal"
          aria-label={abierto ? "Cerrar menú de navegación" : "Abrir menú de navegación"}
          onClick={() => setAbierto((valor) => !valor)}
        >
          <Icono nombre={abierto ? "cerrar" : "menu"} />
        </button>
        <nav
          id="menu-principal"
          aria-label="Principal"
          className={`${styles.nav} ${abierto ? styles.abierto : ""}`}
        >
          <ul role="list">
            {enlacesMenu.map((enlace) => (
              <li key={enlace.ruta}>
                <NavLink to={enlace.ruta} end={enlace.ruta === "/"}>
                  {enlace.texto}
                  <Icono nombre="chevron" tamano={20} className={styles.flechaMovil} />
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
