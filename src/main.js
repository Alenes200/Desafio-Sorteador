import { HomePage } from './pages/home-page.js';
import { RoulettePage } from './pages/roulette-page.js';

const root = document.getElementById('root');

root.appendChild(HomePage());

export const rotas = {
  "/home": HomePage,
  "/roulette": RoulettePage,

  navegar(rota) {
    window.history.pushState(null, null, rota);

    root.innerHTML = "";

    const funcaoDaPagina = this[rota];

    root.appendChild(funcaoDaPagina());

  },
};

document.addEventListener("navegacao", function (event) {
  const rota = event.detail;
  rotas.navegar(rota);
})

