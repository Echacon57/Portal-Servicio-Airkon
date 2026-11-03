import { useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import EncabezadoPagina from "../components/ui/EncabezadoPagina";
import FiltroChips from "../components/ui/FiltroChips";
import TablaSolicitudes from "../components/solicitudes/TablaSolicitudes";
import DetalleRegistro from "../components/solicitudes/DetalleRegistro";
import Modal from "../components/ui/Modal";
import Icono from "../components/ui/Icono";
import AccesoSolicitudes from "../components/solicitudes/AccesoSolicitudes";
import { useSesion } from "../context/SesionContext";
import { enmascararCorreo } from "../utils/seguridad";
import { useSolicitudes } from "../context/SolicitudesContext";
import { estados } from "../data/servicios";
import { useTituloPagina } from "../hooks/useTituloPagina";
import styles from "./MisSolicitudes.module.css";

const opcionesTipo = [
  { id: "todos", texto: "Todo" },
  { id: "servicio", texto: "Servicios" },
  { id: "compra", texto: "Pedidos" },
];
const opcionesEstado = [{ id: "todas", texto: "Todos los estados" }, ...Object.entries(estados).map(([id, texto]) => ({ id, texto }))];

export default function MisSolicitudes() {
  useTituloPagina("Mis solicitudes");
  const { correoVerificado, cerrarSesion } = useSesion();
  // Solo llegan los registros del correo verificado (ver SolicitudesContext)
  const { misSolicitudes: solicitudes, cambiarEstado, eliminarSolicitud } = useSolicitudes();
  const { state } = useLocation();
  const [tipo, setTipo] = useState("todos");
  const [estado, setEstado] = useState("todas");
  const [folioBuscado, setFolioBuscado] = useState("");
  const [seleccionada, setSeleccionada] = useState(null); // folio abierto en el modal
  const [confirmarBorrado, setConfirmarBorrado] = useState(false);
  const [aviso, setAviso] = useState(state?.verificado ? "Correo verificado. Estas son tus solicitudes y pedidos." : "");

  // Conteos para los chips. Los de estado respetan el filtro de tipo.
  const conteos = useMemo(() => {
    const c = { todos: solicitudes.length, servicio: 0, compra: 0, todas: 0, pendiente: 0, proceso: 0, completada: 0 };
    solicitudes.forEach((s) => {
      c[s.tipo] += 1;
      if (tipo === "todos" || s.tipo === tipo) {
        c.todas += 1;
        c[s.estado] += 1;
      }
    });
    return c;
  }, [solicitudes, tipo]);

  const visibles = solicitudes.filter(
    (s) =>
      (tipo === "todos" || s.tipo === tipo) &&
      (estado === "todas" || s.estado === estado) &&
      s.folio.toLowerCase().includes(folioBuscado.trim().toLowerCase())
  );

  const detalle = solicitudes.find((s) => s.folio === seleccionada);
  const nombreRegistro = detalle?.tipo === "compra" ? "pedido" : "solicitud";

  function cerrarModal() {
    setSeleccionada(null);
    setConfirmarBorrado(false);
  }

  function borrar() {
    eliminarSolicitud(seleccionada);
    setAviso(`${detalle.tipo === "compra" ? "El pedido" : "La solicitud"} ${seleccionada} fue cancelado${detalle.tipo === "compra" ? "" : "a"}.`);
    cerrarModal();
  }

  return (
    <>
      <EncabezadoPagina
        titulo="Mis solicitudes"
        descripcion="Consulta el estado de tus servicios y pedidos. Para proteger tus datos, primero verificamos tu correo."
      >
        <div className={styles.botonesEncabezado}>
          <Link to="/solicitar" className="btn btn-primario">
            Solicitar servicio <Icono nombre="flecha" tamano={20} />
          </Link>
          <Link to="/catalogo" className="btn btn-secundario">
            <Icono nombre="carrito" tamano={20} /> Comprar equipo
          </Link>
        </div>
      </EncabezadoPagina>

      {!correoVerificado ? (
        <div className={`contenedor ${styles.contenido}`}>
          <AccesoSolicitudes />
        </div>
      ) : (
        <section className={`contenedor ${styles.contenido}`} aria-label="Listado de solicitudes y pedidos">
          <div className={styles.sesion}>
            <p>
              <Icono nombre="escudo" tamano={20} />
              <span>
                Viendo los registros de <strong>{enmascararCorreo(correoVerificado)}</strong>
              </span>
            </p>
            <button type="button" className="btn btn-secundario btn-chico" onClick={cerrarSesion}>
              Cerrar sesión
            </button>
          </div>

          <div className={styles.controles}>
            <div className={styles.filtros}>
              <FiltroChips etiqueta="Filtrar por tipo" opciones={opcionesTipo} activo={tipo} conteos={conteos} onCambiar={setTipo} />
              <FiltroChips etiqueta="Filtrar por estado" opciones={opcionesEstado} activo={estado} conteos={conteos} onCambiar={setEstado} />
            </div>
            <div className={styles.buscar}>
              <label className="etiqueta" htmlFor="buscar-folio">Buscar por folio</label>
              <input
                id="buscar-folio"
                type="search"
                className="campo"
                placeholder="SV-2026-0000 o PD-2026-0000"
                value={folioBuscado}
                onChange={(e) => setFolioBuscado(e.target.value)}
              />
            </div>
          </div>

          <p className={styles.aviso} role="status">{aviso}</p>

          {visibles.length > 0 ? (
            <TablaSolicitudes solicitudes={visibles} onVerDetalle={setSeleccionada} />
          ) : (
            <div className={`tarjeta ${styles.vacio}`}>
              <Icono nombre="portapapeles" tamano={32} />
              <h2>{solicitudes.length === 0 ? "Aún no tienes solicitudes ni pedidos" : "No hay resultados con esos filtros"}</h2>
              <p>
                {solicitudes.length === 0
                  ? "Cuando envíes una solicitud o hagas un pedido aparecerá aquí con su folio y estado."
                  : "Prueba con otro tipo o estado, o revisa el folio que escribiste."}
              </p>
              <Link to="/solicitar" className="btn btn-primario">Solicitar servicio</Link>
            </div>
          )}
        </section>
      )}

      <Modal
        abierto={Boolean(detalle)}
        titulo={detalle ? `${detalle.tipo === "compra" ? "Pedido" : "Solicitud"} ${detalle.folio}` : ""}
        onCerrar={cerrarModal}
        acciones={
          detalle &&
          (confirmarBorrado ? (
            <>
              <p className={styles.confirmar}>¿Seguro que quieres cancelar este {nombreRegistro === "pedido" ? "pedido" : "servicio"}? No se puede deshacer.</p>
              <button type="button" className="btn btn-peligro" onClick={borrar}>
                <Icono nombre="basura" tamano={20} /> Sí, cancelar {nombreRegistro}
              </button>
              <button type="button" className="btn btn-secundario" onClick={() => setConfirmarBorrado(false)}>
                No, conservarlo
              </button>
            </>
          ) : (
            <>
              <button type="button" className="btn btn-primario" onClick={cerrarModal}>Cerrar</button>
              <button type="button" className="btn btn-peligro" onClick={() => setConfirmarBorrado(true)}>
                Cancelar {nombreRegistro}
              </button>
            </>
          ))
        }
      >
        {detalle && (
          <>
            <DetalleRegistro registro={detalle} />
            <div className={styles.demo}>
              <label className="etiqueta" htmlFor="estado-demo">Simular avance (demostración)</label>
              <select
                id="estado-demo"
                className="campo"
                value={detalle.estado}
                onChange={(e) => cambiarEstado(detalle.folio, e.target.value)}
              >
                {Object.entries(estados).map(([id, texto]) => (
                  <option key={id} value={id}>{texto}</option>
                ))}
              </select>
              <p className="ayuda">En un sistema real el estado lo cambiaría el encargado de Airkon.</p>
            </div>
          </>
        )}
      </Modal>
    </>
  );
}
