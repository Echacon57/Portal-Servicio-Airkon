import { useId, useState } from "react";
import { Link } from "react-router-dom";
import PlacaDatos from "../ui/PlacaDatos";
import { buscarEquipo, capacidadTexto } from "../../data/equipos";
import { moneda } from "../../utils/precios";
import styles from "./AyudanteCapacidad.module.css";

/*
 Rangos de área (m²) y el equipo del catálogo que les corresponde.
 */
const RANGOS = [
  { hasta: 15, equipoId: "minisplit-inverter-1tr" },
  { hasta: 25, equipoId: "minisplit-convencional-15tr" },
  { hasta: 35, equipoId: "minisplit-inverter-2tr" },
  { hasta: 50, equipoId: "minisplit-piso-techo-3tr" },
];
const AREA_MIN = 8;
const AREA_MAX = 70;

export function equipoParaArea(area) {
  const rango = RANGOS.find((r) => area <= r.hasta);
  return rango ? buscarEquipo(rango.equipoId) : null;
}

/**
 "¿Qué equipo le queda a tu cuarto?": el cliente mueve una barra con el área
 y ve el equipo sugerido en una placa de datos, con el precio ya instalado.
 Eventos: onChange del rango (se actualiza mientras se arrastra o con flechas).
 */
export default function AyudanteCapacidad({ totalEquipos }) {
  const id = useId();
  const [area, setArea] = useState(28);
  const equipo = equipoParaArea(area);

  return (
    <div className={styles.ayudante}>
      <div className={styles.texto}>
        <h2 id="titulo-capacidad">¿Qué equipo le queda a tu cuarto?</h2>
        <p>
          Mueve la barra al tamaño del espacio. Te mostramos el equipo del catálogo que le corresponde y cuánto
          cuesta ya instalado.
        </p>

        <div className={styles.control}>
          <div className={styles.lectura}>
            <label htmlFor={`${id}-area`}>Área del cuarto</label>
            <span className={`expandido cifras ${styles.valor}`} aria-hidden="true">
              {area} m²
            </span>
          </div>
          <input
            id={`${id}-area`}
            className={styles.rango}
            type="range"
            min={AREA_MIN}
            max={AREA_MAX}
            step="1"
            value={area}
            onChange={(e) => setArea(Number(e.target.value))}
            aria-valuetext={`${area} metros cuadrados`}
            aria-describedby={`${id}-nota`}
          />
          <div className={`cifras ${styles.marcas}`} aria-hidden="true">
            <span>{AREA_MIN} m²</span>
            <span>Recámara</span>
            <span>Sala</span>
            <span>Local</span>
            <span>{AREA_MAX} m²</span>
          </div>
        </div>

        <p id={`${id}-nota`} className={styles.nota}>
          Es una estimación. El técnico la confirma en la visita, porque también cuentan el sol, el techo y cuántas
          personas usan el espacio.
        </p>

        {/* Anuncia solo cuando cambia la sugerencia, no en cada metro */}
        <p className="solo-lector" aria-live="polite">
          {equipo
            ? `Equipo sugerido: ${equipo.nombre}, ${moneda(equipo.precio + equipo.precioInstalacion)} más IVA con instalación.`
            : "Para más de 50 metros cuadrados conviene una revisión."}
        </p>

        <p className={styles.verTodos}>
          <Link to="/catalogo">Ver los {totalEquipos} equipos del catálogo</Link>
        </p>
      </div>

      {equipo ? (
        <PlacaDatos
          titulo={equipo.nombre}
          subtitulo={equipo.marca}
          datos={[
            { dato: "Capacidad", valor: capacidadTexto(equipo) },
            { dato: "Alimentación", valor: equipo.voltaje.split(", 60")[0] },
            { dato: "Refrigerante", valor: equipo.refrigerante },
            { dato: "Pensado para", valor: equipo.aplicacion },
          ]}
        >
          <div className={`oscuro ${styles.precio}`}>
            <div className={styles.cifra}>
              <span className={styles.desglose}>
                Equipo {moneda(equipo.precio)} más instalación {moneda(equipo.precioInstalacion)}
              </span>
              <span className={`expandido cifras ${styles.total}`}>
                {moneda(equipo.precio + equipo.precioInstalacion)} <span>más IVA</span>
              </span>
            </div>
            <Link to={`/comprar/${equipo.id}`} className="btn btn-acento">
              Comprar con instalación
            </Link>
          </div>
        </PlacaDatos>
      ) : (
        <article className={styles.revision}>
          <h3>Para más de 50 m² conviene una revisión</h3>
          <p>
            En espacios grandes el equipo depende de la carga térmica real. Un técnico mide el lugar y te propone la
            mejor opción.
          </p>
          <Link to="/solicitar?servicio=revision" className="btn btn-primario">
            Agendar revisión
          </Link>
        </article>
      )}
    </div>
  );
}
