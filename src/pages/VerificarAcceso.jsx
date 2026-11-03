import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import Icono from "../components/ui/Icono";
import { useSesion } from "../context/SesionContext";
import { useTituloPagina } from "../hooks/useTituloPagina";
import styles from "./Mensaje.module.css";

/*
 Si el token es válido abre la sesión y manda a "Mis solicitudes";
 si no, explica qué pasó y ofrece pedir otro enlace.
 */
export default function VerificarAcceso() {
  useTituloPagina("Verificando acceso");
  const [params] = useSearchParams();
  const navegar = useNavigate();
  const { verificarToken } = useSesion();
  const [error, setError] = useState("");
  const yaVerificado = useRef(false);

  useEffect(() => {
    // El token es de un solo uso: evitar validarlo dos veces
    if (yaVerificado.current) return;
    yaVerificado.current = true;

    const resultado = verificarToken(params.get("token"));
    if (resultado.ok) {
      // replace: el token no queda en el historial del navegador
      navegar("/mis-solicitudes", { replace: true, state: { verificado: true } });
    } else {
      setError(resultado.motivo);
    }
  }, []);

  if (!error) {
    return (
      <section className={`contenedor ${styles.envoltura}`} aria-labelledby="titulo-verificando">
        <div className={`tarjeta ${styles.tarjeta}`} role="status">
          <h1 id="titulo-verificando">Verificando tu enlace...</h1>
        </div>
      </section>
    );
  }

  return (
    <section className={`contenedor ${styles.envoltura}`} aria-labelledby="titulo-verificar">
      <div className={`tarjeta ${styles.tarjeta}`}>
        <span className={`${styles.icono} ${styles.neutro}`}>
          <Icono nombre="alerta" tamano={32} />
        </span>
        <h1 id="titulo-verificar">No pudimos verificar el enlace</h1>
        <p className={styles.texto} role="alert">{error}</p>
        <p className={styles.nota}>Por seguridad, cada enlace vence en 15 minutos y solo se puede usar una vez.</p>
        <div className={styles.botones}>
          <Link to="/mis-solicitudes" className="btn btn-primario">Pedir un enlace nuevo</Link>
          <Link to="/" className="btn btn-secundario">Ir al inicio</Link>
        </div>
      </div>
    </section>
  );
}
