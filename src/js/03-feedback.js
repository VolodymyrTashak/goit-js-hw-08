import throttle from 'lodash.throttle';

const refs = {
  form: document.querySelector('.feedback-form'),
  input: document.querySelector('input'),
  textarea: document.querySelector('textarea'),
};
const STORAGE_KEY = 'feedback-form-state';

refs.form.addEventListener('submit', onFormSubmit);
refs.form.addEventListener('input', throttle(onFormInput, 200));

onLocalStorage();

let onFormData = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};

function onFormSubmit(event) {
  event.preventDefault();
  if (event.target[0].value !== '' && event.target.value !== '') {
    event.currentTarget.reset();
    localStorage.removeItem(STORAGE_KEY);
    console.log(onFormData);
    onFormData = {};
  }
}

function onFormInput(event) {
  onFormData[event.target.name] = event.target.value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(onFormData));
}

function onLocalStorage() {
  const savedMessage = localStorage.getItem(STORAGE_KEY);

  if (savedMessage) {
    const savedMessageParse = JSON.parse(savedMessage);

    if (savedMessageParse['email'] !== undefined) {
      refs.input.value = savedMessageParse['email'];
    } else {
      refs.input.value = '';
    }

    if (savedMessageParse['message'] !== undefined) {
      refs.textarea.value = savedMessageParse['message'];
    } else {
      refs.textarea.value = '';
    }
  }
}
