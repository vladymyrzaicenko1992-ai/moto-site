// MOTOEVAKUATOR HEADER COMPONENT
// Injects sticky dark premium header with mobile navigation

document.addEventListener('DOMContentLoaded', function() {
    // Get the mount point
    const headerMount = document.getElementById('header-mount');
    if (!headerMount) return;
    
    // Get current page filename for active state
    const currentPage = getCurrentPage();
    
    // Create header HTML
    const headerHTML = `
        <header class="header">
            <div class="container header-container">
                <!-- Logo -->
                <a href="index.html" class="header-logo">
                    <img src="images/logo.png" alt="MotoEvakuator" height="40">
                </a>
                
                <!-- Desktop Navigation -->
                <nav class="header-nav desktop-nav">
                    <ul>
                        <li><a href="index.html" class="nav-link ${currentPage === 'index' ? 'active' : ''}">Головна</a></li>
                        <li><a href="services.html" class="nav-link ${currentPage === 'services' ? 'active' : ''}">Послуги</a></li>
                        <li><a href="about.html" class="nav-link ${currentPage === 'about' ? 'active' : ''}">Про нас</a></li>
                        <li><a href="gallery.html" class="nav-link ${currentPage === 'gallery' ? 'active' : ''}">Галерея</a></li>
                        <li><a href="fibis.html" class="nav-link ${currentPage === 'fibis' ? 'active' : ''}">Fibis</a></li>
                        <li><a href="contacts.html" class="nav-link ${currentPage === 'contacts' ? 'active' : ''}">Контакти</a></li>
                    </ul>
                </nav>
                
                <!-- Right section: Phone & CTA -->
                <div class="header-right">
                    <a href="tel:+380971008810" class="header-phone">+380 97 100 88 10</a>
                    <a href="tel:+380971008810" class="btn btn-primary">Замовити перевезення</a>
                </div>
                
                <!-- Mobile Menu Toggle -->
                <button class="mobile-menu-toggle" aria-label="Відкрити меню">
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </div>
            
            <!-- Mobile Navigation Overlay -->
            <div class="mobile-nav-overlay">
                <div class="mobile-nav-container">
                    <button class="mobile-close" aria-label="Закрити меню">×</button>
                    <nav class="mobile-nav">
                        <ul>
                            <li><a href="index.html" class="mobile-nav-link ${currentPage === 'index' ? 'active' : ''}">Головна</a></li>
                            <li><a href="services.html" class="mobile-nav-link ${currentPage === 'services' ? 'active' : ''}">Послуги</a></li>
                            <li><a href="about.html" class="mobile-nav-link ${currentPage === 'about' ? 'active' : ''}">Про нас</a></li>
                            <li><a href="gallery.html" class="mobile-nav-link ${currentPage === 'gallery' ? 'active' : ''}">Галерея</a></li>
                            <li><a href="fibis.html" class="mobile-nav-link ${currentPage === 'fibis' ? 'active' : ''}">Fibis</a></li>
                            <li><a href="contacts.html" class="mobile-nav-link ${currentPage === 'contacts' ? 'active' : ''}">Контакти</a></li>
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
    
    // Inject header HTML
    headerMount.innerHTML = headerHTML;
    
    // Initialize header functionality
    initHeader();
});

/**
 * Get current page filename
 */
function getCurrentPage() {
    const path = window.location.pathname;
    const page = path.split('/').pop().replace('.html', '').replace('.htm', '');
    
    // Handle index page
    if (page === '' || page === 'index') return 'index';
    
    // Map to our known pages
    const pageMap = {
        'index': 'index',
        'services': 'services',
        'about': 'about',
        'gallery': 'gallery',
        'fibis': 'fibis',
        'contacts': 'contacts'
    };
    
    return pageMap[page] || 'index';
}

/**
 * Initialize header functionality
 */
function initHeader() {
    const header = document.querySelector('.header');
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const mobileOverlay = document.querySelector('.mobile-nav-overlay');
    const mobileClose = document.querySelector('.mobile-close');
    const mobileLinks = document.querySelectorAll('.mobile-nav-link');
    
    if (!header) return;
    
    // Sticky header on scroll
    let lastScroll = 0;
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        // Add scrolled class when scrolled down > 60px
        if (currentScroll > 60) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });
    
    // Mobile menu toggle
    if (mobileToggle && mobileOverlay) {
        mobileToggle.addEventListener('click', function() {
            mobileOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }
    
    // Mobile menu close
    if (mobileClose && mobileOverlay) {
        mobileClose.addEventListener('click', function() {
            mobileOverlay.classList.remove('active');
            document.body.style.overflow = '';
        });
    }
    
    // Close mobile menu when clicking on links
    mobileLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (mobileOverlay) {
                mobileOverlay.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });
    
    // Close mobile menu when clicking outside
    if (mobileOverlay) {
        mobileOverlay.addEventListener('click', function(e) {
            if (e.target === mobileOverlay) {
                mobileOverlay.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
    
    // Add CSS for header if not already present
    addHeaderStyles();
}

/**
 * Add header-specific CSS styles
 */
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
                gap: 24px;
            }
            
            .header-logo img {
                height: 40px;
                width: auto;
            }
            
            .header-nav ul {
                display: flex;
                gap: 32px;
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
            
            .header-right {
                display: flex;
                align-items: center;
                gap: 24px;
            }
            
            .header-phone {
                color: var(--text);
                font-weight: 600;
                font-size: 0.9375rem;
                transition: color var(--transition);
            }
            
            .header-phone:hover {
                color: var(--accent);
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
                z-index: 999;
                opacity: 0;
                visibility: hidden;
                transition: all var(--transition);
                display: flex;
                align-items: center;
                justify-content: center;
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
                margin-bottom: 24px;
            }
            
            .mobile-nav-link {
                color: var(--text);
                font-size: 1.5rem;
                font-weight: 500;
                transition: color var(--transition);
            }
            
            .mobile-nav-link:hover,
            .mobile-nav-link.active {
                color: var(--accent);
            }
            
            .mobile-contact {
                margin-top: 48px;
                text-align: center;
            }
            
            .mobile-phone {
                display: block;
                color: var(--text);
                font-size: 1.25rem;
                font-weight: 600;
                margin-bottom: 24px;
            }
            
            /* Responsive */
            @media (max-width: 1024px) {
                .header-nav {
                    gap: 20px;
                }
                
                .header-nav ul {
                    gap: 20px;
                }
            }
            
            @media (max-width: 768px) {
                .header-nav,
                .header-right {
                    display: none;
                }
                
                .mobile-menu-toggle {
                    display: flex;
                }
                
                .header-container {
                    gap: 16px;
                }
                
                .header-logo img {
                    height: 32px;
                }
            }
        </style>
    `;
    
    document.head.insertAdjacentHTML('beforeend', styles);
}