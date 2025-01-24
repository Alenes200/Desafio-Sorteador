// Seleciona os elementos da página
const inputNames = document.getElementById("input-names");
const addButton = document.getElementById("add");
const addedNamesList = document.getElementById("added-names-list");

// Array para armazenar os nomes
let namesArray = [];

// Adiciona nomes ao clicar no botão "Adicionar"
addButton.addEventListener("click", function () {
  const inputValue = inputNames.value.trim(); // Remove espaços extras

  if (!inputValue) {
    alert("Por favor, insira ao menos um nome ou número."); // Validação simples
    return;
  }

  // Separa os nomes por vírgula
  const separatedNames = inputValue.split(",").map(name => name.trim());

  // Adiciona cada nome ao array usando push
  separatedNames.forEach(function (name) {
    if (name) namesArray.push(name); // Evita adicionar strings vazias
    console.log(namesArray)
  });

  // Atualiza a lista exibida na tela
  updateAddedNamesList();

  // Limpa o campo de entrada
  inputNames.value = "";
});

// Atualiza a exibição dos nomes adicionados
function updateAddedNamesList() {
  addedNamesList.innerHTML = ""; // Limpa a lista atual
  namesArray.forEach(function (name) {
    const listItem = document.createElement("li");
    listItem.textContent = name;
    addedNamesList.appendChild(listItem);
  });
}

console.log("Nomes adicionados:", namesArray); // Para fins de teste no console
