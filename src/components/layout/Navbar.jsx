import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import Logo from "../ui/Logo";
import { useSesion } from "../../context/SesionContext";
import Icono from "../ui/Icono";
import styles from "./Navbar.module.css";

/** Enlaces del menú principal. */
export const enlacesMenu = [
  { ruta: "/", texto: "Inicio" },
  { ruta: "/catalogo", texto: "Catálogo" },
  { ruta: "/mis-solicitudes", texto: "Mis solicitudes" },
  { ruta: "/contacto", texto: "Contacto" },
];


function varianteAccion(ruta, verificado) {
  if (ruta.startsWith("/solicitar")) return "actual";
  if (ruta.startsWith("/solicitud-enviada")) return "oculto";
  if (ruta === "/mis-solicitudes" && verificado) return "solido";
  return "contorno";
}

/*
 Barra de navegación sobre el campo azul marino.
 - Escritorio: enlaces + botón "Solicitar servicio" (la acción principal).
 - Móvil: botón "Menú" que despliega los enlaces; se cierra al elegir
   una opción o con Esc. NavLink agrega aria-current="page".
 */
export default function Navbar() {
  const [abierto, setAbierto] = useState(false);
  const { pathname } = useLocation();
  const { correoVerificado } = useSesion();
  const variante = varianteAccion(pathname, Boolean(correoVerificado));

  useEffect(() => {
    setAbierto(false);
  }, [pathname]);

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
          {variante === "actual" && (
            <NavLink to="/solicitar" className={`${styles.enlace} ${styles.accionActual}`}>
              Solicitar servicio
            </NavLink>
          )}
          {(variante === "solido" || variante === "contorno") && (
            <NavLink
              to="/solicitar"
              className={`btn ${variante === "solido" ? "btn-acento" : "btn-contorno-acento"} ${styles.accion}`}
            >
              Solicitar servicio
            </NavLink>
          )}
        </nav>
      </div>
    </header>
  );
}
