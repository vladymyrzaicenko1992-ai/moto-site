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
                <div class="footer-grid grid-3">
                    <!-- Column 1: Brand -->
                    <div class="footer-column">
                        <a href="index.html" class="footer-logo">
                            <img src="images/logo.png" alt="MotoEvakuator" height="40">
                        </a>
                        <p class="footer-tagline">Ваш мотоцикл у надійних руках</p>
                        <div class="footer-stats">
                            <p><span class="stat-number">500+</span> перевезень</p>
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
                                <li><a href="services.html">Послуги</a></li>
                                <li><a href="about.html">Про нас</a></li>
                                <li><a href="gallery.html">Галерея</a></li>
                                <li><a href="fibis.html">Fibis</a></li>
                                <li><a href="contacts.html">Контакти</a></li>
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
});

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
                    grid-template-columns: repeat(3, 1fr);
                }
            }
            
            .footer-column {
                display: flex;
                flex-direction: column;
            }
            
            .footer-logo img {
                height: 40px;
                width: auto;
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