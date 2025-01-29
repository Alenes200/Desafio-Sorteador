const canvas = document.getElementById("canvas");
        const ctx = canvas.getContext("2d");
        const largura = canvas.width;
        const altura = canvas.height;
        const centroX = largura / 2;
        const centroY = altura / 2;
        const raio = largura / 2;

        //array com os nomes pode colocar mais nomes aqui
        let nomes = ['ana',"jose", "maria", 'bruno','pedro','josé','alice'];
        let passo = 360 / nomes.length;
        let grausAtuais = 0;
        let angulosItens = {};
        let alvoRotacao = 0;

        function desenharRoleta() {
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
        }

        function girar() {
            //pegar a logica do numero sorteado para receber o indice do array
            const indiceAleatorio = Math.floor(Math.random() * nomes.length);
            console.log(indiceAleatorio)
            const nomeEscolhido = nomes[indiceAleatorio];
            const meioSetor = (angulosItens[nomeEscolhido].inicio + angulosItens[nomeEscolhido].fim) / 2;

            const voltasCompletas = 360 * 5;
            const deslocamento = -90;
            alvoRotacao = voltasCompletas + deslocamento - meioSetor;

            animarRoleta(nomeEscolhido);
            
        }

        function animarRoleta(nomeEscolhido) {
            const duracaoAnimacao = 4000;
            const taxaQuadros = 60;
            const totalQuadros = (duracaoAnimacao / 1000) * taxaQuadros;
            let quadro = 0;
            const grausIniciais = grausAtuais;

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
                desenharRoleta();
                ctx.restore();

                if (quadro < totalQuadros) {
                    requestAnimationFrame(animar);
                } else {
                    grausAtuais = alvoRotacao % 360;
                    document.getElementById("resultado").innerText = `Nome sorteado: ${nomeEscolhido}`;
                }
            }

            animar();
        }

        function paraRadianos(graus) {
            return graus * (Math.PI / 180);
        }

        desenharRoleta();