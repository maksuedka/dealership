document.addEventListener('DOMContentLoaded', function () {
  const cards = document.querySelectorAll('.bank-card');

  cards.forEach(card => {
    let rotation = 0;

    card.addEventListener('click', () => {
      rotation += 360; // Увеличиваем угол на 360° каждый раз
      const img = card.querySelector('img');
      img.style.transform = `rotateX(${rotation}deg)`;
    });
  });
});