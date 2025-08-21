document.addEventListener('DOMContentLoaded', () => {
    const gradeCompleta = [];

    // Função para buscar e processar os horários
    async function carregarHorarios() {
        try {
            const response = await fetch('../data/horarios.json');
            const horariosJSON = await response.json();
            gradeCompleta.push(...horariosJSON);
            
            // Depois que os dados são carregados, construa a grade e configure o status
            construirGradeHorarios(gradeCompleta);
            atualizarStatus(gradeCompleta);
            configurarFiltros();

        } catch (error) {
            console.error('Erro ao carregar o arquivo de horários:', error);
            const tabelaBody = document.querySelector('#grade-horarios tbody');
            if (tabelaBody) {
                tabelaBody.innerHTML = '<tr><td colspan="7">Não foi possível carregar os horários. Tente novamente mais tarde.</td></tr>';
            }
        }
    }

    // Função para construir a tabela de horários dinamicamente
    function construirGradeHorarios(horarios) {
        const tabela = document.querySelector('#grade-horarios');
        if (!tabela) return;
        const tabelaBody = tabela.querySelector('tbody');
        const tabelaHead = tabela.querySelector('thead');
        if (!tabelaBody || !tabelaHead) return;

        tabelaBody.innerHTML = ''; // Limpa a tabela antes de preencher

        // Agrupa os horários por hora
        const horariosAgrupados = horarios.reduce((acc, aula) => {
            const hora = `${String(aula.hora).padStart(2, '0')}:00`;
            if (!acc[hora]) {
                acc[hora] = { segunda: '', terca: '', quarta: '', quinta: '', sexta: '', sabado: '' };
            }
            const dias = ['domingo', 'segunda', 'terca', 'quarta', 'quinta', 'sexta', 'sabado'];
            const diaStr = dias[aula.dia];
            acc[hora][diaStr] = `<div class="aula ${aula.classe}">${aula.aula}</div>`; // Usar div para agrupar aulas
            return acc;
        }, {});

        // Ordena as horas
        const horasOrdenadas = Object.keys(horariosAgrupados).sort();

        // Cria as linhas da tabela
        horasOrdenadas.forEach(hora => {
            const linha = document.createElement('tr');
            let celulas = `<td>${hora}</td>`;
            const diasDaSemana = ['segunda', 'terca', 'quarta', 'quinta', 'sexta', 'sabado'];
            diasDaSemana.forEach(dia => {
                celulas += `<td>${horariosAgrupados[hora][dia] || ''}</td>`;
            });
            linha.innerHTML = celulas;
            tabelaBody.appendChild(linha);
        });

        // Adiciona os data-labels para responsividade
        const headers = Array.from(tabelaHead.querySelectorAll('th')).map(th => th.textContent);
        tabelaBody.querySelectorAll('tr').forEach(tr => {
            tr.querySelectorAll('td').forEach((td, i) => {
                td.setAttribute('data-label', headers[i]);
            });
        });
    }

    // Função para configurar os filtros de modalidades
    function configurarFiltros() {
        const filtroButtons = document.querySelectorAll('#horarios-filtros .filtro-btn');
        const tabelaBody = document.querySelector('#grade-horarios tbody');

        if (filtroButtons.length > 0 && tabelaBody) {
            filtroButtons.forEach(button => {
                button.addEventListener('click', function() {
                    filtroButtons.forEach(btn => btn.classList.remove('active'));
                    this.classList.add('active');

                    const filtro = this.dataset.filter;
                    const todasAsCelulas = tabelaBody.querySelectorAll('td');

                    todasAsCelulas.forEach(td => {
                        if (filtro === 'all' || td.classList.contains(filtro)) {
                            td.style.opacity = '1';
                            td.style.visibility = 'visible';
                        } else if (td.cellIndex !== 0) { // Não oculta a célula da hora
                            td.style.opacity = '0';
                            td.style.visibility = 'hidden';
                        }
                    });
                });
            });
        }
    }

    // Função para atualizar o status da academia (Aberto/Fechado)
    function atualizarStatus(horarios) {
        const statusDot = document.querySelector('#status-academia .status-dot');
        const statusText = document.querySelector('#status-academia .status-text');
        if (!statusDot || !statusText) return;

        const agora = new Date();
        const diaSemana = agora.getDay(); // 0 = Domingo, 1 = Segunda, ...
        const horaAtual = agora.getHours();

        // Encontra os horários de abertura e fechamento do dia
        const aulasDoDia = horarios.filter(aula => aula.dia === diaSemana);
        let abre = 24, fecha = 0;
        if (aulasDoDia.length > 0) {
            abre = Math.min(...aulasDoDia.map(a => a.hora));
            fecha = Math.max(...aulasDoDia.map(a => a.hora)) + 1; // Considera 1h de duração
        }

        const estaAberto = horaAtual >= abre && horaAtual < fecha;

        // Encontrar a próxima aula
        let proximaAula = horarios.find(aula => aula.dia === diaSemana && aula.hora > horaAtual);
        if (!proximaAula) {
            for (let i = 1; i <= 7; i++) {
                const proximoDia = (diaSemana + i) % 7;
                proximaAula = horarios.find(aula => aula.dia === proximoDia);
                if (proximaAula) {
                    proximaAula.diferencaDias = i;
                    break;
                }
            }
        }

        if (estaAberto) {
            statusDot.style.backgroundColor = '#7CFC00'; // Verde
            statusText.innerHTML = `Estamos ABERTOS!`;
            if(proximaAula && proximaAula.dia === diaSemana) {
                 statusText.innerHTML += `<br><small>Próxima aula: ${proximaAula.aula} às ${proximaAula.hora}:00</small>`;
            }
        } else {
            statusDot.style.backgroundColor = '#B22222'; // Vermelho
            statusText.innerHTML = 'Estamos FECHADOS.';
            if (proximaAula) {
                const diaProxAula = proximaAula.diferencaDias === 1 ? 'amanhã' : 'em breve';
                statusText.innerHTML += `<br><small>Próximo treino: ${proximaAula.aula} ${diaProxAula} às ${proximaAula.hora}:00</small>`;
            }
        }
    }

    // Inicia o processo
    carregarHorarios();
});
