import { dispararEvento } from "./custom-event.js";


export function HomePage() {
  const div = document.createElement('div');

  div.innerHTML = `
      <div class="container-main">
      <div class="main-content">
      <div class="page-central">
      <div class="page-card-title">
      <div class="page-title">Sorteador Alpha</div>
      </div>
      <div class="page-text">
        Carregue sua lista de nomes e realize sorteios de maneira ágil e imparcial.
        Ideal para eventos, atividades em grupo, promoções, concursos e muito mais.
        Venha conferir!
      </div>
      <div class="page-name-label">Digite os nomes:</div>
      <textarea class="textarea-custom" placeholder="Digite os nomes aqui..."></textarea>
      <button class="page-button sortear">Sortear</button>
      </div>
      </div>
      </div>
  `;
  div.querySelector(".sortear").addEventListener("click", function () {
    dispararEvento("/roulette");
  });

  return div
}