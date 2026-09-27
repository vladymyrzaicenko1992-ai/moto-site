# MotoEvakuator Website - Complete Redesign 2026

Professional motorcycle transportation services website for Ukraine. Full modern redesign with dark brutal moto aesthetics, component-based architecture, and mobile-first approach.

## 🎯 Project Overview

Complete professional website redesign for MotoEvakuator — a premium motorcycle transport service in Ukraine. This project transforms the website from legacy codebase to a modern, component-based architecture with unified design system and optimized performance.

## ✨ Key Features

- **Dark Brutal Moto Aesthetic 2026**: Cinematic, masculine, premium design with custom palette
- **Mobile-First Responsive Design**: 48px minimum tap targets, optimized for all devices
- **Unified Design System**: CSS custom properties for consistent theming across entire site
- **Component-Based Architecture**: Reusable JavaScript components with ES Modules
- **Optimized Performance**: Lazy loading, minified assets, and efficient CSS/JS
- **Professional SEO**: Open Graph, Schema.org, optimized meta tags, and sitemap
- **Interactive Modules**: Cost calculator, gallery with filtering, form validation, animations
- **Cross-Browser Compatibility**: Tested on Chrome, Firefox, Safari, Edge, mobile browsers

## 🏗️ File Structure (New Architecture)

```
├── index.html              # Main landing page (modern redesign)
├── about.html              # About us page
├── services.html           # Services with interactive calculator
├── gallery.html            # Gallery with filtering & lightbox
├── fibis.html              # Partner company Fibis
├── contacts.html           # Contacts with form validation
├── css/
│   ├── design-system.css   # 🆕 Complete CSS design system (variables, components, utilities)
│   └── [legacy-styles]     # Legacy CSS files (kept for reference)
├── js/
│   ├── components.js       # 🆕 Component library (Header, Footer, Modal, Toast, etc.)
│   ├── calculator-module.js # 🆕 ES6 calculator module
│   ├── gallery-module.js   # 🆕 ES6 gallery with filtering & lightbox
│   ├── forms-module.js     # 🆕 ES6 forms with Ukrainian phone validation
│   ├── animations-module.js # 🆕 ES6 animations & scroll effects
│   └── [legacy-js]         # Legacy JavaScript files
├── images/
│   ├── logo.png            # Company logo
│   ├── hero-main.jpg       # Hero background
│   └── moto2_resized/      # Optimized gallery images
├── *-old-design.html       # Backup of old design pages
├── robots.txt              # Updated search engine configuration
├── sitemap.xml             # Updated sitemap with new pages
└── README.md               # This documentation
```

## 🎨 Design System

### Color Palette
- Background: `#0a0a0a` (darkest)
- Surface: `#111111` 
- Card: `#1a1a1a`
- Accent: `#ff4500` (orange-red)
- Text Primary: `#ffffff`
- Text Secondary: `#a0a0a0`
- Border: `#333333`

### Typography
- Headings: **Rajdhani** (Google Fonts) - bold, technical, masculine
- Body: **Inter** (Google Fonts) - readable, clean, professional

### Components
- Header with mobile navigation
- Footer with contact information
- Cards, buttons, forms with consistent styling
- Toast notifications for user feedback
- Modals for galleries and dialogs
- Grid system with responsive breakpoints

## 📱 Responsive Breakpoints

```css
/* Mobile-first approach */
@container (min-width: 480px)   /* Small tablets */
@container (min-width: 768px)   /* Tablets */
@container (min-width: 1024px)  /* Laptops */
@container (min-width: 1280px)  /* Desktops */
```

## 🔧 JavaScript Modules

### 1. **components.js** - Component Library
- Header with auto-scroll detection and mobile menu
- Footer with dynamic copyright year
- Toast notification system for user feedback
- Modal system for lightboxes and dialogs
- Lazy loading for images
- Smooth scrolling for anchor links

### 2. **calculator-module.js** - Cost Calculator
- Real-time price calculation based on distance and motorcycle type
- Ukrainian phone number validation
- Telegram integration for order submission
- Responsive design for all devices

### 3. **gallery-module.js** - Gallery & Lightbox
- Filter by motorcycle type (sport, cruiser, enduro, ATV, process)
- Lightbox with navigation and image info
- Lazy loading and optimized performance
- Touch gestures for mobile

### 4. **forms-module.js** - Form Handling
- Ukrainian phone number validation (380XX XXX XX XX)
- Form submission to Telegram via webhook
- Real-time input formatting
- Error handling and user feedback

### 5. **animations-module.js** - Animations & Scroll
- Scroll-triggered animations using IntersectionObserver
- Parallax effects for hero sections
- Counter animations for statistics
- Hover effects and transitions

## 📄 Page Descriptions

