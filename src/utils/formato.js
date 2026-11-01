const MESES = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"];

export function fechaCorta(iso) {
  if (!iso) return "";
  const [a, m, d] = iso.split("-");
  return `${Number(d)} ${MESES[Number(m) - 1]} ${a}`;
}

export function telefonoLegible(tel) {
  const d = tel.replace(/\D/g, "");
  return d.length === 10 ? `${d.slice(0, 2)} ${d.slice(2, 6)} ${d.slice(6)}` : tel;
}
