import './css/styles.css';

import pixabayAPI from './js/AxiosPixabayAPI';
import { refs } from './js/get-refs';
import { createMarkup } from './js/createMarkup';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { notifyInit } from './js/notifyInit';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

let prevValue = '';
let page = 1;
let keyForCountPages = true;
let keyForLastPage = false;
const per_page = 40;
let totalPages = 0;
let lastElement = null;

const simpleLightbox = new SimpleLightbox('.link-photo-card-wrap', {
  captionsData: 'alt',
  captionDelay: 250,
});

refs.formSubmit.addEventListener('submit', onLoadPhotos);

async function onLoadPhotos(e) {
  e.preventDefault();
  const inputValue = refs.formSubmit.elements[0].value.trim().toLowerCase();
  if (prevValue === inputValue) {
    if (!inputValue) {
      Notify.failure(
        'Sorry, the search field is empty. Please try again.',
        notifyInit
      );
    }
    return;
  } else if (prevValue !== inputValue) {
    prevValue = inputValue;
    cleanPage();
  }

  if (!inputValue) {
    Notify.failure(
      'Sorry, the search field is empty. Please try again.',
      notifyInit
    );
    cleanPage();
    return;
  }
  servicePhoto(inputValue, page, per_page);
}

async function servicePhoto(inputValue = prevValue, page, per_page = 40) {
  try {
    const { data } = await pixabayAPI.pixabayPhoto(inputValue, page, per_page);

    if (data.hits.length === 0) {
      Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.',
        notifyInit
      );
      cleanPage();
      return;
    } else if (keyForCountPages) {
      totalPages = Math.ceil(data.totalHits / per_page);
      keyForCountPages = false;
      Notify.success(`Hooray! We found ${data.total} images.`, notifyInit);
    }
    createHTML(data);
    simpleLightbox.refresh();
  } catch (error) {
    Notify.failure(error.message, 'Something went wrong!', notifyInit);
    cleanPage();
  }
}

const options = {
  root: null,
  rootMargin: '300px',
  treshold: 0,
};

let observer = new IntersectionObserver(onPagination, options);

function onPagination(entries, observer) {
  entries.forEach(entry => {
    if (entry.isIntersecting && hasMorePages()) {
      page++;
      servicePhoto(page);
      slowScroll();
    } else if (!hasMorePages()) {
      observer.unobserve(refs.guard);
      keyForLastPage = true;
    }
    if (entry.isIntersecting && keyForLastPage) {
      Notify.success(
        "We're sorry, but you've reached the end of search results.",
        notifyInit
      );
      observer.unobserve(lastElement);
    }
  });
}

function createHTML(photos) {
  const photosFromPixabey = photos.hits;
  const markup = createMarkup(photosFromPixabey);
  refs.gallaryEl.insertAdjacentHTML('beforeend', markup);
  if (hasMorePages()) {
    observer.observe(refs.guard);
  } else if (page > totalPages) {
    lastElement = document.querySelector('.gallery a:last-child');
    observer.observe(lastElement);
  }
}

function cleanPage() {
  refs.gallaryEl.innerHTML = '';
  keyForCountPages = true;
  keyForLastPage = false;
}

function slowScroll() {
  const { height: cardHeight } = document
    .querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}

function hasMorePages() {
  return page <= totalPages;
}
