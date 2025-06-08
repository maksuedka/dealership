// Данные для выпадающих списков
        const brands = ["Skoda", "Volkswagen", "Audi"];
        const models = {
            "Skoda": ["Octavia", "Superb", "Kodiaq"],
            "Volkswagen": ["Polo", "Tiguan", "Passat"],
            "Audi": ["A3", "A4", "A6"]
        };
        const trims = {
            "Octavia": ["Active", "Ambition", "Style"],
            "Superb": ["Active", "Ambition", "Laurin & Klement"],
            "Kodiaq": ["Active", "Ambition", "Style"],
            "Polo": ["Trendline", "Comfortline", "Highline"],
            "Tiguan": ["Life", "Elegance", "R-Line"],
            "Passat": ["Business", "Elegance", "R-Line"],
            "A3": ["Technik", "Sportback", "Limousine"],
            "A4": ["Basic", "Advanced", "S line"],
            "A6": ["Business", "Design", "Sport"]
        };
        
        // Текущие значения
        let currentBrand = "";
        let currentModel = "";
        let currentTrim = "";
        let creditAmount = 0;
        let initialPayment = 0;
        let creditTerm = 6;
        
        // Элементы DOM
        const brandSelect = document.getElementById('brandSelect');
        const modelSelect = document.getElementById('modelSelect');
        const trimSelect = document.getElementById('trimSelect');
        const brandDropdown = document.getElementById('brandDropdown');
        const modelDropdown = document.getElementById('modelDropdown');
        const trimDropdown = document.getElementById('trimDropdown');
        const phoneInput = document.getElementById('phoneInput');
        const nameInput = document.getElementById('nameInput');
        const submitButton = document.getElementById('submitButton');
        const termSlider = document.getElementById('termSlider');
        const amountSlider = document.getElementById('amountSlider');
        const termLine = document.getElementById('termLine');
        const amountLine = document.getElementById('amountLine');
        const creditTermValue = document.getElementById('creditTermValue');
        const creditAmountValue = document.getElementById('creditAmountValue');
        const initialPaymentInput = document.getElementById('initialPaymentInput');
        const initialBadge = document.getElementById('initialBadge');
        const remainingBadge = document.getElementById('remainingBadge');
        const benefitValue = document.getElementById('benefitValue');
        
        // Форматирование чисел с разделителями
        function formatNumber(num) {
            return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
        }
        
        // Удаление всех нецифровых символов
        function cleanNumberInput(value) {
            return value.replace(/\D/g, '');
        }
        
        // Создание выпадающего списка
        function createDropdown(items, dropdownElement, selectCallback) {
            dropdownElement.innerHTML = '';
            
            items.forEach(item => {
                const option = document.createElement('div');
                option.className = 'dropdown-option';
                option.textContent = item;
                
                option.addEventListener('click', () => {
                    selectCallback(item);
                    closeAllDropdowns();
                });
                
                dropdownElement.appendChild(option);
            });
            
            return dropdownElement;
        }
        
        // Закрытие всех dropdown
        function closeAllDropdowns() {
            document.querySelectorAll('.car-loan-form .dropdown').forEach(dropdown => {
                dropdown.style.display = 'none';
            });
        }
        
        // Обработчики для выпадающих списков
        brandSelect.addEventListener('click', (e) => {
            e.stopPropagation();
            const dropdown = createDropdown(brands, brandDropdown, (brand) => {
                currentBrand = brand;
                brandSelect.querySelector('span').textContent = brand;
                currentModel = "";
                modelSelect.querySelector('span').textContent = "Модель";
                currentTrim = "";
                trimSelect.querySelector('span').textContent = "Комплектация";
            });
            
            closeAllDropdowns();
            dropdown.style.display = 'block';
        });
        
        modelSelect.addEventListener('click', (e) => {
            e.stopPropagation();
            if (!currentBrand) return;
            
            const dropdown = createDropdown(models[currentBrand], modelDropdown, (model) => {
                currentModel = model;
                modelSelect.querySelector('span').textContent = model;
                currentTrim = "";
                trimSelect.querySelector('span').textContent = "Комплектация";
            });
            
            closeAllDropdowns();
            dropdown.style.display = 'block';
        });
        
        trimSelect.addEventListener('click', (e) => {
            e.stopPropagation();
            if (!currentModel) return;
            
            const dropdown = createDropdown(trims[currentModel] || ["Standard", "Comfort", "Premium"], trimDropdown, (trim) => {
                currentTrim = trim;
                trimSelect.querySelector('span').textContent = trim;
            });
            
            closeAllDropdowns();
            dropdown.style.display = 'block';
        });
        
        // Закрытие dropdown при клике вне его
        document.addEventListener('click', closeAllDropdowns);
        
        // Обработчики для слайдеров
        function setupSlider(slider, line, valueElement, min, max, isTermSlider = false) {
            let isDragging = false;
            
            slider.addEventListener('mousedown', (e) => {
                isDragging = true;
                document.addEventListener('mousemove', moveHandler);
                document.addEventListener('mouseup', () => {
                    isDragging = false;
                    document.removeEventListener('mousemove', moveHandler);
                });
                
                e.preventDefault();
            });
            
            function moveHandler(e) {
                if (!isDragging) return;
                
                const lineRect = line.getBoundingClientRect();
                let newX = e.clientX - lineRect.left;
                
                // Ограничиваем положение внутри линии
                newX = Math.max(0, Math.min(newX, lineRect.width));
                
                // Обновляем положение слайдера
                slider.style.left = `${(newX / lineRect.width) * 100}%`;
                
                // Вычисляем значение
                const percentage = newX / lineRect.width;
                let value;
                
                if (isTermSlider) {
                    // Для срока кредита используем фиксированные значения (6, 12, 24 и т.д.)
                    const steps = [6, 12, 24, 36, 48, 60, 72, 84];
                    const stepIndex = Math.round(percentage * (steps.length - 1));
                    value = steps[stepIndex];
                    creditTerm = value;
                    valueElement.textContent = `${value} мес.`;
                } else {
                    // Для суммы кредита и первоначального взноса
                    value = Math.round(percentage * (max - min) + min);
                    
                    if (slider === amountSlider) {
                        creditAmount = value;
                        valueElement.textContent = formatNumber(value);
                        benefitValue.textContent = `${formatNumber(Math.round(value * 0.1))} ₽`; // 10% от суммы как выгода
                        
                        // Обновляем остаток по кредиту
                        const remaining = Math.max(0, creditAmount - initialPayment);
                        remainingBadge.textContent = formatNumber(remaining);
                        
                        // Если первоначальный взнос больше новой суммы кредита, корректируем его
                        if (initialPayment > creditAmount) {
                            initialPayment = creditAmount;
                            initialPaymentInput.value = formatNumber(initialPayment);
                            initialBadge.textContent = formatNumber(initialPayment);
                            remainingBadge.textContent = "0";
                        }
                    }
                }
                
                valueElement.textContent = isTermSlider ? `${value} мес.` : formatNumber(value);
            }
        }
        
        // Инициализация слайдеров
        setupSlider(termSlider, termLine, creditTermValue, 6, 84, true);
        setupSlider(amountSlider, amountLine, creditAmountValue, 0, 3000000);
        
        // Установка начального положения слайдеров
        termSlider.style.left = '0%';
        amountSlider.style.left = '0%';
        
        // Обработчик для поля первоначального взноса
        initialPaymentInput.addEventListener('input', function(e) {
            // Очищаем значение от всех нецифровых символов
            let cleanValue = cleanNumberInput(this.value);
            
            // Если значение пустое, устанавливаем 0
            if (cleanValue === '') {
                cleanValue = '0';
            }
            
            // Преобразуем в число
            let value = parseInt(cleanValue, 10);
            
            // Ограничиваем максимальное значение суммой кредита
            if (value > creditAmount) {
                value = creditAmount;
            }
            
            // Обновляем значение в поле
            this.value = formatNumber(value);
            
            // Сохраняем значение
            initialPayment = value;
            
            // Обновляем бейджики
            initialBadge.textContent = formatNumber(initialPayment);
            const remaining = Math.max(0, creditAmount - initialPayment);
            remainingBadge.textContent = formatNumber(remaining);
        });
        
        // Обработчик для потери фокуса поля первоначального взноса
        initialPaymentInput.addEventListener('blur', function() {
            if (this.value === '') {
                this.value = '0';
                initialPayment = 0;
                
                // Обновляем бейджики
                initialBadge.textContent = '0';
                remainingBadge.textContent = formatNumber(creditAmount);
            }
        });
        
        // Обработчик для кнопки отправки
        submitButton.addEventListener('click', () => {
            if (!nameInput.value || !phoneInput.value) {
                alert('Пожалуйста, заполните все обязательные поля');
                return;
            }
            
            if (!currentBrand || !currentModel || !currentTrim) {
                alert('Пожалуйста, выберите марку, модель и комплектацию');
                return;
            }
            
            const formData = {
                brand: currentBrand,
                model: currentModel,
                trim: currentTrim,
                name: nameInput.value,
                phone: phoneInput.value,
                creditAmount: creditAmount,
                initialPayment: initialPayment,
                creditTerm: creditTerm
            };
            
            console.log('Отправка данных:', formData);
            alert('Ваша заявка успешно отправлена! Мы свяжемся с вами в ближайшее время.');
            
            // Сброс формы (опционально)
            nameInput.value = '';
            phoneInput.value = '';
        });
        
        // Адаптация для тач-устройств
        function setupTouchSlider(slider, line, valueElement, min, max, isTermSlider = false) {
            slider.addEventListener('touchstart', (e) => {
                e.preventDefault();
                const touch = e.touches[0];
                const lineRect = line.getBoundingClientRect();
                let newX = touch.clientX - lineRect.left;
                
                newX = Math.max(0, Math.min(newX, lineRect.width));
                slider.style.left = `${(newX / lineRect.width) * 100}%`;
                updateValue(newX, lineRect.width, valueElement, min, max, isTermSlider);
                
                function touchMoveHandler(e) {
                    const touch = e.touches[0];
                    let newX = touch.clientX - lineRect.left;
                    
                    newX = Math.max(0, Math.min(newX, lineRect.width));
                    slider.style.left = `${(newX / lineRect.width) * 100}%`;
                    updateValue(newX, lineRect.width, valueElement, min, max, isTermSlider);
                }
                
                function touchEndHandler() {
                    document.removeEventListener('touchmove', touchMoveHandler);
                    document.removeEventListener('touchend', touchEndHandler);
                }
                
                document.addEventListener('touchmove', touchMoveHandler);
                document.addEventListener('touchend', touchEndHandler);
            });
        }
        
        function updateValue(newX, lineWidth, valueElement, min, max, isTermSlider) {
            const percentage = newX / lineWidth;
            let value;
            
            if (isTermSlider) {
                const steps = [6, 12, 24, 36, 48, 60, 72, 84];
                const stepIndex = Math.round(percentage * (steps.length - 1));
                value = steps[stepIndex];
                creditTerm = value;
                valueElement.textContent = `${value} мес.`;
            } else {
                value = Math.round(percentage * (max - min) + min);
                
                if (valueElement === creditAmountValue) {
                    creditAmount = value;
                    valueElement.textContent = formatNumber(value);
                    benefitValue.textContent = `${formatNumber(Math.round(value * 0.1))} ₽`;
                    
                    // Обновляем остаток по кредиту
                    const remaining = Math.max(0, creditAmount - initialPayment);
                    remainingBadge.textContent = formatNumber(remaining);
                    
                    // Если первоначальный взнос больше новой суммы кредита, корректируем его
                    if (initialPayment > creditAmount) {
                        initialPayment = creditAmount;
                        initialPaymentInput.value = formatNumber(initialPayment);
                        initialBadge.textContent = formatNumber(initialPayment);
                        remainingBadge.textContent = "0";
                    }
                }
            }
        }
        
        // Инициализация touch-слайдеров
        setupTouchSlider(termSlider, termLine, creditTermValue, 6, 84, true);
        setupTouchSlider(amountSlider, amountLine, creditAmountValue, 0, 3000000);