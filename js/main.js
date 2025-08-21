document.addEventListener('DOMContentLoaded', () => {
    setupContactModal();
    setupTabs();
    setupFaqAccordion();
    setupLightbox();
    setupScrollAnimations(); // Call the new function
    setupResponsiveTables(); // Add this call
});

function setupResponsiveTables() {
    const tables = document.querySelectorAll('.schedule-table');
    tables.forEach(table => {
        const headers = Array.from(table.querySelectorAll('thead th')).map(th => th.textContent);
        table.querySelectorAll('tbody tr').forEach(row => {
            row.querySelectorAll('td').forEach((td, index) => {
                td.setAttribute('data-label', headers[index]);
            });
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

function setupTabs() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTab = button.dataset.tab;

            tabButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            tabContents.forEach(content => {
                if (content.id === `${targetTab}-tab-content`) {
                    content.classList.add('active');
                } else {
                    content.classList.remove('active');
                }
            });
        });
    });
}

function setupFaqAccordion() {
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const faqItem = question.closest('.faq-item');
            const wasActive = faqItem.classList.contains('active');

            // Close all other active FAQ items
            document.querySelectorAll('.faq-item.active').forEach(item => {
                if (item !== faqItem) {
                    item.classList.remove('active');
                    item.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
                }
            });

            // Toggle the clicked FAQ item
            if (!wasActive) {
                faqItem.classList.add('active');
                question.setAttribute('aria-expanded', 'true');
            } else {
                faqItem.classList.remove('active');
                question.setAttribute('aria-expanded', 'false');
            }
        });
    });
}

function setupLightbox() {
    const lightboxOverlay = document.getElementById('lightbox-overlay');
    const lightboxImage = document.getElementById('lightbox-image');
    const lightboxClose = document.querySelector('.lightbox-close');
    const mediaCards = document.querySelectorAll('.media-card');

    if (!lightboxOverlay || !lightboxImage || !lightboxClose || mediaCards.length === 0) return;

    mediaCards.forEach(card => {
        card.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent default link behavior
            const imageUrl = card.getAttribute('href');
            const imageAlt = card.querySelector('img').getAttribute('alt');
            lightboxImage.src = imageUrl;
            lightboxImage.alt = imageAlt;
            lightboxOverlay.classList.add('visible');
        });
    });

    lightboxClose.addEventListener('click', () => {
        lightboxOverlay.classList.remove('visible');
    });

    lightboxOverlay.addEventListener('click', (e) => {
        if (e.target === lightboxOverlay) {
            lightboxOverlay.classList.remove('visible');
        }
    });
}

function setupScrollAnimations() {
    const animateElements = document.querySelectorAll('.animate-on-scroll');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Stop observing once visible
            }
        });
    }, {
        threshold: 0.1 // Trigger when 10% of the element is visible
    });

    animateElements.forEach(element => {
        observer.observe(element);
    });
}