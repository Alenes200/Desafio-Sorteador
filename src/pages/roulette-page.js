import { dispararEvento } from "../custom-event.js";
import { paraRadianos, desenharRoleta, girar, animarRoleta } from '../utils/roulette.js'
import { fisherYatesShuffle } from '../utils/draw.js';

export function RoulettePage() {
  const div = document.createElement('div');

  div.innerHTML = `
    <section id="form">
    <input type="text" id="input-names" placeholder="Digite nomes separados por vírgula">
    <button id="add">Adicionar</button>
    <button id="girar" class="start-button">Sortear</button>
    <button id="reset">Resetar</button>
    <p id="validation-message" style="display: none; color: red;">Por favor, insira ao menos um nome ou número.</p>

    <!-- Exibição do vencedor -->
    <section id="result">
    <h2>Vencedor:</h2>
    <p id="resultado">Nenhum sorteio realizado ainda.</p>
    </section>

    <!-- Estrutura da roleta -->
    <section id="roulette">
    <div class="wheel-container">
    <canvas id="canvas" width="500" height="500"></canvas>
    <div class="pointer"></div>
    </section>

    <!-- Histórico (Opcional) -->
    <section id="history">
    <h2>Histórico de Sorteios</h2>
    <ul id="history-list"></ul>
    </section>
  `;

  // Use div.querySelector ao invés de document.getElementById
  const inputNames = div.querySelector("#input-names");
  const addButton = div.querySelector("#add");
  const canvas = div.querySelector("#canvas");
  const ctx = canvas.getContext("2d");

  const largura = canvas.width;
  const altura = canvas.height;
  const centroX = largura / 2;
  const centroY = altura / 2;
  const raio = largura / 2;



  let grausAtuais = 0;

  let namesArray = JSON.parse(localStorage.getItem("names")) || [];
  let angulosItens = desenharRoleta(ctx, namesArray, largura, altura, centroX, centroY, raio);

  addButton.addEventListener("click", function () {
    const inputValue = inputNames.value.trim();

    if (!inputValue) {
      alert("Por favor, insira ao menos um nome ou número.");
      return;
    }

    const separatedNames = inputValue.split(",").map(name => name.trim());

    separatedNames.forEach(function (name) {
      if (name) namesArray.push(name);
    });

    inputNames.value = "";
    angulosItens = desenharRoleta(ctx, namesArray, largura, altura, centroX, centroY, raio);
    console.log(namesArray);
  });

  // Use div.querySelector aqui também
  div.querySelector("#girar").addEventListener("click", async () => {
    const nomeEscolhido = fisherYatesShuffle(namesArray);
    const { alvoRotacao } = girar(nomeEscolhido, angulosItens);

    const resultado = await animarRoleta(
      ctx, namesArray, angulosItens, largura, altura, centroX, centroY,
      grausAtuais, alvoRotacao, nomeEscolhido
    );

    grausAtuais = resultado.novoGrausAtuais;

    // Remover nome sorteado da lista e salvar no localStorage
    namesArray = namesArray.filter(nome => nome !== resultado.nomeEscolhido);
    localStorage.setItem("names", JSON.stringify(namesArray));

    // Atualizar ângulos da roleta sem "teleporte"
    angulosItens = desenharRoleta(ctx, namesArray, largura, altura, centroX, centroY, raio);

    // Exibir resultado
    div.querySelector("#resultado").innerText = `Nome sorteado: ${resultado.nomeEscolhido}`;
  });

  div.querySelector("#reset").addEventListener("click", function () {
    dispararEvento("/home");
  });

  return div;
}