import { HomePage } from './pages/home-page.js';
import { RoulettePage } from './pages/roulette-page.js';

// Elemento raiz da aplicação
const root = document.getElementById('root');
root.appendChild(HomePage());

// Configuração e gerenciamento das rotas
export const routes = {
  "/home": HomePage,
  "/roulette": RoulettePage,

  navigate(route) {
    window.history.pushState(null, null, route);
    root.innerHTML = "";
    const pageFunction = this[route];
    root.appendChild(pageFunction());
  },
};

// Listener para eventos de navegação
document.addEventListener("navigation", function (event) {
  const route = event.detail;
  routes.navigate(route);
})