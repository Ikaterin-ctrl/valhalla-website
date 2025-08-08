document.addEventListener('DOMContentLoaded', () => {

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    function heroAnimation() {
        if (motionQuery.matches) return;

        const tl = gsap.timeline({ defaults: { ease: 'power3.out', duration: 1.2 } });

        tl.from('.hero-content h1', {
            y: 50,
            opacity: 0,
            delay: 0.3
        })
        .from('.hero-content .btn', {
            y: 20,
            opacity: 0,
            duration: 0.8
        }, '-=0.8')
        .from('.scroll-down-arrow', {
            y: -20,
            opacity: 0,
            duration: 0.8
        }, '-=0.8');

        gsap.to('.hero-visual img', {
            y: '20%',
            ease: 'none',
            scrollTrigger: {
                trigger: '.hero',
                start: 'top top',
                end: 'bottom top',
                scrub: true
            }
        });
    }

    function missionAnimation() {
        if (motionQuery.matches) return;

        gsap.from('#missao h2, #missao p', {
            y: 50,
            opacity: 0,
            duration: 1,
            stagger: 0.2,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '#missao',
                start: 'top 80%',
            }
        });
    }

    function modalitiesAnimation() {
        if (motionQuery.matches) return;

        gsap.from('.modalidades-home .card', {
            y: 50,
            opacity: 0,
            duration: 1,
            stagger: 0.2,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '.modalidades-home',
                start: 'top 80%',
            }
        });
    }

    function pageTransition() {
        const allLinks = document.querySelectorAll('a:not([target="_blank"]):not([href^="#"])');

        allLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                document.body.classList.add('fade-out');
                setTimeout(() => {
                    window.location.href = link.href;
                }, 500);
            });
        });
    }

    heroAnimation();
    missionAnimation();
    modalitiesAnimation();

    // New animation for modalities page
    function modalitiesPageAnimation() {
        if (motionQuery.matches) return;

        gsap.from('.modalidades-lista .modalidade-card', {
            y: 50,
            opacity: 0,
            duration: 1,
            stagger: 0.2,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '.modalidades-lista',
                start: 'top 80%',
            }
        });
    }

    function academiaAnimation() {
        if (motionQuery.matches) return;

        // Historia Valhalla
        gsap.from('.historia-valhalla h2, .historia-valhalla p, .historia-valhalla strong', {
            y: 50,
            opacity: 0,
            duration: 1,
            stagger: 0.2,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '.historia-valhalla',
                start: 'top 80%',
            }
        });

        // Valores
        gsap.from('.valores h2, .valores .valor', {
            y: 50,
            opacity: 0,
            duration: 1,
            stagger: 0.2,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '.valores',
                start: 'top 80%',
            }
        });

        // Legado Valhalla
        gsap.from('.legado-valhalla h2, .legado-valhalla p', {
            y: 50,
            opacity: 0,
            duration: 1,
            stagger: 0.2,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '.legado-valhalla',
                start: 'top 80%',
            }
        });

        // Estrutura e Equipe
        gsap.from('.estrutura-equipe h2, .membro-equipe, .espaco-academia', {
            y: 50,
            opacity: 0,
            duration: 1,
            stagger: 0.2,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '.estrutura-equipe',
                start: 'top 80%',
            }
        });

        // CTA Final
        gsap.from('.cta-final h2, .cta-final .btn-cta-big', {
            y: 50,
            opacity: 0,
            duration: 1,
            stagger: 0.2,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '.cta-final',
                start: 'top 80%',
            }
        });
    }

    modalitiesPageAnimation();
    academiaAnimation();

    function blogAnimation() {
        if (motionQuery.matches) return;

        gsap.from('.blog-header h1', {
            y: 50,
            opacity: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '.blog-header',
                start: 'top 80%',
            }
        });

        gsap.from('.filter-buttons button', {
            y: 20,
            opacity: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '.filter-buttons',
                start: 'top 90%',
            }
        });

        gsap.from('.post-card', {
            y: 50,
            opacity: 0,
            duration: 1,
            stagger: 0.2,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '.main-container',
                start: 'top 80%',
            }
        });
    }

    function contactPageAnimation() {
        if (motionQuery.matches) return;

        gsap.from('.horarios-header h2, .horarios-header p', {
            y: 50,
            opacity: 0,
            duration: 1,
            stagger: 0.2,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '.horarios-section',
                start: 'top 80%',
            }
        });

        gsap.from('.horarios-filtros button', {
            y: 20,
            opacity: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '.horarios-filtros',
                start: 'top 90%',
            }
        });

        gsap.from('.dia-card', {
            y: 50,
            opacity: 0,
            duration: 1,
            stagger: 0.2,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '.horarios-grid',
                start: 'top 80%',
            }
        });

        gsap.from('.contato-header h1, .contato-header p', {
            y: 50,
            opacity: 0,
            duration: 1,
            stagger: 0.2,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '.contato-section',
                start: 'top 80%',
            }
        });

        gsap.from('.info-item', {
            y: 50,
            opacity: 0,
            duration: 1,
            stagger: 0.2,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '.contato-info-lista',
                start: 'top 80%',
            }
        });

        gsap.from('.contato-actions .btn', {
            y: 20,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '.contato-actions',
                start: 'top 90%',
            }
        });

        gsap.from('.mapa-section iframe', {
            y: 50,
            opacity: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '.mapa-section',
                start: 'top 80%',
            }
        });
    }

    blogAnimation();
    contactPageAnimation();

    function lojaAnimation() {
        if (motionQuery.matches) return;

        gsap.from('.hero-sobre-content h1, .hero-sobre-content p', {
            y: 50,
            opacity: 0,
            duration: 1,
            stagger: 0.2,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '.hero-sobre',
                start: 'top 80%',
            }
        });

        gsap.from('section h2, section p', {
            y: 50,
            opacity: 0,
            duration: 1,
            stagger: 0.2,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: 'section:nth-of-type(2)',
                start: 'top 80%',
            }
        });
    }

    lojaAnimation();

    function modalityPageDetailsAnimation() {
        if (motionQuery.matches) return;

        gsap.from('.hero-modality-v2 .hero-text-content > *, .hero-modality-v2 .hero-media-content', {
            y: 50,
            opacity: 0,
            duration: 1,
            stagger: 0.2,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '.hero-modality-v2',
                start: 'top 80%',
            }
        });

        gsap.from('.modality-intro h2, .modality-intro p', {
            y: 50,
            opacity: 0,
            duration: 1,
            stagger: 0.2,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '.modality-intro',
                start: 'top 80%',
            }
        });

        gsap.from('.benefits-section h2, .benefit-card', {
            y: 50,
            opacity: 0,
            duration: 1,
            stagger: 0.2,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '.benefits-section',
                start: 'top 80%',
            }
        });

        gsap.from('.target-audience-section h2, .audience-profile', {
            y: 50,
            opacity: 0,
            duration: 1,
            stagger: 0.2,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '.target-audience-section',
                start: 'top 80%',
            }
        });

        gsap.from('.gallery-modality h2, .gallery-grid img', {
            y: 50,
            opacity: 0,
            duration: 1,
            stagger: 0.2,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '.gallery-modality',
                start: 'top 80%',
            }
        });

        gsap.from('.final-cta-section h2, .final-cta-section p, .final-cta-section .btn-cta', {
            y: 50,
            opacity: 0,
            duration: 1,
            stagger: 0.2,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '.final-cta-section',
                start: 'top 80%',
            }
        });
    }

    modalityPageDetailsAnimation();
    pageTransition();
});