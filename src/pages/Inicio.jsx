import { Link } from "react-router-dom";
import Icono from "../components/ui/Icono";
import EstadoBadge from "../components/ui/EstadoBadge";
import EtiquetaServicio from "../components/ui/EtiquetaServicio";
import AyudanteCapacidad from "../components/inicio/AyudanteCapacidad";
import { servicios } from "../data/servicios";
import { equipos } from "../data/equipos";
import { useSolicitudes } from "../context/SolicitudesContext";
import { describirEquipo, describirTipo, textoHorario } from "../utils/registros";
import { fechaCorta } from "../utils/formato";
import { useTituloPagina } from "../hooks/useTituloPagina";
import styles from "./Inicio.module.css";

const pasosHechos = { pendiente: 1, proceso: 2, completada: 3 };

/*
 Etiqueta de ejemplo para quien no ha verificado su correo.
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

// Convierte un registro real en los datos que muestra la etiqueta. 
function etiquetaDeRegistro(r) {
  const esCompra = r.tipo === "compra";
  return {
    titulo: esCompra ? "Folio de pedido" : "Folio de servicio",
    folio: r.folio,
    datos: [
      { dato: "Equipo", valor: describirEquipo(r) },
      { dato: esCompra ? "Tipo" : "Servicio", valor: describirTipo(r) },
      { dato: esCompra ? "Entrega" : "Visita", valor: `${fechaCorta(r.fecha)}, ${textoHorario(r.horario).split(" (")[0]}` },
    ],
    pasos: esCompra
      ? ["Pedido recibido", "Entrega confirmada por teléfono", r.instalar ? "Equipo instalado" : "Equipo entregado"]
      : ["Solicitud recibida", "Visita confirmada por teléfono", "Servicio realizado"],
    hechos: pasosHechos[r.estado],
    estado: r.estado,
  };
}

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
  const etiqueta = reciente ? etiquetaDeRegistro(reciente) : ejemplo;

  return (
    <>
      <section className={`oscuro ${styles.hero}`} aria-labelledby="titulo-inicio">
        <div className={`contenedor ${styles.heroRejilla}`}>
          <div className={styles.heroTexto}>
            <p className={styles.ubicacion}>
              <Icono nombre="ubicacion" tamano={18} />
              Monterrey y su área metropolitana
            </p>
            <h1 id="titulo-inicio">Que el calor de Nuevo León se quede afuera.</h1>
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
              ¿Prefieres llamar? <a href="tel:+528110454881">(81) 1045 4881</a>
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

      <section className={styles.equipos} aria-labelledby="titulo-capacidad">
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
