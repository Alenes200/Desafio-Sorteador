// Função utilitária para converter graus em radianos
export function toRadians(degrees) {
  return degrees * (Math.PI / 180);
}

// Função principal para desenhar a roda da roleta com setores e texto
export function drawRouletteWheel(ctx, names, width, height, centerX, centerY, radius) {
  const step = 360 / names.length;
  const sectorAngles = {};
  let startAngle = 0;

  names.forEach((name, index) => {
    const endAngle = startAngle + step;
    const color = `hsl(${index * (360 / names.length)}, 80%, 60%)`;

    // Desenha o setor
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.arc(centerX, centerY, radius, toRadians(startAngle), toRadians(endAngle));
    ctx.fillStyle = color;
    ctx.fill();

    // Desenha o texto do rótulo
    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.rotate(toRadians((startAngle + endAngle) / 2));
    ctx.textAlign = "right";
    ctx.fillStyle = "#fff";
    ctx.font = "16px Arial";
    ctx.fillText(name, radius - 20, 10);
    ctx.restore();

    sectorAngles[name] = { start: startAngle, end: endAngle };
    startAngle = endAngle;
  });

  return sectorAngles;
}

// Calcula o alvo de rotação para o nome selecionado
export function spin(selectedName, sectorAngles) {
  const sectorMiddle = (sectorAngles[selectedName].start + sectorAngles[selectedName].end) / 2;
  const fullRotations = 360 * 5;
  const offset = -90;
  const rotationTarget = fullRotations + offset - sectorMiddle;

  return { selectedName, rotationTarget };
}

// Anima a rotação da roda com suavização
export function animateWheel(ctx, names, sectorAngles, width, height, centerX, centerY, currentDegrees, rotationTarget, selectedName) {
  const animationDuration = 8000;
  const frameRate = 60;
  const totalFrames = (animationDuration / 1000) * frameRate;
  let frame = 0;
  const startDegrees = currentDegrees;

  return new Promise((resolve) => {
    function animate() {
      frame++;
      const progress = Math.min(frame / totalFrames, 1);
      const easedProgress = Math.sin((progress * Math.PI) / 2);
      const currentRotation = startDegrees + (rotationTarget - startDegrees) * easedProgress;

      // Limpa e redesenha a roda com a nova rotação
      ctx.clearRect(0, 0, width, height);
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(toRadians(currentRotation));
      ctx.translate(-centerX, -centerY);
      drawRouletteWheel(ctx, names, width, height, centerX, centerY, width / 2);
      ctx.restore();

      if (frame < totalFrames) {
        requestAnimationFrame(animate);
      } else {
        const newCurrentDegrees = rotationTarget % 360;
        resolve({ newCurrentDegrees, selectedName });
      }
    }

    animate();
  });
}
