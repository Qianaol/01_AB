// Preloader
$(window).on('load', function () {
  console.log(1);
  var $preloader = $('#preloader'),
    $spinner = $preloader.find('.preloader_icon');
  $spinner.fadeOut();
  $preloader.delay(300).fadeOut(100);
});

$(function () {
  var $page = $('html, body'),
    modal = $('.modal'),
    modalLayout = $('.modal_bgLayout'),
    $window = $(window),
    mobileMnu = $('.mobile_mnu');

  //scrolling from link to the block
  $('a[href^="#"]').click(function () {
    $page.animate({
      scrollTop: $($.attr(this, 'href')).offset().top
    }, 400);
    return false;
  });

  //popup
  $('body').on('click', '.getFreeLessonBtn', function (e) {
    modal.fadeIn();
    modalLayout.fadeIn();
    return false;
  });

  $('.modal_close, .modal_bgLayout').on('click', function (e) {
    modal.fadeOut();
    modalLayout.fadeOut();

    $('.table-wrapper').fadeOut();
    $('.table-wrapper-juniorMobile').fadeOut();
    $('.table-wrapper-middleMobile').fadeOut();
    $('.table-wrapper-seniorMobile').fadeOut();
    $('.table-wrapper-artMobile').fadeOut();
  });

  //  $('.modal_close, .modal_bgLayout').on('click', function (e) {
  //    $('.table-wrapper').fadeOut();
  //    modalLayout.fadeOut();
  //  });

  function addEvForCouses() {
    if (window.innerWidth <= 850) {
      $('.getCourses').off('click');

      $('.getCourseJunior').on('click', function (e) {
        e.preventDefault();
        $('.table-wrapper-juniorMobile').fadeIn();
        modalLayout.fadeIn();
      });

      $('.getCourseMiddle').on('click', function (e) {
        e.preventDefault();
        $('.table-wrapper-middleMobile').fadeIn();
        modalLayout.fadeIn();
      });

      $('.getCourseSenior').on('click', function (e) {
        e.preventDefault();
        $('.table-wrapper-seniorMobile').fadeIn();
        modalLayout.fadeIn();
      });

      $('.getCourseArtDer').on('click', function (e) {
        e.preventDefault();
        $('.table-wrapper-artMobile').fadeIn();
        modalLayout.fadeIn();
      });
    } else {
      $('.getCourses').off('click');

      $('.getCourses').on('click', function (e) {
        $('.table-wrapper').fadeIn();
        modalLayout.fadeIn();
        return false;
      });
    }
  }
  addEvForCouses();

  //mobile menu
  function getWindowWidth() {
    var mnu = $('nav.clearfix'),
      mnuIcons = $('.mnu_icon');

    if ($window.width() <= 880) {
      mnu.hide();
      mnuIcons.show();
    } else {
      mnu.show();
      mnuIcons.hide();
    }
  }
  getWindowWidth();

  $window.resize(getWindowWidth);

  //menu btns
  $(document).click(function (e) {
    if ($('.mobile_mnu').data('toggle') === false && !$(e.target).parents('.mobile_mnu').length) {
      showMobileMnu();
    } else if ($(e.target).hasClass('mnu_icon-right')) {
      showMobileMnu();
    }
  })


  function showMobileMnu() {
    if (mobileMnu.data('toggle') === true) {
      mobileMnu.data('toggle', false);
      $('.mnu_icon-right').addClass('active');
      mobileMnu
        .stop()
        .animate({
          opacity: 1,
          right: 0
        }, 500);
    } else if (mobileMnu.data('toggle') === false) {
      mobileMnu.data('toggle', true);
      $('.mnu_icon-right').removeClass('active');
      mobileMnu
        .stop()
        .animate({
          opacity: 0,
          right: "-280px"
        }, 500);
    }
  }

  $('.mobile_mnu .navItem a').click(function (e) {
    showMobileMnu();
  });

  //smooth scroll
//  $("html, .table-wrapper, .table-wrapper-juniorMobile, .table-wrapper-middleMobile, .table-wrapper-seniorMobile, .table-wrapper-artMobile").niceScroll();

  //animate numbers
  window.addEventListener('scroll', function onScroll() {
    if ($(window).scrollTop() >= $('.formBlock').first().offset().top) {
      $('.animateNumber-1').animateNumber({
        number: 110
      }, 1000);
      $('.animateNumber-2').animateNumber({
        number: 42
      }, 1000);
      $('.animateNumber-3').animateNumber({
        number: 3
      }, 1000);
      $('.animateNumber-4').animateNumber({
        number: 206
      }, 1000);
      this.removeEventListener('scroll', onScroll)
    }
  })

  //lines	
  function getHeaderForLines() {
    $('.section_header').each(function (index, item) {
      var $self = $(this),
        a = item.getBoundingClientRect(),
        b = this.parentNode;

      if ($self.siblings('.wrapper-left')) {
        $self.siblings('.wrapper-left').remove();
      }

      createLines(a, b);
    });
  }
  getHeaderForLines();

  $(window).resize(function () {
    getHeaderForLines();
    addEvForCouses();
  });

  function createLines(child, parent) {
    var wrapperLeft = $('<div class="wrapper-left">').css({
      width: child.left,
      height: '1px',
      'background-color': '#d7d7d7',
      position: 'absolute',
      top: '50%',
      left: 0
    });

    var wrapperRight = $('<div class="wrapper-left">').css({
      width: child.left,
      height: '1px',
      'background-color': '#d7d7d7',
      position: 'absolute',
      top: '50%',
      right: 0
    });

    wrapperLeft.appendTo(parent);
    wrapperRight.appendTo(parent);
  }

  // Parallax
  $('.mainScreen-wrapper').parallax({
    imageSrc: 'img/mainScreen-bg.jpg',
    speed: 0.2
  });
  $('.forWhom').parallax({
    imageSrc: 'img/thirdd-screen-bg.jpg',
    speed: 0.2
  });
  $('.whatYouGet').parallax({
    imageSrc: 'img/fifth-screen-bg.jpg',
    speed: 0.2
  });
  $('.ourAim, .trustUs').parallax({
    imageSrc: 'img/seventh-screen-bg.png',
    speed: 0.2
  });
  $('.library-dark-bg').parallax({
    imageSrc: 'img/library-bg.jpg',
    speed: 0.2
  });

  // Flipping main header
  $('.demo').refineSlide({
    maxWidth: 700,
    perspective: 1000,
    transition: 'cubeV',
    autoPlay: true,
    delay: 2000
  });

  // Privacy Policy
  $('.privacyPolicy_btn').click(function () {
    if (!$(this).data('privacy')) {
      $('.privacyPolicy').fadeIn();
      $(this).data('privacy', true);
    }
  });
  $('.privacyPolicy_close').click(function () {
    if ($('.privacyPolicy_btn').data('privacy')) {
      $('.privacyPolicy').fadeOut();
      $('.privacyPolicy_btn').data('privacy', false);
    }
  });


});



