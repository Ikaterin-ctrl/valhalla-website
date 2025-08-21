document.addEventListener('DOMContentLoaded', () => {
    const horariosData = [
      { "dia": 1, "hora": 7, "aula": "Jiu-Jitsu", "classe": "jiujitsu" },
      { "dia": 3, "hora": 7, "aula": "Jiu-Jitsu", "classe": "jiujitsu" },
      { "dia": 5, "hora": 7, "aula": "Boxe", "classe": "boxe" },
      { "dia": 2, "hora": 8, "aula": "Muay Thai", "classe": "muaythai" },
      { "dia": 4, "hora": 8, "aula": "Sanda", "classe": "sanda" },
      { "dia": 1, "hora": 9, "aula": "Jiu-Jitsu", "classe": "jiujitsu" },
      { "dia": 3, "hora": 9, "aula": "Jiu-Jitsu", "classe": "jiujitsu" },
      { "dia": 5, "hora": 9, "aula": "Jiu-Jitsu (Sem Kimono)", "classe": "jiujitsu" },
      { "dia": 2, "hora": 10, "aula": "Muay Thai", "classe": "muaythai" },
      { "dia": 4, "hora": 10, "aula": "Muay Thai", "classe": "muaythai" },
      { "dia": 6, "hora": 10, "aula": "Jiu-Jitsu (Aulão)", "classe": "jiujitsu" },
      { "dia": 1, "hora": 11, "aula": "MMA", "classe": "mma" },
      { "dia": 3, "hora": 11, "aula": "MMA", "classe": "mma" },
      { "dia": 5, "hora": 11, "aula": "MMA", "classe": "mma" },
      { "dia": 2, "hora": 12, "aula": "Boxe", "classe": "boxe" },
      { "dia": 4, "hora": 12, "aula": "Boxe", "classe": "boxe" },
      { "dia": 1, "hora": 15, "aula": "Boxe Chinês (Sanda)", "classe": "sanda" },
      { "dia": 3, "hora": 15, "aula": "Defesa Pessoal (Krav Maga)", "classe": "defesapessoal" },
      { "dia": 5, "hora": 15, "aula": "Boxe Chinês (Sanda)", "classe": "sanda" },
      { "dia": 2, "hora": 16, "aula": "Jiu-Jitsu", "classe": "jiujitsu" },
      { "dia": 4, "hora": 16, "aula": "Jiu-Jitsu", "classe": "jiujitsu" },
      { "dia": 1, "hora": 17, "aula": "Muay Thai", "classe": "muaythai" },
      { "dia": 3, "hora": 17, "aula": "Muay Thai", "classe": "muaythai" },
      { "dia": 5, "hora": 17, "aula": "Muay Thai", "classe": "muaythai" },
      { "dia": 2, "hora": 18, "aula": "Boxe", "classe": "boxe" },
      { "dia": 4, "hora": 18, "aula": "Boxe", "classe": "boxe" },
      { "dia": 1, "hora": 19, "aula": "Jiu-Jitsu", "classe": "jiujitsu" },
      { "dia": 3, "hora": 19, "aula": "Jiu-Jitsu", "classe": "jiujitsu" },
      { "dia": 5, "hora": 19, "aula": "Jiu-Jitsu", "classe": "jiujitsu" },
      { "dia": 1, "hora": 20, "aula": "Funcional Fight", "classe": "funcionalfight" },
      { "dia": 2, "hora": 20, "aula": "Muay Thai", "classe": "muaythai" },
      { "dia": 3, "hora": 20, "aula": "Funcional Fight", "classe": "funcionalfight" },
      { "dia": 4, "hora": 20, "aula": "Muay Thai", "classe": "muaythai" },
      { "dia": 1, "hora": 21, "aula": "Boxe Chinês (Sanda)", "classe": "sanda" },
      { "dia": 2, "hora": 21, "aula": "MMA", "classe": "mma" },
      { "dia": 3, "hora": 21, "aula": "Boxe Chinês (Sanda)", "classe": "sanda" },
      { "dia": 4, "hora": 21, "aula": "MMA", "classe": "mma" }
    ];

    const gradeCompleta = [];
    const diasSemana = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];

    // Função para construir a grade de horários
    function construirGradeHorarios(data) {
        const tabelaBody = document.querySelector('#grade-horarios tbody');
        if (!tabelaBody) return;

        tabelaBody.innerHTML = ''; // Limpa o conteúdo existente

        const horariosPorDia = {};
        data.forEach(item => {
            if (!horariosPorDia[item.hora]) {
                horariosPorDia[item.hora] = {};
            }
            if (!horariosPorDia[item.hora][item.dia]) {
                horariosPorDia[item.hora][item.dia] = [];
            }
            horariosPorDia[item.hora][item.dia].push(item);
        });

        const horasOrdenadas = Object.keys(horariosPorDia).sort((a, b) => parseInt(a) - parseInt(b));

        horasOrdenadas.forEach(hora => {
            const row = tabelaBody.insertRow();
            const cellHora = row.insertCell();
            cellHora.textContent = `${hora.padStart(2, '0')}:00`;

            for (let i = 1; i <= 6; i++) { // Segunda a Sábado
                const cellAula = row.insertCell();
                const aulasDoDiaHora = horariosPorDia[hora][i];
                if (aulasDoDiaHora) {
                    aulasDoDiaHora.forEach(aula => {
                        const span = document.createElement('span');
                        span.textContent = aula.aula;
                        span.classList.add('aula-item', aula.classe);
                        cellAula.appendChild(span);
                    });
                }
            }
        });
    }

    // Função para atualizar o status da academia
    function atualizarStatus(grade) {
        const statusDot = document.querySelector('#status-academia .status-dot');
        const statusText = document.querySelector('#status-academia .status-text');
        if (!statusDot || !statusText) return;

        const now = new Date();
        const diaAtual = now.getDay(); // 0 = Domingo, 1 = Segunda, ..., 6 = Sábado
        const horaAtual = now.getHours();
        const minutoAtual = now.getMinutes();

        let proximaAula = null;
        let estaAberto = false;

        // Verifica se há alguma aula acontecendo agora
        grade.forEach(aula => {
            if (aula.dia === diaAtual && aula.hora === horaAtual) {
                estaAberto = true;
            }
        });

        // Encontra a próxima aula
        // Filtra aulas futuras no dia atual
        const aulasHojeFuturas = grade.filter(aula => 
            aula.dia === diaAtual && 
            (aula.hora > horaAtual || (aula.hora === horaAtual && 0 > minutoAtual)) // Assuming classes start on the hour
        ).sort((a, b) => a.hora - b.hora);

        if (aulasHojeFuturas.length > 0) {
            proximaAula = aulasHojeFuturas[0];
        } else {
            // Se não houver aulas futuras hoje, procura no próximo dia
            for (let i = 1; i <= 7; i++) {
                const proximoDia = (diaAtual + i) % 7;
                const aulasProximoDia = grade.filter(aula => aula.dia === proximoDia).sort((a, b) => a.hora - b.hora);
                if (aulasProximoDia.length > 0) {
                    proximaAula = aulasProximoDia[0];
                    break;
                }
            }
        }

        console.log('--- atualizarStatus Debug ---');
        console.log('Current Day (0=Sun, 1=Mon...):', diaAtual);
        console.log('Current Hour:', horaAtual);
        console.log('Is Open (estaAberto):', estaAberto);
        console.log('Next Class (proximaAula):', proximaAula);

        if (estaAberto) {
            statusDot.classList.remove('status-fechado', 'status-carregando');
            statusDot.classList.add('status-aberto');
            // If open, display next class
            if (proximaAula) {
                statusText.textContent = `Valhalla te espera! A próxima aula é ${proximaAula.aula} às ${String(proximaAula.hora).padStart(2, '0')}:00.`;
            } else {
                statusText.textContent = 'Valhalla te espera! Verifique o horário de funcionamento.'; // Fallback if no next class found even when open
            }
        } else if (proximaAula) {
            statusDot.classList.remove('status-aberto', 'status-carregando');
            statusDot.classList.add('status-fechado');
            const diaAula = diasSemana[proximaAula.dia];
            statusText.textContent = `Estamos fechados. A próxima aula será ${proximaAula.aula} às ${String(proximaAula.hora).padStart(2, '0')}:00 na ${diaAula}.`;
        } else {
            statusDot.classList.remove('status-aberto', 'status-fechado');
            statusDot.classList.add('status-carregando'); // Fallback if no schedule found
            statusText.textContent = 'Verifique o horário de funcionamento.';
        }
    }

    // Função para configurar os filtros
    function configurarFiltros() {
        const filterButtons = document.querySelectorAll('.filtro-btn');
        const searchInput = document.getElementById('horarios-search');
        const toggleFiltersBtn = document.getElementById('toggle-filters-btn');
        const modalFilterOverlay = document.getElementById('modal-filter-overlay');
        const closeFilterModalBtn = document.getElementById('close-filter-modal-btn');

        if (toggleFiltersBtn && modalFilterOverlay) {
            toggleFiltersBtn.addEventListener('click', () => {
                modalFilterOverlay.classList.add('is-active');
            });
        }

        if (closeFilterModalBtn && modalFilterOverlay) {
            closeFilterModalBtn.addEventListener('click', () => {
                modalFilterOverlay.classList.remove('is-active');
            });
        }

        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                aplicarFiltros();
                if (modalFilterOverlay) {
                    modalFilterOverlay.classList.remove('is-active'); // Close modal after filter selection
                }
            });
        });

        if (searchInput) {
            searchInput.addEventListener('input', aplicarFiltros);
        }

        function aplicarFiltros() {
            const activeFilter = document.querySelector('.filtro-btn.active');
            const filterClass = activeFilter ? activeFilter.dataset.filter : 'all';
            const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';

            const filteredData = horariosData.filter(item => {
                const matchesFilter = (filterClass === 'all' || item.classe === filterClass);
                const matchesSearch = item.aula.toLowerCase().includes(searchTerm) || item.classe.toLowerCase().includes(searchTerm);
                return matchesFilter && matchesSearch;
            });
            construirGradeHorarios(filteredData);
            // Note: atualizarStatus is not re-called here as it's based on current time, not filtered view
        }
    }

    // Função principal para carregar e processar os horários
    async function carregarHorarios() {
        try {
            gradeCompleta.push(...horariosData); // Use hardcoded data directly
            
            construirGradeHorarios(gradeCompleta);
            atualizarStatus(gradeCompleta);
            configurarFiltros();

        } catch (error) {
            console.error('Erro ao carregar os horários:', error);
            const tabelaBody = document.querySelector('#grade-horarios tbody');
            if (tabelaBody) {
                tabelaBody.innerHTML = '<tr><td colspan="7">Não foi possível carregar os horários. Tente novamente mais tarde.</td></tr>';
            }
        }
    }

    carregarHorarios();
});
