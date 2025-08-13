document.addEventListener('DOMContentLoaded', () => {
    const headerPlaceholder = document.getElementById('header-placeholder');
    const footerPlaceholder = document.getElementById('footer-placeholder');
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

    if (headerPlaceholder) {
        fetch('header.html')
            .then(response => response.text())
            .then(data => {
                headerPlaceholder.innerHTML = data;
                // Set active link
                const navLinks = document.querySelectorAll('.menu a');
                navLinks.forEach(link => {
                    if (link.getAttribute('href') === currentPage) {
                        link.classList.add('active');
                    }
                });

                // Initialize mobile menu logic
                const menuToggle = document.querySelector('.menu-toggle');
                const menu = document.querySelector('.menu');
                if (menuToggle && menu) {
                    menuToggle.addEventListener('click', () => {
                        menu.classList.toggle('active');
                        menuToggle.classList.toggle('active');
                    });
                    // Optional: Close menu on link click
                    menu.querySelectorAll('a').forEach(link => {
                        link.addEventListener('click', () => {
                            if (menu.classList.contains('active')) {
                                menu.classList.remove('active');
                                menuToggle.classList.remove('active');
                            }
                        });
                    });
                }
            });
    }

    if (footerPlaceholder) {
        fetch('footer.html')
            .then(response => response.text())
            .then(data => {
                footerPlaceholder.innerHTML = data;
            });
    }
});