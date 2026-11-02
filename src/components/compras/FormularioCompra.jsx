import { useState } from "react";
import { Link } from "react-router-dom";
import CampoFormulario from "../ui/CampoFormulario";
import GrupoOpciones from "../ui/GrupoOpciones";
import ResumenErrores from "../ui/ResumenErrores";
import Icono from "../ui/Icono";
import ResumenCompra from "./ResumenCompra";
import { useFormulario } from "../../hooks/useFormulario";
import { ubicaciones, horarios, metodosPago, CARGO_RETIRO } from "../../data/servicios";
import { calcularPedido, moneda } from "../../utils/precios";
import {
  validarContacto,
  validarDireccion,
  validarFechaFutura,
  requerido,
  limpiarErrores,
  mananaISO,
  soloDigitos,
} from "../../utils/validaciones";
import f from "../../styles/formulario.module.css";
import styles from "./FormularioCompra.module.css";

const MAX_CANTIDAD = 10;

const etiquetas = {
  cantidad: "Cantidad",
  ubicacion: "Ubicación de la instalación",
  direccion: "Dirección de entrega",
  fecha: "Fecha",
  horario: "Horario",
  nombre: "Nombre completo",
  telefono: "Teléfono",
  correo: "Correo electrónico",
  metodoPago: "Forma de pago",
  terminos: "Aviso de privacidad",
};

function validar(v) {
  const cantidad = Number(v.cantidad);
  return limpiarErrores({
    cantidad:
      !Number.isInteger(cantidad) || cantidad < 1 || cantidad > MAX_CANTIDAD
        ? `Elige una cantidad entre 1 y ${MAX_CANTIDAD}.`
        : "",
    ubicacion: v.instalar ? requerido(v.ubicacion, "Indica dónde se instalará el equipo.") : "",
    direccion: validarDireccion(v.direccion),
    fecha: validarFechaFutura(v.fecha),
    horario: requerido(v.horario, "Elige un horario."),
    ...validarContacto(v),
    metodoPago: requerido(v.metodoPago, "Elige cómo quieres pagar."),
    terminos: v.terminos ? "" : "Debes aceptar el aviso de privacidad.",
  });
}

/**
 * Formulario para comprar un equipo con instalación opcional.
 * El resumen de costos se recalcula en cada cambio (onChange).
 *
 * @param {{ equipo: object, onEnviar: (datos: object) => void }} props
 */
