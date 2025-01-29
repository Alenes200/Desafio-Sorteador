import { paraRadianos, desenharRoleta, girar, animarRoleta } from './utils/roulette.js'
import { fisherYatesShuffle } from './utils/draw.js';
import { HomePage } from './pages/home-page.js';
import { RoulettePage } from './pages/roulette-page.js';

console.log("Estou na main.js")


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

