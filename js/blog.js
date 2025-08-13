// Espera o conteúdo da página carregar completamente antes de executar o script
document.addEventListener('DOMContentLoaded', function() {

    // SUGESTÃO: A lógica do menu mobile foi movida para 'js/script.js' para evitar duplicação
    // e garantir que o menu funcione consistentemente em todas as páginas.

    // --- FUNCIONALIDADE: FILTRO DE POSTS DO BLOG ---
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

                // SUGESTÃO: Em vez de manipular diretamente 'style.display', considere usar
                // classes CSS (ex: 'hidden-post') e alterná-las. Isso permite que o CSS
                // controle a transição de visibilidade (fade-in/out) e mantém a separação
                // de preocupações entre JS (lógica) e CSS (apresentação).
                if (filter === 'all' || category === filter) {
                    card.classList.remove('hidden-post'); // Show the card
                } else {
                    card.classList.add('hidden-post'); // Hide the card
                }
            });
        });
    });

});