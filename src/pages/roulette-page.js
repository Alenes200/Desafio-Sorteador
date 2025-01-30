import { dispararEvento } from "../custom-event.js";
import { paraRadianos, desenharRoleta, girar, animarRoleta } from '../utils/roulette.js'
import { sortearNomeAPI } from '../utils/api-draw.js';

export function RoulettePage() {
  const div = document.createElement('div');

  div.innerHTML = `
    <header class="page-header">
        <div class="nav-container">
          <h1 class="nav-title">Sorteador Alpha</h1>
          <nav class="page-nav">
            <ul class="nav-list">
              <li class="nav-item"><a href="#home" class="nav-link">Home</a></li>
              <li class="nav-item"><a href="#about" class="nav-link">About</a></li>
              <li class="nav-item"><a href="#contact" class="nav-link">Contact</a></li>
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
        </div>
    </main>
    <footer class="page-footer">
        <p class="footer-text">@Alpha Edtech 2025</p>
    </footer>
  `;

  // Elementos do DOM
  const canvas = div.querySelector("#canvas");
  const ctx = canvas.getContext("2d");
  const resultadoElement = div.querySelector("#resultado");
  const buttonHome = div.querySelector(".button-home");
  const historyList = div.querySelector("#history-list");
  // Configurações do canvas
  const largura = canvas.width;
  const altura = canvas.height;
  const centroX = largura / 2;
  const centroY = altura / 2;
  const raio = largura / 2;

  let grausAtuais = 0;

  let nomesParaRemover = []; // Array temporário para armazenar nomes que devem ser removidos

  // Recuperar nomes do localStorage
  let namesArray = JSON.parse(localStorage.getItem("names")) || [];
  let angulosItens = desenharRoleta(ctx, namesArray, largura, altura, centroX, centroY, raio);

  // Evento de girar a roleta
  div.querySelector("#girar").addEventListener("click", async () => {
    const botaoGirar = div.querySelector("#girar"); // Seleciona o botão

    // Desabilita o botão
    botaoGirar.disabled = true;
    botaoGirar.textContent = "Girando..."; // Opcional: muda o texto do botão

    try {
      // Verifica se o array tem apenas um elemento
      if (namesArray.length === 1) {
        alert("Adicione mais nomes para sortear.");
        namesArray = [];
        localStorage.setItem("names", JSON.stringify(namesArray));
        dispararEvento("/home");
        return;
      }

      // Redesenha a roleta antes de girar (remove os nomes marcados)
      if (nomesParaRemover.length > 0) {
        namesArray = namesArray.filter(nome => !nomesParaRemover.includes(nome));
        localStorage.setItem("names", JSON.stringify(namesArray));
        angulosItens = desenharRoleta(ctx, namesArray, largura, altura, centroX, centroY, raio);
        nomesParaRemover = []; // Limpa o array temporário
      }

      // Chama a API para sortear um nome
      const nomeEscolhido = await sortearNomeAPI(namesArray);

      if (!nomeEscolhido) {
        return; // Se houver erro, interrompe a execução
      }

      const { alvoRotacao } = girar(nomeEscolhido, angulosItens);

      const resultado = await animarRoleta(
        ctx, namesArray, angulosItens, largura, altura, centroX, centroY,
        grausAtuais, alvoRotacao, nomeEscolhido
      );

      grausAtuais = resultado.novoGrausAtuais;

      // Marca o nome sorteado para remoção (não remove ainda)
      nomesParaRemover.push(resultado.nomeEscolhido);

      // Atualiza elementos na tela
      resultadoElement.innerText = `Nome sorteado: ${resultado.nomeEscolhido}`;
      saveHistory(resultado.nomeEscolhido);
    } catch (error) {
      console.error("Erro durante o sorteio:", error);
      alert("Ocorreu um erro durante o sorteio. Tente novamente.");
    } finally {
      // Reabilita o botão, independentemente de sucesso ou erro
      botaoGirar.disabled = false;
      botaoGirar.textContent = "Girar"; // Restaura o texto original
    }
  });

  // Evento de voltar para home (na setinha)
  buttonHome.addEventListener("click", () => {
    dispararEvento("/home");
  });

  div.querySelector("#reset").addEventListener("click", function () {
    // Limpa o localStorage
    localStorage.removeItem("names");
    localStorage.removeItem("sorteioHistory");

    // Limpa as variáveis
    namesArray = [];

    // Log de confirmação
    alert("Dados resetados com sucesso");

    // Opcional: Atualiza a interface se necessário
    dispararEvento("/home");
  });

  function saveHistory(nome) {
    let history = JSON.parse(localStorage.getItem("sorteioHistory")) || [];
    history.push(nome);
    localStorage.setItem("sorteioHistory", JSON.stringify(history));
    renderHistory()
  }
  function renderHistory() {
    historyList.innerHTML = "";
    let history = JSON.parse(localStorage.getItem("sorteioHistory")) || [];
    history.forEach(nome => {
      const li = document.createElement("li");
      li.textContent = nome;
      historyList.appendChild(li);
    });
  }

  renderHistory()
  return div;
}