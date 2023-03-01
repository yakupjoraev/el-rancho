// Custom scripts

//плавный скролл
const anchors = document.querySelectorAll('a[href*="#"]')

for (let anchor of anchors) {
  anchor.addEventListener('click', function (e) {
    e.preventDefault()

    const blockID = anchor.getAttribute('href').substr(1)
    document.getElementById(blockID).scrollIntoView({

      behavior: 'smooth',
      block: 'center'
    })
  })
};

function heroSlider() {
  const container = document.querySelector('.hero')

  if (!container) {
    return null
  }

  const swiper = new Swiper('.hero__slider', {
    pagination: {
      el: '.hero__slider-pagination',
      type: 'fraction',
    },
    navigation: {
      nextEl: '.hero__slider-next',
      prevEl: '.hero__slider-prev',
    },
    direction: 'horizontal',
    slidesPerView: 1,
    spaceBetween: 0,
    // mousewheel: true,

    breakpoints: {
      // when window width is >= 320px
      320: {
        pagination: {
          el: '.hero__slider-pagination',
          type: 'bullets',
          clickable: true,
        },

      },

      // when window width is >= 640px
      769: {
        pagination: {
          el: '.hero__slider-pagination',
          type: 'custom',
          clickable: true,
          renderCustom: function (swiper, current, total) {
            function numberAppend(d) {
              return (d < 10) ? '0' + d.toString() : d.toString();
            }
            return numberAppend(current) + '<span>' + '/' + numberAppend(total) + '</span>';
          }
        },
      }
    }

  });
}
heroSlider();

function reviewsSlider() {
  const container = document.querySelector('.reviews')

  if (!container) {
    return null
  }

  const swiper = new Swiper('.reviews__slider', {
    slidesPerView: 1,
    navigation: {
      nextEl: '.reviews__slider-next',
      prevEl: '.reviews__slider-prev',
    },

    pagination: {
      el: '.reviews__slider-pagination',
      type: 'bullets',
      clickable: true,
    },

    breakpoints: {
      // when window width is >= 320px
      768: {
        slidesPerView: 2,
        spaceBetween: 20,

      },

      // when window width is >= 640px
      992: {
        slidesPerView: 2,
        spaceBetween: 40,
      }
    }
  });
}
reviewsSlider();

function residenceSlider() {
  const container = document.querySelector('.residence-detal')

  if (!container) {
    return null
  }

  const swiper = new Swiper('.residence-detal__slider', {
    slidesPerView: 1,
    navigation: {
      nextEl: '.residence-detal__slider-next',
      prevEl: '.residence-detal__slider-prev',
    },

  });
}
residenceSlider();

function servicesSlider() {
  const container = document.querySelector('.entertainment-services')

  if (!container) {
    return null
  }

  const swiper = new Swiper('.entertainment-services__slider', {
    slidesPerView: 1,
    navigation: {
      nextEl: '.entertainment-services__slider-next',
      prevEl: '.entertainment-services__slider-prev',
    },
    pagination: {
      el: '.entertainment-services__pagination',
      type: 'bullets',
      clickable: true,
    },
  });
}
servicesSlider();

function servicesItemSlider() {
  const container = document.querySelector('.entertainment-services__item')

  if (!container) {
    return null
  }

  const swiper = new Swiper('.entertainment-services__item-slider', {
    slidesPerView: 1,
    navigation: {
      nextEl: '.entertainment-services__item-next',
      prevEl: '.entertainment-services__item-prev',
    },
    pagination: {
      el: '.entertainment-services__item-pagination',
      type: 'bullets',
      clickable: true,
    },
  });
}
servicesItemSlider();

function newsDetalSlider() {
  const container = document.querySelector('.news-detal')

  if (!container) {
    return null
  }

  const swiper = new Swiper('.news-detal__slider', {
    slidesPerView: "auto",
    spaceBetween: 20,
    navigation: {
      nextEl: '.news-detal__slider-next',
      prevEl: '.news-detal__slider-prev',
    },
  });
}
newsDetalSlider();


