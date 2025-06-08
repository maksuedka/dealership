document.addEventListener('DOMContentLoaded', function() {
            const prevBtn = document.getElementById('prevBtn');
            const nextBtn = document.getElementById('nextBtn');
            const dots = document.querySelectorAll('.slider-dot');
            const car1 = document.getElementById('car1');
            const car2 = document.getElementById('car2');
            const car3 = document.getElementById('car3');
            
            // Позиции и размеры для машин
            const positions = {
                main: {
                    width: '45%',
                    height: '60%',
                    left: '25%',
                    top: '25%',
                    zIndex: 3,
                    scale: 1,
                    shadow: '0 8px 12px rgba(0, 0, 0, 0.2)'
                },
                side: {
                    width: '30%',
                    height: '45%',
                    left: '48%',
                    top: '28%',
                    zIndex: 2,
                    scale: 0.9,
                    shadow: '0 4px 8px rgba(0, 0, 0, 0.15)'
                },
                small: {
                    width: '23%',
                    height: '38%',
                    left: '58%',
                    top: '26%',
                    zIndex: 1,
                    scale: 0.8,
                    shadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
                }
            };
            
            // Текущие позиции машин
            let currentPositions = {
                car1: 'main',
                car2: 'side',
                car3: 'small'
            };
            
            // Функция применения стилей к машине
            function applyStyles(car, position) {
                const pos = positions[position];
                Object.assign(car.style, {
                    width: pos.width,
                    height: pos.height,
                    left: pos.left,
                    top: pos.top,
                    zIndex: pos.zIndex,
                    transform: `scale(${pos.scale})`,
                    filter: `drop-shadow(${pos.shadow})`
                });
                car.className = `car-image car-${position}`;
            }
            
            // Функция ротации машин
            function rotateCars(direction) {
                // Определяем новые позиции
                if (direction === 'next') {
                    // Циклический сдвиг вперед
                    const temp = currentPositions.car3;
                    currentPositions.car3 = currentPositions.car2;
                    currentPositions.car2 = currentPositions.car1;
                    currentPositions.car1 = temp;
                } else {
                    // Циклический сдвиг назад
                    const temp = currentPositions.car1;
                    currentPositions.car1 = currentPositions.car2;
                    currentPositions.car2 = currentPositions.car3;
                    currentPositions.car3 = temp;
                }
                
                // Применяем новые стили
                applyStyles(car1, currentPositions.car1);
                applyStyles(car2, currentPositions.car2);
                applyStyles(car3, currentPositions.car3);
                
                // Обновляем точки навигации
                updateDots();
            }
            
            // Обновление активной точки
            function updateDots() {
                dots.forEach(dot => {
                    const targetCar = dot.getAttribute('data-target');
                    dot.classList.toggle('active', currentPositions[targetCar] === 'main');
                });
            }
            
            // Обработчики событий для кнопок
            nextBtn.addEventListener('click', () => rotateCars('next'));
            prevBtn.addEventListener('click', () => rotateCars('prev'));
            
            // Обработчики событий для точек
            dots.forEach(dot => {
                dot.addEventListener('click', function() {
                    const targetCar = this.getAttribute('data-target');
                    
                    // Если эта машина уже в главной позиции, ничего не делаем
                    if (currentPositions[targetCar] === 'main') return;
                    
                    // Определяем сколько раз нужно сделать ротацию
                    let rotations = 0;
                    if (currentPositions.car1 === 'main') {
                        if (targetCar === 'car2') rotations = 2;
                        else if (targetCar === 'car3') rotations = 1;
                    } else if (currentPositions.car2 === 'main') {
                        if (targetCar === 'car1') rotations = 1;
                        else if (targetCar === 'car3') rotations = 2;
                    } else {
                        if (targetCar === 'car1') rotations = 2;
                        else if (targetCar === 'car2') rotations = 1;
                    }
                    
                    // Выполняем ротации
                    for (let i = 0; i < rotations; i++) {
                        setTimeout(() => rotateCars('next'), i * 700);
                    }
                });
            });
            
            // Автопрокрутка (каждые 5 секунд)
            let rotateInterval = setInterval(() => rotateCars('next'), 5000);
            
            // Остановка автопрокрутки при наведении
            const carContainer = document.querySelector('.car-container');
            carContainer.addEventListener('mouseenter', () => {
                clearInterval(rotateInterval);
            });
            
            carContainer.addEventListener('mouseleave', () => {
                rotateInterval = setInterval(() => rotateCars('next'), 5000);
            });
            
            // Инициализация стилей
            applyStyles(car1, 'main');
            applyStyles(car2, 'side');
            applyStyles(car3, 'small');
        });