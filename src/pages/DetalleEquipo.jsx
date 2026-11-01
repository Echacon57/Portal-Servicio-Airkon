import { Link, useParams } from "react-router-dom";
import MigasDePan from "../components/ui/MigasDePan";
import Icono from "../components/ui/Icono";
import IlustracionEquipo from "../components/equipos/IlustracionEquipo";
import TarjetaEquipo from "../components/equipos/TarjetaEquipo";
import { buscarEquipo, capacidadTexto, equipos } from "../data/equipos";
import { useTituloPagina } from "../hooks/useTituloPagina";
import NoEncontrado from "./NoEncontrado";
import styles from "./DetalleEquipo.module.css";

/** Ficha de un equipo. El id llega por la URL: /catalogo/:id */
export default function DetalleEquipo() {
  const { id } = useParams();
  const equipo = buscarEquipo(id);
  useTituloPagina(equipo?.nombre ?? "Equipo no encontrado");

  if (!equipo) return <NoEncontrado mensaje="Ese equipo no existe o ya no está en el catálogo." />;

  const relacionados = equipos.filter((e) => e.categoria === equipo.categoria && e.id !== equipo.id).slice(0, 3);
  const rutaSolicitar = `/solicitar?equipo=${equipo.id}`;

  const ficha = [
    ["Tipo", equipo.categoria],
    ["Capacidad", capacidadTexto(equipo)],
    ["Marca", equipo.marca],
    ["Voltaje", equipo.voltaje],
    ["Refrigerante", equipo.refrigerante],
    ["Aplicación", equipo.aplicacion],
    ["Instalación", "Requiere visita técnica previa"],
  ];

  return (
    <>
      <div className={styles.barraMigas}>
        <div className="contenedor">
          <MigasDePan
            elementos={[
              { texto: "Inicio", ruta: "/" },
              { texto: "Catálogo", ruta: "/catalogo" },
              { texto: equipo.categoria, ruta: `/catalogo?categoria=${equipo.categoria}` },
              { texto: equipo.nombre },
            ]}
          />
        </div>
      </div>

      <article>
        <section className={`contenedor ${styles.resumen}`} aria-labelledby="titulo-pagina">
          <div className={`tarjeta ${styles.imagen}`}>
            <IlustracionEquipo forma={equipo.forma} ancho={360} descripcion={`Ilustración de un equipo ${equipo.categoria.toLowerCase()}`} />
          </div>
          <div className={styles.info}>
            <span className="etiqueta-tipo">{equipo.categoria}</span>
            <h1 id="titulo-pagina">{equipo.nombre}</h1>
            <p className={styles.marca}>
              Marca: <strong>{equipo.marca}</strong>
            </p>
            <p className={styles.descripcion}>{equipo.descripcion}</p>

            <ul role="list" className={styles.datosClave}>
              <li>
                <span className={styles.datoIcono}><Icono nombre="termometro" tamano={20} /></span>
                <span>Capacidad</span>
                <strong>{equipo.toneladas} TR</strong>
              </li>
              <li>
                <span className={styles.datoIcono}><Icono nombre="copo" tamano={20} /></span>
                <span>Refrigerante</span>
                <strong>{equipo.refrigerante}</strong>
              </li>
              <li>
                <span className={styles.datoIcono}><Icono nombre="rayo" tamano={20} /></span>
                <span>Voltaje</span>
                <strong>{equipo.voltaje.split(",")[0]}</strong>
              </li>
            </ul>

            <div className={styles.botones}>
              <Link to={rutaSolicitar} className="btn btn-primario">
                Solicitar servicio para este equipo <Icono nombre="flecha" tamano={20} />
              </Link>
              <Link to="/catalogo" className="btn btn-secundario">
                Volver al catálogo
              </Link>
            </div>
          </div>
        </section>

        <section className={styles.bandaFicha} aria-labelledby="titulo-ficha">
          <div className={`contenedor ${styles.ficha}`}>
            <div>
              <h2 id="titulo-ficha">Ficha técnica</h2>
              <div className={`tarjeta ${styles.tablaEnvoltura}`}>
                <table className={styles.tabla}>
                  <caption className="solo-lector">Especificaciones de {equipo.nombre}</caption>
                  <tbody>
                    {ficha.map(([dato, valor]) => (
                      <tr key={dato}>
                        <th scope="row">{dato}</th>
                        <td>{valor}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className={`tarjeta oscuro ${styles.llamado}`}>
              <h2 id="titulo-llamado">¿Necesitas servicio para este equipo?</h2>
              <p>Llena el formulario y agendamos una visita. El equipo quedará seleccionado automáticamente.</p>
              <Link to={rutaSolicitar} className="btn btn-acento">
                Solicitar servicio
              </Link>
            </div>
          </div>
        </section>
      </article>

      {relacionados.length > 0 && (
        <section className={`contenedor ${styles.relacionados}`} aria-labelledby="titulo-relacionados">
          <h2 id="titulo-relacionados">Otros equipos {equipo.categoria.toLowerCase()}</h2>
          <ul role="list" className={styles.rejilla}>
            {relacionados.map((e) => (
              <li key={e.id}>
                <TarjetaEquipo equipo={e} />
              </li>
            ))}
          </ul>
        </section>
      )}
    </>
  );
}
