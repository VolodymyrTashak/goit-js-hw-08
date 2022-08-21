import throttle from 'lodash.throttle';
const form = document.querySelector('.feedback-form');
const STORAGE_KEY = 'feedback-form-state';

form.addEventListener('submit', onFormSubmit);
form.addEventListener('input', throttle(onFormInput, 200));

onLocalStorage();

const onFormData = {};

function onFormSubmit(event) {
  event.preventDefault();
  event.currentTarget.reset();
  localStorage.removeItem(STORAGE_KEY);
  console.log(`Mail: ${onFormData.email} `);
  console.log(`Message: ${onFormData.message}`);
}

function onFormInput(event) {
  onFormData[event.target.name] = event.target.value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(onFormData));
}

function onLocalStorage() {
  const savedMessage = localStorage.getItem('STORAGE_KEY');
  if (savedMessage) {
    const savedMessageParce = JSON.parse(savedMessage);
    form.email.value = savedMessageParce.email || '';
    form.message.value = savedMessageParce.message || '';
  }
}
