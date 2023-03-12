// *********************************
// * onReady
// *********************************
$(document).ready(function () {
  // *********************************
  // * Initialize Variables
  // *********************************
  let initScrollTop = $(window).scrollTop();
  var windowHeight = $(window).height();

  // ## AOS
  // #################################
  AOS.init({
    once: true,
  });

  // ## Materialize
  // #################################
  $('.sidenav').sidenav({
    menuWidth: 200,
    edge: 'right',
  });
  $('.scrollspy').scrollSpy();

  $('a.link-arrow').on('click', function (event) {
    if (this.hash !== '') {
      event.preventDefault();
      let { hash } = this;

      $('html, body').animate(
        {
          scrollTop: $(hash).offset().top,
        },
        1200,
        function () {
          window.location.hash = hash;
        }
      );
    }
  });

  $('.modal').modal();
  $('.modal-trigger-hey-kevin').on('click', function () {
    $('.modal-hey-kevin').modal('open');
  });

  $('.fixed-action-btn').floatingActionButton();

  // ## Swiper
  // #################################
  var welcomeSwiper = new Swiper('#swiper-welcome', {
    direction: 'vertical',
    loop: true,
    autoplay: {
      delay: 1200,
    },
    speed: 500,
  });
  var cardSwipers = new Swiper('.swiper-card', {
    direction: 'horizontal',
    loop: true,
    autoplay: { delay: 2000 },
    speed: 4000,
    watchSlidesProgress: true,
    effect: 'fade',
    fadeEffect: { crossFade: true },
    grabCursor: true,
  });

  // ## Magic Scroll
  // #################################
  let passedMagicCards = false;
  if (
    initScrollTop + windowHeight >=
    $('.hide-magic-cards-home').offset().top
  ) {
    passedMagicCards = true;
    $('.magic-card-home').css('opacity', '0');
  }
  var magicController = new ScrollMagic.Controller({
    globalSceneOptions: { triggerHook: '0.12' },
  });

  // Drag and resize effect scenes
  for (var i = 1; i <= 5; i++) {
    new ScrollMagic.Scene({
      triggerElement: '.magic-card-home-' + i,
    })
      .setTween('.magic-card-home-' + i, { scale: 0.9 })
      .setPin('.magic-card-home-' + i)
      .addTo(magicController);
  }
  // Hide effect scenes
  new ScrollMagic.Scene({ triggerElement: '.magic-card-home-6' })
    .setPin('.magic-card-home-6')
    .addTo(magicController);

  // ## Lazy load images
  // #################################
  let imgEl = document.getElementsByTagName('img');
  console.log(imgEl.length);
  for (var i = 0; i < imgEl.length; i++) {
    if (imgEl[i].getAttribute('data-src')) {
      imgEl[i].setAttribute('src', imgEl[i].getAttribute('data-src'));
      imgEl[i].removeAttribute('data-src');
    }
  }

  // *********************************
  // * onScroll
  // *********************************
  $(window).scroll(function (event) {
    // Current ScrollTop position
    let scrollTop = $(window).scrollTop();
    var scrollBottom = scrollTop + windowHeight;

    // ## Magic Scroll
    // #################################
    if (
      scrollBottom >= $('.hide-magic-cards-home').offset().top &&
      !passedMagicCards
    ) {
      $('.magic-card-home').not('.magic-card-home-6').css('opacity', '0');
      $('.magic-card-home').fadeTo('slow', 0);
      passedMagicCards = true;
    } else if (
      scrollBottom < $('.hide-magic-cards-home').offset().top &&
      passedMagicCards
    ) {
      $('.magic-card-home-6').fadeTo(200, 1);
      $('.magic-card-home').not('.magic-card-home-6').fadeTo(600, 1);
      passedMagicCards = false;
    }
  });
});
