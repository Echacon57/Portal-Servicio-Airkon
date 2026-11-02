import { useId, useState } from "react";
import Icono from "../ui/Icono";
import styles from "./CampoFoto.module.css";

const TAMANO_MAXIMO = 5 * 1024 * 1024; // 5 MB

/**
 * Campo opcional para subir una foto del equipo o de su etiqueta.
 * Muestra una vista previa. 
 * en esta versión solo se guarda su nombre.
 *
 * @param {{ foto: {url:string, nombre:string}|null, onCambiar: (foto: {url:string, nombre:string}|null) => void }} props
 */
export default function CampoFoto({ foto, onCambiar }) {
  const id = useId();
  const [error, setError] = useState("");

  function manejarArchivo(evento) {
    const archivo = evento.target.files?.[0];
    if (!archivo) return;
    if (!archivo.type.startsWith("image/")) {
      setError("El archivo debe ser una imagen (JPG, PNG o HEIC).");
      evento.target.value = "";
      return;
    }
    if (archivo.size > TAMANO_MAXIMO) {
      setError("La imagen pesa más de 5 MB. Elige una más ligera.");
      evento.target.value = "";
      return;
    }
    setError("");
    if (foto) URL.revokeObjectURL(foto.url); // libera la vista previa anterior
    onCambiar({ url: URL.createObjectURL(archivo), nombre: archivo.name });
  }

  function quitar() {
    if (foto) URL.revokeObjectURL(foto.url);
    onCambiar(null);
  }

  return (
    <div className={styles.campo}>
      <span className="etiqueta" id={`${id}-titulo`}>
        Foto del equipo o de su etiqueta <span className="opcional">(opcional)</span>
      </span>
      {foto ? (
        <div className={styles.vista}>
          <img src={foto.url} alt={`Vista previa de ${foto.nombre}`} />
          <div className={styles.datos}>
            <p>{foto.nombre}</p>
            <button type="button" className="btn btn-secundario btn-chico" onClick={quitar}>
              Quitar foto
            </button>
          </div>
        </div>
      ) : (
        <label className={styles.zona} htmlFor={id}>
          <Icono nombre="camara" tamano={28} />
          <span>
            <strong>Elegir foto</strong>
            <span className={styles.subtexto}>JPG o PNG, máximo 5 MB</span>
          </span>
        </label>
      )}
      <input
        id={id}
        type="file"
        accept="image/*"
        className="solo-lector"
        onChange={manejarArchivo}
        aria-describedby={`${id}-ayuda${error ? ` ${id}-error` : ""}`}
        aria-invalid={error ? "true" : undefined}
      />
      {error && (
        <p id={`${id}-error`} className="mensaje-error">
          <Icono nombre="alerta" tamano={18} />
          <span>{error}</span>
        </p>
      )}
      <p id={`${id}-ayuda`} className="ayuda">
        La etiqueta suele estar a un costado de la unidad e indica modelo, capacidad y refrigerante.
      </p>
    </div>
  );
}
