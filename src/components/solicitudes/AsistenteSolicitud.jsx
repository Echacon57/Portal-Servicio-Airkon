import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import BarraProgreso from "../ui/BarraProgreso";
import ResumenErrores from "../ui/ResumenErrores";
import Icono from "../ui/Icono";
import PasoServicio from "./pasos/PasoServicio";
import PasoEquipo from "./pasos/PasoEquipo";
import PasoDetalles, { conFalla, MAX_DETALLES } from "./pasos/PasoDetalles";
import PasoVisita from "./pasos/PasoVisita";
import PasoRevision from "./pasos/PasoRevision";
import { useFormulario } from "../../hooks/useFormulario";
import {
  validarContacto,
  validarDireccion,
  validarFechaFutura,
  requerido,
  limpiarErrores,
  soloDigitos,
} from "../../utils/validaciones";
import f from "../../styles/formulario.module.css";
import styles from "./AsistenteSolicitud.module.css";


const PASOS = [
  {
    id: "servicio",
    titulo: "Servicio",
    pregunta: "¿Qué necesitas?",
    descripcion: "Elige la opción que mejor describa lo que buscas.",
    campos: ["servicio"],
  },
  {
    id: "equipo",
    titulo: "Tu equipo",
    pregunta: "Cuéntanos de tu equipo",
    descripcion: "No necesitas conocer todos los datos: elige “No estoy seguro(a)” y nuestro técnico lo revisa en la visita.",
    campos: ["tipoEquipo", "marca", "ubicacion"],
  },
  {
    id: "detalles",
    titulo: "Detalles",
    pregunta: "¿Qué está pasando?",
    descripcion: "Mientras más nos cuentes, mejor preparamos la visita.",
    campos: ["sintomas", "detalles"],
  },
  {
    id: "visita",
    titulo: "Visita y contacto",
    pregunta: "¿Dónde y cuándo te visitamos?",
    descripcion: "Usaremos estos datos para confirmar la cita contigo.",
    campos: ["direccion", "fecha", "horario", "nombre", "telefono", "correo"],
  },
  {
    id: "revision",
    titulo: "Revisar y enviar",
    pregunta: "Revisa tu solicitud",
    descripcion: "Confirma que todo esté bien. Puedes editar cualquier sección.",
    campos: ["terminos"],
  },
];

const ETIQUETAS = {
  servicio: "Tipo de servicio",
  tipoEquipo: "Tipo de equipo",
  marca: "Marca",
  ubicacion: "Ubicación del equipo",
  sintomas: "Síntomas",
  detalles: "Descripción",
  direccion: "Dirección",
  fecha: "Fecha de visita",
  horario: "Horario",
  nombre: "Nombre completo",
  telefono: "Teléfono",
  correo: "Correo electrónico",
  terminos: "Aviso de privacidad",
};

export const VALORES_VACIOS = {
  servicio: "",
  tipoEquipo: "",
  marca: "",
  ubicacion: "",
  capacidad: "No estoy seguro(a)",
  refrigerante: "No estoy seguro(a)",
  antiguedad: "No estoy seguro(a)",
  modelo: "",
  equipoId: "",
  sintomas: [],
  detalles: "",
  direccion: "",
  fecha: "",
  horario: "",
  nombre: "",
  telefono: "",
  correo: "",
  empresa: "",
  terminos: false,
};

function validar(v) {
  const falla = conFalla(v.servicio);
  const largo = v.detalles.trim().length;
  return limpiarErrores({
    servicio: requerido(v.servicio, "Elige el tipo de servicio que necesitas."),
    tipoEquipo: requerido(v.tipoEquipo, "Elige el tipo de equipo o la opción “No estoy seguro(a)”."),
    marca: requerido(v.marca, "Elige la marca o la opción “No estoy seguro(a)”."),
    ubicacion: requerido(v.ubicacion, "Indica dónde está el equipo."),
    sintomas:
      falla && v.sintomas.length === 0 && largo < 10
        ? "Marca al menos un síntoma o describe el problema abajo."
        : "",
    detalles: largo > MAX_DETALLES ? `La descripción no puede pasar de ${MAX_DETALLES} caracteres.` : "",
    direccion: validarDireccion(v.direccion),
    fecha: validarFechaFutura(v.fecha),
    horario: requerido(v.horario, "Elige un horario."),
    ...validarContacto(v),
    terminos: v.terminos ? "" : "Debes aceptar el aviso de privacidad.",
  });
}

