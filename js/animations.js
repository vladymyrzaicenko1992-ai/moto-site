// MOTOEVAKUATOR ANIMATIONS
// IntersectionObserver, count-up animations, FAQ accordion, gallery filter, lightbox

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all animations
    initScrollReveal();
    initCountUp();
    initFAQAccordion();
    initGalleryFilter();
    initLightbox();
});

/**
 * Initialize scroll reveal animations
 */
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal');
    
    if (!revealElements.length || !('IntersectionObserver' in window)) {
        // Fallback: show all elements immediately
        revealElements.forEach(el => el.classList.add('visible'));
        return;
    }
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    revealElements.forEach(element => {
        observer.observe(element);
    });
}

/**
 * Initialize count-up animations for statistics
 */
function initCountUp() {
    const countElements = document.querySelectorAll('[data-count]');
    
    if (!countElements.length) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const target = parseInt(element.dataset.count);
                const duration = element.dataset.duration || 2000; // ms
                const start = 0;
                const increment = target / (duration / 16); // 60fps
                let current = start;
                
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        element.textContent = target + (element.dataset.suffix || '');
                        clearInterval(timer);
                    } else {
                        element.textContent = Math.floor(current) + (element.dataset.suffix || '');
                    }
                }, 16);
                
                observer.unobserve(element);
            }
        });
    }, {
        threshold: 0.5
    });
    
    countElements.forEach(element => {
        observer.observe(element);
    });
}

/**
 * Initialize FAQ accordion
 */
function initFAQAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    if (!faqItems.length) return;
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        
        if (!question || !answer) return;
        
        // Set initial height
        answer.style.maxHeight = '0px';
        answer.style.overflow = 'hidden';
        answer.style.transition = 'max-height 0.3s ease';
        
        question.addEventListener('click', () => {
            const isOpen = item.classList.contains('open');
            
            // Close all other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('open')) {
                    otherItem.classList.remove('open');
                    const otherAnswer = otherItem.querySelector('.faq-answer');
                    if (otherAnswer) {
                        otherAnswer.style.maxHeight = '0px';
                    }
                }
            });
            
            // Toggle current item
            item.classList.toggle('open');
            
            if (!isOpen) {
                answer.style.maxHeight = answer.scrollHeight + 'px';
            } else {
                answer.style.maxHeight = '0px';
            }
        });
    });
}

/**
 * Initialize gallery filtering
 */
function initGalleryFilter() {
    const filterButtons = document.querySelectorAll('[data-filter]');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    if (!filterButtons.length || !galleryItems.length) return;
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            const filterValue = button.dataset.filter;
            
            // Show/hide items
            galleryItems.forEach(item => {
                if (filterValue === 'all' || item.dataset.category === filterValue) {
                    item.classList.remove('hidden');
                } else {
                    item.classList.add('hidden');
                }
            });
        });
    });
}

/**
 * Initialize lightbox for gallery images
 */
