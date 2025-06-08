// tips.js

document.addEventListener('DOMContentLoaded', function() {
  const tips = {
    ".callback-btn": "Заказать обратный звонок",
    ".favorites-indicator": "Избранное",
    ".cart-indicator": "Корзина",
    ".search-indicator": "Поиск",
    ".main-menu-item": "Открыть подменю",
    "#showResultsBtn": "Показать результаты поиска",
    ".show-more-btn": "Показать больше автомобилей",
    ".view-all-collections": "Посмотреть все подборки",
    ".collection-card-btn": "Перейти к подборке",
    ".offer-banner-submit-btn": "Получить предложение",
    "#submitButton": "Отправить заявку на автокредит",
    ".contact-button": "Как добраться",
    ".footer-link": "Перейти по ссылке",
    ".brand-list li": "Выбрать марку",
    "#bodyTypeSelect": "Выбрать тип кузова",
    "#transmissionSelect": "Выбрать тип коробки передач",
    "#brandSelect": "Выбрать марку автомобиля",
    "#modelSelect": "Выбрать модель автомобиля",
    "#trimSelect": "Выбрать комплектацию автомобиля",
    "#initialPaymentInput": "Ввести первоначальный взнос",
    "#nameInput": "Введите ваше имя",
    "#phoneInput": "Введите ваш телефон",
  };

  function createTooltip(element, text) {
    const tooltip = document.createElement('div');
    tooltip.classList.add('tooltip');
    tooltip.textContent = text;
    document.body.appendChild(tooltip);

    element.addEventListener('mouseenter', () => {
      const rect = element.getBoundingClientRect();
      tooltip.style.top = rect.top + rect.height + 10 + 'px'; // Позиционирование
      tooltip.style.left = rect.left + rect.width / 2 - tooltip.offsetWidth / 2 + 'px'; // Центрирование
      tooltip.style.opacity = 1;
    });

    element.addEventListener('mouseleave', () => {
      tooltip.style.opacity = 0;
    });
  }

  for (const selector in tips) {
    const elements = document.querySelectorAll(selector);
    elements.forEach(element => {
      if (!('ontouchstart' in window || navigator.maxTouchPoints)) { // Проверка на сенсорные устройства
        createTooltip(element, tips[selector]);
      }
    });
  }
});