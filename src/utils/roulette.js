export function paraRadianos(graus) {
  return graus * (Math.PI / 180);
}

export function desenharRoleta(ctx, nomes, largura, altura, centroX, centroY, raio) {
  const passo = 360 / nomes.length;
  const angulosItens = {};
  let anguloInicial = 0;

  nomes.forEach((nome, index) => {
    const anguloFinal = anguloInicial + passo;
    const cor = `hsl(${index * (360 / nomes.length)}, 80%, 60%)`;

    ctx.beginPath();
    ctx.moveTo(centroX, centroY);
    ctx.arc(centroX, centroY, raio, paraRadianos(anguloInicial), paraRadianos(anguloFinal));
    ctx.fillStyle = cor;
    ctx.fill();

    ctx.save();
    ctx.translate(centroX, centroY);
    ctx.rotate(paraRadianos((anguloInicial + anguloFinal) / 2));
    ctx.textAlign = "right";
    ctx.fillStyle = "#fff";
    ctx.font = "16px Arial";
    ctx.fillText(nome, raio - 20, 10);
    ctx.restore();

    angulosItens[nome] = { inicio: anguloInicial, fim: anguloFinal };
    anguloInicial = anguloFinal;
  });

  return angulosItens;
}

export function girar(nomeEscolhido, angulosItens) {
  const meioSetor = (angulosItens[nomeEscolhido].inicio + angulosItens[nomeEscolhido].fim) / 2;

  const voltasCompletas = 360 * 5;
  const deslocamento = -90;
  const alvoRotacao = voltasCompletas + deslocamento - meioSetor;

  return { nomeEscolhido, alvoRotacao };
}

export function animarRoleta(ctx, nomes, angulosItens, largura, altura, centroX, centroY, grausAtuais, alvoRotacao, nomeEscolhido) {
  const duracaoAnimacao = 8000;
  const taxaQuadros = 60;
  const totalQuadros = (duracaoAnimacao / 1000) * taxaQuadros;
  let quadro = 0;
  const grausIniciais = grausAtuais;

  return new Promise((resolve) => {
    function animar() {
      quadro++;
      const progresso = Math.min(quadro / totalQuadros, 1);
      const progressoSuavizado = Math.sin((progresso * Math.PI) / 2);
      const rotacaoAtual = grausIniciais + (alvoRotacao - grausIniciais) * progressoSuavizado;

      ctx.clearRect(0, 0, largura, altura);
      ctx.save();
      ctx.translate(centroX, centroY);
      ctx.rotate(paraRadianos(rotacaoAtual));
      ctx.translate(-centroX, -centroY);
      desenharRoleta(ctx, nomes, largura, altura, centroX, centroY, largura / 2);
      ctx.restore();

      if (quadro < totalQuadros) {
        requestAnimationFrame(animar);
      } else {
        const novoGrausAtuais = alvoRotacao % 360;
        resolve({ novoGrausAtuais, nomeEscolhido });
      }
    }

    animar();
  });
}