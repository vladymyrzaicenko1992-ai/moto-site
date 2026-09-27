/* ============================================================
   MotoEvakuator — аналитика GA4 + отслеживание заявок
   ------------------------------------------------------------
   ВСТАВЬТЕ ID счётчика в GA4_ID (вида G-XXXXXXXXXX).
   Пока значение пустое — скрипт ничего не грузит и не отправляет.
   События: call_click, whatsapp_click, viber_click, telegram_click,
            lead_submit, callback_submit, calc_price, route_page_view.
   ============================================================ */
var GA4_ID = '';   // ← пример: 'G-AB12CD34EF'

(function () {
  'use strict';

  window.track = window.track || function () {};

  // Клики по каналам связи навешиваем всегда — как только появится GA4_ID,
  // события начнут уходить. Без ID window.track — пустышка, запросов нет.
  document.addEventListener('click', function (e) {
    var el = e.target;
    while (el && el.tagName !== 'A' && el !== document.body) el = el.parentElement;
    if (!el || el.tagName !== 'A') return;
    var href = el.getAttribute('href') || '';
    if (href.indexOf('tel:') === 0) window.track('call_click', { link_url: href });
    else if (href.indexOf('wa.me') > -1) window.track('whatsapp_click', {});
    else if (href.indexOf('viber:') === 0) window.track('viber_click', {});
    else if (href.indexOf('t.me') > -1) window.track('telegram_click', {});
  }, true);

  if (!GA4_ID) return;

  var s = document.createElement('script');
  s.async = true;
  s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA4_ID;
  document.head.appendChild(s);

  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  window.gtag = gtag;
  gtag('js', new Date());
  gtag('config', GA4_ID, { anonymize_ip: true, send_page_view: true });

  window.track = function (name, params) {
    try { gtag('event', name, params || {}); } catch (e) {}
  };

  // Просмотр страниц-маршрутов
  if (/perevezennya-moto-kyiv-|evropa|cina-perevezennia/.test(location.pathname)) {
    window.track('route_page_view', { page_path: location.pathname });
  }
})();
