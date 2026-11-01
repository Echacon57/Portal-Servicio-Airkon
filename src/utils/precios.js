import { CARGO_RETIRO, IVA, buscarPorId, ubicaciones } from "../data/servicios";

const formato = new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN", maximumFractionDigits: 0 });

/** 14990 -> "$14,990" */
export function moneda(cantidad) {
  return formato.format(cantidad);
}

/**
 * Calcular el desglose de un pedido.
 * @param {{ equipo: object, cantidad: number, instalar: boolean, ubicacion: string, retiro: boolean }} pedido
 * @returns {{ lineas: {concepto:string, importe:number}[], subtotal:number, iva:number, total:number }}
 */
export function calcularPedido({ equipo, cantidad, instalar, ubicacion, retiro }) {
  const n = Math.max(1, Number(cantidad) || 1);
  const lineas = [{ concepto: `${equipo.nombre} × ${n}`, importe: equipo.precio * n }];

  if (instalar && equipo.precioInstalacion) {
    lineas.push({ concepto: `Instalación estándar × ${n}`, importe: equipo.precioInstalacion * n });
    const ubic = buscarPorId(ubicaciones, ubicacion);
    if (ubic && ubic.extra > 0) {
      lineas.push({ concepto: `Cargo por ubicación (${ubic.nombre.toLowerCase()}) × ${n}`, importe: ubic.extra * n });
    }
    if (retiro) {
      lineas.push({ concepto: `Retiro del equipo anterior × ${n}`, importe: CARGO_RETIRO * n });
    }
  }

  const subtotal = lineas.reduce((suma, l) => suma + l.importe, 0);
  const iva = Math.round(subtotal * IVA);
  return { lineas, subtotal, iva, total: subtotal + iva };
}
