document.addEventListener('DOMContentLoaded', function() {
            // Выбор брендов
            const brandItems = document.querySelectorAll('.brand-list li');
            let selectedBrands = [];
            
            brandItems.forEach(item => {
                item.addEventListener('click', function() {
                    const brand = this.getAttribute('data-brand');
                    
                    if (this.classList.contains('active')) {
                        this.classList.remove('active');
                        selectedBrands = selectedBrands.filter(b => b !== brand);
                    } else {
                        this.classList.add('active');
                        selectedBrands.push(brand);
                    }
                    
                    updateResultsCount();
                });
            });
            
            // Слайдер цены
            const priceSlider = document.getElementById('priceSlider');
            const priceProgress = document.getElementById('priceProgress');
            const minHandle = document.getElementById('minHandle');
            const maxHandle = document.getElementById('maxHandle');
            const priceRangeValue = document.getElementById('priceRangeValue');
            const priceMarks = document.querySelectorAll('.price-mark');
            
            let minPrice = 0;
            let maxPrice = 500000;
            let isDragging = false;
            let activeHandle = null;
            
            // Установка начальных позиций
            updateSlider();
            
            // Обработчики для маркеров цены
            priceMarks.forEach(mark => {
                mark.addEventListener('click', function() {
                    const value = parseInt(this.getAttribute('data-value'));
                    
                    if (Math.abs(value - minPrice) < Math.abs(value - maxPrice)) {
                        minPrice = value;
                    } else {
                        maxPrice = value;
                    }
                    
                    updateSlider();
                    updatePriceRangeText();
                    updateResultsCount();
                });
            });
            
            // Перетаскивание ползунков
            minHandle.addEventListener('mousedown', function(e) {
                isDragging = true;
                activeHandle = 'min';
                e.preventDefault();
            });
            
            maxHandle.addEventListener('mousedown', function(e) {
                isDragging = true;
                activeHandle = 'max';
                e.preventDefault();
            });
            
            document.addEventListener('mousemove', function(e) {
                if (!isDragging) return;
                
                const sliderRect = priceSlider.getBoundingClientRect();
                let position = (e.clientX - sliderRect.left) / sliderRect.width;
                position = Math.max(0, Math.min(1, position));
                
                if (activeHandle === 'min') {
                    const newMinPrice = Math.round(position * 3000000);
                    if (newMinPrice < maxPrice) {
                        minPrice = newMinPrice;
                    }
                } else {
                    const newMaxPrice = Math.round(position * 3000000);
                    if (newMaxPrice > minPrice) {
                        maxPrice = newMaxPrice;
                    }
                }
                
                updateSlider();
                updatePriceRangeText();
            });
            
            document.addEventListener('mouseup', function() {
                isDragging = false;
                activeHandle = null;
                updateResultsCount();
            });
            
            // Выпадающие списки
            const bodyTypeSelect = document.getElementById('bodyTypeSelect');
            const transmissionSelect = document.getElementById('transmissionSelect');
            
            bodyTypeSelect.addEventListener('click', function() {
                alert('Открыть выбор типа кузова');
                // Здесь можно реализовать настоящее выпадающее меню
            });
            
            transmissionSelect.addEventListener('click', function() {
                alert('Открыть выбор коробки передач');
                // Здесь можно реализовать настоящее выпадающее меню
            });
            
            // Кнопка показа результатов
            const showResultsBtn = document.getElementById('showResultsBtn');
            const resultsCount = document.getElementById('resultsCount');
            
            showResultsBtn.addEventListener('click', function() {
                alert(`Показать ${resultsCount.textContent} автомобилей\nВыбранные бренды: ${selectedBrands.join(', ') || 'все'}\nЦена: ${minPrice} - ${maxPrice}`);
            });
            
            // Функции обновления UI
            function updateSlider() {
                const minPos = (minPrice / 3000000) * 100;
                const maxPos = (maxPrice / 3000000) * 100;
                
                priceProgress.style.left = `${minPos}%`;
                priceProgress.style.right = `${100 - maxPos}%`;
                
                minHandle.style.left = `${minPos}%`;
                maxHandle.style.left = `${maxPos}%`;
            }
            
            function updatePriceRangeText() {
                const formatPrice = (price) => {
                    if (price >= 1000000) {
                        return `${(price / 1000000).toFixed(1)}м`;
                    } else {
                        return `${(price / 1000)}т`;
                    }
                };
                
                priceRangeValue.textContent = `${formatPrice(minPrice)} - ${formatPrice(maxPrice)}`;
            }
            
            function updateResultsCount() {
                // Здесь должна быть логика подсчета результатов на основе выбранных фильтров
                // Для демонстрации просто случайное число
                const newCount = Math.floor(Math.random() * 50) + 20;
                resultsCount.textContent = newCount;
            }
        });