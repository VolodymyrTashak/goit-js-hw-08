// Add imports above this line
import { galleryItems } from './gallery-items';
// Change code below this line

console.log(galleryItems);

// Описаний в документації
import SimpleLightbox from 'simplelightbox';
// Додатковий імпорт стилів
import 'simplelightbox/dist/simple-lightbox.min.css';

const galleryEl = document.querySelector('.gallery');
galleryEl.insertAdjacentHTML('beforeend', addGallery());

function addGallery() {
  return galleryItems
    .map(({ original, preview, description }) => {
      return `
     <a class="gallery__item"
      href="${original}">
            <img
            class="gallery__image"
            src="${preview}"
            alt="${description}"
            title='${description}'
            />
        </a>`;
    })
    .join('');
}

let lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});
