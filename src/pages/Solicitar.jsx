import { Link, useNavigate, useSearchParams } from "react-router-dom";
import EncabezadoPagina from "../components/ui/EncabezadoPagina";
import AsistenteSolicitud from "../components/solicitudes/AsistenteSolicitud";
import Icono from "../components/ui/Icono";
import { buscarEquipo, capacidadOpcion } from "../data/equipos";
import { marcasComunes, refrigerantes, tiposServicio, buscarPorId } from "../data/servicios";
import { useSolicitudes } from "../context/SolicitudesContext";
import { useTituloPagina } from "../hooks/useTituloPagina";
import styles from "./Solicitar.module.css";


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
    <>
      <EncabezadoPagina
        titulo="Solicitar servicio"
        descripcion={
          <>
            Responde unas preguntas sencillas en 5 pasos. No necesitas conocer los datos técnicos
            de tu equipo. Los campos marcados con <span className="obligatorio">*</span> son obligatorios.
          </>
        }
      />

      <div className={`contenedor ${styles.contenido}`}>
        <AsistenteSolicitud
          valoresIniciales={desdeUrl?.valores}
          equipoCatalogo={desdeUrl?.equipo}
          onEnviar={enviar}
        />

        <aside className={styles.lateral} aria-label="Información adicional">
          <section className={`tarjeta ${styles.pasos}`} aria-labelledby="titulo-pasos">
            <h2 id="titulo-pasos">¿Qué pasa después?</h2>
            <ol role="list">
              <li><span aria-hidden="true">1</span>Recibimos tu solicitud y generamos un folio.</li>
              <li><span aria-hidden="true">2</span>Te llamamos para confirmar fecha y horario.</li>
              <li>
                <span aria-hidden="true">3</span>
                <p>Consulta el avance en <Link to="/mis-solicitudes">Mis solicitudes</Link>.</p>
              </li>
            </ol>
          </section>
          <section className={`tarjeta oscuro ${styles.urgencia}`} aria-labelledby="titulo-urgencia">
            <h2 id="titulo-urgencia">¿Es una urgencia?</h2>
            <p>Llámanos directamente y te atendemos lo antes posible.</p>
            <a href="tel:+528110454881" className={styles.telefono}>
              <Icono nombre="telefono" />
              (81) 1045 4881
            </a>
          </section>
        </aside>
      </div>
    </>
  );
}