// Мобильное меню бургер
function burgerMenu() {
  const burger = document.querySelector('.burger')
  const menu = document.querySelector('.menu')
  const body = document.querySelector('body')
  burger.addEventListener('click', () => {
    if (!menu.classList.contains('active')) {
      menu.classList.add('active')
      burger.classList.add('active-burger')
      body.classList.add('locked')
    } else {
      menu.classList.remove('active')
      burger.classList.remove('active-burger')
      body.classList.remove('locked')
    }
  })
  //снять классы при клике на элементы меню
  const menuItems = document.querySelectorAll('.menu__item')

  menuItems.forEach(item => {
    item.addEventListener('click', function () {
      menu.classList.remove('active')
      burger.classList.remove('active-burger')
      body.classList.remove('locked')
    })
  });

  // Вот тут мы ставим брейкпоинт навбара
  window.addEventListener('resize', () => {
    if (window.innerWidth > 991.98) {
      menu.classList.remove('active')
      burger.classList.remove('active-burger')
      body.classList.remove('locked')
    }
  })
}
burgerMenu()


// Вызываем эту функцию, если нам нужно зафиксировать меню при скролле.
function fixedNav() {
  const nav = document.querySelector('.nav')

  // тут указываем в пикселях, сколько нужно проскроллить что бы наше меню стало фиксированным
  const breakpoint = 200
  if (window.scrollY > breakpoint) {
    nav.classList.add('fixed__nav')
  } else {
    nav.classList.remove('fixed__nav')
  }
}
window.addEventListener('scroll', fixedNav);

fixedNav()

// вызов модал
const modal = new GraphModal();


function validateForm() {
  let form = document.querySelector('.js-form'),
    formInputs = document.querySelectorAll('.js-input'),
    inputPhone = document.querySelector('.js-input-phone')

  if (!form) {
    return null
  }


  // function validatePhone(phone) {
  //   let re = /^[0-9\s]*$/;
  //   return re.test(String(phone));
  // }

  form.onsubmit = function () {
    let phoneVal = inputPhone.value,
      emptyInputs = Array.from(formInputs).filter(input => input.value === '');

    formInputs.forEach(function (input) {
      if (input.value === '') {
        input.classList.add('js_error');

      } else {
        input.classList.remove('js_error');
      }
    });

    if (emptyInputs.length !== 0) {
      console.log('inputs not filled');
      return false;
    }

    // if (!validatePhone(phoneVal)) {
    //   console.log('phone not valid');
    //   inputPhone.classList.add('js_error');
    //   return false;
    // } else {
    //   inputPhone.classList.remove('js_error');
    // }

  }
}

validateForm();

function sendForm() {

  let container = document.querySelector('.js-form');

  if (!container) {
    return null
  }
  let selector = document.querySelectorAll('input[type="tel"]');
  let im = new Inputmask('+7 (999) 999-99-99');
  im.mask(selector);


  let validateForms = function (selector, rules, successModal, yaGoal) {
    new window.JustValidate(selector, {
      rules: rules,
      submitHandler: function (form) {
        let formData = new FormData(form);

        let xhr = new XMLHttpRequest();

        xhr.onreadystatechange = function () {
          if (xhr.readyState === 4) {
            if (xhr.status === 200) {
              console.log('Отправлено');
            }
          }
        }

        xhr.open('POST', 'mail.php', true);
        xhr.send(formData);

        form.reset();
      }
    });
  }

  validateForms('.js-form', { tel: { required: true } }, '.thanks-popup', 'send goal');

}

sendForm();

function filtersPictures() {
  const container = document.querySelector('.gallery')

  if (!container) {
    return null
  }
  const filtersMobile = document.querySelector('[data-js-filter]');
  let filterBtns = document.querySelectorAll('[data-filter]')

  if (window.matchMedia("(max-width: 767px)").matches) {
    filterBtns.forEach(filterBtn => {
      filterBtn.addEventListener('click', () => {
        filtersMobile.classList.remove('active')
      })
    });


    filtersMobile.addEventListener('click', () => {
      filtersMobile.classList.toggle('active')
    });
  }

}

filtersPictures();



var mixer = mixitup('.gallery__pictures', {
  controls: {
    enable: true,
    live: true
  }
});