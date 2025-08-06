document.addEventListener('DOMContentLoaded', function() {
    // Lógica para o filtro de horários na página de horários
    const filtroButtons = document.querySelectorAll('#horarios-filtros .filtro-btn');
    const aulas = document.querySelectorAll('#grade-horarios .aula');

    if (filtroButtons.length > 0 && aulas.length > 0) {
        filtroButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Gerencia a classe 'active' para o feedback visual
                filtroButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');

                const filter = this.getAttribute('data-filter');

                // Mostra ou esconde as aulas de acordo com o filtro
                aulas.forEach(aula => {
                    if (filter === 'all' || aula.classList.contains(filter)) {
                        aula.classList.remove('hidden');
                    } else {
                        aula.classList.add('hidden');
                    }
                });
            });
        });
    }

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