# MotoEvakuator — сайт перевезення мотоциклів (Київ)

Статичний сайт на GitHub Pages: `https://motoevakuator.shop`
Стек: чистий HTML + CSS + JavaScript, без збирачів і без бекенду.

---

## 📁 Структура

```
├── index.html                          # Головна: hero, послуги, як працюємо, ЦІНИ + калькулятор,
│                                       # переваги, про нас, роботи, відгуки, FAQ, Fibis, контакти + 2 форми
├── motoevakuator-kiev.html             # Посадкова: мотоевакуатор Київ
├── evakuaciya-moto-kiev.html           # Посадкова: евакуація мото
├── perevezennya-moto-ukraina.html      # Посадкова: міжміські перевезення
├── perevezennya-kvadrocikla.html       # Посадкова: квадроцикли та ATV
├── perevezennya-moto-evropa.html       # Посадкова: перевезення до Європи
├── cina-perevezennia-moto.html         # Прайс: 25 грн/км, калькулятор, таблиця напрямків
├── perevezennya-moto-kyiv-*.html       # 15 сторінок-напрямків (Львів, Одеса, Харків, Дніпро, …)
├── gallery.html                        # Галерея робіт (фільтри + лайтбокс)
├── fibis.html                          # Партнерський сервіс Fibis
├── 404.html                            # Кастомна сторінка 404
├── about.html / contacts.html / services.html   # редиректи на секції головної
├── css/design-system.css               # Єдина дизайн-система
├── js/
│   ├── header.js                       # Шапка + меню (випадаюче «Послуги», мобільний оверлей)
│   ├── footer.js                       # Футер + нижня панель швидких дій
│   ├── animations.js                   # Анімації, лічильники, FAQ, лайтбокс, фільтр галереї
│   ├── analytics.js                    # GA4 + відстеження подій
│   └── lead-forms.js                   # Форми заявок, зворотний дзвінок, калькулятор ціни
├── images/                             # Тільки використовувані файли (WebP)
├── robots.txt / sitemap.xml
└── .github/workflows/static.yml        # Автодеплой на GitHub Pages
```

Дизайн-система: фон `#0a0a0a`, поверхня `#111111`, картка `#1a1a1a`, акцент `#ff4500`.
Шрифти: Rajdhani (заголовки) та Inter (текст), підключені з Google Fonts.

---

## 📩 Заявки: як це працює

Скрипт `js/lead-forms.js` обробляє дві форми:

