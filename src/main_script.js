import gallery from './gallery-items.js';

/* <li class="gallery__item">
  <a
    class="gallery__link"
    href="https://cdn.pixabay.com/photo/2010/12/13/10/13/tulips-2546_1280.jpg"
  >
    <img
      class="gallery__image"
      src="https://cdn.pixabay.com/photo/2010/12/13/10/13/tulips-2546__340.jpg"
      data-source="https://cdn.pixabay.com/photo/2010/12/13/10/13/tulips-2546_1280.jpg"
      alt="Tulips"
    />
  </a>
</li> */

const refs = {
  gallery: document.querySelector('.js-gallery'),
  lightBox: document.querySelector('.js-lightbox'),
  lightBoxImg: document.querySelector('.lightbox__image'),
  lightBoxBtn: document.querySelector('.lightbox__button'),
};
let activeIndex = 0;

function createMarkup(images) {
  return images.map(img => {
    return `
  <li class="gallery__item">
  <a
    class="gallery__link"
    href="${img.original}"
  >
    <img
      class="gallery__image"
      src="${img.preview}"
      data-source="${img.original}"
      alt="${img.description}"
    />
  </a>
</li>
  `;
  });
}

refs.gallery.insertAdjacentHTML('beforeend', createMarkup(gallery).join(''));
console.log(createMarkup(gallery));

refs.gallery.addEventListener('click', onImgClick);

function onImgClick(e) {
  e.preventDefault();
  if (!e.target.classList.contains('gallery__image')) {
    return;
  }
  refs.lightBox.classList.add('is-open');
  refs.lightBoxImg.src = e.target.dataset.source;
  createMarkup(gallery).forEach((el, index) => {
    if (el.includes(e.target.src)) {
      activeIndex = index;
    }
  });
  console.log(activeIndex);
}

// refs.lightBoxBtn.addEventListener('click', e => {
//   refs.lightBox.classList.remove('is-open');
// });

refs.lightBox.addEventListener('click', e => {
  if (e.target.nodeName === 'IMG') {
    return;
  }
  refs.lightBox.classList.remove('is-open');
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    refs.lightBox.classList.remove('is-open');
  }
});
