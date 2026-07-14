// MOTOEVAKUATOR HEADER COMPONENT
// 3 pages: index, gallery, fibis

document.addEventListener('DOMContentLoaded', function() {
    const headerMount = document.getElementById('header-mount');
    if (!headerMount) return;

    const currentPage = getCurrentPage();
    const isHome = currentPage === 'index';

    const headerHTML = `
        <header class="header">
            <div class="container header-container">
                <a href="index.html" class="header-logo">
                    <img src="images/logo.png" alt="MotoEvakuator" width="120" height="40" decoding="async">
                </a>

                <nav class="header-nav desktop-nav">
                    <ul>
                        <li><a href="index.html" class="nav-link ${currentPage === 'index' ? 'active' : ''}">Головна</a></li>
                        <li><a href="gallery.html" class="nav-link ${currentPage === 'gallery' ? 'active' : ''}">Галерея</a></li>
                        <li><a href="fibis.html" class="nav-link ${currentPage === 'fibis' ? 'active' : ''}">Fibis</a></li>
                    </ul>
                </nav>

                ${isHome ? `
                <nav class="header-nav desktop-nav header-subnav" aria-label="Розділи головної">
                    <ul>
                        <li><a href="#services" class="nav-link nav-link-sub">Послуги</a></li>
                        <li><a href="#prices" class="nav-link nav-link-sub">Ціни</a></li>
                        <li><a href="#about" class="nav-link nav-link-sub">Про нас</a></li>
                        <li><a href="#contacts" class="nav-link nav-link-sub">Контакти</a></li>
                    </ul>
                </nav>
                ` : ''}

                <div class="header-right">
                    <a href="tel:+380971008810" class="header-phone">+380 97 100 88 10</a>
                    <a href="tel:+380971008810" class="btn btn-primary">Замовити</a>
                </div>

                <button class="mobile-menu-toggle" aria-label="Відкрити меню">
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </div>

            <div class="mobile-nav-overlay">
                <div class="mobile-nav-container">
                    <button class="mobile-close" aria-label="Закрити меню">×</button>
                    <nav class="mobile-nav">
                        <ul>
                            <li><a href="index.html" class="mobile-nav-link ${currentPage === 'index' ? 'active' : ''}">Головна</a></li>
                            ${isHome ? `
                            <li><a href="#services" class="mobile-nav-link mobile-nav-anchor">Послуги</a></li>
                            <li><a href="#prices" class="mobile-nav-link mobile-nav-anchor">Ціни</a></li>
                            <li><a href="#about" class="mobile-nav-link mobile-nav-anchor">Про нас</a></li>
                            <li><a href="#contacts" class="mobile-nav-link mobile-nav-anchor">Контакти</a></li>
                            ` : ''}
                            <li><a href="gallery.html" class="mobile-nav-link ${currentPage === 'gallery' ? 'active' : ''}">Галерея</a></li>
                            <li><a href="fibis.html" class="mobile-nav-link ${currentPage === 'fibis' ? 'active' : ''}">Fibis</a></li>
                        </ul>
                    </nav>
                    <div class="mobile-contact">
                        <a href="tel:+380971008810" class="mobile-phone">+380 97 100 88 10</a>
                        <a href="tel:+380971008810" class="btn btn-primary">Замовити перевезення</a>
                    </div>
                </div>
            </div>
        </header>
    `;

    headerMount.innerHTML = headerHTML;
    initHeader();
});

function getCurrentPage() {
    const path = window.location.pathname;
    const page = path.split('/').pop().replace('.html', '').replace('.htm', '');

    if (page === '' || page === 'index') return 'index';

    const pageMap = {
        index: 'index',
        gallery: 'gallery',
        fibis: 'fibis',
        services: 'index',
        about: 'index',
        contacts: 'index'
    };

    return pageMap[page] || page;
}

