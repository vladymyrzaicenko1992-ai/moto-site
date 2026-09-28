// MOTOEVAKUATOR FOOTER COMPONENT
// Injects dark premium footer with 3 columns

document.addEventListener('DOMContentLoaded', function() {
    // Get the mount point
    const footerMount = document.getElementById('footer-mount');
    if (!footerMount) return;
    
    // Get current year for copyright
    const currentYear = new Date().getFullYear();
    
    // Create footer HTML
    const footerHTML = `
        <footer class="footer">
            <div class="container">
                <div class="footer-grid">
                    <!-- Column 1: Brand -->
                    <div class="footer-column">
                        <a href="index.html" class="footer-logo">
                            <img src="images/logo-full.webp" alt="MotoEvakuator — перевезення мотоциклів по Україні" width="366" height="318" decoding="async">
                        </a>
                        <p class="footer-tagline">Ваш мотоцикл у надійних руках</p>
                        <div class="footer-stats">
                            <p><span class="stat-number">5000</span> перевезень</p>
                            <p><span class="stat-number">24/7</span> роботи</p>
                            <p>Партнер <strong>Motoservice Fibis</strong></p>
                        </div>
                    </div>
                    
                    <!-- Column 2: Navigation -->
                    <div class="footer-column">
                        <h3 class="footer-heading">Навігація</h3>
                        <nav class="footer-nav">
                            <ul>
                                <li><a href="index.html">Головна</a></li>
                                <li><a href="index.html#services">Послуги</a></li>
                                <li><a href="index.html#about">Про нас</a></li>
                                <li><a href="index.html#contacts">Контакти</a></li>
                                <li><a href="gallery.html">Галерея</a></li>
                                <li><a href="fibis.html">Fibis</a></li>
                            </ul>
                        </nav>
                    </div>

                    <div class="footer-column">
                        <h3 class="footer-heading">Послуги</h3>
                        <nav class="footer-nav">
                            <ul>
                                <li><a href="motoevakuator-kiev.html">Мотоевакуатор Київ</a></li>
                                <li><a href="evakuaciya-moto-kiev.html">Евакуація мото</a></li>
                                <li><a href="perevezennya-moto-ukraina.html">Перевезення по Україні</a></li>
                                <li><a href="perevezennya-kvadrocikla.html">Квадроцикли та ATV</a></li>
                                <li><a href="cina-perevezennia-moto.html">Ціна перевезення</a></li>
                                <li><a href="perevezennya-moto-kyiv-lviv.html">Київ — Львів</a></li>
                                <li><a href="perevezennya-moto-kyiv-odesa.html">Київ — Одеса</a></li>
                                <li><a href="perevezennya-moto-kyiv-kharkiv.html">Київ — Харків</a></li>
                                <li><a href="perevezennya-moto-kyiv-dnipro.html">Київ — Дніпро</a></li>
                                <li><a href="perevezennya-moto-evropa.html">Перевезення до Європи</a></li>
                                <li><a href="evakuaciya-moto-pislya-dtp.html">Евакуація після ДТП</a></li>
                                <li><a href="dostavka-moto-z-salonu.html">Доставка з салону</a></li>
                                <li><a href="perevezennya-moto-na-zberigannya.html">Перевезення на зберігання</a></li>
                                <li><a href="perevezennya-skutera-ta-mopeda.html">Скутери та мопеди</a></li>
                                <li><a href="perevezennya-elektrobayka.html">Електробайки</a></li>
                                <li><a href="kilka-moto-odnym-rejsom.html">Кілька мото одним рейсом</a></li>
                                <li><a href="z-pidzemnoho-parkingu.html">З підземного паркінгу</a></li>
                                <li><a href="novyny.html">Новини</a></li>
                            </ul>
                        </nav>
                    </div>
                    
                    <!-- Column 3: Contacts -->
                    <div class="footer-column">
                        <h3 class="footer-heading">Контакти</h3>
                        <div class="footer-contacts">
                            <p class="contact-item phone">
                                <strong>+380 97 100 88 10</strong>
                            </p>
                            <p class="contact-item telegram">
                                <strong>Telegram:</strong> @motoyevakuator
                            </p>
                            <p class="contact-item whatsapp">
                                <strong>WhatsApp:</strong> +380 97 100 88 10
                            </p>
                            <p class="contact-item email">
                                <strong>Email:</strong> info@motoevakuator.shop
                            </p>
                            <p class="contact-item address">
                                <strong>Адреса:</strong> м. Київ, вул. Азербайджанська, 3
                            </p>
                        </div>
                    </div>
                </div>
                
                <!-- Copyright -->
                <div class="footer-bottom">
                    <p class="copyright">
                        © ${currentYear} motoevakuator.shop · Професійне перевезення мотоциклів по Україні
                    </p>
                </div>
            </div>
        </footer>
    `;
    
    // Inject footer HTML
    footerMount.innerHTML = footerHTML;
    
    // Add footer styles if not already present
    addFooterStyles();
    initStickyCall();
});

