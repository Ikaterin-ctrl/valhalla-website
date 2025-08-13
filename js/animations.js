document.addEventListener('DOMContentLoaded', () => {
  // Função para animar a sequência do Herói
  function animateHero() {
    const pretitle = document.querySelector('.hero-pretitle');
    const title = document.querySelector('.hero-content h1');
    const subtitle = document.querySelector('.hero-subtitle');
    const button = document.querySelector('.btn-hero');

    // Ordem da animação com delay (atraso) em milissegundos
    const sequence = [
      { element: pretitle, delay: 200 },
      { element: title, delay: 400 },
      { element: subtitle, delay: 600 },
      { element: button, delay: 800 }
    ];

    sequence.forEach(item => {
      if (item.element) {
        setTimeout(() => {
          item.element.classList.add('visible');
        }, item.delay);
      }
    });
  }

  // Função para lidar com o carregamento de imagens
  function handleImageLoading() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
      if (img.complete) {
        img.classList.add('loaded');
      } else {
        img.addEventListener('load', () => {
          img.classList.add('loaded');
        });
      }
    });
  }

  // Inicia a animação do herói assim que a página carrega
  animateHero();

  // Lida com o carregamento de imagens
  handleImageLoading();

  // Configuração do Intersection Observer para o resto da página
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // Para a animação não repetir
      }
    });
  }, {
    threshold: 0.1 // Ativa quando 10% do elemento está visível
  });

  // Seleciona todos os outros elementos para animar na rolagem
  // (Adicione a classe .animate-on-scroll neles no HTML)
  const elementsToAnimate = document.querySelectorAll('.animate-on-scroll');
  elementsToAnimate.forEach(el => observer.observe(el));
});

