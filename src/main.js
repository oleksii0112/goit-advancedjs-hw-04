import { getImagesByQuery } from './js/pixabay-api.js';
import {
  createGalleryTemplate,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
} from './js/render-functions.js';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const loadMoreBtn = document.querySelector(`.load-more`);
const form = document.querySelector(`form`);
let page = 1;
let searchedQuerry;
let totalPages = 0;

const onSearchFormSubmit = async event => {
  try {
    event.preventDefault();

    searchedQuerry = form.elements.search_text.value.trim();
    if (!searchedQuerry) {
      iziToast.error({
        message: 'Input cant be empty!',
        position: 'topCenter',
      });
      return;
    }

    clearGallery();
    hideLoadMoreButton();
    showLoader();
    page = 1;

    const data = await getImagesByQuery(searchedQuerry, page);
    if (!data.hits.length) {
      iziToast.error({
        position: `topRight`,
        message: `Sorry, there are no images matching your search query. Please, try again!`,
      });
      form.elements.search_text.placeholder = `${searchedQuerry}`;
      form.reset();
      return;
    }

    totalPages = Math.ceil(data.totalHits / 15);
    if (data.totalHits > 15) {
      showLoadMoreButton();  
    } else { 
      iziToast.info({
        message: 'You have reached the end of search results!',
        timeout: 5000,
        position: `topLeft`,
      });
    }

    createGalleryTemplate(data.hits);
    form.elements.search_text.placeholder = `${searchedQuerry}`;
    form.reset();

  } catch (err) {
      iziToast.error({
        message: 'Something went wrong!',
        position: 'topRight',
      });
      console.log(err);
  } finally {
        hideLoader();
      }
};


const onLoadMoreBtnClick = async event => {
  try {
    page++;
    hideLoadMoreButton();
    showLoader();
    const data = await getImagesByQuery(searchedQuerry, page);
    createGalleryTemplate(data.hits);
    smoothScroll();

    if (page >= totalPages) {
      iziToast.info({
        message: 'You have reached the end of search results!',
        timeout: 5000,
        position: `topLeft`,
      });
      return;
    } 
    showLoadMoreButton();
  } catch (err) {
    iziToast.error({
      message: 'Something went wrong!',
      position: 'topRight',
    });
  } finally {
    hideLoader();
  }
}

function smoothScroll() {
  const card = document.querySelector('.gallery-card');

  if (!card) return;

  const cardHeight = card.getBoundingClientRect().height;

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}

form.addEventListener(`submit`, onSearchFormSubmit);
loadMoreBtn.addEventListener(`click`, onLoadMoreBtnClick)
