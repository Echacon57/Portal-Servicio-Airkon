import { Link, useNavigate, useParams } from "react-router-dom";
import EncabezadoPagina from "../components/ui/EncabezadoPagina";
import FormularioCompra from "../components/compras/FormularioCompra";
import { buscarEquipo } from "../data/equipos";
import { useSolicitudes } from "../context/SolicitudesContext";
import { useTituloPagina } from "../hooks/useTituloPagina";
import NoEncontrado from "./NoEncontrado";
import styles from "./Comprar.module.css";

/* Compra de un equipo del catálogo: /comprar/:id */
export default function Comprar() {
  const { id } = useParams();
  const equipo = buscarEquipo(id);
  const navegar = useNavigate();
  const { agregarSolicitud } = useSolicitudes();
  useTituloPagina(equipo ? `Comprar ${equipo.nombre}` : "Equipo no encontrado");

  if (!equipo) return <NoEncontrado mensaje="Ese equipo no existe o ya no está en el catálogo." />;

  // Los chillers no se venden en línea: necesitan proyecto
  if (equipo.precioInstalacion === null) {
    return (
      <NoEncontrado
        antetitulo="Venta con proyecto"
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
      <EncabezadoPagina
        titulo={`Comprar ${equipo.nombre}`}
        migas={[
          { texto: "Inicio", ruta: "/" },
          { texto: "Catálogo", ruta: "/catalogo" },
          { texto: equipo.nombre, ruta: `/catalogo/${equipo.id}` },
          { texto: "Comprar" },
        ]}
        descripcion={
          <>
            Elige si quieres instalación y ve el costo total al momento. Los campos con{" "}
            <span className="obligatorio">*</span> son obligatorios. <Link to="/catalogo">Cambiar de equipo</Link>
          </>
        }
      />
      <div className={`contenedor ${styles.contenido}`}>
        <FormularioCompra equipo={equipo} onEnviar={enviar} />
      </div>
    </>
  );
}
