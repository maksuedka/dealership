document.addEventListener('DOMContentLoaded', function() {
            // Карусель для подборок автомобилей
            const collectionsRow = document.getElementById('collectionsRow');
            let collectionCards = Array.from(document.querySelectorAll('.collection-card-wrapper'));
            const prevCollectionsArrow = document.getElementById('prevCollections');
            const nextCollectionsArrow = document.getElementById('nextCollections');
            
            function rotateCollections(direction) {
                // Обновляем массив карточек
                collectionCards = Array.from(document.querySelectorAll('.collection-card-wrapper'));
                
                // Удаляем анимационные классы
                collectionCards.forEach(card => {
                    card.classList.remove('animate-left', 'animate-right');
                });
                
                if (direction === 'next') {
                    // Перемещаем первый элемент в конец
                    const firstCard = collectionCards[0];
                    collectionsRow.appendChild(firstCard);
                    // Добавляем анимацию
                    setTimeout(() => {
                        collectionCards[1].classList.add('animate-left');
                    }, 10);
                } else {
                    // Перемещаем последний элемент в начало
                    const lastCard = collectionCards[collectionCards.length - 1];
                    collectionsRow.insertBefore(lastCard, collectionCards[0]);
                    // Добавляем анимацию
                    setTimeout(() => {
                        collectionCards[0].classList.add('animate-right');
                    }, 10);
                }
            }
            
            prevCollectionsArrow.addEventListener('click', function() {
                rotateCollections('prev');
            });
            
            nextCollectionsArrow.addEventListener('click', function() {
                rotateCollections('next');
            });
            
            // Карусель для спецпредложений
            const offersRow = document.getElementById('offersRow');
            let offerCards = Array.from(document.querySelectorAll('.offer-card-wrapper'));
            const prevOffersArrow = document.getElementById('prevOffers');
            const nextOffersArrow = document.getElementById('nextOffers');
            
            function rotateOffers(direction) {
                // Обновляем массив карточек
                offerCards = Array.from(document.querySelectorAll('.offer-card-wrapper'));
                
                // Удаляем анимационные классы
                offerCards.forEach(card => {
                    card.classList.remove('animate-left', 'animate-right');
                });
                
                if (direction === 'next') {
                    // Перемещаем первый элемент в конец
                    const firstCard = offerCards[0];
                    offersRow.appendChild(firstCard);
                    // Добавляем анимацию
                    setTimeout(() => {
                        offerCards[1].classList.add('animate-left');
                    }, 10);
                } else {
                    // Перемещаем последний элемент в начало
                    const lastCard = offerCards[offerCards.length - 1];
                    offersRow.insertBefore(lastCard, offerCards[0]);
                    // Добавляем анимацию
                    setTimeout(() => {
                        offerCards[0].classList.add('animate-right');
                    }, 10);
                }
            }
            
            prevOffersArrow.addEventListener('click', function() {
                rotateOffers('prev');
            });
            
            nextOffersArrow.addEventListener('click', function() {
                rotateOffers('next');
            });
        });