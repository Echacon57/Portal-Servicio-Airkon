import GrupoOpciones from "../../ui/GrupoOpciones";
import CampoFormulario from "../../ui/CampoFormulario";
import Icono from "../../ui/Icono";
import CampoFoto from "../CampoFoto";
import {
  tiposEquipo,
  marcasComunes,
  ubicaciones,
  capacidades,
  refrigerantes,
  antiguedades,
  buscarPorId,
} from "../../../data/servicios";
import { moneda } from "../../../utils/precios";
import f from "../../../styles/formulario.module.css";
import styles from "../AsistenteSolicitud.module.css";

/**
 * Paso 2: datos sencillos del equipo (tipo, marca y ubicación).
 * Los datos técnicos van en una sección plegable y son opcionales.
 */
export default function PasoEquipo({ form, foto, onCambiarFoto, equipoCatalogo }) {
  const { valores, errores, manejarCambio, manejarBlur } = form;
  const ubicacion = buscarPorId(ubicaciones, valores.ubicacion);
  const tieneDatosTecnicos =
    [valores.capacidad, valores.refrigerante, valores.antiguedad].some((v) => v && v !== "No estoy seguro(a)") ||
    valores.modelo ||
    foto;

  return (
    <>
      {equipoCatalogo && (
        <p className={f.info}>
          <Icono nombre="check" tamano={20} />
          Llenamos estos datos con el equipo del catálogo: {equipoCatalogo.nombre}. Puedes cambiarlos.
        </p>
      )}

      <GrupoOpciones
        nombre="tipoEquipo"
        leyenda="¿Qué tipo de equipo es?"
        obligatorio
        diseno="rejilla"
        ayuda="Elige el que más se parezca. Si no estás seguro, elige “No estoy seguro(a)”."
        opciones={tiposEquipo.map((t) => ({ valor: t.id, titulo: t.nombre, forma: t.forma }))}
        valor={valores.tipoEquipo}
        onChange={manejarCambio}
        onBlur={manejarBlur}
        error={errores.tipoEquipo}
      />

      <div className={f.rejilla}>
        <CampoFormulario
          id="marca"
          como="select"
          etiqueta="Marca"
          obligatorio
          value={valores.marca}
          onChange={manejarCambio}
          onBlur={manejarBlur}
          error={errores.marca}
          ayuda="Suele aparecer al frente de la unidad interior."
        >
          <option value="">Selecciona una marca</option>
          {marcasComunes.map((m) => (
            <option key={m} value={m}>{m}</option>
          ))}
        </CampoFormulario>
      </div>

      <GrupoOpciones
        nombre="ubicacion"
        leyenda="¿Dónde está el equipo?"
        obligatorio
        ayuda="Nos ayuda a llevar la escalera o el equipo de seguridad correcto."
        opciones={ubicaciones.map((u) => ({ valor: u.id, titulo: u.nombre, descripcion: u.descripcion }))}
        valor={valores.ubicacion}
        onChange={manejarCambio}
        onBlur={manejarBlur}
        error={errores.ubicacion}
      />
      {ubicacion && ubicacion.extra > 0 && (
        <p className={f.aviso} role="status">
          <Icono nombre="alerta" tamano={20} />
          Esta ubicación puede tener un cargo adicional aproximado de {moneda(ubicacion.extra)}. Te lo confirmamos
          antes de la visita.
        </p>
      )}

      <details className={styles.opcionales} open={Boolean(tieneDatosTecnicos)}>
        <summary>
          <span>
            Datos técnicos <span className="opcional">(opcional)</span>
          </span>
          <span className={styles.resumenAyuda}>Si no los conoces, déjalos en “No estoy seguro(a)”.</span>
        </summary>
        <div className={styles.opcionalesContenido}>
          <div className={f.rejilla}>
            <CampoFormulario id="capacidad" como="select" etiqueta="Capacidad" value={valores.capacidad} onChange={manejarCambio}>
              {capacidades.map((c) => <option key={c} value={c}>{c}</option>)}
            </CampoFormulario>
            <CampoFormulario id="refrigerante" como="select" etiqueta="Refrigerante" value={valores.refrigerante} onChange={manejarCambio}>
              {refrigerantes.map((r) => <option key={r} value={r}>{r}</option>)}
            </CampoFormulario>
            <CampoFormulario id="antiguedad" como="select" etiqueta="Antigüedad del equipo" value={valores.antiguedad} onChange={manejarCambio}>
              {antiguedades.map((a) => <option key={a} value={a}>{a}</option>)}
            </CampoFormulario>
            <CampoFormulario id="modelo" etiqueta="Modelo" placeholder="Ej. MSMA-24CRN1" value={valores.modelo} onChange={manejarCambio} />
          </div>
          <CampoFoto foto={foto} onCambiar={onCambiarFoto} />
        </div>
      </details>
    </>
  );
}