export default function FormularioCompra({ equipo, onEnviar }) {
  const { valores, errores, asignar, manejarCambio, manejarBlur, validarTodo } = useFormulario(
    {
      cantidad: "1",
      instalar: true,
      ubicacion: "piso",
      retiro: false,
      direccion: "",
      fecha: "",
      horario: "",
      nombre: "",
      telefono: "",
      correo: "",
      empresa: "",
      metodoPago: "",
      terminos: false,
    },
    validar
  );
  const [intento, setIntento] = useState(0);
  const [enviando, setEnviando] = useState(false);

  const cantidadNumero = Math.min(MAX_CANTIDAD, Math.max(1, Number(valores.cantidad) || 1));
  const calculo = calcularPedido({
    equipo,
    cantidad: cantidadNumero,
    instalar: valores.instalar,
    ubicacion: valores.ubicacion,
    retiro: valores.retiro,
  });

  function cambiarCantidad(delta) {
    asignar("cantidad", String(Math.min(MAX_CANTIDAD, Math.max(1, cantidadNumero + delta))));
  }

  function manejarEnvio(evento) {
    evento.preventDefault();
    setIntento((n) => n + 1);
    if (Object.keys(validarTodo()).length > 0) return;

    setEnviando(true);
    setTimeout(() => {
      const { terminos, ...datos } = valores;
      onEnviar({
        ...datos,
        tipo: "compra",
        equipoId: equipo.id,
        cantidad: cantidadNumero,
        ubicacion: datos.instalar ? datos.ubicacion : null,
        retiro: datos.instalar && datos.retiro,
        telefono: soloDigitos(datos.telefono),
        total: calculo.total,
      });
    }, 600);
  }

  const opcionesUbicacion = ubicaciones.map((u) => ({
    valor: u.id,
    titulo: u.nombre,
    descripcion: u.descripcion,
    extra: u.extra > 0 ? `+ ${moneda(u.extra)} por equipo` : "Sin cargo extra",
  }));

  return (
    <div className={styles.distribucion}>
      <ResumenCompra equipo={equipo} calculo={calculo} />

      <form id="form-compra" className={`tarjeta ${f.tarjetaFormulario}`} onSubmit={manejarEnvio} noValidate>
        <ResumenErrores errores={intento > 0 ? errores : {}} etiquetas={etiquetas} intento={intento} />

        {/* 1. Pedido */}
        <fieldset className={f.seccion}>
          <legend className={f.leyenda}>
            <span className={f.numero} aria-hidden="true">1</span>
            Tu pedido
          </legend>

          <div>
            <label className="etiqueta" htmlFor="cantidad">
              Cantidad de equipos
            </label>
            <div className={styles.cantidad}>
              <button
                type="button"
                onClick={() => cambiarCantidad(-1)}
                disabled={cantidadNumero <= 1}
                aria-label="Quitar un equipo"
                aria-controls="cantidad"
              >
                <Icono nombre="menos" tamano={20} />
              </button>
              <input
                id="cantidad"
                name="cantidad"
                type="number"
                inputMode="numeric"
                min="1"
                max={MAX_CANTIDAD}
                className="campo"
                value={valores.cantidad}
                onChange={manejarCambio}
                onBlur={manejarBlur}
                aria-invalid={errores.cantidad ? "true" : undefined}
                aria-describedby={errores.cantidad ? "cantidad-error" : "cantidad-ayuda"}
              />
              <button
                type="button"
                onClick={() => cambiarCantidad(1)}
                disabled={cantidadNumero >= MAX_CANTIDAD}
                aria-label="Agregar un equipo"
                aria-controls="cantidad"
              >
                <Icono nombre="mas" tamano={20} />
              </button>
            </div>
            {errores.cantidad ? (
              <p id="cantidad-error" className="mensaje-error">
                <Icono nombre="alerta" tamano={18} />
                <span>{errores.cantidad}</span>
              </p>
            ) : (
              <p id="cantidad-ayuda" className="ayuda">
                Máximo {MAX_CANTIDAD} por pedido. Para más equipos, solicita una cotización.
              </p>
            )}
          </div>

          <label className={`casilla ${f.radioSimple}`}>
            <input type="checkbox" name="instalar" checked={valores.instalar} onChange={manejarCambio} />
            <span>
              Incluir instalación ({moneda(equipo.precioInstalacion)} por equipo)
            </span>
          </label>

          {valores.instalar ? (
            <>
              <GrupoOpciones
                nombre="ubicacion"
                leyenda="¿Dónde se instalará el equipo?"
                obligatorio
                opciones={opcionesUbicacion}
                valor={valores.ubicacion}
                onChange={manejarCambio}
                onBlur={manejarBlur}
                error={errores.ubicacion}
              />
              <label className={`casilla ${f.radioSimple}`}>
                <input type="checkbox" name="retiro" checked={valores.retiro} onChange={manejarCambio} />
                <span>Es un reemplazo: retirar el equipo anterior (+ {moneda(CARGO_RETIRO)} por equipo)</span>
              </label>
            </>
          ) : (
            <p className={f.info}>
              <Icono nombre="camion" tamano={20} />
              Solo entregaremos el equipo. Puedes solicitar la instalación después desde “Solicitar servicio”.
            </p>
          )}
        </fieldset>

        {/* 2. Entrega */}
        <fieldset className={f.seccion}>
          <legend className={f.leyenda}>
            <span className={f.numero} aria-hidden="true">2</span>
            {valores.instalar ? "Entrega e instalación" : "Entrega"}
          </legend>
          <CampoFormulario
            id="direccion"
            etiqueta="Dirección"
            obligatorio
            autoComplete="street-address"
            placeholder="Calle, número, colonia y municipio"
            value={valores.direccion}
            onChange={manejarCambio}
            onBlur={manejarBlur}
            error={errores.direccion}
          />
          <div className={f.rejilla}>
            <CampoFormulario
              id="fecha"
              type="date"
              etiqueta={valores.instalar ? "Fecha de instalación" : "Fecha de entrega"}
              obligatorio
              min={mananaISO()}
              value={valores.fecha}
              onChange={manejarCambio}
              onBlur={manejarBlur}
              error={errores.fecha}
              ayuda="De lunes a sábado. La confirmamos por teléfono."
            />
            <GrupoOpciones
              nombre="horario"
              leyenda="Horario preferido"
              diseno="columna"
              obligatorio
              opciones={horarios.map((h) => ({ valor: h.id, titulo: h.etiqueta }))}
              valor={valores.horario}
              onChange={manejarCambio}
              onBlur={manejarBlur}
              error={errores.horario}
            />
          </div>
        </fieldset>

        {/* 3. Contacto */}
        <fieldset className={f.seccion}>
          <legend className={f.leyenda}>
            <span className={f.numero} aria-hidden="true">3</span>
            Datos de contacto
          </legend>
          <div className={f.rejilla}>
            <CampoFormulario id="nombre" etiqueta="Nombre completo" obligatorio autoComplete="name"
              value={valores.nombre} onChange={manejarCambio} onBlur={manejarBlur} error={errores.nombre} />
            <CampoFormulario id="telefono" etiqueta="Teléfono" type="tel" inputMode="tel" obligatorio autoComplete="tel"
              placeholder="81 1234 5678" value={valores.telefono} onChange={manejarCambio} onBlur={manejarBlur}
              error={errores.telefono} />
            <CampoFormulario id="correo" etiqueta="Correo electrónico" type="email" obligatorio autoComplete="email"
              placeholder="nombre@correo.com" value={valores.correo} onChange={manejarCambio} onBlur={manejarBlur}
              error={errores.correo} />
            <CampoFormulario id="empresa" etiqueta="Empresa" opcional autoComplete="organization"
              value={valores.empresa} onChange={manejarCambio} />
          </div>
        </fieldset>

        {/* 4. Pago */}
        <fieldset className={f.seccion}>
          <legend className={f.leyenda}>
            <span className={f.numero} aria-hidden="true">4</span>
            Forma de pago
          </legend>
          <GrupoOpciones
            nombre="metodoPago"
            leyenda="¿Cómo quieres pagar?"
            obligatorio
            opciones={metodosPago.map((m) => ({ valor: m.id, titulo: m.nombre, descripcion: m.descripcion }))}
            valor={valores.metodoPago}
            onChange={manejarCambio}
            onBlur={manejarBlur}
            error={errores.metodoPago}
            ayuda="No pedimos datos de tarjeta en línea."
          />
        </fieldset>

        <div className={f.seccion}>
          <label className="casilla">
            <input
              type="checkbox"
              id="terminos"
              name="terminos"
              checked={valores.terminos}
              onChange={manejarCambio}
              aria-invalid={errores.terminos ? "true" : undefined}
              aria-describedby={errores.terminos ? "terminos-error" : undefined}
            />
            <span>
              Acepto que Airkon use mis datos para procesar este pedido.{" "}
              <span className="obligatorio" aria-hidden="true">*</span>
            </span>
          </label>
          {errores.terminos && (
            <p id="terminos-error" className="mensaje-error">
              <Icono nombre="alerta" tamano={18} />
              <span>{errores.terminos}</span>
            </p>
          )}
        </div>

        <div className={f.acciones}>
          <p className={styles.totalFinal}>
            Total con IVA: <strong>{moneda(calculo.total)}</strong>
          </p>
          <button type="submit" className="btn btn-primario" disabled={enviando}>
            {enviando ? "Enviando pedido..." : "Confirmar pedido"}
            {!enviando && <Icono nombre="flecha" tamano={20} />}
          </button>
          <Link to={`/catalogo/${equipo.id}`} className={f.enlaceSecundario}>
            Volver a la ficha del equipo
          </Link>
        </div>
      </form>
    </div>
  );
}
