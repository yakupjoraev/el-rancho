// Custom Scripts
// Custom scripts

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

  });
}
heroSlider();

function reviewsSlider() {
  const container = document.querySelector('.reviews')

  if (!container) {
    return null
  }

  const swiper = new Swiper('.reviews__slider', {
    slidesPerView: 2,
    spaceBetween: 40,
    navigation: {
      nextEl: '.reviews__slider-next',
      prevEl: '.reviews__slider-prev',
    },
  });
}
reviewsSlider()


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
  const nav = document.querySelector('nav')

  // тут указываем в пикселях, сколько нужно проскроллить что бы наше меню стало фиксированным
  const breakpoint = 1
  if (window.scrollY >= breakpoint) {
    nav.classList.add('fixed__nav')
  } else {
    nav.classList.remove('fixed__nav')
  }
}
window.addEventListener('scroll', fixedNav);

// вызов модал
const modal = new GraphModal();


function validateForm() {
  let form = document.querySelector('.js-form'),
    formInputs = document.querySelectorAll('.js-input'),
    inputPhone = document.querySelector('.js-input-phone')


  function validatePhone(phone) {
    let re = /^[0-9\s]*$/;
    return re.test(String(phone));
  }

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

    if (!validatePhone(phoneVal)) {
      console.log('phone not valid');
      inputPhone.classList.add('js_error');
      return false;
    } else {
      inputPhone.classList.remove('js_error');
    }

  }
}

validateForm();

function sendForm() {
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

sendForm()
