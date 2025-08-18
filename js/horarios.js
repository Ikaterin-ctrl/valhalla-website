document.addEventListener('DOMContentLoaded', () => {
    const filterButtons = document.querySelectorAll('#horarios-filtros .filtro-btn');
    const tableRows = document.querySelectorAll('#grade-horarios tbody tr');

    // Se não houver botões de filtro, não faz nada
    if (filterButtons.length === 0) {
        return;
    }

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.dataset.filter;

            // Remove a classe 'active' de todos os botões e a adiciona ao clicado
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // Percorre todas as linhas da tabela
            tableRows.forEach(row => {
                if (filter === 'all') {
                    row.style.display = ''; // Mostra a linha
                } else {
                    // Verifica se a linha tem a classe do filtro
                    if (row.classList.contains(filter)) {
                        row.style.display = ''; // Mostra a linha
                    } else {
                        row.style.display = 'none'; // Esconde a linha
                    }
                }
            });
        });
    });
});
