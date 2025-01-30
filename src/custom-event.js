// Dispara evento customizado para navegação entre rotas
export function triggerEvent(route) {
  const event = new CustomEvent("navigation", { detail: route });
  document.dispatchEvent(event);
}