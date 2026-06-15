import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const gallery = document.querySelector(`.gallery`);
const preloader = document.querySelector(`.loading-span`);
const loadMoreBtn = document.querySelector('.load-more');


export const simpleLightBoxPhoto = new SimpleLightbox(`.gallery-link`, {
  captionDelay: 250,
  animationSpeed: 200,
});

export function clearGallery() {
  gallery.innerHTML = ``;
}

export function showLoader() {
  preloader.classList.add(`is-active`);
}

export function hideLoader() {
  preloader.classList.remove(`is-active`);
}

export function createGalleryTemplate(imgData) {
  const galleryCardsTemplate = imgData
    .map(
      img => `
            <li class="gallery-card">
                <a href="${img.largeImageURL}" class="gallery-link">
                    <img class="gallery-img" src="${img.webformatURL}" alt="${img.tags}"
                    />
                    <div class="info">
                        <p class="info-item"><b>Likes</b> ${img.likes}</p>
                        <p class="info-item"><b>Views</b> ${img.views}</p>
                        <p class="info-item"><b>Comments</b> ${img.comments}</p>
                        <p class="info-item"><b>Downloads</b> ${img.downloads}</p>
                    </div>
                </a>
            </li>
        `
    )
    .join(``);
  gallery.insertAdjacentHTML('beforeend', galleryCardsTemplate);
  simpleLightBoxPhoto.refresh();
}

export function showLoadMoreButton() { 
  loadMoreBtn.classList.add(`is-active`);
}
export function hideLoadMoreButton() { 
  loadMoreBtn.classList.remove(`is-active`);
}