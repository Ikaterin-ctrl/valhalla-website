document.addEventListener('DOMContentLoaded', () => {
    const animateOnScrollElements = document.querySelectorAll('.animate-on-scroll, .hidden');

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

    animateOnScrollElements.forEach(element => {
        observer.observe(element);
    });
});