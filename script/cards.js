$(document).ready(function() {
  $('.collection-card, .offer-card').each(function() {
    $(this).on('mousemove', function(e) {
      const card = $(this);
      const offset = card.offset();
      const width = card.outerWidth();
      const height = card.outerHeight();

      const x = e.pageX - offset.left;
      const y = e.pageY - offset.top;

      const centerX = width / 2;
      const centerY = height / 2;

      const angleX = (y - centerY) / 20;
      const angleY = (centerX - x) / 20;

      card.css({
        'transform': `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg)`,
        'box-shadow': `${-angleY * 2}px ${angleX * 2}px 20px rgba(0,0,0,0.1)`
      });
    }).on('mouseleave', function() {
       $(this).css({
        'transform': 'perspective(1000px) rotateX(0) rotateY(0)',
        'box-shadow': '0 4px 20px rgba(0,0,0,0.1)'
      });
    });
  });
});