// MOTOEVAKUATOR HEADER COMPONENT
// 3 pages: index, gallery, fibis

document.addEventListener('DOMContentLoaded', function() {
    const headerMount = document.getElementById('header-mount');
    if (!headerMount) return;

    const currentPage = getCurrentPage();
    const isHome = currentPage === 'index';
    const homePrefix = isHome ? '' : 'index.html';
    const servicePages = ['motoevakuator-kiev', 'evakuaciya-moto-kiev',
                          'perevezennya-moto-ukraina', 'perevezennya-kvadrocikla'];
    const isServicePage = servicePages.indexOf(currentPage) !== -1;

    const mobileOverlayHTML = `
            <div class="mobile-nav-overlay">
                <div class="mobile-nav-container">
                    <button class="mobile-close" aria-label="Закрити меню">×</button>
                    <nav class="mobile-nav">
                        <ul>
                            <li><a href="index.html" class="mobile-nav-link ${currentPage === 'index' ? 'active' : ''}">Головна</a></li>
                            <li class="mobile-nav-group">
                                <span class="mobile-nav-heading">Послуги</span>
                                <ul class="mobile-nav-sublist">
                                    <li><a href="motoevakuator-kiev.html" class="mobile-nav-link mobile-nav-sublink ${currentPage === 'motoevakuator-kiev' ? 'active' : ''}">Мотоэвакуатор Київ</a></li>
                                    <li><a href="evakuaciya-moto-kiev.html" class="mobile-nav-link mobile-nav-sublink ${currentPage === 'evakuaciya-moto-kiev' ? 'active' : ''}">Евакуація мото</a></li>
                                    <li><a href="perevezennya-moto-ukraina.html" class="mobile-nav-link mobile-nav-sublink ${currentPage === 'perevezennya-moto-ukraina' ? 'active' : ''}">Перевезення по Україні</a></li>
                                    <li><a href="perevezennya-kvadrocikla.html" class="mobile-nav-link mobile-nav-sublink ${currentPage === 'perevezennya-kvadrocikla' ? 'active' : ''}">Квадроцикли та ATV</a></li>
                                </ul>
                            </li>
                            <li><a href="${homePrefix}#prices" class="mobile-nav-link mobile-nav-anchor">Ціни</a></li>
                            <li><a href="${homePrefix}#about" class="mobile-nav-link mobile-nav-anchor">Про нас</a></li>
                            <li><a href="${homePrefix}#contacts" class="mobile-nav-link mobile-nav-anchor">Контакти</a></li>
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
    `;

    const headerHTML = `
        <header class="header">
            <div class="container header-container">
                <a href="index.html" class="header-logo">
                    <img src="images/logo-mark.webp" alt="MotoEvakuator — перевезення мотоциклів" width="366" height="248" decoding="async">
                </a>

                <nav class="header-nav desktop-nav" aria-label="Основна навігація">
                    <ul>
                        <li><a href="index.html" class="nav-link ${currentPage === 'index' ? 'active' : ''}">Головна</a></li>
                        <li class="nav-dropdown">
                            <details>
                                <summary class="nav-link ${isServicePage ? 'active' : ''}">Послуги <span class="nav-caret" aria-hidden="true">▾</span></summary>
                                <ul class="nav-dropdown__list">
                                    <li><a href="motoevakuator-kiev.html" class="nav-dropdown__link">Мотоэвакуатор Київ</a></li>
                                    <li><a href="evakuaciya-moto-kiev.html" class="nav-dropdown__link">Евакуація мото</a></li>
                                    <li><a href="perevezennya-moto-ukraina.html" class="nav-dropdown__link">Перевезення по Україні</a></li>
                                    <li><a href="perevezennya-kvadrocikla.html" class="nav-dropdown__link">Квадроцикли та ATV</a></li>
                                </ul>
                            </details>
                        </li>
                        <li><a href="gallery.html" class="nav-link ${currentPage === 'gallery' ? 'active' : ''}">Галерея</a></li>
                        <li><a href="fibis.html" class="nav-link ${currentPage === 'fibis' ? 'active' : ''}">Fibis</a></li>
                    </ul>
                </nav>

                <nav class="header-nav desktop-nav header-subnav" aria-label="Розділи сторінки">
                    <ul>
                        <li><a href="${homePrefix}#prices" class="nav-link nav-link-sub">Ціни</a></li>
                        <li><a href="${homePrefix}#about" class="nav-link nav-link-sub">Про нас</a></li>
                        <li><a href="${homePrefix}#contacts" class="nav-link nav-link-sub">Контакти</a></li>
                    </ul>
                </nav>

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

        </header>
    `;

    headerMount.innerHTML = headerHTML;

    // Оверлей меню держим ВНЕ <header>: у .header.scrolled есть backdrop-filter,
    // а он делает элемент containing block для position:fixed — из-за этого
    // оверлей сжимался до высоты шапки и меню «не открывалось» после прокрутки.
    document.body.insertAdjacentHTML('beforeend', mobileOverlayHTML);

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

    // Выпадающее меню «Послуги»: закрываем при клике вне и после перехода
    document.addEventListener('click', function(e) {
        document.querySelectorAll('.nav-dropdown details[open]').forEach(function(d) {
            if (!d.contains(e.target)) d.removeAttribute('open');
        });
    });

    document.querySelectorAll('.nav-dropdown__link').forEach(function(a) {
        a.addEventListener('click', function() {
            const d = a.closest('details');
            if (d) d.removeAttribute('open');
        });
    });

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
                padding: 10px 0;
            }

            .header.scrolled {
                background-color: rgba(17, 17, 17, 0.95);
                backdrop-filter: blur(10px);
                padding: 8px 0;
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
                height: 62px;
                width: auto;
                max-width: 260px;
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

            @media (min-width: 1280px) {
                .header-subnav {
                    display: block;
                }

            /* ===== Випадаюче меню «Послуги» ===== */
            .nav-dropdown {
                position: relative;
            }

            .nav-dropdown details {
                position: relative;
            }

            .nav-dropdown summary {
                cursor: pointer;
                list-style: none;
                display: flex;
                align-items: center;
                gap: 5px;
                padding: 8px 0;
            }

            .nav-dropdown summary::-webkit-details-marker {
                display: none;
            }

            .nav-caret {
                font-size: 0.6875rem;
                color: var(--text-muted);
                transition: transform var(--transition);
            }

            .nav-dropdown details[open] .nav-caret {
                transform: rotate(180deg);
            }

            .header-nav ul.nav-dropdown__list {
                position: absolute;
                top: calc(100% + 6px);
                left: -14px;
                display: block;
                gap: 0;
                min-width: 245px;
                margin: 0;
                padding: 8px 0;
                list-style: none;
                background-color: var(--surface);
                border: 1px solid var(--border);
                border-radius: var(--radius);
                box-shadow: 0 14px 34px rgba(0, 0, 0, 0.5);
                z-index: 1005;
            }

            .nav-dropdown__list li {
                margin: 0;
            }

            .nav-dropdown__link {
                display: block;
                padding: 11px 18px;
                color: var(--text);
                font-size: 0.9375rem;
                white-space: nowrap;
            }

            .nav-dropdown__link:hover {
                background-color: rgba(255, 69, 0, 0.12);
                color: var(--accent);
            }

            /* ===== Група «Послуги» у мобільному меню ===== */
            .mobile-nav-group {
                margin-bottom: 22px;
            }

            .mobile-nav-heading {
                display: block;
                margin-bottom: 10px;
                font-size: 0.75rem;
                letter-spacing: 0.08em;
                text-transform: uppercase;
                color: var(--text-muted);
            }

            .mobile-nav-sublist {
                list-style: none;
                margin: 0;
                padding: 0;
            }

            .mobile-nav-sublist li {
                margin-bottom: 12px;
            }

            .mobile-nav-sublink {
                font-size: 1.05rem;
                color: var(--text-muted);
            }

            .mobile-nav-sublink.active,
            .mobile-nav-sublink:hover {
                color: var(--accent);
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

            @media (max-width: 1279px) {
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
                    height: 54px;
                    max-width: 210px;
                }
            }
        </style>
    `;

    document.head.insertAdjacentHTML('beforeend', styles);
}
