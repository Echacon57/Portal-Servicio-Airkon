import IlustracionEquipo from "../equipos/IlustracionEquipo";
import { moneda } from "../../utils/precios";
import styles from "./ResumenCompra.module.css";

/**
 * Resumen de costos del pedido. Se recalcula cada vez que cambia el formulario.
 *
 * @param {{ equipo: object, calculo: {lineas:{concepto:string, importe:number}[], subtotal:number, iva:number, total:number} }} props
 */
export default function ResumenCompra({ equipo, calculo }) {
  return (
    <aside className={`tarjeta ${styles.resumen}`} aria-labelledby="titulo-resumen">
      <h2 id="titulo-resumen">Resumen de tu pedido</h2>
      <div className={styles.equipo}>
        <span className={styles.imagen}>
          <IlustracionEquipo forma={equipo.forma} ancho={72} />
        </span>
        <div>
          <p className={styles.nombre}>{equipo.nombre}</p>
          <p className={styles.marca}>{equipo.marca} · {equipo.toneladas} TR</p>
        </div>
      </div>

      <table className={styles.tabla}>
        <caption className="solo-lector">Desglose de costos</caption>
        <thead className="solo-lector">
          <tr>
            <th scope="col">Concepto</th>
            <th scope="col">Importe</th>
          </tr>
        </thead>
        <tbody>
          {calculo.lineas.map((l) => (
            <tr key={l.concepto}>
              <th scope="row">{l.concepto}</th>
              <td>{moneda(l.importe)}</td>
            </tr>
          ))}
          <tr className={styles.separador}>
            <th scope="row">Subtotal</th>
            <td>{moneda(calculo.subtotal)}</td>
          </tr>
          <tr>
            <th scope="row">IVA (16 %)</th>
            <td>{moneda(calculo.iva)}</td>
          </tr>
        </tbody>
      </table>

      <div className={styles.total} aria-live="polite" aria-atomic="true">
        <span>Total</span>
        <strong>{moneda(calculo.total)}</strong>
      </div>
      <p className={styles.nota}>No se cobra nada en línea. Un asesor te llamará para confirmar el pedido y la forma de pago.</p>
    </aside>
  );
}
