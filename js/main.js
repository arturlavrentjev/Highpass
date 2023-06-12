ymaps.ready(init);
function init() {
  const myMap = new ymaps.Map('map', {
    center: [55.76209,37.633095],
    zoom: [14],
    controls: []
  })

  const placemark = new ymaps.Placemark([55.769651,37.639383], {}, {
    iconLayout: 'default#image',
    iconImageHref: 'images/placemark.svg',
    iconImageSize: [12, 12],
    iconImageOffset: [-10, -14]
  });

  placemark.events.add('click', () => {
    const address = document.querySelector('.contacts-address__block')
    address.classList.add('address-active');
    myMap.behaviors.disable('scrollZoom');

    const addressClose = document.querySelector('.btn-close-address');
    addressClose.addEventListener('click', ()=> {
      address.classList.remove('address-active');
      myMap.behaviors.enable('scrollZoom');
    })
  })

  myMap.geoObjects.add(placemark)
}

const $mobileMenu = document.querySelector('.header__nav-list');
const $menu = document.querySelector('.header__nav');
const $btnSearch = document.querySelector('.header__search-btn');
const $btnSeacrhClose = document.querySelector('.header__search-close');
const $search = document.querySelector('.header__search-form');
const $btnClose = document.querySelector('.header__nav-close');
const body = document.querySelector('.page')
const menuLink = document.querySelectorAll('.header__nav-link');
const $burger = document.querySelector('.header__nav-burger').addEventListener('click', () => {
  $menu.classList.add('menu--active');
  $btnClose.classList.add('btn-close--active');
  let pagePos = window.scrollY;
  body.classList.add('stop-scroll');
  
  body.setAttribute('data-scroll', pagePos);
  menuLink.forEach(link => {
    link.addEventListener('click', () => {
      let pos = parseInt(document.body.getAttribute('data-scroll'));

    $menu.classList.remove('menu--active')
    $btnClose.classList.remove('btn-close--active');
    body.classList.remove('stop-scroll');
    body.setAttribute('data-scroll', '');

    window.scrollTo(0, pos);
    })
  })
});

$btnSearch.addEventListener('click', () => {
  $search.classList.add('search--active');
  $btnSearch.style.opacity = '0';
})

$btnSeacrhClose.addEventListener('click', () => {
  event.preventDefault();
  $search.classList.remove('search--active');
  $btnSearch.style.opacity = '1';
})

$btnClose.addEventListener('click', () => {
  $menu.classList.remove('menu--active');
  $btnClose.classList.remove('btn-close--active');
  body.classList.remove('stop-scroll');
})

const email1 = document.querySelector('.about__form-input');
const $name = document.querySelector('.input-name');
const label = document.querySelector('.about__label');
const labelName = document.querySelector('.form__label-name');
const labelEmail = document.querySelector('.form__label-email');
const email2 = document.querySelector('.input-email');
const form2 = document.querySelector('.contacts__right-form');
const pattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
const pattern1 = /^[А-ЯЁа-яё]{3,15}$/;

form2.addEventListener('submit', (e)=> {
  e.preventDefault();
  if(validate(form2) == true) {
    console.log('Форма отправлена');
  }
})

function validate(form) {


  let result = true;

  const $allInput = form.querySelectorAll('input');

  $allInput.forEach(input => {
    removeError(input)
    function createError(input, text) {
      const $spanError = document.createElement('span');
      const parent = input.parentNode;
      parent.classList.add('errors')
      $spanError.classList.add('error-span');
      $spanError.textContent = text;
      parent.append($spanError);
      return $spanError;
    }
  
    function removeError(input) {
      const parent = input.parentNode;
      if(parent.classList.contains('errors')) {
        parent.querySelector('.error-span').remove()
        parent.classList.remove('errors')
      }
    }
    if(input.value == '') {
      removeError(input);
      createError(input, 'Заполните поле!')
      return result = false;
    }
    if(input.value !== '') {
      if(input.type == 'text') {
        if(!pattern1.test(input.value)) {
          removeError(input)
          createError(input, 'Недопустимый формат');
          return result = false;
        }
      }
      else if(input.type =='email') {
        if(!pattern.test(input.value)) {
          removeError(input)
          createError(input, 'Недопустимый формат');
          return result = false;
        }
      }
    }
  return result;
  });
  

} 

const form1 = document.querySelector('.about__form');
form1.addEventListener('submit', (e)=> {
  e.preventDefault();
  if(validate(form1) == true ) {
    console.log('Форма отправлена');
  }
  
})
