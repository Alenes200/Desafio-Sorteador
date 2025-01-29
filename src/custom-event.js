export function dispararEvento(rota) {

  const evento = new CustomEvent("navegacao", { detail: rota });
  document.dispatchEvent(evento);
}