import { paraRadianos, desenharRoleta, girar, animarRoleta } from './roulette.js';
import { fisherYatesShuffle } from './draw.js';

const inputNames = document.getElementById("input-names");
const addButton = document.getElementById("add");

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const largura = canvas.width;
const altura = canvas.height;
const centroX = largura / 2;
const centroY = altura / 2;
const raio = largura / 2;

let grausAtuais = 0;

let namesArray = [];
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


document.getElementById("girar").addEventListener("click", async () => {
  const nomeEscolhido = fisherYatesShuffle(namesArray);
  const { alvoRotacao } = girar(nomeEscolhido, angulosItens);
  const resultado = await animarRoleta(
    ctx, namesArray, angulosItens,
    largura, altura, centroX, centroY,
    grausAtuais, alvoRotacao, nomeEscolhido
  );

  grausAtuais = resultado.novoGrausAtuais;
  document.getElementById("resultado").innerText = `Nome sorteado: ${resultado.nomeEscolhido}`;
});
