// Função para embaralhar um array de forma verdadeiramente aleatória
export function fisherYatesShuffle(array) {
  const shuffled = array.slice();
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled[Math.floor(Math.random() * shuffled.length)];
}

// Função para sortear um único item da lista
// function drawItem(array) {
//   // Primeiro embaralhamos a lista
//   const shuffledList = fisherYatesShuffle(array);
//   // Retornamos o primeiro item (poderia ser qualquer posição)
//   return shuffledList[0];
// }

// Exemplo de uso:
// const list = ["João", "Maria", "Pedro", "Ana", "Carlos"];
// const winner = drawItem(list);
// console.log("O vencedor é:", winner);

