document.addEventListener('DOMContentLoaded', () => {
    const headerPlaceholder = document.getElementById('header-placeholder');
    const footerPlaceholder = document.getElementById('footer-placeholder');
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

    // Verifica se a página está em um subdiretório
    const isSubdirectory = window.location.pathname.includes('/modalidades/') || window.location.pathname.includes('/blog/');
    const basePath = isSubdirectory ? '../' : './';

    const handleImageLoading = (container) => {
        const images = container.querySelectorAll('img');
        images.forEach(img => {
            if (img.complete) {
                img.classList.add('loaded');
            } else {
                img.addEventListener('load', () => {
                    img.classList.add('loaded');
                });
            }
        });
    };

    if (headerPlaceholder) {
        fetch(`${basePath}header.html`)
            .then(response => response.text())
            .then(data => {
                headerPlaceholder.innerHTML = data;
                handleImageLoading(headerPlaceholder);
                
                // Ajusta os caminhos dos links e imagens no header
                const headerLinks = headerPlaceholder.querySelectorAll('a');
                const headerImages = headerPlaceholder.querySelectorAll('img');

                headerLinks.forEach(link => {
                    const href = link.getAttribute('href');
                    if (href && !href.startsWith('http') && !href.startsWith('#')) {
                        link.setAttribute('href', `${basePath}${href}`);
                    }
                });

                headerImages.forEach(img => {
                    const src = img.getAttribute('src');
                    if (src && !src.startsWith('http')) {
                        img.setAttribute('src', `${basePath}${src}`);
                    }
                });


                // Set active link
                const navLinks = document.querySelectorAll('.menu a');
                navLinks.forEach(link => {
                    // Compara o final do href com o nome da página atual
                    if (link.getAttribute('href').endsWith(currentPage)) {
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
        fetch(`${basePath}footer.html`)
            .then(response => response.text())
            .then(data => {
                footerPlaceholder.innerHTML = data;
                handleImageLoading(footerPlaceholder);

                // Ajusta os caminhos no footer
                const footerLinks = footerPlaceholder.querySelectorAll('a');
                const footerImages = footerPlaceholder.querySelectorAll('img');

                footerLinks.forEach(link => {
                    const href = link.getAttribute('href');
                    if (href && !href.startsWith('http') && !href.startsWith('#')) {
                        link.setAttribute('href', `${basePath}${href}`);
                    }
                });

                footerImages.forEach(img => {
                    const src = img.getAttribute('src');
                    if (src && !src.startsWith('http')) {
                        img.setAttribute('src', `${basePath}${src}`);
                    }
                });
            });
    }

    // Handle images in the main content
    handleImageLoading(document.body);
});