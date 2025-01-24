// Função para embaralhar um array de forma verdadeiramente aleatória
function fisherYatesShuffle(array) {
  // Criamos uma cópia do array original para não modificá-lo
  const shuffled = array.slice();

  // Começamos do último elemento e vamos até o primeiro
  for (let i = shuffled.length - 1; i > 0; i--) {
    // Geramos um índice aleatório entre 0 e i (inclusive)
    const j = Math.floor(Math.random() * (i + 1));

    // Trocamos os elementos de posição (swap)
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  // Retornamos o array embaralhado
  return shuffled;
}

// Função para sortear um único item da lista
function drawItem(array) {
  // Primeiro embaralhamos a lista
  const shuffledList = fisherYatesShuffle(array);
  // Retornamos o primeiro item (poderia ser qualquer posição)
  return shuffledList[0];
}

// Exemplo de uso:
const list = ["João", "Maria", "Pedro", "Ana", "Carlos"];
const winner = drawItem(list);
console.log("O vencedor é:", winner);

