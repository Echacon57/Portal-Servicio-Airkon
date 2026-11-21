import { Link, useParams } from "react-router-dom";
import EtiquetaServicio from "../components/ui/EtiquetaServicio";
import PantallaMensaje from "../components/ui/PantallaMensaje";
import { EtiquetasBloqueadas } from "../components/ui/IlustracionesEtiqueta";
import { useSolicitudes } from "../context/SolicitudesContext";
import { datosEtiqueta } from "../utils/registros";
import { enmascararCorreo } from "../utils/seguridad";
import { useTituloPagina } from "../hooks/useTituloPagina";
import styles from "./Confirmacion.module.css";

const siguientesPasos = {
  servicio: [
    { titulo: "Te llamamos", texto: "Confirmamos contigo el día y el horario. El folio pasa a “En proceso”." },
    { titulo: "Llega el técnico", texto: "Ten a la mano el acceso al equipo, sobre todo si está en altura." },
    { titulo: "Se cierra el folio", texto: "Queda como “Completada” en tu historial de Mis solicitudes." },
  ],
  compra: [
    { titulo: "Te llamamos", texto: "Confirmamos el pedido, la forma de pago y la fecha de entrega." },
    { titulo: "Entregamos el equipo", texto: "Si incluiste instalación, el técnico lo deja funcionando y probado." },
    { titulo: "Se cierra el folio", texto: "Queda como “Completada” en tu historial de Mis solicitudes." },
  ],
};

/* Pantalla de éxito después de enviar una solicitud o un pedido: /solicitud-enviada/:folio */
export default function Confirmacion() {
  const { folio } = useParams();
  // Solo regresa el registro si se acaba de crear en esta pestaña o si es del
  // cliente verificado. Así nadie ve datos ajenos escribiendo un folio en la URL.
  const { buscarPermitido } = useSolicitudes();
  const registro = buscarPermitido(folio);
  const esCompra = registro?.tipo === "compra";
  useTituloPagina(registro ? (esCompra ? "Pedido recibido" : "Solicitud enviada") : "Verifica tu correo");

  if (!registro) {
    return (
      <PantallaMensaje
        titulo="Verifica tu correo para ver este folio"
        texto={
          <p>
            Por la seguridad de nuestros clientes, los detalles de una solicitud o pedido solo se muestran a quien
            verifica el correo con el que se hizo.
          </p>
        }
        ilustracion={<EtiquetasBloqueadas />}
      >
        <Link to="/mis-solicitudes" className="btn btn-acento">
          Ir a Mis solicitudes
        </Link>
        <Link to="/" className="btn btn-secundario">
          Volver al inicio
        </Link>
      </PantallaMensaje>
    );
  }

  const pasos = siguientesPasos[registro.tipo];

  return (
    <>
      <section className={`oscuro ${styles.hero}`} aria-labelledby="titulo-confirmacion">
        <div className={`contenedor ${styles.rejilla}`}>
          <div className={styles.textos} role="status">
            <p className={styles.recibido}>
              <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true" focusable="false">
                <rect width="20" height="20" fill="var(--amarillo)" />
                <path d="M5 10.5l3 3 7-7" fill="none" stroke="var(--azul-marino)" strokeWidth="2.4" />
              </svg>
              {esCompra ? "Recibimos tu pedido" : "Recibimos tu solicitud"}
            </p>
            <h1 id="titulo-confirmacion">Este es tu folio.</h1>
            <p className={styles.bajada}>
              {esCompra
                ? "Un asesor te llamará para confirmar el pedido, la forma de pago y la fecha de entrega."
                : "Te llamaremos para confirmar la fecha y el horario de la visita."}{" "}
              También enviamos el folio a <strong>{enmascararCorreo(registro.correo)}</strong>.
            </p>
            <div className={styles.botones}>
              <Link to="/mis-solicitudes" className="btn btn-acento btn-grande">
                Ver mis solicitudes
              </Link>
              <Link to="/" className="btn btn-contorno btn-grande">
                Volver al inicio
              </Link>
            </div>
          </div>
          <div className={styles.figura}>
            <EtiquetaServicio {...datosEtiqueta(registro)} colgante />
          </div>
        </div>
      </section>

      <section className={styles.sigue} aria-labelledby="titulo-sigue">
        <div className="contenedor">
          <h2 id="titulo-sigue">Lo que sigue</h2>
          <ol role="list" className={styles.pasos}>
            {pasos.map((p, i) => (
              <li key={p.titulo}>
                <span className={`expandido ${styles.numero}`} aria-hidden="true">
                  {i + 1}
                </span>
                <h3>
                  <span className="solo-lector">Paso {i + 1}: </span>
                  {p.titulo}
                </h3>
                <p>{p.texto}</p>
              </li>
            ))}
          </ol>
          <p className={styles.cambios}>
            ¿Necesitas cambiar algo? Llama al <a href="tel:+528100000000">(81) 0000 0000</a> y ten tu folio a la mano.
          </p>
        </div>
      </section>
    </>
  );
}