function initHeader() {
    const header = document.querySelector('.header');
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const mobileOverlay = document.querySelector('.mobile-nav-overlay');
    const mobileClose = document.querySelector('.mobile-close');
    const mobileLinks = document.querySelectorAll('.mobile-nav-link, .mobile-nav-anchor');

    if (!header) return;

    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 60) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    if (mobileToggle && mobileOverlay) {
        mobileToggle.addEventListener('click', function() {
            mobileOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }

    function closeMobileMenu() {
        if (mobileOverlay) {
            mobileOverlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    if (mobileClose) {
        mobileClose.addEventListener('click', closeMobileMenu);
    }

    mobileLinks.forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });

    if (mobileOverlay) {
        mobileOverlay.addEventListener('click', function(e) {
            if (e.target === mobileOverlay) closeMobileMenu();
        });
    }

    addHeaderStyles();
}

function addHeaderStyles() {
    const styleId = 'header-styles';
    if (document.getElementById(styleId)) return;

    const styles = `
        <style id="${styleId}">
            .header {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                z-index: 1000;
                background-color: var(--surface);
                border-bottom: 1px solid var(--border);
                transition: all var(--transition);
                padding: 16px 0;
            }

            .header.scrolled {
                background-color: rgba(17, 17, 17, 0.95);
                backdrop-filter: blur(10px);
                padding: 12px 0;
                box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
            }

            .header-container {
                display: flex;
                align-items: center;
                justify-content: space-between;
                gap: 16px;
                flex-wrap: wrap;
            }

            .header-logo {
                flex-shrink: 0;
                display: flex;
                align-items: center;
            }

            .header-logo img {
                display: block;
                height: 40px;
                width: auto;
                max-width: 140px;
                object-fit: contain;
            }

            .header-nav ul {
                display: flex;
                gap: 20px;
                list-style: none;
                margin: 0;
                padding: 0;
            }

            .nav-link {
                color: var(--text);
                font-weight: 500;
                font-size: 0.9375rem;
                position: relative;
                padding: 8px 0;
                transition: color var(--transition);
            }

            .nav-link-sub {
                font-size: 0.8125rem;
                color: var(--text-muted);
            }

            .nav-link:hover,
            .nav-link.active {
                color: var(--accent);
            }

            .nav-link.active::after {
                content: '';
                position: absolute;
                bottom: -2px;
                left: 0;
                right: 0;
                height: 2px;
                background-color: var(--accent);
                border-radius: 1px;
            }

            .header-subnav {
                display: none;
            }

            @media (min-width: 1100px) {
                .header-subnav {
                    display: block;
                }

                .header-subnav ul {
                    gap: 16px;
                }
            }

            .header-right {
                display: flex;
                align-items: center;
                gap: 16px;
                margin-left: auto;
            }

            .header-phone {
                color: var(--text);
                font-weight: 600;
                font-size: 0.875rem;
                transition: color var(--transition);
                white-space: nowrap;
            }

            .header-phone:hover {
                color: var(--accent);
            }

            .header-right .btn {
                padding: 10px 20px;
                min-height: 44px;
            }

            .mobile-menu-toggle {
                display: none;
                flex-direction: column;
                justify-content: space-between;
                width: 32px;
                height: 24px;
                background: none;
                border: none;
                cursor: pointer;
                padding: 0;
            }

            .mobile-menu-toggle span {
                display: block;
                width: 100%;
                height: 2px;
                background-color: var(--text);
                transition: all var(--transition);
                border-radius: 1px;
            }

            .mobile-nav-overlay {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background-color: rgba(10, 10, 10, 0.98);
                z-index: 1001;
                opacity: 0;
                visibility: hidden;
                transition: all var(--transition);
                display: flex;
                align-items: flex-start;
                justify-content: center;
                overflow-y: auto;
                -webkit-overflow-scrolling: touch;
                padding: 24px 0;
            }

            .mobile-nav-overlay.active {
                opacity: 1;
                visibility: visible;
            }

            .mobile-nav-container {
                width: 100%;
                max-width: 480px;
                padding: 40px;
                position: relative;
                margin: auto;
            }

            .mobile-close {
                position: absolute;
                top: 20px;
                right: 20px;
                background: none;
                border: none;
                color: var(--text);
                font-size: 32px;
                cursor: pointer;
                width: 40px;
                height: 40px;
                display: flex;
                align-items: center;
                justify-content: center;
            }

            .mobile-nav ul {
                list-style: none;
                margin: 0;
                padding: 0;
                text-align: center;
            }

            .mobile-nav li {
                margin-bottom: 20px;
            }

            .mobile-nav-link {
                color: var(--text);
                font-size: 1.35rem;
                font-weight: 500;
                transition: color var(--transition);
            }

            .mobile-nav-link:hover,
            .mobile-nav-link.active {
                color: var(--accent);
            }

            .mobile-contact {
                margin-top: 40px;
                text-align: center;
            }

            .mobile-phone {
                display: block;
                color: var(--text);
                font-size: 1.25rem;
                font-weight: 600;
                margin-bottom: 24px;
            }

            @media (max-width: 1099px) {
                .header-nav.desktop-nav:not(.header-subnav) {
                    display: none;
                }

                .header-right {
                    display: none;
                }

                .mobile-menu-toggle {
                    display: flex;
                }
            }

            @media (max-width: 768px) {
                .header-logo img {
                    height: 32px;
                }
            }
        </style>
    `;

    document.head.insertAdjacentHTML('beforeend', styles);
}
