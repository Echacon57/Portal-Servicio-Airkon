import { Link, useParams } from "react-router-dom";
import Icono from "../components/ui/Icono";
import EstadoBadge from "../components/ui/EstadoBadge";
import { useSolicitudes } from "../context/SolicitudesContext";
import { buscarPorId, metodosPago } from "../data/servicios";
import { fechaCorta } from "../utils/formato";
import { moneda } from "../utils/precios";
import { describirEquipo, describirTipo, textoHorario } from "../utils/registros";
import { useTituloPagina } from "../hooks/useTituloPagina";
import { enmascararCorreo } from "../utils/seguridad";
import styles from "./Mensaje.module.css";

/**
 Pantalla de éxito después de enviar una solicitud o un pedido: /solicitud-enviada/:folio
 */
export default function Confirmacion() {
  const { folio } = useParams();
  // Solo regresa el registro si se acaba de crear en esta pestaña o si es del
  // cliente verificado
  const { buscarPermitido } = useSolicitudes();
  const registro = buscarPermitido(folio);
  const esCompra = registro?.tipo === "compra";
  useTituloPagina(esCompra ? "Pedido recibido" : "Solicitud enviada");

  // Mismo mensaje exista o no el folio, para no revelar qué folios son reales
  if (!registro) {
    return (
      <section className={`contenedor ${styles.envoltura}`} aria-labelledby="titulo-protegido">
        <div className={`tarjeta ${styles.tarjeta}`}>
          <span className={`${styles.icono} ${styles.neutro}`}>
            <Icono nombre="escudo" tamano={32} />
          </span>
          <h1 id="titulo-protegido">Verifica tu correo para ver este folio</h1>
          <p className={styles.texto}>
            Por seguridad, los detalles de una solicitud o pedido solo se muestran a quien
            verifica el correo con el que se hizo.
          </p>
          <div className={styles.botones}>
            <Link to="/mis-solicitudes" className="btn btn-primario">Ir a Mis solicitudes</Link>
            <Link to="/" className="btn btn-secundario">Volver al inicio</Link>
          </div>
        </div>
      </section>
    );
  }

  const nombre = registro.nombre.split(" ")[0];
  const filas = [
    ["Equipo", describirEquipo(registro)],
    [esCompra ? "Tipo" : "Servicio", describirTipo(registro)],
    [
      esCompra ? (registro.instalar ? "Fecha de instalación" : "Fecha de entrega") : "Fecha preferida",
      <><time dateTime={registro.fecha}>{fechaCorta(registro.fecha)}</time>, {textoHorario(registro.horario)}</>,
    ],
    ...(esCompra
      ? [
          ["Forma de pago", buscarPorId(metodosPago, registro.metodoPago)?.nombre],
          ["Total con IVA", <strong key="t">{moneda(registro.total)}</strong>],
        ]
      : []),
    ["Estado", <EstadoBadge key="e" estado={registro.estado} />],
  ];

  return (
    <section className={`contenedor ${styles.envoltura}`} aria-labelledby="titulo-confirmacion">
      <div className={`tarjeta ${styles.tarjeta}`} role="status">
        <span className={`${styles.icono} ${styles.exito}`}>
          <Icono nombre="ok" tamano={36} />
        </span>
        <h1 id="titulo-confirmacion">{esCompra ? "¡Pedido recibido!" : "¡Solicitud enviada!"}</h1>
        <p className={styles.texto}>
          {esCompra
            ? `Gracias, ${nombre}. Un asesor te llamará para confirmar el pedido, la forma de pago y la fecha de ${registro.instalar ? "instalación" : "entrega"}.`
            : `Recibimos tu solicitud, ${nombre}. Te llamaremos para confirmar la fecha y el horario de la visita.`}
        </p>

        <div className={styles.folio}>
          <span>{esCompra ? "Tu folio de pedido" : "Tu folio"}</span>
          <strong>{registro.folio}</strong>
        </div>

        <dl className={styles.datos}>
          {filas.map(([dato, valor]) => (
            <div key={dato} className={styles.fila}>
              <dt>{dato}</dt>
              <dd>{valor}</dd>
            </div>
          ))}
        </dl>

        <p className={styles.nota}>
          Para consultar el avance después, entra a Mis solicitudes y verifica tu correo ({enmascararCorreo(registro.correo)}).
        </p>

        <div className={styles.botones}>
          <Link to="/mis-solicitudes" className="btn btn-primario">Ver mis solicitudes</Link>
          <Link to="/" className="btn btn-secundario">Volver al inicio</Link>
        </div>
      </div>
    </section>
  );
}
