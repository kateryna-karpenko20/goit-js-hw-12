import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

let lightbox;

export function initializeLightbox() {
  lightbox = new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
    captionDelay: 250,
  });
}

export function refreshLightbox() {
  if (lightbox) {
    lightbox.refresh();
  }
}

export function createImageCards(images, gallery) {
  const markup = images.map(image => `
    <li class="gallery-item">
      <div class="photo-card">
        <a href="${image.largeImageURL}" class="link">
          <img src="${image.webformatURL}" alt="${image.tags}" loading="lazy" />
        </a>
        <div class="info">
          <p class="info-item"><b class="name-info">Likes</b> ${image.likes}</p>
          <p class="info-item"><b class="name-info">Views</b> ${image.views}</p>
          <p class="info-item"><b class="name-info">Comments</b> ${image.comments}</p>
          <p class="info-item"><b class="name-info">Downloads</b> ${image.downloads}</p>
        </div>
      </div>
    </li>
  `).join('');

  gallery.insertAdjacentHTML('beforeend', markup);
  
  refreshLightbox();
}

export function clearGallery(gallery) {
  gallery.innerHTML = ''; 
}

export function showLoader(loadingIndicator) {
  loadingIndicator.classList.remove('hidden');
  loadingIndicator.style.display = 'block'; 
}

export function hideLoader(loadingIndicator) {
  loadingIndicator.classList.add('hidden');
  loadingIndicator.style.display = 'none'; 
}

export function showLoadMoreButton(loadMoreButton) {
  loadMoreButton.classList.remove('hidden');
  loadMoreButton.style.display = 'block';
}

export function hideLoadMoreButton(loadMoreButton) {
  loadMoreButton.classList.add('hidden');
  loadMoreButton.style.display = 'none';
}
