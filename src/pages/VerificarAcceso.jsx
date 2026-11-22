import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import PantallaMensaje from "../components/ui/PantallaMensaje";
import { EtiquetaVencida } from "../components/ui/IlustracionesEtiqueta";
import { useSesion } from "../context/SesionContext";
import { useTituloPagina } from "../hooks/useTituloPagina";

/*
 Destino del enlace del correo: /verificar?token=...
 Si el token es válido abre la sesión y manda a "Mis solicitudes"; si no, explica qué pasó y ofrece pedir otro enlace.
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
      <PantallaMensaje titulo="Verificando tu enlace..." texto={<p role="status">Un momento, por favor.</p>} />
    );
  }

  return (
    <PantallaMensaje
      titulo="No pudimos verificar el enlace"
      texto={
        <>
          <p role="alert">{error}</p>
          <p>Por seguridad, cada enlace vence en 15 minutos y solo se puede usar una vez. Pide uno nuevo con el mismo correo.</p>
        </>
      }
      ilustracion={<EtiquetaVencida />}
    >
      <Link to="/mis-solicitudes" className="btn btn-acento">
        Pedir un enlace nuevo
      </Link>
      <Link to="/" className="btn btn-secundario">
        Ir al inicio
      </Link>
    </PantallaMensaje>
  );
}
