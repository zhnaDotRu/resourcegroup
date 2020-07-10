import './index.html';
import './style.scss';
import MaskInput from 'mask-input';
import axios from 'axios';
import Form from "./Form";

(() => {
  let btn = document.querySelector('.map-data-block');
  if(!btn) return 0;
  btn.addEventListener('click', function () {
    this.style.display = 'none';
  })
})();

(() => {
  let bellBtn = document.querySelector('.js-bell');
  let popup = document.querySelector('.js-popup-bell');
  let btnPopupClosed = document.querySelector('.js-popup-content-closed');

  let is = bellBtn && popup && btnPopupClosed;
  if(!is) return 0;

  bellBtn.addEventListener('click', () => {
    popup.classList.remove('is-closed');
  })
  btnPopupClosed.addEventListener('click', () => {
    popup.classList.add('is-closed');
  })
  popup.addEventListener('click', (e) => {
    if(e.target == popup) popup.classList.add('is-closed');
  })
})();

(() => {
  let bellBtn = document.querySelector('.js-directions-btn');
  let popup = document.querySelector('.js-popup-x');
  let btnPopupClosed = document.querySelector('.js-popup-content-closed-x');

  let is = bellBtn && popup && btnPopupClosed;
  if(!is) return 0;

  bellBtn.addEventListener('click', () => {
    popup.classList.remove('is-closed');
  })
  btnPopupClosed.addEventListener('click', () => {
    popup.classList.add('is-closed');
  })
  popup.addEventListener('click', (e) => {
    if(e.target == popup) popup.classList.add('is-closed');
  })
})();


(() => {
  let errorText = {
    email: 'Введите коректный e-mail',
    notEmpty: 'Поле не может быть пустым',
    phone: 'Заполните номер телефона',
    checked: 'Примите условия',
  }

  let block = document.querySelector('.js-popup-x').querySelectorAll('.js-form-popup-block');

  Form('.js-popup-x', errorText,  '/form3.php', (e) => {
    block[0].classList.remove('is-open');
    block[1].classList.add('is-open');
  }, (e) => {
    block[1].classList.remove('is-open');
    block[2].classList.add('is-open');
  }, (e) => {
    block[1].classList.remove('is-open');
    block[2].classList.add('is-open');
    block[2].querySelector('p').innerText = 'Сервер временно не доступен !'
  });
})();

(()=> {
  let text = document.querySelectorAll('.about-text-span');
  let isAnimate = false;
  window.addEventListener('scroll', function() {

    if(window.pageYOffset >= 300 && !isAnimate) {

      isAnimate = true;
      let idSetInterval = setInterval(() => {
        text.forEach((element, i) => {
          let num = parseInt(element.innerText);
          let newNum = num;
          if(i == 0 && num <= 9) newNum+=1;
          if(i == 1 && num <= 59) newNum+=2;
          if(i == 2 && num <= 9999) newNum+=250;
          if(i == 3 && num <= 12999) newNum+=250;

          element.innerText = newNum + '+';
          if(num == 13000) clearInterval(idSetInterval);
        })
      }, 50);
    }
  });
})();

(() => {
  let blocks = document.querySelectorAll('.js-form-block');
  let form = document.querySelector('.js-form');
  let btn = document.querySelector('.js-btn-send-form');
  let is = blocks.length && form && btn;
  if(!is) return 0;

  let name = {
    input: form.querySelector('.js-input-name > input'),
    error: form.querySelector('.js-input-name > p')
  };
  let phone = {
    input: form.querySelector('.js-input-phone > input'),
    error: form.querySelector('.js-input-phone > p')
  };
  let text = {
    input: form.querySelector('.js-input-text > textarea'),
    error: form.querySelector('.js-input-text > p')
  };

  const maskInput = new MaskInput(phone.input, {
    mask: '+7 (000) 000 00 00',
    alwaysShowMask: true,
    maskChar: '_',
  });

  btn.addEventListener('click', () => {
    name.error.innerText = '';
    phone.error.innerText = '';
    if(name.input.value == '') {
      name.error.innerText = 'Введите имя';
      return 0;
    }

    if(phone.input.value == "+7 (___) ___ __ __") {
      phone.error.innerText = 'Заполните поле';
      return 0;
    }
    console.log(text);

    blocks[0].classList.remove('is-open');
    blocks[1].classList.add('is-open');

    axios.post('/form1.php', {
      name: name.input.value,
      phone: phone.input.value,
      text: text.input.value,
    }).then(res => {
      blocks[1].classList.remove('is-open');
      blocks[2].classList.add('is-open');
      console.log(res.data);
    }).catch(error => {
      blocks[1].classList.remove('is-open');
      blocks[2].classList.add('is-open');
      blocks[2].querySelector('p').innerText = 'Сервер временно не доступен !'
      console.log(error);
    })
  })
})();


