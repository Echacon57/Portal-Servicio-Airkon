import { useEffect, useRef } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

/*
 Estructura común de todas las páginas:
 enlace "saltar al contenido" + <header> + <main> + <footer>.
 Al cambiar de ruta sube el scroll y mueve el foco al <main>
 para que el lector de pantalla anuncie la nueva página.
 */
export default function Layout() {
  const { pathname, hash } = useLocation();
  const refMain = useRef(null);
  const primeraCarga = useRef(true);

  useEffect(() => {
    if (hash) {
      const destino = document.getElementById(hash.slice(1));
      if (destino) {
        destino.scrollIntoView({ block: "start" });
        destino.focus({ preventScroll: true });
      }
      return;
    }
    window.scrollTo(0, 0);
    if (primeraCarga.current) {
      primeraCarga.current = false;
      return;
    }
    refMain.current?.focus({ preventScroll: true });
  }, [pathname, hash]);

  return (
    <>
      <a className="saltar-contenido" href="#contenido">
        Saltar al contenido
      </a>
      <Navbar />
      <main id="contenido" tabIndex={-1} ref={refMain}>
        <Outlet />
      </main>
      <Footer completo={pathname === "/"} />
    </>
  );
}
