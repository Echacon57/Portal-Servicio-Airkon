import { Link } from "react-router-dom";
import PantallaMensaje from "../components/ui/PantallaMensaje";
import { EtiquetaPerdida } from "../components/ui/IlustracionesEtiqueta";
import { useTituloPagina } from "../hooks/useTituloPagina";

/* Página 404. También se reutiliza cuando un equipo no existe o requiere cotización. */
export default function NoEncontrado({
  titulo = "No encontramos lo que buscas",
  mensaje = "La página no existe o cambió de dirección. Si buscabas un folio, consúltalo en Mis solicitudes.",
  antetitulo = "Error 404",
}) {
  useTituloPagina(titulo);
  return (
    <PantallaMensaje
      oscuro
      antetitulo={antetitulo}
      titulo={titulo}
      texto={<p>{mensaje}</p>}
      ilustracion={<EtiquetaPerdida />}
      pie="Aquí va una etiqueta."
    >
      <Link to="/" className="btn btn-acento">
        Ir al inicio
      </Link>
      <Link to="/catalogo" className="btn btn-contorno">
        Ver catálogo
      </Link>
    </PantallaMensaje>
  );
}
