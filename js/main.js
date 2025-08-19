document.addEventListener('DOMContentLoaded', () => {
    setupContactModal();
    setupTabs();
    setupFaqAccordion();
});

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
            const faqQuestions = document.querySelectorAll('.faq-question');
            faqQuestions.forEach(q => {
                const faqItem = q.closest('.faq-item');
                if (faqItem !== question.closest('.faq-item') && faqItem.classList.contains('active')) {
                    faqItem.classList.remove('active');
                }
            });
            question.closest('.faq-item').classList.toggle('active');
        });
    });
}