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
let inputValue = '';
let keyForObserver = false;

const simpleLightbox = new SimpleLightbox('.link-photo-card-wrap', {
  captionsData: 'alt',
  captionDelay: 250,
});

refs.formSubmit.addEventListener('submit', onLoadPhotos);

async function onLoadPhotos(e) {
  e.preventDefault();
  inputValue = refs.formSubmit.elements[0].value.trim().toLowerCase();
  if (prevValue === inputValue) {
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
  await servicePhoto(inputValue, page, per_page);
}

async function servicePhoto(inputValue, page, per_page) {
  try {
    const { data } = await pixabayAPI.pixabayPhoto(inputValue, page, per_page);

    if (data.hits.length === 0) {
      Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.',
        notifyInit
      );
      cleanPage();
      return;
    } else if (keyForCountPages && data.hits.length !== 0) {
      totalPages = Math.ceil(data.totalHits / per_page);
      keyForCountPages = false;
      Notify.success(`Hooray! We found ${data.totalHits} images.`, notifyInit);
      keyForObserver = true;
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

const observer = new IntersectionObserver(onPagination, options);

function onPagination(entries, observer) {
  entries.forEach(entry => {
    if (entry.isIntersecting && hasMorePages() && keyForObserver) {
      page++;
      servicePhoto(inputValue, page, per_page);
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
    }
  });
}

function createHTML(photos) {
  const photosFromPixabey = photos.hits;
  const markup = createMarkup(photosFromPixabey);
  refs.gallaryEl.insertAdjacentHTML('beforeend', markup);
  if (keyForObserver) {
    if (hasMorePages()) {
      observer.observe(refs.guard);
    } else if (page >= totalPages) {
      lastElement = document.querySelector('.gallery a:last-child');
      observer.observe(lastElement);
    }
  }
}

function cleanPage() {
  refs.gallaryEl.innerHTML = '';
  page = 1;
  observer.unobserve(refs.guard);
  keyForCountPages = true;
  keyForLastPage = false;
  keyForObserver = false;
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
  return page < totalPages;
}