function initStickyCall() {
    if (document.querySelector('.sticky-bar')) return;

    const PHONE = '+380971008810';
    const PHONE_H = '+380 97 100 88 10';
    const WA = 'https://wa.me/380971008810?text=' +
        encodeURIComponent('Доброго дня! Потрібне перевезення мотоцикла. Маршрут і марка мото: ');
    const VIBER = 'viber://chat?number=%2B380971008810';
    const TG = 'https://t.me/motoyevakuator';

    const bar = document.createElement('div');
    bar.className = 'sticky-bar';
    bar.innerHTML =
        '<a class="sticky-bar__item sticky-bar__item--call" href="tel:' + PHONE + '" aria-label="Зателефонувати ' + PHONE_H + '">' +
          '<span class="sticky-bar__icon" aria-hidden="true">\uD83D\uDCDE</span><span class="sticky-bar__label">\u0414\u0437\u0432\u0456\u043D\u043E\u043A</span></a>' +
        '<a class="sticky-bar__item" href="' + WA + '" target="_blank" rel="noopener" aria-label="WhatsApp">' +
          '<span class="sticky-bar__icon" aria-hidden="true">\uD83D\uDCAC</span><span class="sticky-bar__label">WhatsApp</span></a>' +
        '<a class="sticky-bar__item" href="' + VIBER + '" aria-label="Viber">' +
          '<span class="sticky-bar__icon" aria-hidden="true">\uD83D\uDCF1</span><span class="sticky-bar__label">Viber</span></a>' +
        '<a class="sticky-bar__item" href="' + TG + '" target="_blank" rel="noopener" aria-label="Telegram">' +
          '<span class="sticky-bar__icon" aria-hidden="true">\u2708\uFE0F</span><span class="sticky-bar__label">Telegram</span></a>';
    document.body.appendChild(bar);
}

/**
 * Add footer-specific CSS styles
 */
function addFooterStyles() {
    const styleId = 'footer-styles';
    if (document.getElementById(styleId)) return;
    
    const styles = `
        <style id="${styleId}">
            .footer {
                background-color: var(--surface);
                border-top: 1px solid var(--border);
                padding: 60px 0 30px;
                margin-top: auto;
            }
            
            .footer-grid {
                display: grid;
                grid-template-columns: repeat(1, 1fr);
                gap: 40px;
                margin-bottom: 40px;
            }
            
            @media (min-width: 768px) {
                .footer-grid {
                    grid-template-columns: repeat(2, 1fr);
                }
            }

            @media (min-width: 1024px) {
                .footer-grid {
                    grid-template-columns: repeat(4, 1fr);
                }
            }
            
            .footer-column {
                display: flex;
                flex-direction: column;
            }
            
            .footer-logo img {
                display: block;
                height: 56px;
                width: auto;
                max-width: 190px;
                object-fit: contain;
                margin-bottom: 16px;
            }
            
            .footer-tagline {
                color: var(--text);
                font-size: 1.125rem;
                margin-bottom: 20px;
                font-weight: 500;
            }
            
            .footer-stats {
                display: flex;
                flex-direction: column;
                gap: 12px;
            }
            
            .footer-stats p {
                margin: 0;
                color: var(--text-muted);
                font-size: 0.9375rem;
            }
            
            .stat-number {
                color: var(--accent);
                font-weight: 600;
            }
            
            .footer-heading {
                color: var(--text);
                font-size: 1.125rem;
                font-weight: 600;
                margin-bottom: 20px;
                font-family: var(--font-head);
            }
            
            .footer-nav ul {
                list-style: none;
                margin: 0;
                padding: 0;
                display: flex;
                flex-direction: column;
                gap: 12px;
            }
            
            .footer-nav a {
                color: var(--text-muted);
                font-size: 0.9375rem;
                transition: color var(--transition);
            }
            
            .footer-nav a:hover {
                color: var(--accent);
            }
            
            .footer-contacts {
                display: flex;
                flex-direction: column;
                gap: 12px;
            }
            
            .contact-item {
                margin: 0;
                color: var(--text-muted);
                font-size: 0.9375rem;
                line-height: 1.5;
            }
            
            .contact-item strong {
                color: var(--text);
                font-weight: 500;
            }
            
            .footer-bottom {
                border-top: 1px solid var(--border);
                padding-top: 30px;
                text-align: center;
            }
            
            .copyright {
                color: var(--text-dim);
                font-size: 0.8125rem;
                margin: 0;
            }
        </style>
    `;
    
    document.head.insertAdjacentHTML('beforeend', styles);
}