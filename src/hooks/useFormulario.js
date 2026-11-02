import { useState } from "react";

/**
 * Hook reutilizable para formularios controlados con validación.
 * - valores: estado de cada campo
 * - errores: mensaje de error por campo (solo de los campos ya "tocados")
 * - manejarCambio (onChange): actualiza el valor y revalida si ya se tocó.
 *   Soporta texto, select, radio, checkbox simple (true/false) y grupos de
 *   checkbox cuyo valor inicial es un arreglo.
 * - manejarBlur (onBlur): marca el campo como tocado y lo valida
 * - asignar(campo, valor): para controles propios (contador, archivo...)
 * - validarCampos(lista): valida solo esos campos (útil en formularios por pasos)
 * - validarTodo(): valida todos los campos
 *
 * @param {object} valoresIniciales
 * @param {(valores: object) => object} validar  función que regresa { campo: "mensaje" }
 */
export function useFormulario(valoresIniciales, validar) {
  const [valores, setValores] = useState(valoresIniciales);
  const [tocados, setTocados] = useState({});
  const [errores, setErrores] = useState({});

  function revalidar(nuevosValores, nuevosTocados) {
    const todos = validar(nuevosValores);
    const visibles = {};
    for (const campo of Object.keys(todos)) {
      if (nuevosTocados[campo]) visibles[campo] = todos[campo];
    }
    setErrores(visibles);
  }

  function asignar(campo, valor) {
    const nuevos = { ...valores, [campo]: valor };
    setValores(nuevos);
    revalidar(nuevos, tocados);
  }

  function manejarCambio(evento) {
    const { name, value, type, checked } = evento.target;
    let nuevoValor = value;
    if (type === "checkbox") {
      if (Array.isArray(valores[name])) {
        nuevoValor = checked ? [...valores[name], value] : valores[name].filter((v) => v !== value);
      } else {
        nuevoValor = checked;
      }
    }
    asignar(name, nuevoValor);
  }

  function manejarBlur(evento) {
    const { name } = evento.target;
    if (!name) return;
    const nuevosTocados = { ...tocados, [name]: true };
    setTocados(nuevosTocados);
    revalidar(valores, nuevosTocados);
  }

  /** Valida solo los campos indicados y regresa sus errores. */
  function validarCampos(campos) {
    const todos = validar(valores);
    const nuevosTocados = { ...tocados };
    campos.forEach((c) => (nuevosTocados[c] = true));
    setTocados(nuevosTocados);
    revalidar(valores, nuevosTocados);
    return Object.fromEntries(Object.entries(todos).filter(([campo]) => campos.includes(campo)));
  }

  function validarTodo() {
    return validarCampos(Object.keys(valores));
  }

  function reiniciar(nuevos = valoresIniciales) {
    setValores(nuevos);
    setTocados({});
    setErrores({});
  }

  return { valores, errores, asignar, manejarCambio, manejarBlur, validarCampos, validarTodo, reiniciar };
}
