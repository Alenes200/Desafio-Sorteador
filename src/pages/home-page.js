import { dispararEvento } from "../custom-event.js";

export function HomePage() {
  const div = document.createElement("div");

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
      <button class="page-button sortear">Adicionar</button>
      <button class="page-button roleta">Roleta</button>
      <p id="list" class="page-list"></p>
      </div>
      </div>
      </div>
  `;

  const textarea = div.querySelector(".textarea-custom");
  const addButton = div.querySelector(".sortear");
  const listDisplay = div.querySelector("#list");

  // Recupera os nomes do localStorage
  let namesArray = JSON.parse(localStorage.getItem("names")) || [];

  function atualizarLista() {
    listDisplay.innerHTML = namesArray.length > 0 ? namesArray.join(", ") : "Nenhum nome adicionado.";
  }

  addButton.addEventListener("click", function () {
    const inputValue = textarea.value.trim();

    if (!inputValue) {
      alert("Por favor, insira ao menos um nome ou número.");
      return;
    }

    const separatedNames = inputValue.split(",").map(name => name.trim()).filter(name => name);
    let repetidos = [];

    separatedNames.forEach(name => {
      if (namesArray.includes(name)) {
        repetidos.push(name);
      } else {
        namesArray.push(name);
      }
    });

    if (repetidos.length > 0) {
      alert(`Os seguintes nomes já estão na lista: ${repetidos.join(", ")}`);
    }

    // Salva no localStorage
    localStorage.setItem("names", JSON.stringify(namesArray));

    // Atualiza a lista exibida
    atualizarLista();

    // Limpa o campo de entrada
    textarea.value = "";
  });

  // Atualiza a lista ao carregar a página
  atualizarLista();

  div.querySelector(".roleta").addEventListener("click", function () {
    dispararEvento("/roulette");
  });

  return div;
}
