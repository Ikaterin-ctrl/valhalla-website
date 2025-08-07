document.addEventListener('DOMContentLoaded', () => {

    // Verifica a preferência do usuário por movimento reduzido para acessibilidade
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    /**
     * Animação 1: Entrada da Seção Hero e Efeito Parallax
     * - Usa uma timeline do GSAP para a entrada do título e da seta.
     * - Usa o ScrollTrigger para criar um efeito de parallax na imagem de fundo.
     */
    function heroAnimation() {
        if (motionQuery.matches) return; // Pula a animação se o usuário preferir

        // Timeline para a entrada sequencial dos elementos
        const tl = gsap.timeline({ defaults: { ease: 'power3.out', duration: 1.2 } });

        tl.from('.hero-content h1', {
            y: 50,
            opacity: 0,
            delay: 0.3
        })
        .from('.scroll-down-arrow', {
            y: -20,
            opacity: 0,
            duration: 0.8
        }, '-=0.8'); // Anima a seta quase ao mesmo tempo que o título

        // Efeito Parallax na imagem do Hero ao rolar a página
        gsap.to('.hero-visual img', {
            y: '20%', // Move a imagem para baixo 20% da sua altura
            ease: 'none',
            scrollTrigger: {
                trigger: '.hero',
                start: 'top top', // Inicia quando o topo do hero atinge o topo da tela
                end: 'bottom top', // Termina quando o final do hero atinge o topo da tela
                scrub: true // Suaviza a animação atrelando-a ao scroll
            }
        });
    }

    /**
     * Animação 3: Transição Suave (Fade-out) entre Páginas
     * SUGESTÃO: Para uma transição mais robusta e acessível, considere usar a API View Transitions
     * (se o suporte do navegador for suficiente) ou bibliotecas dedicadas como Highway.js ou Swup.js.
     * Isso pode oferecer mais controle sobre o estado da página durante a transição e melhor feedback ao usuário.
     */
    function pageTransition() {
        // Seleciona todos os links que não abrem em nova aba e não são âncoras
        const allLinks = document.querySelectorAll('a:not([target="_blank"]):not([href^="#"])');

        allLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault(); // Previne a navegação imediata
                document.body.classList.add('fade-out'); // Adiciona a classe para o efeito
                setTimeout(() => {
                    window.location.href = link.href; // Navega após a animação
                }, 500); // Duração deve ser a mesma da transição no CSS
            });
        });
    }

    // Inicializa as funções de animação
    heroAnimation();
    pageTransition();
});