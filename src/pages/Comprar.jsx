import { Link, useNavigate, useParams } from "react-router-dom";
import MigasDePan from "../components/ui/MigasDePan";
import FormularioCompra from "../components/compras/FormularioCompra";
import { buscarEquipo } from "../data/equipos";
import { useSolicitudes } from "../context/SolicitudesContext";
import { useTituloPagina } from "../hooks/useTituloPagina";
import NoEncontrado from "./NoEncontrado";
import styles from "./Comprar.module.css";

/** Compra de un equipo del catálogo: /comprar/:id */
export default function Comprar() {
  const { id } = useParams();
  const equipo = buscarEquipo(id);
  const navegar = useNavigate();
  const { agregarSolicitud } = useSolicitudes();
  useTituloPagina(equipo ? `Comprar ${equipo.nombre}` : "Equipo no encontrado");

  if (!equipo) return <NoEncontrado mensaje="Ese equipo no existe o ya no está en el catálogo." />;

  // Los chillers no se venden en línea: necesitan cotización 
  if (equipo.precioInstalacion === null) {
    return (
      <NoEncontrado
        titulo="Este equipo requiere cotización"
        mensaje="Los chillers se venden con un proyecto de ingeniería. Escríbenos y te preparamos una propuesta."
      />
    );
  }

  function enviar(datos) {
    const nuevo = agregarSolicitud(datos);
    navegar(`/solicitud-enviada/${nuevo.folio}`);
  }

  return (
    <>
      <div className={styles.barraMigas}>
        <div className="contenedor">
          <MigasDePan
            elementos={[
              { texto: "Inicio", ruta: "/" },
              { texto: "Catálogo", ruta: "/catalogo" },
              { texto: equipo.nombre, ruta: `/catalogo/${equipo.id}` },
              { texto: "Comprar" },
            ]}
          />
        </div>
      </div>
      <div className={`contenedor ${styles.contenido}`}>
        <header className={styles.encabezado}>
          <h1 id="titulo-pagina">Comprar {equipo.nombre}</h1>
          <p>
            Elige si quieres instalación y te mostramos el costo total al momento. Los campos marcados con{" "}
            <span className="obligatorio">*</span> son obligatorios.{" "}
            <Link to="/catalogo">Cambiar de equipo</Link>
          </p>
        </header>
        <FormularioCompra equipo={equipo} onEnviar={enviar} />
      </div>
    </>
  );
}
