import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import CampoFormulario from "../ui/CampoFormulario";
import Icono from "../ui/Icono";
import { useSesion } from "../../context/SesionContext";
import { validarCorreo } from "../../utils/validaciones";
import { enmascararCorreo, normalizarCorreo, MINUTOS_ENLACE, SEGUNDOS_REENVIO } from "../../utils/seguridad";
import styles from "./AccesoSolicitudes.module.css";

/**
 Pantalla para verificar el correo antes de mostrar "Mis solicitudes".
 Es más una simulación de sistema real, solo simula el envío de un correo con un enlace de un solo uso.
 Paso 1: el cliente escribe su correo.
 Paso 2: se envía un enlace de un solo uso. El mensaje es siempre el mismo,
 exista o no el correo, para no revelar quién es cliente.    
 */
export default function AccesoSolicitudes() {
  const { solicitarEnlace } = useSesion();
  const [correo, setCorreo] = useState("");
  const [error, setError] = useState("");
  const [enviado, setEnviado] = useState(null); // { correo, token }
  const [espera, setEspera] = useState(0); // segundos para poder reenviar
  const refTitulo = useRef(null);

  // Cuenta regresiva del botón "Reenviar"
  useEffect(() => {
    if (espera <= 0) return;
    const id = setTimeout(() => setEspera((s) => s - 1), 1000);
    return () => clearTimeout(id);
  }, [espera]);

  // Al cambiar de pantalla, el foco va al nuevo encabezado
  useEffect(() => {
    if (enviado) refTitulo.current?.focus();
  }, [enviado]);

  function enviar(correoDestino) {
    const resultado = solicitarEnlace(correoDestino);
    if (!resultado.ok) {
      setError(resultado.motivo);
      return;
    }
    setError("");
    setEnviado({ correo: normalizarCorreo(correoDestino), token: resultado.token });
    setEspera(SEGUNDOS_REENVIO);
  }

  function manejarEnvio(evento) {
    evento.preventDefault();
    const mensaje = validarCorreo(correo);
    if (mensaje) {
      setError(mensaje);
      document.getElementById("correo-acceso")?.focus();
      return;
    }
    enviar(correo);
  }

  function usarOtroCorreo() {
    setEnviado(null);
    setError("");
    setTimeout(() => document.getElementById("correo-acceso")?.focus(), 0);
  }

  if (enviado) {
    return (
      <div className={styles.contenedor}>
        <section className={`tarjeta ${styles.tarjeta}`} aria-labelledby="titulo-enviado">
          <span className={styles.icono}>
            <Icono nombre="correo" tamano={28} />
          </span>
          <h2 id="titulo-enviado" ref={refTitulo} tabIndex={-1}>
            Revisa tu correo
          </h2>
          <p role="status">
            Si hay solicitudes o pedidos con <strong>{enmascararCorreo(enviado.correo)}</strong>, te enviamos un
            enlace para verlos. Vence en {MINUTOS_ENLACE} minutos y solo funciona una vez.
          </p>
          {error && (
            <p className="mensaje-error" role="alert">
              <Icono nombre="alerta" tamano={18} />
              <span>{error}</span>
            </p>
          )}
          <div className={styles.botones}>
            <button
              type="button"
              className="btn btn-secundario"
              disabled={espera > 0}
              onClick={() => enviar(enviado.correo)}
            >
              {espera > 0 ? `Reenviar enlace en ${espera} s` : "Reenviar enlace"}
            </button>
            <button type="button" className={styles.enlace} onClick={usarOtroCorreo}>
              Usar otro correo
            </button>
          </div>
        </section>

        {/* Lo que llegaría al correo del cliente. Solo existe por ser una simulación. */}
        <section className={styles.bandeja} aria-labelledby="titulo-bandeja">
          <p className={styles.etiquetaDemo}>
            <Icono nombre="ayuda" tamano={18} />
            Simulación: así se vería el correo que recibirías
          </p>
          <article className={`tarjeta ${styles.correo}`}>
            <header>
              <p><strong>De:</strong> Airkon Portal de Servicio</p>
              <p><strong>Para:</strong> {enviado.correo}</p>
              <h3 id="titulo-bandeja">Tu enlace para ver tus solicitudes</h3>
            </header>
            <p>Usa este botón para entrar a “Mis solicitudes”. Si no lo pediste, ignora este correo.</p>
            <Link to={`/verificar?token=${enviado.token}`} className="btn btn-primario">
              Ver mis solicitudes
            </Link>
          </article>
        </section>
      </div>
    );
  }

  return (
    <div className={styles.contenedor}>
      <section className={`tarjeta ${styles.tarjeta}`} aria-labelledby="titulo-acceso">
        <span className={styles.icono}>
          <Icono nombre="escudo" tamano={28} />
        </span>
        <h2 id="titulo-acceso">Verifica tu correo para continuar</h2>
        <p>
          Usa el correo que escribiste al hacer la solicitud y te
          enviaremos un enlace de acceso; no necesitas contraseña.
        </p>
        <form onSubmit={manejarEnvio} noValidate className={styles.formulario}>
          <CampoFormulario
            id="correo-acceso"
            name="correo"
            etiqueta="Correo electrónico"
            type="email"
            obligatorio
            autoComplete="email"
            placeholder="nombre@correo.com"
            value={correo}
            onChange={(e) => {
              setCorreo(e.target.value);
              if (error) setError("");
            }}
            error={error}
          />
          <button type="submit" className="btn btn-primario">
            Enviarme el enlace <Icono nombre="flecha" tamano={20} />
          </button>
        </form>
      </section>

      <aside className={styles.demo} aria-label="Datos para probar">
        <p className={styles.etiquetaDemo}>
          <Icono nombre="ayuda" tamano={18} />
          Modo demostración
        </p>
        <p>
          Usa <strong>maria@correo.com</strong> para ver los registros de ejemplo, o el correo que pusiste al hacer
          una solicitud o un pedido.
        </p>
      </aside>
    </div>
  );
}
