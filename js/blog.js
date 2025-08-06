// Espera o conteúdo da página carregar completamente antes de executar o script
document.addEventListener('DOMContentLoaded', function() {

    // --- FUNCIONALIDADE 1: MENU MOBILE (HAMBÚRGUER) ---
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.menu');

    // Adiciona um "ouvinte" para o evento de clique no botão do menu
    menuToggle.addEventListener('click', function() {
        // Adiciona ou remove a classe 'active' da lista do menu
        // O CSS se encarregará de mostrar ou esconder o menu com base nessa classe
        navMenu.classList.toggle('active');
    });


    // --- FUNCIONALIDADE 2: FILTRO DE POSTS DO BLOG ---
    // Seleciona todos os botões de filtro
    const filterButtons = document.querySelectorAll('.filter-btn');
    // Seleciona todos os cards de post
    const postCards = document.querySelectorAll('.post-card');

    // Para cada botão de filtro, adiciona um "ouvinte" de clique
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove a classe 'active' de todos os botões para "limpar" a seleção
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Adiciona a classe 'active' apenas no botão que foi clicado
            this.classList.add('active');

            // Pega o valor do filtro do atributo 'data-filter' do botão clicado
            const filter = this.dataset.filter;

            // Para cada card de post, verifica se ele deve ser mostrado ou escondido
            postCards.forEach(card => {
                // Pega o texto da categoria do post
                const category = card.querySelector('.post-category').textContent;

                // Se o filtro for "Ver Todos" (all) OU a categoria do post for a mesma do filtro
                if (filter === 'all' || category === filter) {
                    card.style.display = 'block'; // Mostra o card
                } else {
                    card.style.display = 'none'; // Esconde o card
                }
            });
        });
    });

});