// Calculator
$(function () {
  var priceCounter = 50,
    timeCounter = 2,
    $workTime = 21,
    workPriceDevisible = true,
    canDo, canEarn,
    ckeckboxCounterLeft = 1,
    ckeckboxCounterRight = 0;

  // Математические рассчеты ====================================

  function changeVal(val) {
    if (val.hasClass('disabled')) {
      return;
    }
    val.prop('checked', !val.prop('checked'));

    if (!val.prop('checked')) {
      priceCounter = priceCounter - val.data('price');
      timeCounter = timeCounter - ((val.data('time') / 100) * 100);
    } else {
      priceCounter = priceCounter + val.data('price');
      timeCounter = timeCounter + ((val.data('time') / 100) * 100);
    }

    showResult();
    //        console.log('Price: ' + priceCounter + ' ----- ' + 'Time: ' + timeCounter);
  }

  function setWorkTime(val) {
    if (val.attr('id') === 'work20Job') {
      workPriceDevisible = true;
    } else {
      workPriceDevisible = false;
    }
    $workTime = val.data('time');
    showResult();
  }

  function showResult() {
    canDo = ($workTime / timeCounter);
    if (workPriceDevisible === true) {
      canEarn = ((canDo * priceCounter) / 2).toFixed(2);
    } else {
      canEarn = (canDo * priceCounter).toFixed(2);
    }

    if (isNaN(canEarn) || !isFinite(canEarn)) {
      canEarn = 0;
    }
    if (isNaN(canDo) || !isFinite(canDo)) {
      canDo = 0;
    }

    $('#result-price').text('~ ' + canEarn + ' USD');
    $('#result-projects').text('~ ' + Math.ceil(canDo) + ' шт.');
  }
  showResult();

  // ==============================================================

  // События взаимодействия с формой ==============================
  $('.calculator .block_1 .block_item').on('click', function (e) {
    var val = $(this),
      radio = val.find('input[type=radio]');

    radio.prop('checked', true);
    $('.block_item_diamond.active').removeClass('active');
    val.find('.block_item_diamond').addClass('active');

    setWorkTime(radio);
  });

  // Поиск и установка стилей для дефолтных значений
  function setDefaultValues() {
    var inputCheckboxes = $('.calcWrapper input[type=checkbox]'),
      inputRadioes = $('.calcWrapper input[type=radio]');

    inputRadioes.each(function () {
      if ($(this).is(':checked')) {
        $(this)
          .siblings('.block_item_diamond')
          .addClass('active');
      }
    });

    inputCheckboxes.each(function () {
      if ($(this).is(':checked')) {
        $(this).siblings('.switcher').addClass('active');
      }
    });
  }
  setDefaultValues();

  // Изменение значений при обытии и задание стилей
  // для поточного элемента
  var block = $('div.disabled'),
    blockInput = block.find('.input'),
    blockSwitcher = block.find('.switcher');

  console.log(block, blockInput, blockSwitcher);

  $('.block_item > div').on('click', function (e) {
    var target = $(this),
      input = target.find('.input'),
      switcher = target.find('.switcher'),
      parent = target.parent().attr('class').split(' ')[1];

    if (parent == undefined) {
      return;
    }
    changeVal(input);
    toggleSwitcher(switcher);
    ckeckRedLine(parent);

    if ($('.switcher.active').length >= 9) {
      block.removeClass('disabled');
      blockInput.removeClass('disabled');
      blockSwitcher.removeClass('disabled');

      changeVal(blockInput);
      toggleSwitcher(blockSwitcher);
    } else {
      block.addClass('disabled');
      blockInput.addClass('disabled');
      blockSwitcher.addClass('disabled');
    }
  });

  function toggleSwitcher(val) {
    if (val.hasClass('disabled')) {
      return;
    }

    val.toggleClass('active');
  }

  // Активация / деактивация красных линий
  function ckeckRedLine(type) {
    var block = $('.block_2 .' + type),
      input = block.find('.input');

    if (input.is(':checked')) {
      $('.block_lines .' + type).addClass('active');
    } else {
      $('.block_lines .' + type).removeClass('active');
    }
  }
});