function initLightbox() {
    const galleryImages = document.querySelectorAll('.gallery-item img[data-lightbox]');
    const lightbox = document.getElementById('lightbox');
    
    if (!galleryImages.length) return;
    
    // Create lightbox if it doesn't exist
    if (!lightbox) {
        createLightbox();
    }
    
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxClose = document.getElementById('lightbox-close');
    const lightboxPrev = document.getElementById('lightbox-prev');
    const lightboxNext = document.getElementById('lightbox-next');
    
    let currentIndex = 0;
    const images = Array.from(galleryImages).map(img => ({
        src: img.dataset.lightbox || img.src,
        alt: img.alt
    }));
    
    // Open lightbox when clicking on image
    galleryImages.forEach((img, index) => {
        img.addEventListener('click', () => {
            currentIndex = index;
            openLightbox(currentIndex);
        });
    });
    
    // Navigation functions
    function openLightbox(index) {
        if (!lightboxImg || !lightbox) return;
        
        lightboxImg.src = images[index].src;
        lightboxImg.alt = images[index].alt;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        updateNavButtons();
    }
    
    function closeLightbox() {
        if (!lightbox) return;
        
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    function prevImage() {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        openLightbox(currentIndex);
    }
    
    function nextImage() {
        currentIndex = (currentIndex + 1) % images.length;
        openLightbox(currentIndex);
    }
    
    function updateNavButtons() {
        if (lightboxPrev && lightboxNext) {
            lightboxPrev.style.display = images.length > 1 ? 'flex' : 'none';
            lightboxNext.style.display = images.length > 1 ? 'flex' : 'none';
        }
    }
    
    // Event listeners
    if (lightboxClose) {
        lightboxClose.addEventListener('click', closeLightbox);
    }
    
    if (lightboxPrev) {
        lightboxPrev.addEventListener('click', prevImage);
    }
    
    if (lightboxNext) {
        lightboxNext.addEventListener('click', nextImage);
    }
    
    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
    }
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!lightbox || !lightbox.classList.contains('active')) return;
        
        switch(e.key) {
            case 'Escape':
                closeLightbox();
                break;
            case 'ArrowLeft':
                prevImage();
                break;
            case 'ArrowRight':
                nextImage();
                break;
        }
    });
    
    // Swipe support for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    
    if (lightbox) {
        lightbox.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        });
        
        lightbox.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        });
    }
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                nextImage(); // Swipe left
            } else {
                prevImage(); // Swipe right
            }
        }
    }
}

/**
 * Create lightbox HTML structure
 */
function createLightbox() {
    const lightboxHTML = `
        <div id="lightbox" class="lightbox">
            <button id="lightbox-close" class="lightbox-close" aria-label="Close">×</button>
            <button id="lightbox-prev" class="lightbox-nav lightbox-prev" aria-label="Previous image">‹</button>
            <button id="lightbox-next" class="lightbox-nav lightbox-next" aria-label="Next image">›</button>
            <img id="lightbox-img" class="lightbox-image" alt="">
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', lightboxHTML);
    
    // Add lightbox styles
    const styleId = 'lightbox-styles';
    if (!document.getElementById(styleId)) {
        const styles = `
            <style id="${styleId}">
                .lightbox {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background-color: rgba(0, 0, 0, 0.95);
                    z-index: 2000;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    opacity: 0;
                    visibility: hidden;
                    transition: all 0.3s ease;
                }
                
                .lightbox.active {
                    opacity: 1;
                    visibility: visible;
                }
                
                .lightbox-image {
                    max-width: 90%;
                    max-height: 80%;
                    object-fit: contain;
                    transform: scale(0.95);
                    transition: transform 0.3s ease;
                }
                
                .lightbox.active .lightbox-image {
                    transform: scale(1);
                }
                
                .lightbox-close {
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
                    z-index: 2001;
                }
                
                .lightbox-nav {
                    position: absolute;
                    top: 50%;
                    transform: translateY(-50%);
                    background: rgba(255, 69, 0, 0.8);
                    border: none;
                    color: white;
                    font-size: 24px;
                    width: 50px;
                    height: 50px;
                    border-radius: 50%;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 2001;
                    transition: background-color var(--transition);
                }
                
                .lightbox-nav:hover {
                    background-color: var(--accent);
                }
                
                .lightbox-prev {
                    left: 20px;
                }
                
                .lightbox-next {
                    right: 20px;
                }
                
                @media (max-width: 768px) {
                    .lightbox-nav {
                        width: 40px;
                        height: 40px;
                        font-size: 20px;
                    }
                    
                    .lightbox-prev {
                        left: 10px;
                    }
                    
                    .lightbox-next {
                        right: 10px;
                    }
                }
            </style>
        `;
        
        document.head.insertAdjacentHTML('beforeend', styles);
    }
}

// Export functions for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initScrollReveal,
        initCountUp,
        initFAQAccordion,
        initGalleryFilter,
        initLightbox
    };
}