//popup
(() => {
  let blocks = document.querySelectorAll('.js-form-popup-block');
  let form = document.querySelector('.js-form-popup');
  let btn = document.querySelector('.js-send-form-popup');
  let checkbox = document.querySelector('.js-checkbox-input-popup');
  let errorPopup = document.querySelector('.js-error-popup');
  let is = blocks.length && form && btn && checkbox;
  if(!is) return 0;

  let name = {
    input: form.querySelector('.js-input-name > input'),
    error: form.querySelector('.js-input-name > p')
  };
  let phone = {
    input: form.querySelector('.js-input-phone > input'),
    error: form.querySelector('.js-input-phone > p')
  };
  let time = {
    input: form.querySelector('.js-input-time > input'),
    error: form.querySelector('.js-input-time > p')
  };

  let text = {
    input: form.querySelector('.js-input-text > textarea'),
    error: form.querySelector('.js-input-text > p')
  };

  const maskInput = new MaskInput(phone.input, {
    mask: '+7 (000) 000 00 00',
    alwaysShowMask: true,
    maskChar: '_',
  });

  btn.addEventListener('click', () => {
    name.error.innerText = '';
    phone.error.innerText = '';
    errorPopup.innerText = ''
    if(name.input.value == '') {
      name.error.innerText = 'Введите имя';
      return 0;
    }

    if(phone.input.value == "+7 (___) ___ __ __") {
      phone.error.innerText = 'Заполните поле';
      return 0;
    }

    if(!checkbox.checked) {
      errorPopup.innerText = 'Согласитесь с правилами';
      return 0;
    }

    blocks[0].classList.remove('is-open');
    blocks[1].classList.add('is-open');

    axios.post('/form2.php', {
      name: name.input.value,
      phone: phone.input.value,
      time: time.input.value,
      checkbox: checkbox.checked,
      text: text.input.value,
    }).then(res => {
      blocks[1].classList.remove('is-open');
      blocks[2].classList.add('is-open');
      console.log(res.data);
    }).catch(error => {
      blocks[1].classList.remove('is-open');
      blocks[2].classList.add('is-open');
      blocks[2].querySelector('p').innerText = 'Сервер временно не доступен !'
      console.log(error);
    })
  })
})();

(() => {
  let dataTag = document.querySelector('.js-map-data');
  let data = [];
  if(dataTag) {
    let dataText = dataTag.getAttribute('data');
    try {
      data = JSON.parse(dataText);
      if(dataTag.getAttribute('debug')) {
        console.log('debug map json');
        console.log(data);
      }
    } catch (e) {
      console.log(e);
    }
  }

  ymaps.ready(function () {
    let map = new ymaps.Map('map', {center: [56.034, 36.992], zoom: 8});
    let myGeoObjects = data.map(element => {
      return new ymaps.GeoObject({
        geometry: {type: "Point", coordinates: element.point ? element.point : [0,0]},
        properties: element.text ? element.text : {}
      });
    });
    let clusterer = new ymaps.Clusterer({clusterDisableClickZoom: false});
    clusterer.add(myGeoObjects);
    map.geoObjects.add(clusterer);
    map.setBounds(clusterer.getBounds(), {
      checkZoomRange: true
    });
  });
})()
