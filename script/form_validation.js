document.addEventListener('DOMContentLoaded', function() {
  const form = document.querySelector('.offer-banner-content');
  const phoneInput = form.querySelector('.offer-banner-phone-input');
  const submitBtn = form.querySelector('.offer-banner-submit-btn');
  const privacyLink = form.querySelector('a[href="#"]');
  
  // Создаем элемент для сообщений
  const messageDiv = document.createElement('div');
  messageDiv.style.marginTop = '10px';
  messageDiv.style.fontSize = '0.9rem';
  form.appendChild(messageDiv);

  // Маска для телефона
  phoneInput.addEventListener('input', function(e) {
    let x = e.target.value.replace(/\D/g, '').match(/(\d{0,1})(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})/);
    e.target.value = !x[2] ? x[1] : x[1] + ' (' + x[2] + ') ' + x[3] + (x[4] ? '-' + x[4] : '') + (x[5] ? '-' + x[5] : '');
  });

  // Валидация формы
  submitBtn.addEventListener('click', function(e) {
    e.preventDefault();
    let isValid = true;
    
    // Очищаем предыдущие сообщения
    messageDiv.textContent = '';
    messageDiv.style.color = '';
    
    // Проверка телефона (минимум 11 цифр)
    const phoneDigits = phoneInput.value.replace(/\D/g, '');
    if (phoneDigits.length < 11) {
      showError(phoneInput, 'Введите корректный номер телефона');
      isValid = false;
    } else {
      removeError(phoneInput);
    }
    
    // Проверка согласия с политикой
    if (!privacyLink.classList.contains('confirmed')) {
      showError(privacyLink, 'Необходимо согласие с политикой конфиденциальности');
      isValid = false;
    } else {
      removeError(privacyLink);
    }
    
    // Если все проверки пройдены
    if (isValid) {
      showSuccess('Форма заполнена корректно. Отправляем...');
      // Здесь можно добавить реальную отправку формы
      // form.submit();
      
      // Или симуляцию отправки с задержкой
      setTimeout(() => {
        showSuccess('Ваша заявка успешно отправлена!');
      }, 1000);
    }
  });

  // Подтверждение политики
  privacyLink.addEventListener('click', function(e) {
    e.preventDefault();
    this.textContent = 'персональных данных ✓';
    this.classList.add('confirmed');
    this.style.color = '#28a745';
    this.style.fontWeight = 'bold';
    removeError(this);
  });

  // Функция показа ошибки
  function showError(element, message) {
    removeError(element);
    const error = document.createElement('div');
    error.className = 'invalid-feedback d-block';
    error.textContent = message;
    error.style.color = '#dc3545';
    error.style.fontSize = '0.8rem';
    error.style.marginTop = '0.25rem';
    element.parentNode.appendChild(error);
    element.style.borderColor = '#dc3545';
  }

  // Функция удаления ошибки
  function removeError(element) {
    const error = element.parentNode.querySelector('.invalid-feedback');
    if (error) {
      error.remove();
    }
    element.style.borderColor = '';
  }
  
  // Функция показа успешного сообщения
  function showSuccess(message) {
    messageDiv.textContent = message;
    messageDiv.style.color = '#28a745';
  }
});