import { triggerEvent } from "../custom-event.js";

export function HomePage() {
  const div = document.createElement("div");

  div.innerHTML = `
  <header class="page-header">
    <div class="nav-container">
      <h1 class="nav-title">Sorteador Alpha</h1>
      <nav class="page-nav">
        <ul class="nav-list">
          <li class="nav-item"><a href="#home" class="nav-link">Inicio</a></li>
          <li class="nav-item"><a href="#about" class="nav-link">Somos</a></li>
          <li class="nav-item"><a href="#contact" class="nav-link">Contato</a></li>
        </ul>
      </nav>
    </div>
  </header>
  <main>
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
          <textarea class="textarea-custom" placeholder="Digite os nomes aqui... (adicione um por vez ou separados por vírgula)"></textarea>
          <div class="buttons-container">
            <button class="page-button add">Adicionar</button>
          </div>
          <p class="names-list" id="list"></p>
           <button class="page-button roulette">Ir para Roleta</button>
        </div>
      </div>
    </div>
  </main>
  <footer class="page-footer">
    <p class="footer-text">@Alpha Edtech 2025</p>
  </footer>
  `;

  const textarea = div.querySelector(".textarea-custom");
  const addButton = div.querySelector(".add");
  const listDisplay = div.querySelector("#list");

  // Recupera os nomes do localStorage
  let namesArray = JSON.parse(localStorage.getItem("names")) || [];

  function updateList() {
    if (namesArray.length > 0) {
      listDisplay.innerHTML = `Nomes adicionados: ${namesArray.join(", ")}`;
    } else {
      listDisplay.innerHTML = "Nenhum nome adicionado.";
    }
  }

  addButton.addEventListener("click", function () {
    const inputValue = textarea.value.trim();

    if (!inputValue) {
      alert("Por favor, insira ao menos um nome ou número.");
      return;
    }

    const separatedNames = inputValue.split(",").map(name => name.trim()).filter(name => name);
    let duplicate = [];

    separatedNames.forEach(name => {
      if (namesArray.includes(name)) {
        duplicate.push(name);
      } else {
        namesArray.push(name);
      }
    });

    if (duplicate.length > 0) {
      alert(`Os seguintes nomes já estão na lista: ${duplicate.join(", ")}`);
    }

    // Salva no localStorage
    localStorage.setItem("names", JSON.stringify(namesArray));

    // Atualiza a lista exibida
    updateList();

    // Limpa o campo de entrada
    textarea.value = "";
  });

  div.querySelector(".roulette").addEventListener("click", function () {
    // Verifica se o array tem menos de dois nomes
    if (namesArray.length < 2) {
      alert("É necessário ter pelo menos dois nomes para ir para a roleta."); // Exibe um alerta
      return; // Sai da função se a condição for atendida
    }

    triggerEvent("/roulette"); // Dispara o evento para ir à roleta
  });

  // Atualiza a lista ao carregar a página
  updateList();

  return div;
}