const horarios = {
    "domingo": [],
    "segunda": [
        { hora: "06:30", aula: "Jiu-Jitsu", tags: ["jiu-jitsu"] },
        { hora: "09:00", aula: "Sanda", tags: ["sanda"] },
        { hora: "10:00", aula: "MMA Grappling", tags: ["mma", "grappling"] },
        { hora: "11:00", aula: "Jiu-Jitsu Agendado", tags: ["jiu-jitsu"] },
        { hora: "16:50", aula: "Jiu-Jitsu Kids", tags: ["jiu-jitsu", "kids"] },
        { hora: "17:30", aula: "Sanda Kids", tags: ["sanda", "kids"] },
        { hora: "18:00", aula: "Boxe Fem / Kickboxing / Grappling", tags: ["boxe", "kickboxing", "grappling", "feminino"] },
        { hora: "19:00", aula: "Boxe", tags: ["boxe"] },
        { hora: "20:00", aula: "Jiu-Jitsu Avançado/Competição", tags: ["jiu-jitsu"] },
        { hora: "21:30", aula: "Jiu-Jitsu", tags: ["jiu-jitsu"] }
    ],
    "terça": [
        { hora: "06:30", aula: "Jiu-Jitsu", tags: ["jiu-jitsu"] },
        { hora: "09:00", aula: "MMA", tags: ["mma"] },
        { hora: "10:00", aula: "Grappling / Jiu-Jitsu", tags: ["grappling", "jiu-jitsu"] },
        { hora: "11:00", aula: "Jiu-Jitsu Agendado", tags: ["jiu-jitsu"] },
        { hora: "16:50", aula: "Muay-Thai Kids", tags: ["muay-thai", "kids"] },
        { hora: "17:30", aula: "Sanda Kids", tags: ["sanda", "kids"] },
        { hora: "18:00", aula: "Boxe Fem / Kickboxing / Grappling", tags: ["boxe", "kickboxing", "grappling", "feminino"] },
        { hora: "19:00", aula: "Jiu-Jitsu", tags: ["jiu-jitsu"] },
        { hora: "20:00", aula: "Jiu-Jitsu Fem/Kids / MMA", tags: ["jiu-jitsu", "feminino", "kids", "mma"] },
        { hora: "21:30", aula: "Jiu-Jitsu", tags: ["jiu-jitsu"] }
    ],
    "quarta": [
        { hora: "06:30", aula: "Jiu-Jitsu", tags: ["jiu-jitsu"] },
        { hora: "09:00", aula: "Sanda", tags: ["sanda"] },
        { hora: "10:00", aula: "MMA Grappling", tags: ["mma", "grappling"] },
        { hora: "11:00", aula: "Jiu-Jitsu Agendado", tags: ["jiu-jitsu"] },
        { hora: "16:50", aula: "Jiu-Jitsu Kids", tags: ["jiu-jitsu", "kids"] },
        { hora: "18:00", aula: "Boxe Fem / Kickboxing / Grappling", tags: ["boxe", "kickboxing", "grappling", "feminino"] },
        { hora: "19:00", aula: "Boxe", tags: ["boxe"] },
        { hora: "20:00", aula: "Jiu-Jitsu Avançado/Competição", tags: ["jiu-jitsu"] },
        { hora: "21:30", aula: "Jiu-Jitsu", tags: ["jiu-jitsu"] }
    ],
    "quinta": [
        { hora: "06:30", aula: "Jiu-Jitsu", tags: ["jiu-jitsu"] },
        { hora: "09:00", aula: "MMA", tags: ["mma"] },
        { hora: "10:00", aula: "Jiu-Jitsu / MMA", tags: ["jiu-jitsu", "mma"] },
        { hora: "11:00", aula: "MMA Sparring", tags: ["mma", "sparring"] },
        { hora: "16:50", aula: "Muay-Thai Kids", tags: ["muay-thai", "kids"] },
        { hora: "17:30", aula: "Sanda Kids", tags: ["sanda", "kids"] },
        { hora: "18:00", aula: "Jiu-Jitsu Comp / Graduação", tags: ["jiu-jitsu"] },
        { hora: "19:00", aula: "Jiu-Jitsu", tags: ["jiu-jitsu"] },
        { hora: "20:00", aula: "Jiu-Jitsu Fem/Kids / MMA", tags: ["jiu-jitsu", "feminino", "kids", "mma"] },
        { hora: "21:30", aula: "Jiu-Jitsu", tags: ["jiu-jitsu"] }
    ],
    "sexta": [
        { hora: "06:30", aula: "Jiu-Jitsu", tags: ["jiu-jitsu"] },
        { hora: "09:00", aula: "MMA Fem", tags: ["mma", "feminino"] },
        { hora: "10:00", aula: "Grappling / Jiu-Jitsu", tags: ["grappling", "jiu-jitsu"] },
        { hora: "16:50", aula: "Muay-Thai Kids", tags: ["muay-thai", "kids"] },
        { hora: "18:00", aula: "Jiu-Jitsu Comp / Graduação", tags: ["jiu-jitsu"] },
        { hora: "19:00", aula: "MMA Fem", tags: ["mma", "feminino"] },
        { hora: "20:00", aula: "Jiu-Jitsu Fem/Kids / MMA", tags: ["jiu-jitsu", "feminino", "kids", "mma"] },
        { hora: "21:30", aula: "Jiu-Jitsu", tags: ["jiu-jitsu"] }
    ],
    "sábado": [
        { hora: "10:00", aula: "Sparring", tags: ["sparring"] }
    ]
};

