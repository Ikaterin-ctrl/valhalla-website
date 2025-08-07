document.addEventListener('DOMContentLoaded', function() {
    // SUGESTÃO: A lógica de filtro de horários foi movida para 'js/contato.js'
    // para melhor organização e para evitar que este script global execute lógica
    // desnecessária em páginas onde os elementos de horário não existem.

    // Lógica para o menu mobile (hambúrguer)
    const menuToggle = document.querySelector('.menu-toggle');
    const menu = document.querySelector('.menu');

    if (menuToggle && menu) {
        menuToggle.addEventListener('click', () => {
            menu.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });

        // Opcional: Fecha o menu ao clicar em um link
        menu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                menu.classList.remove('active');
                menuToggle.classList.remove('active');
            });
        });
    }
});