const CLAVE_BORRADOR = "airkon-borrador-servicio";

function leerBorrador() {
  try {
    const guardado = sessionStorage.getItem(CLAVE_BORRADOR);
    return guardado ? JSON.parse(guardado) : null;
  } catch {
    return null;
  }
}

/**
 * Asistente para solicitar un servicio en 5 pasos.
 *
 * Accesibilidad y usabilidad:
 * - Barra de progreso con porcentaje y lista de pasos (los completados se pueden revisitar).
 * - Al cambiar de paso, el foco va al encabezado del paso nuevo, así el lector
 *   de pantalla anuncia dónde está el usuario.
 * - "Siguiente" valida solo el paso actual; si hay errores, el resumen recibe el foco.
 * - "Anterior" regresa sin perder datos. Desde la revisión se puede editar un paso
 *   y volver directo a la revisión.
 * - El avance se guarda como borrador en sessionStorage por si se recarga la página.
 *
 * @param {{ valoresIniciales?: object, equipoCatalogo?: object, onEnviar: (datos: object) => void }} props
 */
export default function AsistenteSolicitud({ valoresIniciales, equipoCatalogo, onEnviar }) {
  // Si llegan datos por la URL (desde el catálogo) se usan; si no, se recupera el borrador
  const [inicio] = useState(() => {
    if (valoresIniciales) return { valores: { ...VALORES_VACIOS, ...valoresIniciales }, paso: 0, recuperado: false };
    const borrador = leerBorrador();
    if (borrador) return { valores: { ...VALORES_VACIOS, ...borrador.valores }, paso: borrador.paso, recuperado: true };
    return { valores: VALORES_VACIOS, paso: 0, recuperado: false };
  });

  const form = useFormulario(inicio.valores, validar);
  const [paso, setPaso] = useState(inicio.paso);
  const [recuperado, setRecuperado] = useState(inicio.recuperado);
  const [desdeRevision, setDesdeRevision] = useState(false);
  const [intento, setIntento] = useState(0);
  const [foto, setFoto] = useState(null);
  const [enviando, setEnviando] = useState(false);

  const refTitulo = useRef(null);
  const refContenedor = useRef(null);
  const primerRender = useRef(true);

  const actual = PASOS[paso];
  const esUltimo = paso === PASOS.length - 1;

  useEffect(() => {
    if (primerRender.current) {
      primerRender.current = false;
      return;
    }
    refContenedor.current?.scrollIntoView({ block: "start" });
    refTitulo.current?.focus({ preventScroll: true });
  }, [paso]);

  // Guardar el borrador en cada cambio (sin la foto, que no se puede serializar)
  useEffect(() => {
    try {
      sessionStorage.setItem(CLAVE_BORRADOR, JSON.stringify({ valores: { ...form.valores, terminos: false }, paso }));
    } catch {
    }
  }, [form.valores, paso]);

  function irA(indice) {
    setIntento(0);
    setPaso(indice);
  }

  /** Valida el paso actual; regresa true si no hay errores. */
  function pasoValido() {
    const encontrados = form.validarCampos(actual.campos);
    setIntento((n) => n + 1);
    return Object.keys(encontrados).length === 0;
  }

  function siguiente() {
    if (!pasoValido()) return;
    if (desdeRevision) {
      setDesdeRevision(false);
      irA(PASOS.length - 1);
    } else {
      irA(paso + 1);
    }
  }

  function anterior() {
    setDesdeRevision(false);
    irA(paso - 1);
  }

  function editarDesdeRevision(indice) {
    setDesdeRevision(true);
    irA(indice);
  }

  function empezarDeNuevo() {
    form.reiniciar(VALORES_VACIOS);
    setFoto(null);
    setRecuperado(false);
    setDesdeRevision(false);
    irA(0);
    try {
      sessionStorage.removeItem(CLAVE_BORRADOR);
    } catch {
    }
  }

  function manejarEnvio(evento) {
    evento.preventDefault();
    if (!esUltimo) {
      siguiente();
      return;
    }
    // En el último paso se valida todo, por si algún paso anterior quedó incompleto
    const encontrados = form.validarTodo();
    setIntento((n) => n + 1);
    if (Object.keys(encontrados).length > 0) {
      const pasoConError = PASOS.findIndex((p) => p.campos.some((c) => encontrados[c]));
      if (pasoConError !== -1 && pasoConError !== paso) irA(pasoConError);
      return;
    }

    setEnviando(true);
    setTimeout(() => {
      const { terminos, ...datos } = form.valores;
      try {
        sessionStorage.removeItem(CLAVE_BORRADOR);
      } catch {
      }
      onEnviar({
        ...datos,
        tipo: "servicio",
        detalles: datos.detalles.trim(),
        telefono: soloDigitos(datos.telefono),
        nombreFoto: foto?.nombre ?? "",
      });
    }, 600);
  }

  // Solo se muestran los errores de los campos del paso actual
  const erroresPaso = Object.fromEntries(
    Object.entries(form.errores).filter(([campo]) => actual.campos.includes(campo))
  );

  const pregunta =
    actual.id === "detalles" && !conFalla(form.valores.servicio) ? "Detalles adicionales" : actual.pregunta;

  return (
    <div className={styles.asistente} ref={refContenedor}>
      {recuperado && (
        <div className={styles.borrador} role="status">
          <p>
            <Icono nombre="portapapeles" tamano={20} />
            Recuperamos la solicitud que dejaste sin terminar.
          </p>
          <button type="button" className={f.enlaceSecundario} onClick={empezarDeNuevo}>
            Empezar de nuevo
          </button>
        </div>
      )}

      <div className={`tarjeta ${styles.tarjeta}`}>
        <BarraProgreso pasos={PASOS} actual={paso} onIrA={irA} />

        <form onSubmit={manejarEnvio} noValidate className={styles.formulario}>
          <section className={styles.paso} aria-labelledby="titulo-paso" aria-describedby="descripcion-paso">
            <header className={styles.encabezadoPaso}>
              <h2 id="titulo-paso" ref={refTitulo} tabIndex={-1}>
                {pregunta}
              </h2>
              <p id="descripcion-paso">{actual.descripcion}</p>
            </header>

            <ResumenErrores errores={intento > 0 ? erroresPaso : {}} etiquetas={ETIQUETAS} intento={intento} />

            {actual.id === "servicio" && <PasoServicio form={form} />}
            {actual.id === "equipo" && (
              <PasoEquipo form={form} foto={foto} onCambiarFoto={setFoto} equipoCatalogo={equipoCatalogo} />
            )}
            {actual.id === "detalles" && <PasoDetalles form={form} />}
            {actual.id === "visita" && <PasoVisita form={form} />}
            {actual.id === "revision" && <PasoRevision form={form} foto={foto} onEditar={editarDesdeRevision} />}
          </section>

          <div className={styles.navegacion}>
            {paso > 0 && !desdeRevision && (
              <button type="button" className="btn btn-secundario" onClick={anterior}>
                <Icono nombre="flechaIzq" tamano={20} />
                Anterior
              </button>
            )}
            {paso === 0 && (
              <Link to="/" className={f.enlaceSecundario}>
                Cancelar
              </Link>
            )}

            <button type="submit" className={`btn btn-primario ${styles.principal}`} disabled={enviando}>
              {esUltimo
                ? enviando
                  ? "Enviando..."
                  : "Enviar solicitud"
                : desdeRevision
                ? "Guardar y volver a revisar"
                : `Siguiente: ${PASOS[paso + 1].titulo}`}
              {!enviando && <Icono nombre={esUltimo ? "check" : "flecha"} tamano={20} />}
            </button>
          </div>
        </form>
      </div>

      <p className={styles.notaGuardado}>
        <Icono nombre="escudo" tamano={18} />
        Tu avance se guarda en este navegador mientras llenas la solicitud.
      </p>
    </div>
  );
}
