import EstadoBadge from "../ui/EstadoBadge";
import { buscarEquipo } from "../../data/equipos";
import { buscarPorId, metodosPago, tiposEquipo, ubicaciones } from "../../data/servicios";
import { calcularPedido, moneda } from "../../utils/precios";
import { fechaCorta, telefonoLegible } from "../../utils/formato";
import { describirEquipo, describirTipo, textoHorario } from "../../utils/registros";
import styles from "./DetalleRegistro.module.css";

/*
  Se usa dentro del modal de "Mis solicitudes".
 */
export default function DetalleRegistro({ registro: r }) {
  const comunes = [
    ["Estado", <EstadoBadge key="e" estado={r.estado} />],
    ["Tipo", describirTipo(r)],
    ["Equipo", describirEquipo(r)],
    [r.tipo === "compra" ? (r.instalar ? "Fecha de instalación" : "Fecha de entrega") : "Fecha de visita",
      <><time dateTime={r.fecha}>{fechaCorta(r.fecha)}</time>, {textoHorario(r.horario)}</>],
    ["Dirección", r.direccion],
    ["Contacto", `${r.nombre} · ${telefonoLegible(r.telefono)}`],
  ];

  let especificos = [];
  let desglose = null;

  if (r.tipo === "compra") {
    const equipo = buscarEquipo(r.equipoId);
    especificos = [
      ["Instalación", r.instalar ? buscarPorId(ubicaciones, r.ubicacion)?.nombre ?? "Sí" : "Solo entrega"],
      ["Retiro del equipo anterior", r.retiro ? "Sí" : "No"],
      ["Forma de pago", buscarPorId(metodosPago, r.metodoPago)?.nombre],
    ];
    if (equipo) desglose = calcularPedido({ equipo, ...r });
  } else {
    const tecnicos = [r.capacidad, r.refrigerante, r.antiguedad].filter((v) => v && v !== "No sé");
    if (r.modelo) tecnicos.push(`Modelo ${r.modelo}`);
    especificos = [
      ["Tipo de equipo", buscarPorId(tiposEquipo, r.tipoEquipo)?.nombre],
      ["Marca", r.marca],
      ["Ubicación", buscarPorId(ubicaciones, r.ubicacion)?.nombre],
      ["Datos técnicos", tecnicos.length ? tecnicos.join(" · ") : "No indicados"],
      ["Síntomas", r.sintomas?.length ? r.sintomas.join(", ") : "Ninguno marcado"],
      ["Descripción", r.detalles || "Sin descripción", true],
    ];
  }

  return (
    <>
      <dl className={styles.datos}>
        {[...comunes, ...especificos].map(([dato, valor, completo]) => (
          <div key={dato} className={completo ? styles.completo : undefined}>
            <dt>{dato}</dt>
            <dd>{valor}</dd>
          </div>
        ))}
      </dl>
      {desglose && (
        <table className={styles.desglose}>
          <caption>Desglose del pedido</caption>
          <tbody>
            {desglose.lineas.map((l) => (
              <tr key={l.concepto}>
                <th scope="row">{l.concepto}</th>
                <td>{moneda(l.importe)}</td>
              </tr>
            ))}
            <tr>
              <th scope="row">IVA (16 %)</th>
              <td>{moneda(desglose.iva)}</td>
            </tr>
            <tr className={styles.total}>
              <th scope="row">Total</th>
              <td>{moneda(desglose.total)}</td>
            </tr>
          </tbody>
        </table>
      )}
    </>
  );
}
