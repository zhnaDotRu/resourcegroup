import MaskInput from 'mask-input';
import axios from 'axios';



export default function (nodeForm, errorText, urlAjax, send, sendTrue, sendError) {
  let form = document.querySelector(nodeForm);
  if(!form) return console.warn('Form.js: selector is not defined "'+nodeForm+'"');

  let inputs = form.querySelectorAll('[us-form=true]');
  if(!inputs.length) return console.warn('Form.js: [us-form=true] length 0');

  let button = form.querySelector('button[us-form-button=true]');
  let dataVal = {}

  inputs.forEach(elementInput => {
    let name = elementInput.getAttribute('us-form-name');
    if(!name) return console.warn('Form.js: attribute "us-form-name" is not defined', elementInput);

    dataVal[name] = {
      input: elementInput.querySelector('input') || elementInput.querySelector('textarea'),
      inputType: elementInput.getAttribute('us-form-input-type'),
      mask: elementInput.getAttribute('us-form-phone-mask'),
      validation: elementInput.getAttribute('us-form-validation').split('@'),
      errorTag: form.querySelector('[us-form-error-tag='+elementInput.getAttribute('us-form-error-tag-name')+']')
    }

    if(dataVal[name].inputType == 'phone' && dataVal[name].mask) {
      new MaskInput(dataVal[name].input, {
        mask: dataVal[name].mask,
        alwaysShowMask: true,
        maskChar: '_',
      });
    }
  });
  let isSend = [];
  button.addEventListener('click', () => {
    isSend = [];
    let sendData = {};
    for(let key in dataVal) {

      let element = dataVal[key];
      element.errorTag.innerText = '';

      if(element.inputType == 'checkbox') {
        isSend.push(element.input.checked);
        if(!element.input.checked) element.errorTag.innerText = errorText['checked'];
        sendData[key] = element.input.checked;

      }else {
        sendData[key] = element.input.value;
        let validIsArr = [];
        element.validation.forEach(valType => {
          let val = element.input.value;
          let is = validation(valType, val, errorText);
          validIsArr.push(is.is);
          if(!is.is) element.errorTag.innerText = is.error;
        });
        if(!validIsArr.length) isSend.push(false);
        isSend.push(validIsArr.every(e => e === true));
      }
    }

    console.log('bad length')
    if(!isSend.length) {
      console.log('bad length')
      return 0;
    }

    if(!isSend.every(e => e === true)) {
      console.log('bad valid')
      return 0;
    }

    if(send) send(sendData);

    axios.post(urlAjax,  sendData).then(res => {
      if(sendTrue) sendTrue(res.data);
    }).catch(error => {
      if(sendError) sendError(error);
    })
  });



  function validation(type, val, errorText) {
    switch (type) {
      case 'email':
        return {
          is: /\@/.test(val),
          error: errorText['email']
        };
      case 'notEmpty':
        return {
          is: val != '',
          error: errorText['notEmpty']
        };
      case 'phone':
        return {
          is: val != '+7 (___) ___ __ __',
          error: errorText['phone']
        };
      default:
        return {
          is: true
        }
    }
  }

}