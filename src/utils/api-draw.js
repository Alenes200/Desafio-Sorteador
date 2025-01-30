export async function drawNameAPI(names) {
  try {
    // Faz requisição POST para API de sorteio
    const response = await fetch("https://roleta-api.vercel.app/sorteio", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nomes: names }), // Envia array de nomes para sorteio
    });

    // Verifica se a resposta da API foi bem sucedida
    if (!response.ok) {
      throw new Error("Erro ao sortear nome");
    }

    // Processa resposta da API
    const data = await response.json();
    return data.vencedor; // Retorna nome sorteado pela API

  } catch (error) {
    // Tratamento de erros da API
    console.error("Erro na API:", error);
    alert("Erro ao sortear nome. Tente novamente.");
    return null;
  }
}