# Sorteado - Projeto de Roleta de Nomes

Este projeto é uma aplicação web desenvolvida como parte de um **desafio relâmpago** proposto à **Turma 6 Daruma** pelo **Alpha EdTech**, programa do **Instituto Alpha Lumen**. O objetivo do desafio era criar uma ferramenta interativa e funcional em um curto espaço de tempo, utilizando tecnologias básicas de desenvolvimento web.

A aplicação permite aos usuários adicionar nomes a uma lista e, em seguida, sortear um nome aleatoriamente usando uma roleta. É uma ferramenta divertida para sorteios em eventos, brincadeiras ou qualquer ocasião que necessite de um sorteio justo.

## Tela inicial

![WhatsApp Image 2025-01-31 at 16 22 30](https://github.com/user-attachments/assets/f43ba8b5-002e-4654-920a-a2f41f606230)

🔗 Acesse o projeto: [Clique aqui](https://alenes200.github.io/Desafio-Sorteador/)

## Funcionalidades

- **Adicionar Nomes**: Na primeira página, os usuários podem adicionar nomes à lista usando um campo de entrada e um botão "Adicionar".
- **Roleta de Sorteio**: Na segunda página, os nomes adicionados são exibidos em uma roleta. O usuário pode girar a roleta e sortear um nome aleatoriamente.
- **Histórico**: Ao lado da roleta, temos um histórico do sorteio, onde são apresentados os vencedores.
- **Botão de Sorteio**: Um botão "Sortear" inicia o processo de rotação da roleta e seleciona um nome aleatório.
- **Integração com API**: A roleta utiliza uma **API hospedada no Vercel** para realizar o sorteio de forma justa e aleatória. A API recebe a lista de nomes, embaralha-os usando o algoritmo Fisher-Yates e retorna o nome sorteado.

## Tecnologias Utilizadas

- **Figma**: Para a criação do design e prototipagem da interface do usuário.
- **Visual Studio Code (VS Code)**: Como ambiente de desenvolvimento.
  - **HTML**: Para a estruturação das páginas.
  - **CSS**: Para a estilização e layout.
  - **JavaScript**: Para a lógica de funcionamento da roleta e interatividade.
- **Node.js**: Para o desenvolvimento da API de sorteio.
  - **Express**: Framework para criar a API e gerenciar requisições HTTP.
  - **CORS**: Para permitir que a API seja acessada por diferentes domínios.
- **Vercel**: Para hospedar a API de sorteio e garantir que ela esteja disponível online.
- **GitHub Pages**: Para hospedar a aplicação web e torná-la acessível publicamente.

## Instruções de Uso

1. **Adicionar Nomes**:
   - Na primeira página, insira os nomes no campo de texto e clique no botão "Adicionar" para incluí-los na lista.
   - Repita o processo para adicionar quantos nomes desejar.
     
      ![Capturar](https://github.com/user-attachments/assets/3f39d9df-dea8-4bfa-89a1-9eaabc5c20cc)

2. **Sortear Nomes**:
   - Após adicionar os nomes, clique no botão "Ir para Roleta" para ser redirecionado à página da roleta.
   - Na página da roleta, clique no botão "Sortear" para girar a roleta e selecionar um nome aleatório. A roleta utiliza a API hospedada no Vercel para garantir um sorteio justo.
     
       ![roletanova1](https://github.com/user-attachments/assets/7cb290b5-9221-44a9-8961-73da99200562)

3. **Visualizar Resultado**:
   - O nome sorteado será destacado na roleta, e o histórico será atualizado.
     
        ![historico1](https://github.com/user-attachments/assets/33c5b9ef-f7af-4947-9615-b7a79ccf732f)

4. **Apagar e Adicionar Nomes**:
   - Botão voltar para adicionar mais nomes na roleta.
   - Botão limpar para resetar toda roleta e inserir novos nomes.
     
      ![apagharnovo](https://github.com/user-attachments/assets/778b3175-20df-4a6b-bfbc-2a4c54221ea4)


## Como Funciona a API?

A API foi desenvolvida em **Node.js** com **Express** e está hospedada no **Vercel**. Ela recebe uma lista de nomes no corpo da requisição (em formato JSON), embaralha os nomes usando o algoritmo Fisher-Yates e retorna um nome sorteado aleatoriamente.

### Exemplo de Requisição:
```json
{
  "nomes": ["Alice", "Bob", "Carlos", "Diana"]
}
```

### Exemplo de Resposta:
```json
{
  "vencedor": "Bob"
}
```

## Contribuintes

- [Alexsander Nunes](https://github.com/Alenes200)
- [Alielson Pequeno](https://github.com/alielsonfp)
- [Steffany Anunciação](https://github.com/steffanyperfil)

## Como Contribuir

Se você quiser contribuir para este projeto, sinta-se à vontade para abrir uma **sugestão**. 
Todas as contribuições são bem-vindas!
