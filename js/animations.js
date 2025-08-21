// GSAP Animations for Modality Pages

function animateModalityPage() {
    gsap.registerPlugin(ScrollTrigger);

    // Hero Section Animation
    gsap.from(".hero-overlay h1", {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power3.out"
    });
    gsap.from(".hero-overlay p", {
        opacity: 0,
        y: 50,
        duration: 1,
        delay: 0.3,
        ease: "power3.out"
    });

    // Section Title Animation
    gsap.utils.toArray(".modality-section .section-title").forEach(title => {
        gsap.from(title, {
            opacity: 0,
            x: -100,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
                trigger: title,
                start: "top 80%",
                toggleActions: "play none none none"
            }
        });
    });

    // Card Animations (For Whom & Benefits)
    gsap.utils.toArray(".for-whom-item, .benefit-card").forEach(card => {
        gsap.from(card, {
            opacity: 0,
            scale: 0.8,
            y: 50,
            duration: 0.8,
            ease: "back.out(1.7)",
            scrollTrigger: {
                trigger: card,
                start: "top 85%",
                toggleActions: "play none none none"
            }
        });
    });

    // Gallery Image Hover Animation
    gsap.utils.toArray(".gallery-grid img").forEach(img => {
        // Create a GSAP animation that is paused by default
        const hoverAnim = gsap.to(img, {
            scale: 1.05,
            duration: 0.3,
            paused: true, // Keep it paused
            ease: "power1.out"
        });

        // Add event listeners to play/reverse the animation on hover
        img.addEventListener('mouseenter', () => hoverAnim.play());
        img.addEventListener('mouseleave', () => hoverAnim.reverse());
    });

    // Optional: Add animation for the final CTA button
    gsap.from(".final-cta-section .btn-cta", {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
            trigger: ".final-cta-section",
            start: "top 80%",
            toggleActions: "play none none none"
        }
    });
}

// Call the animation function when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Ensure GSAP and ScrollTrigger are loaded before calling the function
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        animateModalityPage();
    }
});