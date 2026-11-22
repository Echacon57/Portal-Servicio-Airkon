import { useNavigate, useSearchParams } from "react-router-dom";
import AsistenteSolicitud from "../components/solicitudes/AsistenteSolicitud";
import { buscarEquipo, capacidadOpcion } from "../data/equipos";
import { marcasComunes, refrigerantes, tiposServicio, buscarPorId } from "../data/servicios";
import { useSolicitudes } from "../context/SolicitudesContext";
import { useTituloPagina } from "../hooks/useTituloPagina";


function valoresDesdeUrl(params) {
  const valores = {};
  const equipo = buscarEquipo(params.get("equipo") ?? "");
  if (equipo) {
    Object.assign(valores, {
      equipoId: equipo.id,
      tipoEquipo: equipo.tipoEquipo,
      marca: marcasComunes.includes(equipo.marca) ? equipo.marca : "Otra",
      capacidad: capacidadOpcion(equipo),
      refrigerante: refrigerantes.includes(equipo.refrigerante) ? equipo.refrigerante : "No estoy seguro(a)",
      modelo: equipo.nombre,
    });
  }
  const servicio = params.get("servicio");
  if (buscarPorId(tiposServicio, servicio)) valores.servicio = servicio;
  return Object.keys(valores).length ? { valores, equipo } : null;
}

export default function Solicitar() {
  useTituloPagina("Solicitar servicio");
  const [params] = useSearchParams();
  const navegar = useNavigate();
  const { agregarSolicitud } = useSolicitudes();

  const desdeUrl = valoresDesdeUrl(params);

  function enviar(datos) {
    const nueva = agregarSolicitud(datos);
    navegar(`/solicitud-enviada/${nueva.folio}`);
  }

  return (
    <AsistenteSolicitud valoresIniciales={desdeUrl?.valores} equipoCatalogo={desdeUrl?.equipo} onEnviar={enviar} />
  );
}
