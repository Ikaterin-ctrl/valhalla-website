document.addEventListener('DOMContentLoaded', () => {
    // --- INÍCIO DO NOVO SCRIPT DE STATUS DA ACADEMIA ---
    const statusDot = document.querySelector('#status-academia .status-dot');
    const statusText = document.querySelector('#status-academia .status-text');

    // Estrutura de dados com a grade de horários completa.
    // Dia: 0 = Domingo, 1 = Segunda, ..., 6 = Sábado
    const gradeCompleta = [
        { dia: 1, hora: 7, aula: 'Jiu-Jitsu' },
        { dia: 2, hora: 8, aula: 'Muay Thai' },
        { dia: 3, hora: 7, aula: 'Jiu-Jitsu' },
        { dia: 4, hora: 8, aula: 'Sanda' },
        { dia: 5, hora: 7, aula: 'Boxe' },
        { dia: 1, hora: 9, aula: 'Jiu-Jitsu' },
        { dia: 2, hora: 10, aula: 'Muay Thai' },
        { dia: 3, hora: 9, aula: 'Jiu-Jitsu' },
        { dia: 4, hora: 10, aula: 'Muay Thai' },
        { dia: 5, hora: 9, aula: 'Jiu-Jitsu (Sem Kimono)' },
        { dia: 6, hora: 10, aula: 'Jiu-Jitsu (Aulão)' },
        { dia: 1, hora: 11, aula: 'MMA' },
        { dia: 2, hora: 12, aula: 'Boxe' },
        { dia: 3, hora: 11, aula: 'MMA' },
        { dia: 4, hora: 12, aula: 'Boxe' },
        { dia: 5, hora: 11, aula: 'MMA' },
        { dia: 1, hora: 15, aula: 'Boxe Chinês (Sanda)' },
        { dia: 3, hora: 15, aula: 'Defesa Pessoal (Krav Maga)' },
        { dia: 5, hora: 15, aula: 'Boxe Chinês (Sanda)' },
        { dia: 2, hora: 16, aula: 'Jiu-Jitsu' },
        { dia: 4, hora: 16, aula: 'Jiu-Jitsu' },
        { dia: 1, hora: 17, aula: 'Muay Thai' },
        { dia: 3, hora: 17, aula: 'Muay Thai' },
        { dia: 5, hora: 17, aula: 'Muay Thai' },
        { dia: 2, hora: 18, aula: 'Boxe' },
        { dia: 4, hora: 18, aula: 'Boxe' },
        { dia: 1, hora: 19, aula: 'Jiu-Jitsu' },
        { dia: 3, hora: 19, aula: 'Jiu-Jitsu' },
        { dia: 5, hora: 19, aula: 'Jiu-Jitsu' },
        { dia: 1, hora: 20, aula: 'Funcional Fight' },
        { dia: 2, hora: 20, aula: 'Muay Thai' },
        { dia: 3, hora: 20, aula: 'Funcional Fight' },
        { dia: 4, hora: 20, aula: 'Muay Thai' },
        { dia: 1, hora: 21, aula: 'Boxe Chinês (Sanda)' },
        { dia: 2, hora: 21, aula: 'MMA' },
        { dia: 3, hora: 21, aula: 'Boxe Chinês (Sanda)' },
        { dia: 4, hora: 21, aula: 'MMA' }
    ];

    function getStatusAcademia() {
        const agora = new Date();
        const diaSemana = agora.getDay();
        const horaAtual = agora.getHours();

        // Horários de funcionamento (para a mensagem Aberto/Fechado)
        const horariosGerais = {
            1: { abre: 7, fecha: 22 }, 2: { abre: 8, fecha: 22 }, 3: { abre: 7, fecha: 22 },
            4: { abre: 8, fecha: 22 }, 5: { abre: 7, fecha: 22 }, 6: { abre: 10, fecha: 11 },
            0: { abre: null, fecha: null }
        };

        const hojeInfo = horariosGerais[diaSemana];
        const estaAberto = hojeInfo.abre !== null && horaAtual >= hojeInfo.abre && horaAtual < hojeInfo.fecha;

        // Encontrar a próxima aula
        let proximaAula = null;
        // Procura aulas hoje, mais tarde
        proximaAula = gradeCompleta.find(aula => aula.dia === diaSemana && aula.hora > horaAtual);

        // Se não achar aula hoje, procura no dia seguinte (e nos próximos)
        if (!proximaAula) {
            for (let i = 1; i <= 7; i++) {
                const proximoDia = (diaSemana + i) % 7;
                proximaAula = gradeCompleta.find(aula => aula.dia === proximoDia);
                if (proximaAula) {
                    proximaAula.diferencaDias = i; // Guarda se a aula é amanhã ou depois
                    break;
                }
            }
        }

        return { estaAberto, proximaAula };
    }

    function atualizarStatus() {
        const { estaAberto, proximaAula } = getStatusAcademia();

        if (estaAberto) {
            statusDot.style.backgroundColor = '#7CFC00'; // Verde
            statusText.innerHTML = `Estamos ABERTOS te esperando!<br><small>Próxima aula: ${proximaAula.aula} às ${proximaAula.hora}:00</small>`;
        } else {
            statusDot.style.backgroundColor = '#B22222'; // Vermelho
            if (proximaAula) {
                if (proximaAula.diferencaDias > 1) { // Se a próxima aula for depois de amanhã
                     statusText.innerHTML = `Já encerramos por hoje.<br><small>Nosso próximo treino será em breve. Bom descanso!</small>`;
                } else if (proximaAula.diferencaDias === 1) { // Se a próxima aula for amanhã
                    statusText.innerHTML = `Já encerramos por hoje.<br><small>Nosso próximo treino é ${proximaAula.aula} amanhã às ${proximaAula.hora}:00. Bom descanso!</small>`;
                } else { // Se a próxima aula for ainda hoje
                    statusText.innerHTML = `Estamos FECHADOS agora.<br><small>Mas fica tranquilo, a próxima aula é ${proximaAula.aula} às ${proximaAula.hora}:00!</small>`;
                }
            } else { // Fallback
                 statusText.textContent = 'Estamos FECHADOS';
            }
        }
    }

    if (statusDot && statusText) {
        atualizarStatus();
    }
    // --- FIM DO NOVO SCRIPT DE STATUS DA ACADEMIA ---


    // --- INÍCIO DO SCRIPT DE FILTRO DE HORÁRIOS ---
    const filtroButtons = document.querySelectorAll('#horarios-filtros .filtro-btn');
    const todasAsAulas = document.querySelectorAll('#grade-horarios td[class]'); // Seleciona apenas as <td> que têm classes de aula

    if (filtroButtons.length > 0 && todasAsAulas.length > 0) {
        filtroButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Gerencia a classe 'active' nos botões
                filtroButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');

                const filtro = this.dataset.filter;

                todasAsAulas.forEach(aulaTd => {
                    // Se o filtro for 'all' ou a célula da aula contiver a classe do filtro
                    if (filtro === 'all' || aulaTd.classList.contains(filtro)) {
                        aulaTd.classList.remove('is-hidden'); // Mostra a célula
                    } else {
                        aulaTd.classList.add('is-hidden'); // Esconde a célula
                    }
                });
            });
        });
    }
    // --- FIM DO SCRIPT DE FILTRO DE HORÁRIOS ---
});