### 1. **Home (`index.html`)** - Main Landing
- Hero section with call to action
- Benefits showcase (6 key advantages)
- Services preview with pricing
- Process visualization (4 steps)
- Statistics with animated counters
- Fibis partner integration
- Client testimonials
- Gallery preview
- Final call to action

### 2. **Services (`services.html`)** - Detailed Services
- Service cards with detailed descriptions
- Interactive cost calculator
- FAQ accordion section
- Statistics and trust indicators
- Multiple contact options

### 3. **About (`about.html`)** - Company Story
- Company history and mission
- Team information and values
- Motorcycle types we transport
- Animated Ukraine map with service areas
- Company statistics
- Call to action for partnerships

### 4. **Gallery (`gallery.html`)** - Photo Gallery
- Filter by motorcycle categories
- Lightbox with fullscreen viewing
- Image descriptions and details
- Optimized loading and performance
- Mobile-friendly touch navigation

### 5. **Fibis (`fibis.html`)** - Partner Integration
- Partner introduction and description
- Service grid (6 key services)
- Benefits of partnership
- Contact information for Fibis
- Integration with transportation services

### 6. **Contacts (`contacts.html`)** - Contact Information
- Contact form with validation
- Google Maps integration
- FAQ section for common questions
- Multiple contact methods (phone, Telegram, WhatsApp)
- Business hours and location

## 🚀 Deployment

### Simple Deployment
1. Upload all files to web server
2. No special server requirements
3. Works with any static hosting

### Recommended Hosting
- **Domain**: `motoevakuator.shop`
- **SSL Certificate**: Required for HTTPS
- **CDN**: Recommended for image optimization
- **Analytics**: Google Analytics integration available

## 🌐 Browser Support

- ✅ Chrome 90+ (Desktop & Mobile)
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ iOS Safari 14+
- ✅ Android Chrome 90+

## 🛠️ Development

### Technology Stack
- **HTML5**: Semantic markup with accessibility
- **CSS3**: Custom properties, Flexbox, Grid, animations
- **Vanilla JavaScript**: ES6 modules, no dependencies
- **Google Fonts**: Rajdhani (headings), Inter (body)
- **Git**: Version control

### Development Principles
- Mobile-first responsive design
- Progressive enhancement
- Accessibility (WCAG 2.1 AA)
- Performance optimization
- Code reusability and modularity

## 📈 SEO & Marketing

### On-Page SEO
- Optimized meta tags and descriptions
- Semantic HTML structure
- Open Graph for social sharing
- Schema.org markup for LocalBusiness
- XML sitemap
- Robots.txt configuration

### Performance
- Optimized images (WebP where supported)
- Lazy loading for images
- Minified CSS and JavaScript
- Efficient font loading
- Cache headers optimization

## 🔄 Maintenance

### Regular Updates
- Gallery images (add new completed jobs)
- Testimonials (add new client feedback)
- Service pricing (update as needed)
- Contact information (keep current)

### Code Maintenance
- Design system updates in `css/design-system.css`
- Component updates in `js/components.js`
- Module-specific updates in respective JS files
- Page content updates in HTML files

## 📞 Contact & Support

**Website**: https://motoevakuator.shop
**Phone**: +380 97 100 88 10
**Telegram**: @motoyevakuator
**Email**: motoevakuator@gmail.com

## 📄 License

This website was created specifically for MotoEvakuator and contains proprietary content. All rights reserved.

---

**🇺🇦 Слава Україні! Героям Слава!**

*Website designed with love for Ukraine and the motorcycle community.*

---

# 🚚 АКТУАЛЬНО (после аудита 2026-09-27)

Раздел выше — история редизайна 2026, часть файлов оттуда уже удалена. Ниже — реальное состояние сайта.

## Реальная структура

```
├── index.html                     # Главная (hero, услуги, как работаем, ЦІНИ, преимущества, про нас, работы, отзывы, FAQ, Fibis, контакты+форма)
├── motoevakuator-kiev.html        # Посадочная: мотоэвакуатор Киев
├── evakuaciya-moto-kiev.html      # Посадочная: эвакуация мото
├── perevezennya-moto-ukraina.html # Посадочная: межгород
├── perevezennya-kvadrocikla.html  # Посадочная: квадроциклы / ATV
├── gallery.html                   # Галерея работ (фильтры + лайтбокс)
├── fibis.html                     # Партнёрский сервис Fibis
├── 404.html                       # Кастомная страница 404 (CTA + навигация)
├── about.html / contacts.html / services.html   # редиректы на якоря главной
├── css/design-system.css          # Единая дизайн-система
├── js/header.js | footer.js | animations.js     # Компоненты (меню, футер, анимации)
├── images/                        # Только используемые файлы (WebP)
├── robots.txt | sitemap.xml
└── .github/workflows/static.yml   # Автодеплой на GitHub Pages
```

## 📩 Заявки с формы — куда они уходят