function checarAulaAgora() {
    const agora = new Date();
    const diaSemana = agora.toLocaleDateString('pt-BR', { weekday: 'long' }).toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""); // Remove acentos
    const hoje = horarios[diaSemana] || [];
    
    let aulaAtual = null;
    const agoraEmMinutos = agora.getHours() * 60 + agora.getMinutes();

    for (const slot of hoje) {
        const [horaInicio, minutoInicio] = slot.hora.split(':').map(Number);
        const inicioEmMinutos = horaInicio * 60 + minutoInicio;
        // SUGESTÃO: A duração da aula é assumida como 1 hora (60 minutos).
        // Se as aulas tiverem durações variáveis, considere adicionar uma propriedade 'duracao' ao objeto 'aula'.
        const fimEmMinutos = inicioEmMinutos + 60; 

        if (agoraEmMinutos >= inicioEmMinutos && agoraEmMinutos < fimEmMinutos) {
            aulaAtual = slot;
            break;
        }
    }
    
    const msg = document.getElementById("status-aula");
    if (msg) {
        if (aulaAtual) {
            msg.textContent = `Estamos abertos e te esperando! Agora está rolando: ${aulaAtual.aula}`;
            msg.classList.add('open');
            msg.classList.remove('closed');
        } else {
            msg.textContent = "Estamos fechados, mas prontos para o próximo treino. Confira nossos horários!";
            msg.classList.add('closed');
            msg.classList.remove('open');
        }
    }
}

function criarGradeHorarios() {
    const gridContainer = document.getElementById('horarios-grid');
    const filtrosContainer = document.getElementById('horarios-filtros');

    if (!gridContainer || !filtrosContainer) return;

    const diasSemana = ['segunda', 'terça', 'quarta', 'quinta', 'sexta', 'sábado'];
    const filtrosPrincipais = ['Jiu-Jitsu', 'Boxe', 'Muay Thai', 'Sanda', 'MMA', 'Kids', 'Grappling', 'Feminino', 'Sparring'];

    // --- Cria os botões de filtro ---
    const btnTodos = document.createElement('button');
    btnTodos.className = 'filtro-btn active';
    btnTodos.textContent = 'Ver Todos';
    btnTodos.dataset.filter = 'todos';
    filtrosContainer.appendChild(btnTodos);

    filtrosPrincipais.forEach(filtro => {
        const btn = document.createElement('button');
        btn.className = 'filtro-btn';
        btn.textContent = filtro;
        btn.dataset.filter = filtro.toLowerCase().replace(/ /g, '-');
        filtrosContainer.appendChild(btn);
    });

    // --- Cria os cards para cada dia da semana ---
    diasSemana.forEach(dia => {
        const diaCard = document.createElement('div');
        diaCard.className = 'dia-card';

        const titulo = document.createElement('h3');
        titulo.textContent = dia.charAt(0).toUpperCase() + dia.slice(1); // Capitaliza o nome do dia
        diaCard.appendChild(titulo);

        const listaAulas = document.createElement('ul');
        const aulasDoDia = horarios[dia];

        if (aulasDoDia && aulasDoDia.length > 0) {
            aulasDoDia.forEach(aula => {
                const itemLista = document.createElement('li');
                itemLista.innerHTML = `<strong>${aula.hora}</strong> - ${aula.aula}`;
                
                // Usa as tags para o data-modalidade
                itemLista.dataset.modalidade = aula.tags.join(' ');
                listaAulas.appendChild(itemLista);
            });
        }
        diaCard.appendChild(listaAulas);
        gridContainer.appendChild(diaCard);
    });

    // --- Adiciona a lógica de clique para os filtros ---
    filtrosContainer.addEventListener('click', e => {
        if (!e.target.classList.contains('filtro-btn')) return;

        filtrosContainer.querySelector('.active').classList.remove('active');
        e.target.classList.add('active');

        const filtro = e.target.dataset.filter;
        gridContainer.querySelectorAll('.dia-card li').forEach(li => {
            if (filtro === 'todos' || (li.dataset.modalidade && li.dataset.modalidade.includes(filtro))) {
                li.classList.remove('hidden');
            } else {
                li.classList.add('hidden');
            }
        });
    });
}
    
function setupContactModal() {
    const modal = document.getElementById('contact-form-modal');
    const openBtn = document.getElementById('open-form-btn');
    const closeBtn = document.getElementById('close-form-btn');

    if (!modal || !openBtn || !closeBtn) return;

    const openModal = () => modal.classList.add('visible');
    const closeModal = () => modal.classList.remove('visible');

    openBtn.addEventListener('click', openModal);
    closeBtn.addEventListener('click', closeModal);

    // Fecha o modal ao clicar fora dele
    modal.addEventListener('click', e => {
        if (e.target === modal) {
            closeModal();
        }
    });
}

document.addEventListener("DOMContentLoaded", () => {
    checarAulaAgora();
    criarGradeHorarios();
    setupContactModal();
});