import { useState } from "react";
import EncabezadoPagina from "../components/ui/EncabezadoPagina";
import CampoFormulario from "../components/ui/CampoFormulario";
import ResumenErrores from "../components/ui/ResumenErrores";
import Icono from "../components/ui/Icono";
import { useFormulario } from "../hooks/useFormulario";
import { validarNombre, validarCorreo, validarLongitud, requerido, limpiarErrores } from "../utils/validaciones";
import { useTituloPagina } from "../hooks/useTituloPagina";
import styles from "./Contacto.module.css";

const etiquetas = { nombre: "Nombre", correo: "Correo electrónico", asunto: "Asunto", mensaje: "Mensaje" };

function validar(v) {
  return limpiarErrores({
    nombre: validarNombre(v.nombre),
    correo: validarCorreo(v.correo),
    asunto: requerido(v.asunto, "Elige un asunto."),
    mensaje: validarLongitud(v.mensaje, 10, 800, "El mensaje"),
  });
}

const preguntas = [
  {
    p: "¿Cada cuánto debo darle mantenimiento a mi minisplit?",
    r: "Recomendamos un mantenimiento preventivo cada 6 meses en uso residencial y cada 3 meses en comercios con uso continuo.",
  },
  {
    p: "¿Atienden fuera de Monterrey?",
    r: "Sí, damos servicio en toda el área metropolitana y en municipios cercanos de Nuevo León con previa cotización.",
  },
  {
    p: "¿Cuánto tarda una instalación?",
    r: "Un minisplit residencial se instala en 3 a 5 horas. Equipos paquete y chillers requieren una visita técnica previa.",
  },
];

export default function Contacto() {
  useTituloPagina("Contacto");
  const { valores, errores, manejarCambio, manejarBlur, validarTodo, reiniciar } = useFormulario(
    { nombre: "", correo: "", asunto: "", mensaje: "" },
    validar
  );
  const [intento, setIntento] = useState(0);
  const [enviado, setEnviado] = useState("");

  function enviar(evento) {
    evento.preventDefault();
    setIntento((n) => n + 1);
    if (Object.keys(validarTodo()).length > 0) {
      setEnviado("");
      return;
    }
    setEnviado(`Gracias, ${valores.nombre.split(" ")[0]}. Te responderemos a ${valores.correo} en menos de 24 horas.`);
    reiniciar();
    setIntento(0);
  }

  return (
    <>
      <EncabezadoPagina
        titulo="Contacto"
        descripcion="¿Tienes dudas o necesitas una cotización especial? Escríbenos o llámanos."
      />
      <div className={`contenedor ${styles.contenido}`}>
        <section className={`tarjeta ${styles.formulario}`} aria-labelledby="titulo-form-contacto">
          <h2 id="titulo-form-contacto">Envíanos un mensaje</h2>
          <form onSubmit={enviar} noValidate className={styles.campos}>
            <ResumenErrores errores={intento > 0 ? errores : {}} etiquetas={etiquetas} intento={intento} />
            <div className={styles.dosColumnas}>
              <CampoFormulario id="nombre" etiqueta="Nombre" obligatorio autoComplete="name"
                value={valores.nombre} onChange={manejarCambio} onBlur={manejarBlur} error={errores.nombre} />
              <CampoFormulario id="correo" etiqueta="Correo electrónico" type="email" obligatorio autoComplete="email"
                value={valores.correo} onChange={manejarCambio} onBlur={manejarBlur} error={errores.correo} />
            </div>
            <CampoFormulario id="asunto" como="select" etiqueta="Asunto" obligatorio
              value={valores.asunto} onChange={manejarCambio} onBlur={manejarBlur} error={errores.asunto}>
              <option value="">Selecciona un asunto</option>
              <option>Cotización</option>
              <option>Duda sobre un servicio</option>
              <option>Facturación</option>
              <option>Otro</option>
            </CampoFormulario>
            <CampoFormulario id="mensaje" como="textarea" etiqueta="Mensaje" obligatorio maxLength={800}
              value={valores.mensaje} onChange={manejarCambio} onBlur={manejarBlur} error={errores.mensaje} />
            <button type="submit" className="btn btn-primario">
              Enviar mensaje <Icono nombre="flecha" tamano={20} />
            </button>
            <p role="status" className={enviado ? styles.exito : "solo-lector"}>
              {enviado && <Icono nombre="ok" tamano={20} />}
              {enviado}
            </p>
          </form>
        </section>

        <aside className={styles.lateral} aria-label="Datos de contacto">
          <section className={`tarjeta ${styles.datos}`} aria-labelledby="titulo-datos">
            <h2 id="titulo-datos">Datos de contacto</h2>
            <address>
              <ul role="list">
                <li>
                  <span className={styles.icono}><Icono nombre="telefono" tamano={20} /></span>
                  <div><strong>Teléfono</strong><a href="tel:+528100000000">(81) 0000 0000</a></div>
                </li>
                <li>
                  <span className={styles.icono}><Icono nombre="correo" tamano={20} /></span>
                  <div><strong>Correo</strong><a href="mailto:contacto@airkon.example">contacto@airkon.example</a></div>
                </li>
                <li>
                  <span className={styles.icono}><Icono nombre="ubicacion" tamano={20} /></span>
                  <div><strong>Ubicación</strong><span>Monterrey, Nuevo León</span></div>
                </li>
                <li>
                  <span className={styles.icono}><Icono nombre="reloj" tamano={20} /></span>
                  <div><strong>Horario</strong><span>Lunes a sábado, 8:00 a 18:00</span></div>
                </li>
              </ul>
            </address>
          </section>

          <section className={styles.faq} aria-labelledby="titulo-faq">
            <h2 id="titulo-faq">Preguntas frecuentes</h2>
            {preguntas.map((item) => (
              <details key={item.p} className="tarjeta">
                <summary>{item.p}</summary>
                <p>{item.r}</p>
              </details>
            ))}
          </section>
        </aside>
      </div>
    </>
  );
}
