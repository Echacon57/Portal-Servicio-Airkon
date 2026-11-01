import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import EncabezadoPagina from "../components/ui/EncabezadoPagina";
import FiltrosEquipos from "../components/equipos/FiltrosEquipos";
import TarjetaEquipo from "../components/equipos/TarjetaEquipo";
import Paginacion from "../components/ui/Paginacion";
import Icono from "../components/ui/Icono";
import { equipos, rangosCapacidad } from "../data/equipos";
import { useTituloPagina } from "../hooks/useTituloPagina";
import styles from "./Catalogo.module.css";

const POR_PAGINA = 6;
const filtrosVacios = { categorias: [], marcas: [], capacidades: [] };

function normalizar(texto) {
  return texto.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
}

export default function Catalogo() {
  useTituloPagina("Catálogo");

  const [params] = useSearchParams();
  const categoriaUrl = params.get("categoria");

  const [busqueda, setBusqueda] = useState("");
  const [orden, setOrden] = useState("relevancia");
  const [filtros, setFiltros] = useState(
    categoriaUrl ? { ...filtrosVacios, categorias: [categoriaUrl] } : filtrosVacios
  );
  const [pagina, setPagina] = useState(1);
  const [panelAbierto, setPanelAbierto] = useState(false);

  function alternarFiltro(grupo, valor) {
    setFiltros((previos) => {
      const lista = previos[grupo];
      const nuevaLista = lista.includes(valor) ? lista.filter((v) => v !== valor) : [...lista, valor];
      return { ...previos, [grupo]: nuevaLista };
    });
    setPagina(1);
  }

  function limpiar() {
    setFiltros(filtrosVacios);
    setBusqueda("");
    setOrden("relevancia");
    setPagina(1);
  }

  const resultados = useMemo(() => {
    const texto = normalizar(busqueda.trim());
    const rangos = rangosCapacidad.filter((r) => filtros.capacidades.includes(r.id));

    const filtrados = equipos.filter((e) => {
      const coincideTexto =
        !texto || normalizar(`${e.nombre} ${e.marca} ${e.categoria}`).includes(texto);
      const coincideCategoria = filtros.categorias.length === 0 || filtros.categorias.includes(e.categoria);
      const coincideMarca = filtros.marcas.length === 0 || filtros.marcas.includes(e.marca);
      const coincideCapacidad =
        rangos.length === 0 || rangos.some((r) => e.toneladas >= r.min && e.toneladas <= r.max);
      return coincideTexto && coincideCategoria && coincideMarca && coincideCapacidad;
    });

    const ordenados = [...filtrados];
    if (orden === "cap-asc") ordenados.sort((a, b) => a.toneladas - b.toneladas);
    if (orden === "cap-desc") ordenados.sort((a, b) => b.toneladas - a.toneladas);
    if (orden === "nombre") ordenados.sort((a, b) => a.nombre.localeCompare(b.nombre, "es"));
    return ordenados;
  }, [busqueda, filtros, orden]);

  const totalPaginas = Math.max(1, Math.ceil(resultados.length / POR_PAGINA));
  const paginaActual = Math.min(pagina, totalPaginas);
  const visibles = resultados.slice((paginaActual - 1) * POR_PAGINA, paginaActual * POR_PAGINA);
  const totalFiltros = filtros.categorias.length + filtros.marcas.length + filtros.capacidades.length;

  function cambiarPagina(n) {
    setPagina(n);
    document.getElementById("resultados")?.scrollIntoView({ block: "start" });
  }

  return (
    <>
      <EncabezadoPagina
        titulo="Catálogo de equipos"
        descripcion="Consulta los equipos con los que trabajamos y solicita instalación o servicio directamente desde cada ficha."
      />

      <div className={`contenedor ${styles.contenido}`}>
        <FiltrosEquipos
          filtros={filtros}
          onCambiar={alternarFiltro}
          onLimpiar={limpiar}
          abierto={panelAbierto}
          onCerrar={() => setPanelAbierto(false)}
          totalResultados={resultados.length}
        />

        <div className={styles.resultados} id="resultados">
          <h2 className="solo-lector">Resultados</h2>
          <div className={styles.controles}>
            <div className={styles.busqueda}>
              <label className="etiqueta" htmlFor="buscar">
                Buscar equipo
              </label>
              <div className={styles.campoBusqueda}>
                <Icono nombre="buscar" tamano={20} />
                <input
                  id="buscar"
                  type="search"
                  className="campo"
                  placeholder="Nombre, marca o modelo"
                  value={busqueda}
                  onChange={(e) => {
                    setBusqueda(e.target.value);
                    setPagina(1);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Escape") setBusqueda("");
                  }}
                />
              </div>
            </div>
            <div className={styles.orden}>
              <label className="etiqueta" htmlFor="orden">
                Ordenar por
              </label>
              <select id="orden" className="campo" value={orden} onChange={(e) => setOrden(e.target.value)}>
                <option value="relevancia">Relevancia</option>
                <option value="cap-asc">Capacidad: menor a mayor</option>
                <option value="cap-desc">Capacidad: mayor a menor</option>
                <option value="nombre">Nombre (A–Z)</option>
              </select>
            </div>
            <button
              type="button"
              className={`btn btn-secundario ${styles.botonFiltros}`}
              aria-expanded={panelAbierto}
              aria-controls="panel-filtros"
              onClick={() => setPanelAbierto((v) => !v)}
            >
              <Icono nombre="filtros" tamano={20} />
              Filtros{totalFiltros > 0 && ` (${totalFiltros})`}
            </button>
          </div>

          <p className={styles.conteo} aria-live="polite">
            Mostrando <strong>{resultados.length} {resultados.length === 1 ? "equipo" : "equipos"}</strong>
          </p>

          {visibles.length > 0 ? (
            <ul role="list" className={styles.rejilla}>
              {visibles.map((equipo) => (
                <li key={equipo.id}>
                  <TarjetaEquipo equipo={equipo} />
                </li>
              ))}
            </ul>
          ) : (
            <div className={`tarjeta ${styles.vacio}`}>
              <h2>No encontramos equipos</h2>
              <p>Prueba con otra búsqueda o quita algunos filtros.</p>
              <button type="button" className="btn btn-primario" onClick={limpiar}>
                Limpiar filtros
              </button>
            </div>
          )}

          <Paginacion pagina={paginaActual} totalPaginas={totalPaginas} onCambiar={cambiarPagina} />
        </div>
      </div>
    </>
  );
}
