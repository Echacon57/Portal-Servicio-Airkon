import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import EncabezadoPagina from "../components/ui/EncabezadoPagina";
import FiltroChips from "../components/ui/FiltroChips";
import TablaSolicitudes from "../components/solicitudes/TablaSolicitudes";
import DetalleRegistro from "../components/solicitudes/DetalleRegistro";
import Modal from "../components/ui/Modal";
import Icono from "../components/ui/Icono";
import AccesoSolicitudes from "../components/solicitudes/AccesoSolicitudes";
import ListaSolicitudes from "../components/solicitudes/ListaSolicitudes";
import { estaAbierto } from "../components/ui/FolioEtiqueta";
import { useSesion } from "../context/SesionContext";
import { enmascararCorreo } from "../utils/seguridad";
import { useSolicitudes } from "../context/SolicitudesContext";
import { estados } from "../data/servicios";
import { useTituloPagina } from "../hooks/useTituloPagina";
import styles from "./MisSolicitudes.module.css";

const opcionesTipo = [
  { id: "todos", texto: "Todos" },
  { id: "servicio", texto: "Servicios" },
  { id: "compra", texto: "Pedidos" },
];

export default function MisSolicitudes() {
  useTituloPagina("Mis solicitudes");
  const { correoVerificado, cerrarSesion } = useSesion();
  // Solo llegan los registros del correo verificado
  const { misSolicitudes: solicitudes, cambiarEstado, eliminarSolicitud } = useSolicitudes();
  const { state } = useLocation();
  const [tipo, setTipo] = useState("todos");
  const [folioBuscado, setFolioBuscado] = useState("");
  const [seleccionada, setSeleccionada] = useState(null); 
  const [confirmarBorrado, setConfirmarBorrado] = useState(false);

  const refConservar = useRef(null);
  const refCancelar = useRef(null);
  const confirmoAntes = useRef(false);
  useEffect(() => {
    if (confirmarBorrado) refConservar.current?.focus();
    else if (confirmoAntes.current) refCancelar.current?.focus();
    confirmoAntes.current = confirmarBorrado;
  }, [confirmarBorrado]);
  const [aviso, setAviso] = useState(state?.verificado ? "Correo verificado. Estas son tus solicitudes y pedidos." : "");

  const conteos = useMemo(() => {
    const c = { todos: solicitudes.length, servicio: 0, compra: 0 };
    solicitudes.forEach((s) => (c[s.tipo] += 1));
    return c;
  }, [solicitudes]);

  // Abiertas primero; dentro de cada grupo, las más recientes arriba
  const visibles = solicitudes
    .filter(
      (s) =>
        (tipo === "todos" || s.tipo === tipo) &&
        s.folio.toLowerCase().includes(folioBuscado.trim().toLowerCase())
    )
    .sort((a, b) => Number(a.estado === "completada") - Number(b.estado === "completada"));

  const detalle = solicitudes.find((s) => s.folio === seleccionada);
  const nombreRegistro = detalle?.tipo === "compra" ? "pedido" : "solicitud";

  function cerrarModal() {
    confirmoAntes.current = false;
    setSeleccionada(null);
    setConfirmarBorrado(false);
  }

  function borrar() {
    eliminarSolicitud(seleccionada);
    setAviso(`${detalle.tipo === "compra" ? "El pedido" : "La solicitud"} ${seleccionada} fue cancelado${detalle.tipo === "compra" ? "" : "a"}.`);
    cerrarModal();
  }

  // Sin correo verificado solo se muestra la pantalla de acceso
  if (!correoVerificado) return <AccesoSolicitudes />;

  return (
    <>
      <EncabezadoPagina
        titulo="Mis solicitudes"
        descripcion={
          <>
            Viendo los registros de <strong>{enmascararCorreo(correoVerificado)}</strong>.{" "}
            <button type="button" className={styles.cerrarSesion} onClick={cerrarSesion}>
              Cerrar sesión
            </button>
          </>
        }
        accion={
          <p className={styles.verificado}>
            <Icono nombre="check" tamano={18} />
            Correo verificado
          </p>
        }
      />

      <section className={`contenedor ${styles.contenido}`} aria-label="Listado de solicitudes y pedidos">
        <div className={styles.controles}>
          <FiltroChips etiqueta="Filtrar por tipo" opciones={opcionesTipo} activo={tipo} conteos={conteos} onCambiar={setTipo} />
          <div className={styles.buscar}>
            <label className="etiqueta" htmlFor="buscar-folio">
              Buscar por folio
            </label>
            <input
              id="buscar-folio"
              type="search"
              className="campo"
              placeholder="Por ejemplo, SV-2026-0131"
              value={folioBuscado}
              onChange={(e) => setFolioBuscado(e.target.value)}
            />
          </div>
        </div>

        <p className={styles.aviso} role="status">
          {aviso}
        </p>

        {visibles.length > 0 ? (
          <>
            <div className={styles.vistaTabla}>
              <TablaSolicitudes solicitudes={visibles} onVerDetalle={setSeleccionada} />
              <p className={styles.nota}>Los folios abiertos se marcan en amarillo. Los cerrados quedan en gris como historial.</p>
            </div>
            <div className={styles.vistaLista}>
              <ListaSolicitudes solicitudes={visibles} onVerDetalle={setSeleccionada} />
            </div>
          </>
        ) : (
          <div className={styles.vacio}>
            <h2>{solicitudes.length === 0 ? "Aún no tienes solicitudes ni pedidos" : "No hay resultados con ese filtro"}</h2>
            <p>
              {solicitudes.length === 0
                ? "Cuando envíes una solicitud o hagas un pedido aparecerá aquí con su folio y estado."
                : "Prueba con otro tipo o revisa el folio que escribiste."}
            </p>
          </div>
        )}

        <div className={styles.nueva}>
          <Link to="/solicitar" className="btn btn-acento btn-bloque">
            Nueva solicitud
          </Link>
        </div>
      </section>

      <Modal
        abierto={Boolean(detalle)}
        variante="etiqueta"
        tono={detalle && estaAbierto(detalle) ? "abierto" : "cerrado"}
        antetitulo={detalle ? (detalle.tipo === "compra" ? "Folio de pedido" : "Folio de servicio") : ""}
        titulo={detalle?.folio ?? ""}
        onCerrar={cerrarModal}
        acciones={
          detalle &&
          (confirmarBorrado ? (
            <>
              <p className={styles.confirmar} role="alert">
                <Icono nombre="alerta" tamano={20} />
                <span>¿Seguro que quieres cancelar este {nombreRegistro === "pedido" ? "pedido" : "servicio"}? No se puede deshacer.</span>
              </p>
              <div className={styles.botonesModal}>
                <button ref={refConservar} type="button" className="btn btn-secundario" onClick={() => setConfirmarBorrado(false)}>
                  No, conservarlo
                </button>
                <button type="button" className="btn btn-peligro" onClick={borrar}>
                  <Icono nombre="basura" tamano={20} /> Sí, cancelar {nombreRegistro}
                </button>
              </div>
            </>
          ) : (
            <>
              <p className={styles.estadoModal}>
                Estado: <span>{estados[detalle.estado]?.toLowerCase()}</span>
              </p>
              <div className={styles.botonesModal}>
                {estaAbierto(detalle) && (
                  <button ref={refCancelar} type="button" className="btn btn-peligro" onClick={() => setConfirmarBorrado(true)}>
                    Cancelar {nombreRegistro === "pedido" ? "pedido" : "servicio"}
                  </button>
                )}
                <button type="button" className="btn btn-primario" onClick={cerrarModal}>
                  Cerrar
                </button>
              </div>
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
              <p className="ayuda">En un sistema real el estado lo cambiaría el personal de Airkon.</p>
            </div>
          </>
        )}
      </Modal>
    </>
  );
}