Форма на главной (`#contact-form`) раньше только показывала `alert` и НЕ отправляла данные.
Сейчас логика такая (скрипт в конце `index.html`, объект `LEAD`):

1. **Если `LEAD.endpoint` заполнен** (Formspree / n8n / свой webhook / CRM):
   заявка уходит туда POST-запросом с JSON `{name, phone, message, page}`,
   клиент видит подтверждение. Если запрос упал — срабатывает резервный канал.
2. **Если `LEAD.endpoint` пустой**: заявка формируется и открывается в WhatsApp
   (`wa.me`) уже готовым текстом, рядом показаны Telegram, звонок и e-mail.

Чтобы включить автоматическую отправку, нужно только вписать URL:

```js
const LEAD = {
  endpoint: 'https://formspree.io/f/xxxxxxxx',  // ← сюда
  ...
};
```

Есть honeypot-поле `#company` для отсечения ботов.

## 🖼 Картинки

- Фон первого экрана: `images/hero-main-1200.webp` (92 КБ) для десктопа и
  `images/hero-main-800.webp` (44 КБ) для телефонов — задаётся в
  `css/design-system.css` (`.hero-section` + `@media max-width:768px`) и
  предзагружается через `<link rel="preload">` в `index.html`.
- `images/Fibis.webp` — фон страницы Fibis.
- Все галерейные картинки — WebP, `loading="lazy"`, с проставленными `width/height`.

**Если меняете hero — не возвращайте PNG/JPG.** Старый `hero-main.jpg` был PNG на 1.33 МБ.

## 🚀 Деплой

- Ветка: `main`. Push → GitHub Actions (`.github/workflows/static.yml`) → GitHub Pages.
- CI проверяет, что `images/logo-full.webp`, `images/hero-main-1200.webp`, `images/hero-main-800.webp`
  существуют и весят больше 1 КБ (защита от Git LFS-указателей).

## ✅ Как проверить после деплоя

```bash
# 1) Фон первого экрана весит ~92 КБ, а не мегабайт
curl -sI https://motoevakuator.shop/images/hero-main-1200.webp | head -3

# 2) В CSS нет ссылок на старые тяжёлые файлы
curl -s https://motoevakuator.shop/css/design-system.css | grep -c "hero-main.jpg"

# 3) Кастомная 404 отдаётся
curl -s https://motoevakuator.shop/несуществующая-страница | grep -c "ПОМИЛКА 404"
```

---

## 📊 Аналитика (GA4) — как включить

Весь код уже на сайте, нужен только ID счётчика.

1. Зайдите на https://analytics.google.com → **Админ** → **Создать ресурс** (property).
2. В ресурсе: **Потоки данных** → **Веб** → укажите `https://motoevakuator.shop` → создать.
3. Скопируйте **ідентифікатор потоку** вида `G-AB12CD34EF`.
4. Вставьте его в `js/analytics.js` в первую строку:

```js
var GA4_ID = 'G-AB12CD34EF';   // ← сюда
```

Пока `GA4_ID` пустой — скрипт ничего не загружает и не отправляет (сайт не тормозит).

**Какие события уже отслеживаются:**

| Событие | Когда срабатывает |
|---|---|
| `call_click` | клик по любому телефону (`tel:`) |
| `whatsapp_click` | клик по WhatsApp |
| `viber_click` | клик по Viber |
| `telegram_click` | клик по Telegram |
| `lead_submit` | отправка основной формы заявки |
| `callback_submit` | отправка формы «Передзвоніть мені» |
| `calc_price` | расчёт в калькуляторе (с введёнными км) |
| `route_page_view` | открытие страницы маршрута / цен / Европы |

В каждом событии передаётся параметр `page_path`, у отправок формы — `method`
(`whatsapp`, `whatsapp_fallback` или `endpoint`).

**Search Console** (бесплатно, показывает запросы и позиции): https://search.google.com/search-console →
добавить ресурс `motoevakuator.shop` → подтвердить через DNS или HTML-тег → отправить `sitemap.xml`.

## 💰 Тарифы, зашитые в код

```js
// js/lead-forms.js
var PRICE = {
  perKm: 25,       // грн за км
  roundTrip: true, // відстань рахуємо в обидві сторони
  minSum: 1500     // мінімальна вартість виїзду
};
```

Формула цены: **км в один бік × 2 × 25 грн**, но не менше **1 500 грн**.
Пример: 350 км в один бік → 700 км × 25 = **17 500 грн**.

## 🗺 Направления и страницы

Маршрутные страницы генерируются скриптами (правьте данные там, а не переписывайте HTML):
`~/moto-audit/gen_routes.py` (Київ — Львів / Одеса / Харків / Дніпро),
`~/moto-audit/gen_price.py` (прайс-страница),
`~/moto-audit/gen_evropa.py` (перевозка в Европу).
Расстояния — реальные дорожные (OSRM, маршрутизатор OpenStreetMap), округлены до 5 км.
