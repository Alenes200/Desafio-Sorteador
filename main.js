import { paraRadianos, desenharRoleta, girar, animarRoleta } from './roulette.js';
import { fisherYatesShuffle } from './draw.js';
import { HomePage } from './home-page.js';
import { RoulettePage } from './roulette-page.js';


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

