import gallery from './gallery-items.js';

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
      document.addEventListener('keydown', imgScroll);
    }
  });
}

// refs.lightBoxBtn.addEventListener('click', e => {
//   refs.lightBox.classList.remove('is-open');
// });

refs.lightBox.addEventListener('click', e => {
  if (e.target.nodeName === 'IMG') {
    return;
  }
  refs.lightBox.classList.remove('is-open');
  refs.lightBoxImg.src = '';
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    refs.lightBox.classList.remove('is-open');
    refs.lightBoxImg.src = '';
    document.removeEventListener();
  }
});

const imgScroll = function (e) {
  if (e.key == 'ArrowLeft') {
    if (activeIndex > 0) {
      refs.lightBoxImg.src = gallery[activeIndex - 1].original;
      activeIndex -= 1;
      console.log(activeIndex);
    } else {
      activeIndex = gallery.length;
    }
  } else if (e.key == 'ArrowRight') {
    if (activeIndex < gallery.length - 1) {
      refs.lightBoxImg.src = gallery[activeIndex + 1].original;
      activeIndex += 1;
      console.log(activeIndex);
    } else {
      activeIndex = -1;
    }
  }
};
