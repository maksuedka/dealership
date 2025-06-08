document.addEventListener('DOMContentLoaded', function() {
  // Эффекты для карточек автомобилей
  const carCards = document.querySelectorAll('.card');
  carCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-5px)';
      this.style.boxShadow = '0 10px 20px rgba(0,0,0,0.1)';
      this.style.transition = 'all 0.3s ease';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
      this.style.boxShadow = '0 2px 5px rgba(0,0,0,0.1)';
    });
    
    // Эффект для кнопок в карточках
    const buttons = card.querySelectorAll('button');
    buttons.forEach(btn => {
      btn.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.05)';
        this.style.transition = 'transform 0.2s ease';
      });
      
      btn.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
      });
    });
  });

  // Эффекты для кнопок навигации
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('mouseenter', function() {
      this.style.color = '#dc3545';
      this.style.transition = 'color 0.2s ease';
    });
    
    link.addEventListener('mouseleave', function() {
      this.style.color = '';
    });
  });

  // Эффекты для кнопок "Показать еще" и других основных кнопок
  const mainButtons = document.querySelectorAll('.btn:not(.nav-link):not(.card button)');
  mainButtons.forEach(btn => {
    btn.addEventListener('mouseenter', function() {
      this.style.transform = 'scale(1.03)';
      this.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
      this.style.transition = 'all 0.2s ease';
    });
    
    btn.addEventListener('mouseleave', function() {
      this.style.transform = 'scale(1)';
      this.style.boxShadow = '';
    });
  });

  // Эффекты для карточек коллекций
  const collectionCards = document.querySelectorAll('.collection-card');
  collectionCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'scale(1.02)';
      this.style.boxShadow = '0 10px 25px rgba(0,0,0,0.2)';
      this.style.transition = 'all 0.3s ease';
      
      const btn = this.querySelector('.collection-card-btn');
      if (btn) {
        btn.style.backgroundColor = '#dc3545';
        btn.style.color = 'white';
        btn.style.transition = 'all 0.3s ease';
      }
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'scale(1)';
      this.style.boxShadow = '';
      
      const btn = this.querySelector('.collection-card-btn');
      if (btn) {
        btn.style.backgroundColor = '';
        btn.style.color = '';
      }
    });
  });

  // Эффекты для карточек спецпредложений
  const offerCards = document.querySelectorAll('.offer-card');
  offerCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-10px)';
      this.style.boxShadow = '0 15px 30px rgba(0,0,0,0.15)';
      this.style.transition = 'all 0.3s ease';
      
      const btn = this.querySelector('.offer-card-btn');
      if (btn) {
        btn.style.backgroundColor = '#dc3545';
        btn.style.color = 'white';
        btn.style.transition = 'all 0.3s ease';
      }
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
      this.style.boxShadow = '';
      
      const btn = this.querySelector('.offer-card-btn');
      if (btn) {
        btn.style.backgroundColor = '';
        btn.style.color = '';
      }
    });
  });

  // Эффекты для элементов фильтров
  const brandItems = document.querySelectorAll('.brand-list li');
  brandItems.forEach(item => {
    item.addEventListener('mouseenter', function() {
      this.style.backgroundColor = '#f8f9fa';
      this.style.transform = 'scale(1.05)';
      this.style.transition = 'all 0.2s ease';
    });
    
    item.addEventListener('mouseleave', function() {
      this.style.backgroundColor = '';
      this.style.transform = 'scale(1)';
    });
  });

  // Эффекты для элементов футера
  const footerLinks = document.querySelectorAll('.footer-list li, .footer-link');
  footerLinks.forEach(link => {
    link.addEventListener('mouseenter', function() {
      this.style.color = '#dc3545';
      this.style.transform = 'translateX(5px)';
      this.style.transition = 'all 0.2s ease';
    });
    
    link.addEventListener('mouseleave', function() {
      this.style.color = '';
      this.style.transform = 'translateX(0)';
    });
  });

  // Эффекты для иконок в шапке
  const headerIcons = document.querySelectorAll('.favorites-indicator, .cart-indicator, .search-indicator');
  headerIcons.forEach(icon => {
    icon.addEventListener('mouseenter', function() {
      this.style.transform = 'scale(1.2)';
      this.style.transition = 'transform 0.2s ease';
    });
    
    icon.addEventListener('mouseleave', function() {
      this.style.transform = 'scale(1)';
    });
  });

  // Эффекты для баннера с предложением
  const offerBanner = document.querySelector('.offer-banner');
  if (offerBanner) {
    offerBanner.addEventListener('mouseenter', function() {
      const carImg = this.querySelector('.offer-banner-car');
      if (carImg) {
        carImg.style.transform = 'translateX(-10px)';
        carImg.style.transition = 'transform 0.5s ease';
      }
    });
    
    offerBanner.addEventListener('mouseleave', function() {
      const carImg = this.querySelector('.offer-banner-car');
      if (carImg) {
        carImg.style.transform = 'translateX(0)';
      }
    });
  }
});