1. **Основна форма заявки** — `#contact-form` на головній (ім'я, телефон, повідомлення).
2. **Зворотний дзвінок** — будь-який `<form class="callback-form">` (поля `.cb-name`, `.cb-phone`);
   вона є на головній, прайс-сторінці, сторінці Європи та на всіх маршрутних сторінках.

Логіка надсилання задається об'єктом `LEAD`:

```js
var LEAD = {
  endpoint: '',                                  // ← Formspree / n8n / webhook / CRM
  phone: '+380971008810',
  telegram: 'https://t.me/motoyevakuator',
  whatsapp: '380971008810',
  viber: 'viber://chat?number=%2B380971008810',
  email: 'info@motoevakuator.shop'
};
```

- **`endpoint` порожній** (як зараз): заявка формується й відкривається у WhatsApp готовим текстом,
  поруч показані Telegram, Viber, телефон та e-mail — заявка не губиться.
- **`endpoint` заповнений**: заявка йде туди POST-ом із JSON
  `{type, name, phone, message, page, text}`. Якщо запит не пройшов — автоматичний відкат на WhatsApp.

Від ботів — приховане поле-пастка (`#company` або `.cb-company`).

---

## 💰 Тарифи в коді

```js
var PRICE = {
  perKm: 25,       // грн за кілометр
  roundTrip: true, // відстань рахуємо в обидві сторони
  minSum: 1500     // мінімальна вартість виїзду
};
```

Формула: **км в один бік × 2 × 25 грн**, але не менше **1 500 грн**.
Приклад: 350 км в один бік → 700 км × 25 = **17 500 грн**.

Калькулятор (`#calc-km` + `#calc-city`) сам застосовує мінімум і показує пояснення розрахунку.

---

## 📊 Аналітика (GA4)

Код уже на всіх сторінках, потрібен лише ID:

1. https://analytics.google.com → **Адмін** → **Створити ресурс**.
2. **Потоки даних** → **Веб** → адреса `https://motoevakuator.shop`.
3. Скопіювати **ідентифікатор потоку** вигляду `G-AB12CD34EF`.
4. Вписати його в `js/analytics.js`:

```js
var GA4_ID = 'G-AB12CD34EF';   // ← сюди
```

Поки `GA4_ID` порожній — скрипт нічого не завантажує й не надсилає жодного запиту.

**Події, які вже відстежуються:**

| Подія | Коли |
|---|---|
| `call_click` | клік по телефону (`tel:`) |
| `whatsapp_click` / `viber_click` / `telegram_click` | клік по відповідному месенджеру |
| `lead_submit` | надсилання основної форми |
| `callback_submit` | надсилання форми зворотного дзвінка |
| `calc_price` | розрахунок у калькуляторі (з кілометрами) |
| `route_page_view` | відкриття сторінки маршруту, прайсу або Європи |

У кожній події передається `page_path`, у заявок — ще й `method`
(`whatsapp`, `whatsapp_fallback` або `endpoint`).

**Search Console:** https://search.google.com/search-console → додати ресурс `motoevakuator.shop` →
підтвердити → надіслати `sitemap.xml`. Саме там видно покази, кліки, CTR і позиції.

---

## 🖼 Зображення

- Фон першого екрана: `images/hero-main-1200.webp` (десктоп) і `images/hero-main-800.webp` (телефони) —
  задається в `css/design-system.css` (`.hero-section` + `@media max-width:768px`),
  заздалегідь вантажиться через `<link rel="preload">` в `index.html`.
- Логотип: `images/logo-mark.webp` (шапка, компактний знак) і `images/logo-full.webp` (футер, schema).
- Галерея: WebP, `loading="lazy"`, проставлені `width`/`height`.

**Не повертайте PNG/JPG.** Старий `hero-main.jpg` був PNG на 1,33 МБ.

---

## 🗺 Генерація сторінок

Маршрутні та прайс-сторінки створюються скриптами — правте дані там, а не переписуйте HTML:

| Скрипт | Що робить |
|---|---|
| `gen_routes.py` | 4 базові напрямки (Львів, Одеса, Харків, Дніпро) |
| `gen_routes2.py` | ще 11 напрямків (Житомир, Біла Церква, Чернігів, …) |
| `gen_price.py` | прайс-сторінка з таблицею 15 напрямків |
| `gen_evropa.py` | сторінка перевезення до Європи |

Відстані — реальні дорожні (OSRM, маршрутизатор на даних OpenStreetMap), округлені до 5 км.
Скрипти лежать у `~/moto-audit/`; після генерації перевіряйте внутрішні посилання та оновлюйте `sitemap.xml`.

---

## 🚀 Деплой

- Гілка `main`. Push → GitHub Actions (`.github/workflows/static.yml`) → GitHub Pages.
- CI перевіряє, що `images/logo-mark.webp`, `images/logo-full.webp`, `images/hero-main-1200.webp`
  і `images/hero-main-800.webp` існують і важать більше 1 КБ.

## ✅ Перевірка після деплою

```bash
# фон першого екрана має важити ~92 КБ, а не мегабайт
curl -sI https://motoevakuator.shop/images/hero-main-1200.webp | head -3

# у CSS не повинно бути посилань на старі важкі файли
curl -s https://motoevakuator.shop/css/design-system.css | grep -c "hero-main.jpg"

# кастомна 404 віддається
curl -s https://motoevakuator.shop/nonexistent-page | grep -c "ПОМИЛКА 404"

# скільки сторінок у sitemap
curl -s https://motoevakuator.shop/sitemap.xml | grep -c "<loc>"
```
