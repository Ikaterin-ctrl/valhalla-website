document.addEventListener('DOMContentLoaded', function() {
    const statusDot = document.querySelector('#status-academia .status-dot');
    const statusText = document.querySelector('#status-academia .status-text');

    // --- CONFIGURE AQUI OS HORÁRIOS DA ACADEMIA ---
    // (Formato 24h. Use números, ex: 8 para 8h, 22 para 22h)
    const horarios = {
        1: { abre: 6, fecha: 22 }, // Segunda
        2: { abre: 6, fecha: 22 }, // Terça
        3: { abre: 6, fecha: 22 }, // Quarta
        4: { abre: 6, fecha: 22 }, // Quinta
        5: { abre: 6, fecha: 22 }, // Sexta
        6: { abre: 8, fecha: 14 }, // Sábado
        0: { abre: null, fecha: null } // Domingo (Fechado)
    };
    // -------------------------------------------------

    function atualizarStatus() {
        const agora = new Date();
        const diaDaSemana = agora.getDay(); // 0 = Domingo, 1 = Segunda, etc.
        const horaAtual = agora.getHours();

        const horarioDeHoje = horarios[diaDaSemana];

        let estaAberto = false;
        if (horarioDeHoje.abre !== null && horaAtual >= horarioDeHoje.abre && horaAtual < horarioDeHoje.fecha) {
            estaAberto = true;
        }

        if (estaAberto) {
            statusDot.style.backgroundColor = '#7CFC00'; // Verde
            statusText.textContent = 'Estamos ABERTOS';
        } else {
            statusDot.style.backgroundColor = '#B22222'; // Vermelho
            statusText.textContent = 'Estamos FECHADOS';
            // Lógica para próxima aula pode ser adicionada aqui no futuro
        }
    }

    // Se o elemento de status existir na página, atualiza o status
    if (statusDot && statusText) {
        atualizarStatus();
        // Opcional: Atualizar a cada minuto
        // setInterval(atualizarStatus, 60000); 
    }
});