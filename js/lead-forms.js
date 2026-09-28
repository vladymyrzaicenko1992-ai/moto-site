/* ============================================================
   MotoEvakuator — заявки, зворотний дзвінок, калькулятор ціни
   ------------------------------------------------------------
   LEAD.endpoint — якщо вказати URL (Formspree / n8n / webhook / CRM),
   заявки надсилаються туди POST-ом {name, phone, message, page, type}. Якщо пусто
   або запит не пройшов — заявка відкривається у WhatsApp готовим текстом,
   інші канали (Telegram, Viber, дзвінок, e-mail) показані поруч.
   ============================================================ */
var LEAD = {
  endpoint: '',
  phone: '+380971008810',
  phoneHuman: '+380 97 100 88 10',
  telegram: 'https://t.me/motoyevakuator',
  whatsapp: '380971008810',
  viber: 'viber://chat?number=%2B380971008810',
  email: 'info@motoevakuator.shop'
};

var PRICE = {
  perKm: 25,       // грн за кілометр
  roundTrip: true, // рахуємо дорогу туди й назад
  minSum: 1500     // мінімальна вартість виїзду
};

(function () {
  'use strict';

  function money(n) {
    return String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' грн';
  }

  function money2(n) {
    return String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  }

  function waLink(text) {
    return 'https://wa.me/' + LEAD.whatsapp + '?text=' + encodeURIComponent(text);
  }

  function mailLink(text, subject) {
    return 'mailto:' + LEAD.email + '?subject=' + encodeURIComponent(subject || 'Заявка з сайту') +
           '&body=' + encodeURIComponent(text);
  }

  function channelsBlock(text, extraNote) {
    return '<p class="lead-status__ok"><strong>Заявка сформована.</strong> ' +
           'Натисніть «Надіслати» у вікні WhatsApp, що відкрилося, — і ми одразу її побачимо.</p>' +
           '<p class="lead-status__hint">WhatsApp не відкрився? Скористайтеся іншим каналом:</p>' +
           '<p class="lead-status__links">' +
           '<a class="btn btn-primary btn-sm" href="' + waLink(text) + '" target="_blank" rel="noopener">WhatsApp</a>' +
           '<a class="btn btn-ghost btn-sm" href="' + LEAD.viber + '">Viber</a>' +
           '<a class="btn btn-ghost btn-sm" href="' + LEAD.telegram + '" target="_blank" rel="noopener">Telegram</a>' +
           '<a class="btn btn-ghost btn-sm" href="tel:' + LEAD.phone + '">Зателефонувати ' + LEAD.phoneHuman + '</a>' +
           '<a class="btn btn-ghost btn-sm" href="' + mailLink(text) + '">Email</a>' +
           '</p>' +
           '<p class="lead-status__hint">' + (extraNote || 'Дані у формі збережено — вводити заново не потрібно.') + '</p>';
  }

  function show(el, html) { if (el) el.innerHTML = html; }

  function track(name, params) {
    var extra = { page_path: location.pathname };
    if (params) { for (var k in params) { if (Object.prototype.hasOwnProperty.call(params, k)) extra[k] = params[k]; } }
    if (window.track) window.track(name, extra);
  }

  function send(data, statusEl, note) {
    var text = data.text;
    if (LEAD.endpoint) {
      show(statusEl, '<p class="lead-status__hint">Надсилаємо…</p>');
      fetch(LEAD.endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(data)
      }).then(function (r) {
        if (!r.ok) throw new Error('HTTP ' + r.status);
        show(statusEl, '<p class="lead-status__ok"><strong>Дякуємо, ' + data.name + '!</strong> ' +
                       'Заявку прийнято, зателефонуємо на ' + data.phone + ' найближчим часом.</p>');
        track(data.type === 'callback' ? 'callback_submit' : 'lead_submit', { method: 'endpoint' });
        if (data.onSuccess) data.onSuccess();
      }).catch(function () {
        show(statusEl, channelsBlock(text, note));
        track(data.type === 'callback' ? 'callback_submit' : 'lead_submit', { method: 'whatsapp_fallback' });
        window.open(waLink(text), '_blank');
      });
      return;
    }
    show(statusEl, channelsBlock(text, note));
    track(data.type === 'callback' ? 'callback_submit' : 'lead_submit', { method: 'whatsapp' });
    window.open(waLink(text), '_blank');
  }

  function digits(s) { return (s || '').replace(/\D/g, ''); }

  /* ---------- 1. Основна форма заявки (#contact-form) ---------- */
  function initMainForm() {
    var form = document.getElementById('contact-form');
    if (!form) return;
    var status = document.getElementById('lead-status');
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = (document.getElementById('name').value || '').trim();
      var phone = (document.getElementById('phone').value || '').trim();
      var message = (document.getElementById('message').value || '').trim();
      var honey = (document.getElementById('company') || {}).value || '';
      if (name.length < 2) { show(status, '<p class="lead-status__err">Будь ласка, вкажіть ім\'я.</p>'); return; }
      if (digits(phone).length < 10) { show(status, '<p class="lead-status__err">Вкажіть коректний номер телефону, наприклад ' + LEAD.phoneHuman + '</p>'); return; }
      if (message.length < 3) { show(status, '<p class="lead-status__err">Опишіть, будь ласка, що потрібно перевезти.</p>'); return; }
      if (honey) return;
      var text = 'Заявка з сайту motoevakuator.shop\nІм\'я: ' + name + '\nТелефон: ' + phone +
                 '\nПовідомлення: ' + message + '\nСторінка: ' + location.href;
      send({ type: 'order', name: name, phone: phone, message: message, page: location.href,
             text: text, onSuccess: function () { form.reset(); } }, status);
    });
  }

  /* ---------- 2. Зворотний дзвінок (.callback-form) ---------- */
  function initCallbackForms() {
    document.querySelectorAll('form.callback-form').forEach(function (form) {
      var status = form.querySelector('.lead-status');
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        var name = (form.querySelector('.cb-name').value || '').trim();
        var phone = (form.querySelector('.cb-phone').value || '').trim();
        var honey = (form.querySelector('.cb-company') || {}).value || '';
        if (name.length < 2) { show(status, '<p class="lead-status__err">Як до вас звертатися?</p>'); return; }
        if (digits(phone).length < 10) { show(status, '<p class="lead-status__err">Вкажіть номер, на який зателефонувати.</p>'); return; }
        if (honey) return;
        var text = 'Прохання передзвонити (заявка з сайту)\nІм\'я: ' + name + '\nТелефон: ' + phone +
                   '\nСторінка: ' + location.href;
        send({ type: 'callback', name: name, phone: phone, page: location.href, text: text }, status,
             'Ми телефонуємо за вказаним номером — зазвичай протягом кількох хвилин.');
      });
    });
  }

  /* ---------- 3. Калькулятор ціни (25 грн/км, туди й назад) ---------- */
  function calcPrice(kmOneWay) {
    var km = PRICE.roundTrip ? kmOneWay * 2 : kmOneWay;
    var raw = km * PRICE.perKm;
    var min = PRICE.minSum || 0;
    return { km: km, sum: Math.max(raw, min), raw: raw, minApplied: raw < min };
  }

  function initCalculator() {
    var input = document.getElementById('calc-km');
    var out = document.getElementById('calc-out');
    var city = document.getElementById('calc-city');
    if (!input || !out) return;

    function render() {
      var km = parseInt(input.value, 10);
      if (!km || km < 1) {
        out.innerHTML = '<p class="calc-out__err">Вкажіть відстань в один бік — і побачите вартість.</p>';
        return;
      }
      if (km > 3000) {
        out.innerHTML = '<p class="calc-out__err">Перевірте відстань: максимум 3000 км в один бік.</p>';
        return;
      }
      var p = calcPrice(km);
      var text = 'Доброго дня! Розрахунок з сайту: ' + km + ' км в один бік (' + p.km +
                 ' км зі зворотним), вартість ' + money(p.sum) + '. Коли можете виїхати?';
      var detail = p.minApplied
        ? km + ' км в один бік × 2 = ' + p.km + ' км × ' + PRICE.perKm +
          ' грн = ' + money(p.raw) + ', застосовано мінімум ' + money(PRICE.minSum)
        : km + ' км в один бік × 2 = ' + p.km + ' км × ' + PRICE.perKm + ' грн';
      out.innerHTML =
        '<div class="calc-out__total"><strong>' + money(p.sum) + '</strong><br>' +
        '<span class="calc-out__row">' + detail + '</span></div>' +
        '<p style="margin:12px 0 0;">' +
        '<a class="btn btn-primary btn-sm" href="' + waLink(text) + '" target="_blank" rel="noopener">Замовити за ' + money(p.sum) + '</a> ' +
        '<a class="btn btn-ghost btn-sm" href="tel:' + LEAD.phone + '">Подзвонити</a></p>';
    }

    if (city) {
      city.addEventListener('change', function () {
        if (!city.value) return;
        input.value = city.value;
        render();
      });
    }
    input.addEventListener('input', render);
    input.addEventListener('change', function () {
      var km = parseInt(input.value, 10);
      if (km > 0) track('calc_price', { km_one_way: km });
      render();
    });
    if (city) {
      city.addEventListener('change', function () {
        var km = parseInt(input.value, 10);
        if (km > 0) track('calc_price', { km_one_way: km, source: 'city_select' });
      });
    }
    render();
  }

  /* ---------- 4. Підстановка ціни в кнопки «Замовити» ---------- */
  function initRoutePrices() {
    document.querySelectorAll('[data-route-km]').forEach(function (el) {
      var km = parseInt(el.getAttribute('data-route-km'), 10);
      if (!km) return;
      var p = calcPrice(km);
      var label = el.getAttribute('data-route-label') || 'Замовити';
      if (el.tagName === 'A' && el.classList.contains('js-calc-cta')) {
        var text = 'Доброго дня! Потрібне перевезення ' + km + ' км в один бік (' + p.km +
                   ' км зі зворотним), орієнтовна вартість ' + money(p.sum) + '. Підкажіть, коли можете виїхати?';
        el.setAttribute('href', waLink(text));
      }
      var sumEl = el.querySelector('.js-route-sum');
      if (sumEl) sumEl.textContent = money2(p.sum) + ' грн';
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    initMainForm();
    initCallbackForms();
    initCalculator();
    initRoutePrices();
  });
})();
