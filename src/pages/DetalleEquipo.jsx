import { Link, useParams } from "react-router-dom";
import MigasDePan from "../components/ui/MigasDePan";
import PlacaDatos from "../components/ui/PlacaDatos";
import IlustracionEquipo from "../components/equipos/IlustracionEquipo";
import { buscarEquipo, capacidadTexto, equipos } from "../data/equipos";
import { buscarPorId, tiposEquipo } from "../data/servicios";
import { useTituloPagina } from "../hooks/useTituloPagina";
import { moneda } from "../utils/precios";
import NoEncontrado from "./NoEncontrado";
import styles from "./DetalleEquipo.module.css";

const instalacionPorTipo = {
  minisplit: "Estándar, de 3 a 5 horas",
  "piso-techo": "Estándar, de 4 a 6 horas",
  multisplit: "De 1 a 2 días, según el número de evaporadoras",
  paquete: "Requiere visita técnica previa",
  chiller: "Requiere proyecto de ingeniería",
};

/* Ficha de un equipo. El id llega por la URL: /catalogo/:id */
export default function DetalleEquipo() {
  const { id } = useParams();
  const equipo = buscarEquipo(id);
  useTituloPagina(equipo?.nombre ?? "Equipo no encontrado");

  if (!equipo) return <NoEncontrado mensaje="Ese equipo no existe o ya no está en el catálogo." />;

  const relacionados = equipos.filter((e) => e.categoria === equipo.categoria && e.id !== equipo.id).slice(0, 3);
  const requiereCotizacion = equipo.precioInstalacion === null;
  const tipo = buscarPorId(tiposEquipo, equipo.tipoEquipo)?.nombre ?? equipo.categoria;

  return (
    <>
      <div className="contenedor">
        <div className={styles.migas}>
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
          <div className={styles.imagen}>
            <IlustracionEquipo
              forma={equipo.forma}
              ancho={300}
              descripcion={`Ilustración de un equipo ${equipo.categoria.toLowerCase()}`}
            />
          </div>

          <div className={styles.info}>
            <p className={styles.antetitulo}>
              {equipo.categoria} de {equipo.marca}
            </p>
            <h1 id="titulo-pagina">{equipo.nombre}</h1>
            <p className={styles.descripcion}>{equipo.descripcion}</p>

            <dl className={styles.franja}>
              <div>
                <dt>Capacidad</dt>
                <dd className="expandido">{equipo.toneladas} TR</dd>
              </div>
              <div>
                <dt>Voltaje</dt>
                <dd className="expandido">{equipo.voltaje.split(",")[0]}</dd>
              </div>
              <div>
                <dt>Refrigerante</dt>
                <dd className="expandido">{equipo.refrigerante}</dd>
              </div>
            </dl>

            <dl className={styles.precios}>
              <div>
                <dt>Precio del equipo</dt>
                <dd className={`expandido cifras ${styles.precioPrincipal}`}>{moneda(equipo.precio)}</dd>
              </div>
              <div>
                <dt>Instalación estándar</dt>
                <dd className="expandido cifras">
                  {requiereCotizacion ? "Con cotización" : moneda(equipo.precioInstalacion)}
                </dd>
              </div>
            </dl>
            <p className={styles.nota}>
              Precios más IVA. Si va en altura o retiramos tu equipo anterior, verás el cargo extra antes de confirmar.
            </p>

            <div className={styles.botones}>
              {requiereCotizacion ? (
                <Link to="/contacto" className="btn btn-acento">
                  Solicitar cotización
                </Link>
              ) : (
                <Link to={`/comprar/${equipo.id}`} className="btn btn-acento">
                  Comprar este equipo
                </Link>
              )}
              <Link to={`/solicitar?equipo=${equipo.id}`} className="btn btn-secundario">
                Pedir servicio para este equipo
              </Link>
            </div>
          </div>
        </section>

        <section className={styles.banda} aria-labelledby="titulo-ficha">
          <div className={`contenedor ${styles.ficha}`}>
            <div>
              <h2 id="titulo-ficha">Ficha técnica</h2>
              <PlacaDatos
                titulo={equipo.marca.toUpperCase()}
                subtitulo={equipo.nombre}
                encabezadoOscuro
                datos={[
                  { dato: "Tipo", valor: tipo },
                  { dato: "Capacidad", valor: capacidadTexto(equipo) },
                  { dato: "Alimentación", valor: equipo.voltaje },
                  { dato: "Refrigerante", valor: equipo.refrigerante },
                  { dato: "Pensado para", valor: equipo.aplicacion },
                  { dato: "Instalación", valor: instalacionPorTipo[equipo.tipoEquipo] ?? "Requiere visita técnica previa" },
                ]}
              />
            </div>

            {relacionados.length > 0 && (
              <nav className={styles.relacionados} aria-labelledby="titulo-relacionados">
                <h2 id="titulo-relacionados">Otros {equipo.categoria.toLowerCase()}</h2>
                <ul role="list">
                  {relacionados.map((e) => (
                    <li key={e.id}>
                      <div>
                        <Link to={`/catalogo/${e.id}`}>{e.nombre}</Link>
                        <p>
                          {e.marca}. Para {e.aplicacion.charAt(0).toLowerCase() + e.aplicacion.slice(1)}.
                        </p>
                      </div>
                      <span className="cifras">{moneda(e.precio)}</span>
                    </li>
                  ))}
                </ul>
                <Link to="/catalogo" className="enlace-texto">
                  Ver todo el catálogo
                </Link>
              </nav>
            )}
          </div>
        </section>
      </article>
    </>
  );
}
