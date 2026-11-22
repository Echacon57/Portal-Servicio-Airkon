import { Link } from "react-router-dom";
import Icono from "../components/ui/Icono";
import EstadoBadge from "../components/ui/EstadoBadge";
import EtiquetaServicio from "../components/ui/EtiquetaServicio";
import AyudanteCapacidad from "../components/inicio/AyudanteCapacidad";
import { servicios } from "../data/servicios";
import { equipos } from "../data/equipos";
import { useSolicitudes } from "../context/SolicitudesContext";
import { datosEtiqueta } from "../utils/registros";
import { useTituloPagina } from "../hooks/useTituloPagina";
import styles from "./Inicio.module.css";

/*
 Etiqueta de ejemplo para quien no ha verificado su correo.
 El folio SV-2026-0000 no corresponde a ningún cliente.
 */
const ejemplo = {
  titulo: "Folio de servicio · ejemplo",
  folio: "SV-2026-0000",
  datos: [
    { dato: "Equipo", valor: "Paquete 5 TR, Trane" },
    { dato: "Servicio", valor: "Mantenimiento preventivo" },
    { dato: "Visita", valor: "Jue 12 nov, mañana" },
  ],
  pasos: ["Solicitud recibida", "Visita confirmada por teléfono", "Servicio realizado"],
  hechos: 2,
  estado: "proceso",
};

const proceso = [
  {
    titulo: "Llenas la solicitud",
    texto: "Cinco pantallas cortas: servicio, equipo, detalles, visita y revisión.",
    estado: "pendiente",
  },
  {
    titulo: "Te llamamos para confirmar",
    texto: "Acordamos fecha y horario de la visita por teléfono.",
    estado: "proceso",
  },
  {
    titulo: "El técnico hace el servicio",
    texto: "Revisa, repara o instala, y deja el equipo funcionando y probado.",
    estado: "proceso",
  },
  {
    titulo: "Queda en tu historial",
    texto: "Con tu correo verificado consultas cada folio en Mis solicitudes.",
    estado: "completada",
  },
];

export default function Inicio() {
  useTituloPagina("");
  // Solo hay registros si el cliente ya verificó su correo
  const { misSolicitudes } = useSolicitudes();
  const reciente = misSolicitudes[0];
  const etiqueta = reciente ? datosEtiqueta(reciente) : ejemplo;

  return (
    <>
      <section className={`oscuro ${styles.hero}`} aria-labelledby="titulo-inicio">
        <div className={`contenedor ${styles.heroRejilla}`}>
          <div className={styles.heroTexto}>
            <p className={styles.ubicacion}>
              <Icono nombre="ubicacion" tamano={18} />
              Monterrey y su área metropolitana
            </p>
            <h1 id="titulo-inicio">Que el calor de Monterrey se quede afuera.</h1>
            <p className={styles.bajada}>
              Instalamos, damos mantenimiento y reparamos aire acondicionado en casas, comercios e industria. Pide tu
              servicio en línea y sigue cada visita con su folio.
            </p>
            <div className={styles.botones}>
              <Link to="/solicitar" className="btn btn-acento btn-grande">
                Solicitar servicio
              </Link>
              <Link to="/catalogo" className="btn btn-contorno btn-grande">
                Comprar equipo
              </Link>
            </div>
            <p className={styles.llamar}>
              ¿Prefieres llamar? <a href="tel:+528100000000">(81) 0000 0000</a>
            </p>
          </div>

          <figure className={styles.figura}>
            <EtiquetaServicio {...etiqueta} enlace="/mis-solicitudes" colgante />
            <figcaption>
              {reciente
                ? "Tu registro más reciente. Consulta todos en Mis solicitudes."
                : "Cada servicio lleva su folio. Así lo verás en Mis solicitudes."}
            </figcaption>
          </figure>
        </div>
      </section>

      <section className={styles.servicios} aria-labelledby="titulo-servicios">
        <div className={`contenedor ${styles.bloque}`}>
          <div className={styles.encabezadoSeccion}>
            <h2 id="titulo-servicios">Qué hacemos por tu equipo</h2>
            <p>Elige el servicio y cuéntanos qué equipo tienes. No necesitas saber el modelo exacto.</p>
          </div>
          <ul role="list" className={styles.hoja}>
            {servicios.map((s) => (
              <li key={s.id} className={styles.fila}>
                <h3>{s.nombre}</h3>
                <p>{s.descripcion}</p>
                <p className={styles.cuando}>{s.cuando}</p>
                <Link to={s.ruta} className={styles.accion}>
                  {s.accion}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* AYUDANTE DE CAPACIDAD + PLACA DE DATOS */}
      <section id="capacidad" tabIndex={-1} className={styles.equipos} aria-labelledby="titulo-capacidad">
        <div className={`contenedor ${styles.bloque}`}>
          <AyudanteCapacidad totalEquipos={equipos.length} />
        </div>
      </section>

      <section className={`oscuro ${styles.proceso}`} aria-labelledby="titulo-proceso">
        <div className={`contenedor ${styles.bloque}`}>
          <div className={styles.encabezadoProceso}>
            <h2 id="titulo-proceso">Cómo avanza tu solicitud</h2>
            <p>Cada paso cambia el estado de tu folio. Lo consultas cuando quieras, sin llamar.</p>
          </div>
          <ol role="list" className={styles.pasos}>
            {proceso.map((paso, i) => (
              <li key={paso.titulo}>
                <span className={`expandido ${styles.numero}`} aria-hidden="true">
                  {i + 1}
                </span>
                <h3>
                  <span className="solo-lector">Paso {i + 1}: </span>
                  {paso.titulo}
                </h3>
                <p>{paso.texto}</p>
                <EstadoBadge estado={paso.estado} />
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}
