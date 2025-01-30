import { triggerEvent } from "../custom-event.js";
import { toRadians, drawRouletteWheel, spin, animateWheel } from '../utils/roulette.js'
import { drawNameAPI } from '../utils/api-draw.js';

export function RoulettePage() {
  const div = document.createElement('div');

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
        <div class="page-container">
            <div class="button-home">
                <img width="24" height="24" src="https://img.icons8.com/material-rounded/96/back--v1.png" alt="Voltar"/>
            </div>
            <div class="wheel-container">
                <canvas id="canvas" class="canva" width="500" height="500"></canvas>
                <div class="pointer"></div>
            </div>

            <div class="button-container">
                <button class="page-button sortear" id="girar">Sortear</button>
                <button class="page-button sortear" id="reset">Resetar</button>
            </div>
            <div class="container">
                <p id="resultado">Clique no botão para sortear um nome</p>
                <div class="winner-container">
                    <div class="winner-header">
                      <h2 class="winner-title">Historico</h2>
                    </div>
                    <div class="winner-box">
                          <ol class="winner-name" id="history-list">
                          </ol>
                    </div>
                </div>
            </div>
          <div id="divModal" class="modal" style="display: none;">
            <div class="modal-content">
              <span class="close">❌</span>
              <h2>🎉 Campeão 🎉</h2>
              <p id="nameChampion"></p>
            </div>
          </div>
        </div>
    </main>
    <footer class="page-footer">
        <p class="footer-text">@Alpha Edtech 2025</p>
    </footer>
  `;

  // Elementos do DOM principais
  const modal = div.querySelector("#divModal");
  const nameChampion = div.querySelector("#nameChampion");
  const spanClose = div.querySelector(".close");

  const canvas = div.querySelector("#canvas");
  const ctx = canvas.getContext("2d");
  const resultText = div.querySelector("#resultado");
  const buttonHome = div.querySelector(".button-home");
  const historyList = div.querySelector("#history-list");

  // Configurações e dimensões do canvas
  const width = canvas.width;
  const height = canvas.height;
  const centerX = width / 2;
  const centerY = height / 2;
  const radius = width / 2;

  let currentDegrees = 0;

  // Array para controle de nomes que serão removidos após o sorteio
  let namesToRemove = [];

  // Inicialização: recupera nomes do localStorage
  let namesArray = JSON.parse(localStorage.getItem("names")) || [];
  let sectorAngles = drawRouletteWheel(ctx, namesArray, width, height, centerX, centerY, radius);

  // Handler principal do sorteio
  div.querySelector("#girar").addEventListener("click", async () => {
    const spinButton = div.querySelector("#girar");
    spinButton.disabled = true;
    spinButton.textContent = "Girando...";

    try {
      // Validação de quantidade mínima de nomes
      if (namesArray.length === 1) {
        alert("Adicione mais nomes para sortear.");
        namesArray = [];
        localStorage.setItem("names", JSON.stringify(namesArray));
        triggerEvent("/home");
        return;
      }

      // Atualização da roleta removendo nomes já sorteados
      if (namesToRemove.length > 0) {
        namesArray = namesArray.filter(name => !namesToRemove.includes(name));
        localStorage.setItem("names", JSON.stringify(namesArray));
        sectorAngles = drawRouletteWheel(ctx, namesArray, width, height, centerX, centerY, radius);
        namesToRemove = [];
      }

      // Processo de sorteio e animação
      const selectedName = await drawNameAPI(namesArray);
      if (!selectedName) return;

      const { rotationTarget } = spin(selectedName, sectorAngles);

      const result = await animateWheel(
        ctx, namesArray, sectorAngles, width, height, centerX, centerY,
        currentDegrees, rotationTarget, selectedName
      );

      currentDegrees = result.newCurrentDegrees;
      namesToRemove.push(result.selectedName);

      // Atualização da interface com resultado
      resultText.innerText = `Nome sorteado: ${result.selectedName}`;
      saveHistory(result.selectedName);
      openModal(resultado.nomeEscolhido); // Abre o modal com o nome do campeão

    } catch (error) {
      console.error("Erro durante o sorteio:", error);
      alert("Ocorreu um erro durante o sorteio. Tente novamente.");
    } finally {
      spinButton.disabled = false;
      spinButton.textContent = "Girar";
    }
  });

  // Eventos auxiliares
  buttonHome.addEventListener("click", () => {
    triggerEvent("/home");
  });

  // Apagar todos os dados
  div.querySelector("#reset").addEventListener("click", function () {
    localStorage.removeItem("names");
    localStorage.removeItem("sorteioHistory");
    namesArray = [];
    alert("Dados deletados com sucesso");
    triggerEvent("/home");
  });

  // Funções de gerenciamento do histórico
  function saveHistory(name) {
    let history = JSON.parse(localStorage.getItem("sorteioHistory")) || [];
    history.push(name);
    localStorage.setItem("sorteioHistory", JSON.stringify(history));
    renderHistory()
  }

  function renderHistory() {
    historyList.innerHTML = "";
    let history = JSON.parse(localStorage.getItem("sorteioHistory")) || [];
    history.forEach(name => {
      const li = document.createElement("li");
      li.textContent = name;
      historyList.appendChild(li);
    });
  }

    // Função para abrir o modal
    function openModal(nome) {
      nameChampion.innerText = nome;
      modal.style.display = "block";
    }
  
    // Fecha o modal ao clicar no botão de fechar
    spanClose.addEventListener("click", (event) => {
      event.stopPropagation(); // Impede a propagação do evento
      modal.style.display = "none";
    });
  
    // Fecha o modal ao clicar fora dele
    window.addEventListener("click", (event) => {
      if (event.target === modal) {
        modal.style.display = "none";
      }
    });

  // Renderização inicial do histórico
  renderHistory()
  return div;
}