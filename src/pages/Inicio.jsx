import { useTituloPagina } from "../hooks/useTituloPagina";

export default function Inicio() {
  useTituloPagina("");
  return (
    <section className="contenedor">
      <h1>Soluciones integrales en climatización</h1>
    </section>
  );
}