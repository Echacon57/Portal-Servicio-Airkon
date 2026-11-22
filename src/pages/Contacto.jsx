import { useState } from "react";
import { Link } from "react-router-dom";
import EncabezadoPagina from "../components/ui/EncabezadoPagina";
import PlacaDatos from "../components/ui/PlacaDatos";
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
        descripcion={
          <>
            Para cotizaciones, dudas o facturación. Si tu equipo falla, es más rápido{" "}
            <Link to="/solicitar">solicitar un servicio</Link>.
          </>
        }
        descripcionAlLado
      />

      <div className={`contenedor ${styles.contenido}`}>
        <section className={styles.formulario} aria-labelledby="titulo-form-contacto">
          <h2 id="titulo-form-contacto">Envíanos un mensaje</h2>
          <form onSubmit={enviar} noValidate className={styles.campos}>
            <ResumenErrores errores={intento > 0 ? errores : {}} etiquetas={etiquetas} intento={intento} />
            <div className={styles.dosColumnas}>
              <CampoFormulario id="nombre" etiqueta="Nombre" obligatorio autoComplete="name"
                value={valores.nombre} onChange={manejarCambio} onBlur={manejarBlur} error={errores.nombre} />
              <CampoFormulario id="correo" etiqueta="Correo electrónico" type="email" obligatorio autoComplete="email"
                value={valores.correo} onChange={manejarCambio} onBlur={manejarBlur} error={errores.correo} />
            </div>
            <div className={styles.asunto}>
              <CampoFormulario id="asunto" como="select" etiqueta="Asunto" obligatorio
                value={valores.asunto} onChange={manejarCambio} onBlur={manejarBlur} error={errores.asunto}>
                <option value="">Selecciona un asunto</option>
                <option>Cotización</option>
                <option>Duda sobre un servicio</option>
                <option>Facturación</option>
                <option>Otro</option>
              </CampoFormulario>
            </div>
            <CampoFormulario
              id="mensaje"
              como="textarea"
              etiqueta="Mensaje"
              obligatorio
              maxLength={800}
              placeholder="Cuéntanos qué necesitas. Si es una cotización, incluye el tipo de lugar y su tamaño."
              value={valores.mensaje}
              onChange={manejarCambio}
              onBlur={manejarBlur}
              error={errores.mensaje}
              extra={
                <p className="ayuda" aria-live="polite">
                  {valores.mensaje.length} de 800
                </p>
              }
            />
            <button type="submit" className="btn btn-acento">
              Enviar mensaje
            </button>
            <p role="status" className={enviado ? styles.exito : "solo-lector"}>
              {enviado && <Icono nombre="ok" tamano={20} />}
              {enviado}
            </p>
          </form>
        </section>

        <aside className={styles.lateral} aria-label="Datos de contacto">
          <PlacaDatos
            titulo="Datos de contacto"
            nivelTitulo="h2"
            encabezadoOscuro
            unaColumna
            datos={[
              {
                dato: "Teléfono",
                valor: (
                  <a href="tel:+528100000000" className={`expandido ${styles.telefono}`}>
                    (81) 0000 0000
                  </a>
                ),
              },
              { dato: "Correo", valor: <a href="mailto:contacto@airkon.example">contacto@airkon.example</a> },
              { dato: "Ubicación", valor: <address>Monterrey, Nuevo León</address> },
              { dato: "Horario", valor: "Lunes a sábado, de 8:00 a 18:00" },
            ]}
          />
        </aside>
      </div>

      <section className={styles.faq} aria-labelledby="titulo-faq">
        <div className="contenedor">
          <h2 id="titulo-faq">Preguntas frecuentes</h2>
          <div className={styles.preguntas}>
            {preguntas.map((item) => (
              <details key={item.p}>
                <summary>{item.p}</summary>
                <p>{item.r}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
