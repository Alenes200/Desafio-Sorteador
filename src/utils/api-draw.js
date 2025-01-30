export async function sortearNomeAPI(nomes) {
  try {
    const response = await fetch("https://roleta-api.vercel.app/sorteio", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nomes }), // Envia o array de nomes para a API
    });

    if (!response.ok) {
      throw new Error("Erro ao sortear nome");
    }

    const data = await response.json();
    return data.vencedor; // Retorna o nome sorteado
  } catch (error) {
    console.error("Erro na API:", error);
    alert("Erro ao sortear nome. Tente novamente.");
    return null;
  }
}